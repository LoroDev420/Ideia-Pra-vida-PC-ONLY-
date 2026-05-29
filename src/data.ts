import { Idea } from "./types";

export const SEED_IDEAS: Idea[] = [
  {
    id: 1,
    title: "Relógio Biológico de Partículas",
    tag: "visual",
    tagLabel: "Visual",
    short: "Sincronizador biológico onde os segundos flutuam e se reagrupam em células luminosas.",
    desc: "Um relógio digital conceitual onde cada segundo se converte em micro-bactérias rodando em física vetorial. O usuário pode arrastar o mouse para assustar as células ou alterar os batimentos do tempo.",
    features: ["Motor de física por Canvas", "Tráfego de células sensível ao arrasto", "Ciclo dia/noite por iluminação", "Exportação em PNG"],
    featured: true
  },
  {
    id: 2,
    title: "Eco-Terrário Generativo Pixelado",
    tag: "visual",
    tagLabel: "Visual",
    short: "Um ecossistema vivo autossuficiente procedural gerado em pixel art no navegador.",
    desc: "Simulação de pequenos organismos virtuais que se espalham de acordo com matemática fractal. Cada ciclo muda o bioma e as cores da fauna, crescendo dinamicamente de acordo com cliques.",
    features: ["Geração matemática por Perlin Noise", "Autômatos celulares de reprodução", "Painel de modificadores climáticos", "Salvamento de mundos localmente"],
    featured: false
  },
  {
    id: 3,
    title: "Sintetizador Harmônico Cósmico",
    tag: "audio",
    tagLabel: "Áudio",
    short: "Escreva constelações na tela para sintetizar frequências rítmicas espaciais com filtros.",
    desc: "Uma constelação interativa utilizando a Web Audio API. Cada estrela que o usuário acende gera uma onda sonora senoidal, que rebate em osciladores configurados com reverb e delay cósmico.",
    features: ["Oscilador harmônico multitom", "Efeitos binaurais e filtros LFO", "Painel dinâmico de conexões celestes", "Suporte a teclado MIDI físico"],
    featured: false
  },
  {
    id: 4,
    title: "Métricas Absurdas S/A",
    tag: "dados",
    tagLabel: "Dados",
    short: "Um painel executivo com gráficos divertidos de produtividade ou índice de procrastinação.",
    desc: "Dashboard interativo que acompanha métricas totalmente inúteis com extrema seriedade empresarial. Exibe termômetros como 'taxa de ideias boas que esqueci' ou 'café convertido em bugs' com gráficos em tempo real.",
    features: ["Gráficos por canvas ou SVG dinâmicos", "Gerador estocástico de KPIs ridículos", "Alertas corporativos de urgência fictícia", "Exportação de relatórios em PDF corporativo"],
    featured: false
  },
  {
    id: 5,
    title: "Nós de Conexão com Física de Molas",
    tag: "interativo",
    tagLabel: "Interativo",
    short: "Um editor lúdico de mapas mentais com nós que se repelem e respiram organicamente.",
    desc: "Ambiente lúdico para organizar conexões. Nós de informação que se acomodam através de força elástica real. Arraste, adicione novos satélites e sinta o amortecimento mecânico das molas.",
    features: ["Cálculo de forças e repulsão vetorial", "Interação drag-and-drop suave", "Editor de tópicos expansível", "Exportação em vetor SVG puro"],
    featured: false
  },
  {
    id: 6,
    title: "Caixa de Areia de Partículas Gravitacionais",
    tag: "interativo",
    tagLabel: "Interativo",
    short: "Solte poeira estelar ao redor de buracos negros e visualize as órbitas e colisões espaciais.",
    desc: "Simulação interativa espacial. O usuário posiciona pontos de atração gravitacional na tela e injeta milhares de partículas orbitais de poeira de neon, criando galáxias espirais exuberantes.",
    features: ["Sólido simulador gravitacional 2D", "Tratamento de colisões elásticas", "Ajuste manual da massa cósmica", "Pausa e alteração temporal"],
    featured: false
  }
];
