import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import { getFallbackIdeas, getFallbackHTML, getFallbackImprovedHTML } from "./src/server-fallbacks";

dotenv.config();

const app = express();
app.use(express.json({ limit: "15mb" }));

const PORT = 3000;

// Lazy initialize client helper
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Utility to retry transient Gemini API errors (e.g. 503/429/status UNAVAILABLE) with exponential backoff
async function retryWithBackoff<T>(fn: () => Promise<T>, retries = 3, delayMs = 1200): Promise<T> {
  let attempt = 0;
  while (true) {
    try {
      return await fn();
    } catch (error: any) {
      attempt++;
      const msg = error?.message || String(error);
      const isTransient = 
        error?.status === "UNAVAILABLE" || 
        error?.code === 503 || 
        error?.code === 429 ||
        msg.includes("503") || 
        msg.includes("UNAVAILABLE") || 
        msg.includes("demand") ||
        msg.includes("exhausted") ||
        msg.includes("429") ||
        msg.includes("temporary");

      if (attempt >= retries || !isTransient) {
        throw error;
      }
      console.warn(`[Gemini Retry] Tentativa ${attempt} falhou com erro temporário: ${msg}. Retentando em ${delayMs}ms...`);
      await new Promise((resolve) => setTimeout(resolve, delayMs));
      delayMs *= 2; // exponential backoff
    }
  }
}

// ── API ROUTES ──

// Check status of the AI API key
app.get("/api/ai-status", (req, res) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "") {
    res.json({
      hasKey: false,
      automatic: false,
      modelUsed: "gemini-3.5-flash",
      message: "Nenhuma API Key ativa encontrada no servidor."
    });
  } else {
    res.json({
      hasKey: true,
      automatic: true,
      modelUsed: "gemini-3.5-flash",
      message: "Chave Gemini integrada automaticamente pelo servidor!"
    });
  }
});

// Generate 6 creative ideas based on user prompt / theme
app.post("/api/generate-ideas", async (req, res) => {
  const { theme, simulateNoKey } = req.body;

  if (simulateNoKey) {
    return res.status(403).json({ error: "Simulação de chave ausente ativa." });
  }

  const ai = getGeminiClient();
  if (!ai) {
    return res.status(403).json({ error: "Chave de API do Gemini não configurada ou ausente no servidor." });
  }

  try {
    const prompt = `Você é um gerador criativo de ideias para sites experimentais interativos avançados em HTML/CSS/JS de arquivo único.
Gere exatamente 6 ideias de sites criativos, divertidos, artísticos, baseados em experiências ou jogos incomuns no navegador.
${theme ? `O usuário especificou o tema: "${theme}". Tente alinhar as ideias a este tema da forma mais inovadora possível.` : "O tema é livre. Seja ultra criativo, surpreendente e fuja de clichês habituais (não faça geradores de senhas simples, calculadora simples, etc.)."}

Sua resposta deve ser estritamente no formato de um array JSON contendo 6 objetos, sem formatação Markdown, sem blocos de código com crases.
Cada objeto no array deve conter exatamente estes campos obrigatórios:
- "title": string (um título cativante em português, limite de 45 caracteres)
- "tag": string (exatamente uma das seguintes categorias: "visual", "interativo", "dados", "audio")
- "tagLabel": string (o rótulo correspondente: "Visual", "Interativo", "Dados", "Áudio")
- "short": string (uma frase descritiva em português, curta e dinâmica, máximo 95 caracteres)
- "desc": string (2 ou 3 frases detalhadas em português descrevendo qual é a experiência interativa do usuário)
- "features": array de 4 strings (cada uma contendo uma funcionalidade técnica ou recurso incrível projetado para esse site)
- "featured": boolean (coloque true em apenas 1 delas para ser a ideia 'em destaque' com layout bento maior)

Exemplo de estrutura esperada:
[
  {
    "title": "Ecossistema Celular de Neon",
    "tag": "visual",
    "tagLabel": "Visual",
    "short": "Partículas biológicas de neon que se alimentam, reagem ao som e morrem de forma procedural.",
    "desc": "Uma simulação celular hipnotizante rodando em Canvas 2D. O mouse libera nutrientes no espaço e as células de neon nadam para se alimentar com física realista e mutação de tamanho.",
    "features": ["Simulação física por Canvas", "Algoritmos de atração de nutrientes", "Ciclos de vida e morte celular", "Trilha sonora ambiente generativa opcional"],
    "featured": true
  }
]`;

    const response = await retryWithBackoff(() =>
      ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 1.0,
        }
      })
    );

    const resultText = response.text;
    if (!resultText) {
      throw new Error("Resposta de texto vazia recebida do Gemini.");
    }

    let cleanJSON = resultText.trim();
    // Safe removal of markdown blocks if the model wrapped it anyway
    if (cleanJSON.startsWith("```")) {
      cleanJSON = cleanJSON.replace(/^```json\s*/i, "").replace(/```\s*$/g, "").trim();
    }

    const ideas = JSON.parse(cleanJSON);
    res.json({ success: true, ideas, fallback: false });
  } catch (error: any) {
    console.warn("Error calling Gemini to generate ideas, using high-quality local fallback ideas:", error.message || error);
    const ideas = getFallbackIdeas(theme);
    res.json({ success: true, ideas, fallback: true });
  }
});

// Generate complete HTML/CSS/JS standalone file for an idea
app.post("/api/build-site", async (req, res) => {
  const { idea, simulateNoKey } = req.body;

  if (simulateNoKey) {
    return res.status(403).json({ error: "Simulação de chave ausente ativa." });
  }

  const ai = getGeminiClient();
  if (!ai) {
    return res.status(403).json({ error: "Chave de API do Gemini não configurada ou ausente no servidor." });
  }

  if (!idea) {
    return res.status(400).json({ error: "Dados da ideia ausentes para a compilação." });
  }

  try {
    const prompt = `Você é um desenvolvedor front-end de elite, mestre em WebGL, Canvas 2D, Web Audio API e interações ultrafluidas em CSS/JS de arquivo único.
Sua missão é desenvolver o site completo, responsivo e funcional a partir desta ideia gerada:

TÍTULO: ${idea.title}
CATEGORIA: ${idea.tagLabel} (${idea.tag})
DESCRIÇÃO: ${idea.desc}
FUNCIONALIDADES ESPERADAS: ${idea.features.join(", ")}

REQUISITOS OBRIGATÓRIOS:
1. Retorne APENAS um único arquivo HTML standalone e completo (contendo <!DOCTYPE html>, <html>, <head>, <body>, tags de estilo <style> e script <script> inline).
2. Não use explicações ou comentários expansivos fora do HTML. Não use crases de código Markdown (\`\`\`html) na resposta. Escreva diretamente o código HTML completo que inicia com <!DOCTYPE html>.
3. O design DEVE ser profissional, escuro, futurista ou altamente estilizado, compatível com a vibração da ideia. Cores elegantes, de alto contraste, tipografia fluida com fontes do Google Fonts importadas por <link> ou @import.
4. O site deve ser TOTALMENTE INTERATIVO e funcional no navegador. Evite simulações fictícias ou textos imutáveis. Exemplos:
   - Se for Áudio, implemente a Web Audio API sintetizando notas, batidas, sintetizador de ondas senoidais, ruídos e controles visuais de volume, frequência ou botões de teclado físico.
   - Se for Visual ou Interativo, implemente física de partículas em <canvas> com vetores de velocidade, gravidade, repulsão ao ponteiro do mouse, ou jogos viciantes baseados em física.
   - Se for Dados, elabore simulações matemáticas orgânicas ou relógios complexos que respondam a dados reais obtidos localmente.
5. Adicione um cabeçalho ou discreto menu de help que guie o usuário a saber como interagir de forma lúdica.
6. O mouse neste site gerado também deve ter um diferencial, ou faça efeitos visuais de rastro de luz ou poeira estelar ao arrastar o mouse para dar um aspecto lúdico premium de altíssimo polimento!
7. Todo o código javascript e styling deve possuir altíssima qualidade de escrita, sem depender de frameworks externos pesados ou require(). Caso utilize frameworks simples (como CDN do Tailwind v4 ou FontAwesome para ícones), inclua-os pelo link de CDN nas tags correspondentes.

Prepare este portal mágico agora e retorne diretamente o código HTML funcional!`;

    const response = await retryWithBackoff(() =>
      ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          temperature: 0.9,
        }
      })
    );

    const resultText = response.text;
    if (!resultText) {
      throw new Error("Falha ao receber o código do Gemini.");
    }

    let cleanHTML = resultText.trim();
    if (cleanHTML.startsWith("```")) {
      cleanHTML = cleanHTML.replace(/^```html\s*/i, "").replace(/```\s*$/g, "").trim();
    }

    res.json({ success: true, code: cleanHTML, fallback: false });
  } catch (error: any) {
    console.warn("Error calling Gemini to build site, using high-quality local template compiler:", error.message || error);
    const code = getFallbackHTML(idea);
    res.json({ 
      success: true, 
      code, 
      fallback: true,
      isQuotaError: error?.message?.includes("quota") || error?.message?.includes("429") || error?.message?.includes("QUOTA_EXHAUSTED")
    });
  }
});

// Improve / Add features to an already compiled HTML site using Gemini
app.post("/api/improve-site", async (req, res) => {
  const { code, idea, improvement, simulateNoKey } = req.body;

  if (simulateNoKey) {
    return res.status(403).json({ error: "Simulação de chave ausente ativa." });
  }

  const ai = getGeminiClient();
  if (!ai) {
    return res.status(403).json({ error: "Chave de API do Gemini não configurada ou ausente no servidor." });
  }

  if (!code || !improvement) {
    return res.status(400).json({ error: "Dados necessários ausentes para a melhoria." });
  }

  try {
    const prompt = `Você é um desenvolvedor front-end de elite, mestre em WebGL, Canvas 2D, Web Audio API e interações ultrafluidas em CSS/JS de arquivo único.
O usuário já possui um site interativo autossuficiente integrado em um único arquivo HTML e agora quer MELHORAR, ADICIONAR novas funcionalidades ou alterar elementos específicos.

Abaixo está o CÓDIGO HTML ATUAL do site completo:
-------------------------------------
${code}
-------------------------------------

DADOS DO PROJETO ORIGINAL: 
Título: ${idea?.title || "Site Criativo"}
Descrição: ${idea?.desc || "Site interativo criado com IA"}

O USUÁRIO COGITOU E SOLICITOU ESTA SEGUINTE MELHORIA OU ADIÇÃO NO PROJETO:
"${improvement}"

REQUISITOS OBRIGATÓRIOS DO CÓDIGO APRIMORADO:
1. Retorne APENAS um único arquivo HTML standalone e completo (contendo de <!DOCTYPE html> até </html>, com estilos <style> e lógicas <script> inline).
2. Não use explicações em áudio ou texto explicativos fora do HTML. Não utilize de forma alguma blocos de código ou crases de Markdown (\`\`\`html) para envelopar a resposta. Sua resposta deve iniciar diretamente com <!DOCTYPE html> e terminar com </html>.
3. Analise cuidadosamente a arquitetura, as tags de script, os elementos HTML e os seletores CSS do código autossuficiente original. Faça modificações de forma fluida para integrar a melhoria pedida, enriquecendo o site e mantendo todas as interatividades passadas intocadas e funcionais.
4. Garanta que qualquer nova funcionalidade (seja um placar de pontos, botões de customização de cores, minijogos extras, botões musicais, etc.) seja 100% FUNCIONAL, com lógica real e robusta de javascript, sem depender de botões fictícios, falsos alertas ou dados estáticos imutáveis.
5. Se for de áudio, certifique-se de configurar e manter a Web Audio API sintetizando notas dinâmicas e reais.
6. Mantenha ou aprimore as interações lúdicas do ponteiro do mouse (efeitos de rastro, poeiras estelares, acelerações gravitacionais, etc.) mantendo o ar premium, divertido e de extremo polimento do projeto original.

Conceba agora a nova versão robustamente aprimorada deste portal mágico e retorne todo o código HTML funcional!`;

    const response = await retryWithBackoff(() =>
      ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          temperature: 0.95,
        }
      })
    );

    const resultText = response.text;
    if (!resultText) {
       throw new Error("Falha ao receber o código aprimorado do Gemini.");
    }

    let cleanHTML = resultText.trim();
    if (cleanHTML.startsWith("```")) {
      cleanHTML = cleanHTML.replace(/^```html\s*/i, "").replace(/```\s*$/g, "").trim();
    }

    res.json({ success: true, code: cleanHTML, fallback: false });
  } catch (error: any) {
    console.warn("Error calling Gemini to improve site, using high-quality local fallback compiler:", error.message || error);
    const cleanHTML = getFallbackImprovedHTML(code, idea, improvement);
    res.json({ 
      success: true, 
      code: cleanHTML, 
      fallback: true, 
      isQuotaError: error?.message?.includes("quota") || error?.message?.includes("429") || error?.message?.includes("QUOTA_EXHAUSTED")
    });
  }
});

// ── VITE / STATIC DEPLOYMENT HANDLING ──

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[FULLSTACK SERVER] Rodando em http://0.0.0.0:${PORT}`);
  });
}

startServer();
