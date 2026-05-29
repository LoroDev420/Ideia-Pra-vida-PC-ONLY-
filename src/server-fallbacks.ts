export function getFallbackIdeas(theme: string): any[] {
  const themeWords = theme ? theme.trim() : "Surpresa Cósmica";

  return [
    {
      title: `Relógio Cósmico: ${themeWords}`,
      tag: "visual",
      tagLabel: "Visual",
      short: `O tempo fluindo em partículas luminosas moldadas sob o conceito de ${themeWords}.`,
      desc: `Uma experiência interativa onde segundos e minutos se convertem em micro-partículas de física vetorial inspiradas em ${themeWords}. O usuário pode arrastar o mouse para moldar ou mudar a gravidade.`,
      features: [
        "Física vetorial fluida",
        "Rastro magnético de arraste",
        "Modulação de cores inteligente",
        "Exportação de cartão em PNG"
      ],
      featured: true
    },
    {
      title: `Sintetizador: Constelação ${themeWords}`,
      tag: "audio",
      tagLabel: "Áudio",
      short: `Desenhe ondas sonoras harmônicas no vácuo espacial moduladas por ressonância de ${themeWords}.`,
      desc: `Um painel de sintetizadores baseado na Web Audio API com o tema ${themeWords}. Clique nas constelações ou use o teclado físico para criar ondas celestes acompanhado de ecos e filtros de frequência.`,
      features: [
        "Sincronização de ondas multitom",
        "Efeito de eco espacial (Delay)",
        "Visualização osciloscópica",
        "Sequenciador rítmico embutido"
      ],
      featured: false
    },
    {
      title: `Dashboard de Métricas: ${themeWords}`,
      tag: "dados",
      tagLabel: "Dados",
      short: `Acompanhe estatísticas bizarras e KPIs ridículos sobre o impacto de ${themeWords} na humanidade.`,
      desc: `Dashboard brutalista em tempo real focado em acompanhar métricas totalmente inúteis com seriedade corporativa hilária: taxa de procrastinação de ${themeWords}, cafeína gasta e bugs pendentes.`,
      features: [
        "Gráficos SVG dinâmicos e vivos",
        "Modificadores de estresse corporativo",
        "Disparador de alertas absurdos",
        "Relatório analítico em tempo de execução"
      ],
      featured: false
    },
    {
      title: `Caixa de Areia Gravitacional: ${themeWords}`,
      tag: "interativo",
      tagLabel: "Interativo",
      short: `Solte planetas de neon e teste órbita de corpos sob o campo magnético de ${themeWords}.`,
      desc: `Um simulador de gravidade orbital fluida. Crie corpos pesados de ${themeWords} no espaço, lance poeiras estelares e ajuste velocidades físicas com vetores de atração em tempo real.`,
      features: [
        "Simulação de física newtoniana pura",
        "Lançador estelar por arraste direcional",
        "Tratamento de órbita circular e espiral",
        "Controles temporais (Acelerar/Pausar)"
      ],
      featured: false
    },
    {
      title: `Ecossistema Estocástico: ${themeWords}`,
      tag: "visual",
      tagLabel: "Visual",
      short: `Uma simulação viva autossuficiente procedural gerada com biomas de ${themeWords}.`,
      desc: `Observe pequenos organismos autônomos que buscam nutrientes em uma arena sob o bioma estocástico de ${themeWords}. Os seres sofrem mutações dinâmicas de tamanho e velocidade com base na atmosfera celular.`,
      features: [
        "Algoritmo de atração de nutrientes",
        "Mutação stocástica de tamanho",
        "Ambiente procedural responsivo",
        "Rastro orgânico de partículas"
      ],
      featured: false
    },
    {
      title: `Teclado Beatmaker ${themeWords}`,
      tag: "audio",
      tagLabel: "Áudio",
      short: `Componha loops eletrônicos de percussão em um grid matrix retro de ${themeWords}.`,
      desc: `Crie trilhas sonoras minimalistas ao alterar padrões rítmicos em uma matriz de sequenciador. Escolha tons digitais e gerencie envelopes de volume com o tema de ${themeWords}.`,
      features: [
        "Matriz musical de 8 botões",
        "BPM ajustável interativamente",
        "Controles de volume e timbre",
        "Osciloscópio estético em tempo real"
      ],
      featured: false
    }
  ];
}

export function getFallbackHTML(idea: any): string {
  const title = idea.title || "Portal Criativo de IA";
  const desc = idea.desc || "Portal de demonstração autossuficiente projetado para simular experiências incríveis com interações ricas.";
  const tagLabel = idea.tagLabel || "Interativo";
  const featuresList = (idea.features || []).map((f: string) => `<li>✨ ${f}</li>`).join("");

  // Categorized template selection
  const tag = idea.tag || "visual";

  if (tag === "visual") {
    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} (Fallback)</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700&family=JetBrains+Mono&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Space Grotesk', sans-serif;
    }
    .mono {
      font-family: 'JetBrains Mono', monospace;
    }
  </style>
</head>
<body class="bg-[#111] text-white overflow-hidden relative min-h-screen">

  <!-- Full-screen simulation canvas -->
  <canvas id="flow-canvas" class="absolute inset-0 z-0 block"></canvas>

  <!-- Overlay UI elements -->
  <div class="absolute inset-0 z-10 flex flex-col justify-between p-6 pointer-events-none select-none">
    
    <!-- Top Bar -->
    <header class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 w-full bg-black/70 border-4 border-black p-4 rounded-2xl shadow-[6px_6px_0px_0px_#000] pointer-events-auto">
      <div class="flex items-center gap-3">
        <span class="px-3 py-1 bg-[#FF4D6D] text-white text-xs font-black rounded-full border-2 border-black">
          ${tagLabel}
        </span>
        <h1 class="text-xl sm:text-2xl font-black italic tracking-tight uppercase text-white">${title}</h1>
      </div>
      <div class="flex items-center gap-2">
        <span class="mono text-[10px] bg-white/15 px-2 py-1 rounded">LOCAL FALLBACK COM PILAÇÃO MOTOR</span>
        <button id="btn-snap" class="px-3 py-1.5 bg-[#FFDE59] text-black text-xs font-black rounded-lg border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:translate-y-[-1px] active:translate-y-0 active:shadow-none transition-all cursor-pointer">
          CAPTURA .PNG
        </button>
      </div>
    </header>

    <!-- Center explanation badge (shown briefly) -->
    <div id="notice-overlay" class="mx-auto my-auto max-w-sm bg-neutral-900 border-4 border-black p-5 rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center transition-opacity duration-500 pointer-events-auto">
      <h2 class="text-lg font-black text-[#FFDE59] uppercase leading-tight mb-2">✦ Motor Local Ativado ✦</h2>
      <p class="text-xs text-neutral-300 leading-relaxed mb-4">
        O sistema de IA em nuvem está operando com alta ocupação. Suas ideias foram processadas com excelência com o nosso simulador gráfico de alto desempenho!
      </p>
      <button onclick="document.getElementById('notice-overlay').style.opacity='0'; setTimeout(()=> {document.getElementById('notice-overlay').remove()}, 500)" class="w-full py-1 bg-white text-black text-xs font-bold rounded border-2 border-black">
        COMEÇAR EXPERIÊNCIA
      </button>
    </div>

    <!-- Bottom panel -->
    <footer class="flex flex-col md:flex-row justify-between items-stretch md:items-end gap-4 pointer-events-auto">
      
      <!-- Descriptions card -->
      <div class="bg-black/85 border-4 border-black p-5 rounded-2xl max-w-sm shadow-[6px_6px_0px_0px_#000]">
        <h3 class="text-sm font-black text-[#FFDE59] uppercase mb-1">SOBRE A CRIAÇÃO</h3>
        <p class="text-xs text-neutral-300 leading-relaxed mb-3">${desc}</p>
        <ul class="text-[11px] text-neutral-400 font-bold space-y-1">
          ${featuresList}
        </ul>
      </div>

      <!-- Control panel -->
      <div class="bg-white text-black border-4 border-black p-5 rounded-2xl w-full md:w-80 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        <h3 class="text-xs font-black uppercase mb-3 border-b-2 border-black pb-1">🎛️ CONTROLES DA SIMULAÇÃO</h3>
        
        <div class="space-y-3">
          <div>
            <div class="flex justify-between text-[11px] font-black">
              <label>QUANTIDADE DE PARTÍCULAS</label>
              <span id="label-count">350</span>
            </div>
            <input id="slider-count" type="range" min="50" max="1000" value="350" class="w-full accent-[#FF4D6D]">
          </div>
          
          <div>
            <div class="flex justify-between text-[11px] font-black">
              <label>VELOCIDADE DOS FLUXOS</label>
              <span id="label-speed">2.0</span>
            </div>
            <input id="slider-speed" type="range" min="0.5" max="5.0" step="0.1" value="2.0" class="w-full accent-[#FF4D6D]">
          </div>

          <div>
            <div class="flex justify-between text-[11px] font-black">
              <label>MODO DE INTERAÇÃO</label>
            </div>
            <select id="select-mode" class="w-full mt-1 bg-white border-2 border-black p-1 text-xs font-bold">
              <option value="attract">Atração Gravitacional</option>
              <option value="repel">Repulsão Magnética</option>
              <option value="orbit">Vórtice Orbital</option>
              <option value="spray">Poeira Cósmica</option>
            </select>
          </div>

          <div class="flex gap-2 pt-1 font-black">
            <button id="btn-color" class="flex-1 py-1.5 bg-[#5271FF] text-white text-xs rounded border-2 border-black shadow-[2px_2px_0px_0px_#000] active:translate-y-[1px] active:shadow-none">
              PALETA: ROSA/AZUL
            </button>
            <button id="btn-clear" class="flex-1 py-1.5 bg-[#FF5757] text-white text-xs rounded border-2 border-black shadow-[2px_2px_0px_0px_#000] active:translate-y-[1px] active:shadow-none">
              REINICIAR
            </button>
          </div>
        </div>
      </div>

    </footer>
  </div>

  <script>
    const canvas = document.getElementById("flow-canvas");
    const ctx = canvas.getContext("2d");

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // State Variables
    let activeColorMode = 0; // 0: neon gradient, 1: electric teal, 2: warm gold, 3: matrix green
    const colorPalettes = [
      { start: "#ff4d6d", end: "#5271FF", particles: ["#ff4d6d", "#5271FF", "#a855f7"] },
      { start: "#38B6FF", end: "#00C9A7", particles: ["#38B6FF", "#00C9A7", "#4DFFD2"] },
      { start: "#FFDE59", end: "#FF5757", particles: ["#FFDE59", "#FF5757", "#ff914d"] },
      { start: "#c8f500", end: "#10b981", particles: ["#c8f500", "#10b981", "#34d399"] }
    ];

    let particlesArray = [];
    let particleCount = 350;
    let speedModifier = 2.0;
    let interactionMode = "attract";

    const mouse = {
      x: null,
      y: null,
      radius: 120
    };

    // Listeners
    window.addEventListener("resize", () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      init();
    });

    window.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    window.addEventListener("mouseout", () => {
      mouse.x = null;
      mouse.y = null;
    });

    // Particle construct
    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 3 + 1;
        this.baseSpeedX = (Math.random() * 2 - 1) * 0.5;
        this.baseSpeedY = (Math.random() * 2 - 1) * 0.5;
        this.speedX = this.baseSpeedX;
        this.speedY = this.baseSpeedY;
        this.color = colorPalettes[activeColorMode].particles[Math.floor(Math.random() * colorPalettes[activeColorMode].particles.length)];
        this.alpha = Math.random() * 0.5 + 0.4;
      }

      update() {
        this.x += this.speedX * speedModifier;
        this.y += this.speedY * speedModifier;

        // Apply friction drag damping
        this.speedX *= 0.98;
        this.speedY *= 0.98;

        // Bounce/Teleport bounds
        if (this.x < 0 || this.x > width) this.reset();
        if (this.y < 0 || this.y > height) this.reset();

        // Mouse influence
        if (mouse.x !== null && mouse.y !== null) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouse.radius) {
            let force = (mouse.radius - distance) / mouse.radius; // Closer = stronger force
            
            if (interactionMode === "attract") {
              // Pull
              this.speedX += (dx / distance) * force * 0.4;
              this.speedY += (dy / distance) * force * 0.4;
            } else if (interactionMode === "repel") {
              // Push
              this.speedX -= (dx / distance) * force * 0.8;
              this.speedY -= (dy / distance) * force * 0.8;
            } else if (interactionMode === "orbit") {
              // Tangential orbit
              this.speedX += (-dy / distance) * force * 0.6;
              this.speedY += (dx / distance) * force * 0.6;
            } else if (interactionMode === "spray") {
              // Explode size or vibrate
              this.size = Math.random() * 4 + 2;
              this.speedX += (Math.random() * 2 - 1) * 0.5;
              this.speedY += (Math.random() * 2 - 1) * 0.5;
            }
          }
        }

        // Return to base speed gradually
        this.speedX += this.baseSpeedX * 0.02;
        this.speedY += this.baseSpeedY * 0.02;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.restore();
      }
    }

    function init() {
      particlesArray = [];
      for (let i = 0; i < particleCount; i++) {
        particlesArray.push(new Particle());
      }
    }

    function animate() {
      // Semi-transparent background refresh for glowing flow tails
      ctx.fillStyle = "rgba(10, 10, 15, 0.12)";
      ctx.fillRect(0, 0, width, height);

      // Web connections overlay lines
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();

        // Connect particles near each other to create mesh grid
        for (let j = i + 1; j < particlesArray.length; j++) {
          let dx = particlesArray[i].x - particlesArray[j].x;
          let dy = particlesArray[i].y - particlesArray[j].y;
          let distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 75) {
            ctx.save();
            ctx.globalAlpha = (75 - distance) / 380;
            ctx.strokeStyle = particlesArray[i].color;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
            ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      requestAnimationFrame(animate);
    }

    // Set controls listeners
    const sliderCount = document.getElementById("slider-count");
    const keyLabelCount = document.getElementById("label-count");
    sliderCount.addEventListener("input", (e) => {
      particleCount = parseInt(e.target.value);
      keyLabelCount.textContent = particleCount;
      init();
    });

    const sliderSpeed = document.getElementById("slider-speed");
    const keyLabelSpeed = document.getElementById("label-speed");
    sliderSpeed.addEventListener("input", (e) => {
      speedModifier = parseFloat(e.target.value);
      keyLabelSpeed.textContent = speedModifier.toFixed(1);
    });

    const selectMode = document.getElementById("select-mode");
    selectMode.addEventListener("change", (e) => {
      interactionMode = e.target.value;
    });

    const btnColor = document.getElementById("btn-color");
    btnColor.addEventListener("click", () => {
      activeColorMode = (activeColorMode + 1) % colorPalettes.length;
      let label = "PALETA: ROSA/AZUL";
      if (activeColorMode === 1) label = "PALETA: CELESTE";
      else if (activeColorMode === 2) label = "PALETA: SOLAR";
      else if (activeColorMode === 3) label = "PALETA: MATRIZ";
      
      btnColor.textContent = label;
      init();
    });

    document.getElementById("btn-clear").addEventListener("click", () => {
      init();
    });

    document.getElementById("btn-snap").addEventListener("click", () => {
      // Flash capturing effect
      const flash = document.createElement("div");
      flash.className = "fixed inset-0 bg-white z-50 pointer-events-none transition-opacity duration-300 opacity-100";
      document.body.appendChild(flash);
      setTimeout(() => flash.style.opacity = "0", 50);
      setTimeout(() => flash.remove(), 350);

      const link = document.createElement("a");
      link.download = "${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-fallback.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    });

    init();
    animate();
  </script>
</body>
</html>`;
  }

  if (tag === "audio") {
    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} (Fallback)</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700&family=JetBrains+Mono&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Space Grotesk', sans-serif;
    }
    .mono {
      font-family: 'JetBrains Mono', monospace;
    }
  </style>
</head>
<body class="bg-[#0b0b0f] text-white flex flex-col justify-between min-h-screen">

  <!-- Top bar header -->
  <header class="p-6 border-b-4 border-black bg-white text-black shadow-[0_4px_0_0_#000]">
    <div class="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
      <div class="flex items-center gap-3">
        <span class="px-3.5 py-1 bg-[#A855F7] text-white text-xs font-black rounded-full border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] uppercase">
          ${tagLabel}
        </span>
        <h1 class="text-2xl font-black uppercase italic italic">${title}</h1>
      </div>
      <div>
        <span class="mono text-xs bg-[#A855F7]/10 border-2 border-[#A855F7] text-[#A855F7] font-black px-3 py-1.5 rounded-xl uppercase">
          SINTETIZADOR DE FLUXO ATIVO
        </span>
      </div>
    </div>
  </header>

  <!-- Notice Overlay -->
  <div id="notice" class="max-w-lg mx-auto bg-neutral-900 border-4 border-black p-6 rounded-3xl text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mt-8">
    <div class="text-3xl mb-1">🎮</div>
    <h2 class="text-xl font-black text-[#A855F7] uppercase mb-1">ALTA DEMANDA DE IA DETECTADA</h2>
    <p class="text-xs text-neutral-300 leading-relaxed mb-4">
      O servidor acionou a engine local Web Audio. Sintetizadores e frequências criadas sob medida estão disponíveis diretamente pelo motor de compilação!
    </p>
    <button onclick="document.getElementById('notice').remove()" class="px-6 py-2 bg-white text-black font-black font-mono text-xs rounded-xl border-2 border-black hover:bg-neutral-100">
      MANDAR VER NO SOM ➜
    </button>
  </div>

  <main class="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 flex flex-col justify-center gap-6">
    
    <!-- Oscilloscope visualizer card -->
    <div class="bg-black border-[4px] border-black rounded-3xl p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
      <div class="flex justify-between items-center mb-2">
        <span class="mono text-xs font-black text-neutral-400">⚡ WAVE OSCILLOSCOPE REAL-TIME</span>
        <span class="text-xs font-bold text-[#A855F7] uppercase italic">Oscilador Estelar</span>
      </div>
      <canvas id="osc-canvas" class="w-full h-32 bg-[#09090c] border-2 border-black rounded-2xl block"></canvas>
    </div>

    <!-- Matrix Sequencer Sequenced rhythms grid -->
    <div class="bg-neutral-900 border-[4px] border-black rounded-3xl p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
      <div class="flex justify-between items-center mb-4">
        <div>
          <h2 class="text-sm font-black uppercase text-[#A855F7] italic">Grid Matriz de Sequências</h2>
          <p class="text-[10px] text-neutral-400 uppercase font-bold">Ligue ou desligue passos de áudio para fazer loops</p>
        </div>
        <div class="flex items-center gap-2">
          <button id="btn-play-seq" class="px-4 py-1.5 bg-[#7ED957] text-black text-xs font-black rounded-xl border-2 border-black hover:bg-[#ebd050] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
            PLAY SEQ
          </button>
          <button id="btn-clear-seq" class="px-3 py-1.5 bg-neutral-800 text-white text-xs font-bold rounded-xl border-2 border-black hover:bg-neutral-700">
            LIMPAR
          </button>
        </div>
      </div>

      <!-- matrix steps -->
      <div class="grid grid-cols-8 gap-2.5 mb-2" id="sequencer-matrix">
        <!-- Javascript dynamically hooks pads -->
      </div>
      <div class="flex justify-between items-center text-[10px] text-neutral-500 font-black tracking-wide uppercase mt-1">
        <span>Passo 1</span>
        <span>Passo 2</span>
        <span>Passo 3</span>
        <span>Passo 4</span>
        <span>Passo 5</span>
        <span>Passo 6</span>
        <span>Passo 7</span>
        <span>Passo 8</span>
      </div>
    </div>

    <!-- Synth Interactive keyboard keys & sliders -->
    <div class="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
      
      <!-- Sliders control panel -->
      <div class="md:col-span-4 bg-white text-black border-[4px] border-black p-5 rounded-3xl shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
        <h3 class="text-xs font-black uppercase border-b-2 border-black pb-1 mb-4">🎚️ PARAMETROS OSC</h3>
        
        <div class="space-y-3">
          <div>
            <div class="flex justify-between text-[10px] font-black">
              <label>TEMPO BPM</label>
              <span id="label-bpm">120 BPM</span>
            </div>
            <input id="slider-bpm" type="range" min="60" max="220" value="120" class="w-full accent-[#A855F7]">
          </div>

          <div>
            <div class="flex justify-between text-[10px] font-black">
              <label>FILTRO DE FREQUÊNCIA</label>
              <span id="label-cutoff">2500hz</span>
            </div>
            <input id="slider-cutoff" type="range" min="100" max="5000" value="2500" class="w-full accent-[#A855F7]">
          </div>

          <div>
            <label class="text-[10px] font-black">TIPO DE ONDA</label>
            <select id="select-wave" class="w-full mt-1 bg-white border-2 border-black p-1 text-xs font-bold font-mono">
              <option value="sine">Senoidal (Harmônica/Espacial)</option>
              <option value="triangle">Triangular (Flauta/Doce)</option>
              <option value="sawtooth">Dente de Serra (Retro-Synth)</option>
              <option value="square">Quadrada (Divertido 8-bit)</option>
            </select>
          </div>
        </div>

        <div class="pt-4 border-t-2 border-black mt-4 text-[10px] text-neutral-500 leading-normal">
          <span>Dica: Clique no painel ou aperte as teclas do seu teclado físico (A S D F G H J K) para disparar as notas synth!</span>
        </div>
      </div>

      <!-- Musical piano keys layout -->
      <div class="md:col-span-8 bg-neutral-900 border-[4px] border-black p-5 rounded-3xl shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] flex flex-col">
        <h3 class="text-xs font-black uppercase text-neutral-300 italic mb-4">🎹 PLAY PIANO MANUALLY</h3>
        <div class="flex gap-2 flex-1 items-stretch" style="min-height: 140px;">
          <button class="key bg-white text-black font-black border-4 border-black rounded-xl flex-1 flex flex-col justify-end pb-3 text-center active:translate-y-[4px] shadow-[0_4px_0_0_#000] active:shadow-none transition-all" data-note="261.63">C4<span class="mono text-[9px] text-neutral-400 block mt-1">(A)</span></button>
          <button class="key bg-white text-black font-black border-4 border-black rounded-xl flex-1 flex flex-col justify-end pb-3 text-center active:translate-y-[4px] shadow-[0_4px_0_0_#000] active:shadow-none transition-all" data-note="293.66">D4<span class="mono text-[9px] text-neutral-400 block mt-1">(S)</span></button>
          <button class="key bg-white text-black font-black border-4 border-black rounded-xl flex-1 flex flex-col justify-end pb-3 text-center active:translate-y-[4px] shadow-[0_4px_0_0_#000] active:shadow-none transition-all" data-note="329.63">E4<span class="mono text-[9px] text-neutral-400 block mt-1">(D)</span></button>
          <button class="key bg-white text-black font-black border-4 border-black rounded-xl flex-1 flex flex-col justify-end pb-3 text-center active:translate-y-[4px] shadow-[0_4px_0_0_#000] active:shadow-none transition-all" data-note="349.23">F4<span class="mono text-[9px] text-neutral-400 block mt-1">(F)</span></button>
          <button class="key bg-white text-black font-black border-4 border-black rounded-xl flex-1 flex flex-col justify-end pb-3 text-center active:translate-y-[4px] shadow-[0_4px_0_0_#000] active:shadow-none transition-all" data-note="392.00">G4<span class="mono text-[9px] text-neutral-400 block mt-1">(G)</span></button>
          <button class="key bg-white text-black font-black border-4 border-black rounded-xl flex-1 flex flex-col justify-end pb-3 text-center active:translate-y-[4px] shadow-[0_4px_0_0_#000] active:shadow-none transition-all" data-note="440.00">A4<span class="mono text-[9px] text-neutral-400 block mt-1">(H)</span></button>
          <button class="key bg-white text-black font-black border-4 border-black rounded-xl flex-1 flex flex-col justify-end pb-3 text-center active:translate-y-[4px] shadow-[0_4px_0_0_#000] active:shadow-none transition-all" data-note="493.88">B4<span class="mono text-[9px] text-neutral-400 block mt-1">(J)</span></button>
          <button class="key bg-white text-black font-black border-4 border-black rounded-xl flex-1 flex flex-col justify-end pb-3 text-center active:translate-y-[4px] shadow-[0_4px_0_0_#000] active:shadow-none transition-all" data-note="523.25">C5<span class="mono text-[9px] text-neutral-400 block mt-1">(K)</span></button>
        </div>
      </div>

    </div>

  </main>

  <footer class="p-6 text-center text-xs text-neutral-400 font-bold border-t-4 border-black bg-neutral-900 mt-8">
    ${desc}
  </footer>

  <script>
    // Inits Web Audio Context
    let audioCtx = null;
    let mainGainNode = null;
    let biquadFilter = null;
    let activeOscillators = [];

    function checkAudioInit() {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        mainGainNode = audioCtx.createGain();
        mainGainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);

        biquadFilter = audioCtx.createBiquadFilter();
        biquadFilter.type = "lowpass";
        biquadFilter.frequency.setValueAtTime(biquadFilterFreq, audioCtx.currentTime);

        mainGainNode.connect(biquadFilter);
        biquadFilter.connect(audioCtx.destination);
        startOscilloscope();
      }
    }

    // Parameters
    let biquadFilterFreq = 2500;
    let bpm = 120;
    let waveType = "sine";

    const keysMap = {
      "keya": "261.63", "keys": "293.66", "keyd": "329.63", "keyf": "349.23",
      "keyg": "392.00", "keyh": "440.00", "keyj": "493.88", "keyk": "523.25"
    };

    // Matrix Sequencer Data
    const rowNotes = [523.25, 493.88, 440.00, 392.00, 349.23, 329.63, 293.66, 261.63];
    let sequencerState = Array(8).fill(null).map(() => Array(8).fill(false));
    let nextStepIndex = 0;
    let isSequencerActive = false;
    let nextStepIntervalTimer = null;

    // Compile dynamic sequence cells
    const matrixContainer = document.getElementById("sequencer-matrix");
    for (let r = 0; r < 8; r++) {
      const stepRow = document.createElement("div");
      stepRow.className = "contents";
      
      for (let step = 0; step < 8; step++) {
        const cell = document.createElement("div");
        cell.className = "aspect-square rounded-xl bg-neutral-800 border-2 border-black shadow-[1px_1.5px_0_0_#000] cursor-pointer hover:bg-neutral-700 transition-all seq-cell";
        cell.dataset.row = r.toString();
        cell.dataset.step = step.toString();
        cell.addEventListener("click", () => {
          const current = sequencerState[r][step];
          sequencerState[r][step] = !current;
          cell.style.backgroundColor = !current ? "#A855F7" : "#262626";
          cell.style.boxShadow = !current ? "0px 0px 8px #a855f7" : "1px 1.5px 0 0 #000";
        });
        matrixContainer.appendChild(cell);
      }
    }

    // Play/Play sequencer logic
    function stepPlayheadTick() {
      if (!isSequencerActive) return;
      checkAudioInit();

      // Highlight active column visually
      const allCells = document.querySelectorAll(".seq-cell");
      allCells.forEach(cell => {
        const cellStep = parseInt(cell.dataset.step);
        const cellRow = parseInt(cell.dataset.row);
        const isToggled = sequencerState[cellRow][cellStep];
        
        if (cellStep === nextStepIndex) {
          cell.style.borderColor = "#fff";
        } else {
          cell.style.borderColor = "#000";
        }
      });

      // Play toggled notes inside step
      for (let r = 0; r < 8; r++) {
        if (sequencerState[r][nextStepIndex]) {
          playNoteFreq(rowNotes[r], 0.25);
        }
      }

      nextStepIndex = (nextStepIndex + 1) % 8;
      const stepTimeMs = (60 / bpm) * 1000 * 0.5; // quarter beat intervals
      nextStepIntervalTimer = setTimeout(stepPlayheadTick, stepTimeMs);
    }

    document.getElementById("btn-play-seq").addEventListener("click", (e) => {
      isSequencerActive = !isSequencerActive;
      e.target.textContent = isSequencerActive ? "PAUSE SEQ" : "PLAY SEQ";
      e.target.style.backgroundColor = isSequencerActive ? "#FF5757" : "#7ED957";
      e.target.style.color = isSequencerActive ? "#fff" : "#000";
      
      if (isSequencerActive) {
        nextStepIndex = 0;
        stepPlayheadTick();
      } else {
        clearTimeout(nextStepIntervalTimer);
      }
    });

    document.getElementById("btn-clear-seq").addEventListener("click", () => {
      sequencerState = Array(8).fill(null).map(() => Array(8).fill(false));
      const allCells = document.querySelectorAll(".seq-cell");
      allCells.forEach(cell => {
        cell.style.backgroundColor = "#262626";
        cell.style.borderColor = "#000";
        cell.style.boxShadow = "1px 1.5px 0 0 #000";
      });
    });

    // Play Note Synthesizer Generator helper
    function playNoteFreq(frequency, duration = 0.35) {
      if (!audioCtx) return;
      
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      osc.type = waveType;
      osc.frequency.setValueAtTime(frequency, audioCtx.currentTime);
      
      gainNode.gain.setValueAtTime(0.25, audioCtx.currentTime);
      // Beautiful envelope ADSR release
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

      osc.connect(gainNode);
      gainNode.connect(biquadFilter);
      
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    }

    // Mouse control clicker
    const pianoKeys = document.querySelectorAll(".key");
    pianoKeys.forEach(button => {
      button.addEventListener("mousedown", () => {
        checkAudioInit();
        const freq = parseFloat(button.dataset.note);
        playNoteFreq(freq, 0.45);
        
        // Add visual bubble pop wave
        button.style.backgroundColor = "#A855F7";
        button.style.color = "#fff";
      });
      button.addEventListener("mouseup", () => {
        button.style.backgroundColor = "#fff";
        button.style.color = "#000";
      });
    });

    // Keyboard support triggers
    window.addEventListener("keydown", (e) => {
      const code = e.code.toLowerCase();
      if (keysMap[code]) {
        checkAudioInit();
        const freq = parseFloat(keysMap[code]);
        playNoteFreq(freq, 0.5);
        
        // Match visual button press styling
        const matchingButton = Array.from(pianoKeys).find(key => parseFloat(key.dataset.note) === freq);
        if (matchingButton) {
          matchingButton.style.backgroundColor = "#A855F7";
          matchingButton.style.color = "#fff";
          matchingButton.style.transform = "translateY(4px)";
          matchingButton.style.boxShadow = "none";
        }
      }
    });

    window.addEventListener("keyup", (e) => {
      const code = e.code.toLowerCase();
      if (keysMap[code]) {
        const freq = parseFloat(keysMap[code]);
        const matchingButton = Array.from(pianoKeys).find(key => parseFloat(key.dataset.note) === freq);
        if (matchingButton) {
          matchingButton.style.backgroundColor = "#fff";
          matchingButton.style.color = "#000";
          matchingButton.style.transform = "none";
          matchingButton.style.boxShadow = "0 4px 0_0_#000";
        }
      }
    });

    // Inputs selectors hooks
    const sliderBpm = document.getElementById("slider-bpm");
    const labelBpm = document.getElementById("label-bpm");
    sliderBpm.addEventListener("input", (e) => {
      bpm = parseInt(e.target.value);
      labelBpm.textContent = bpm + " BPM";
    });

    const sliderCutoff = document.getElementById("slider-cutoff");
    const labelCutoff = document.getElementById("label-cutoff");
    sliderCutoff.addEventListener("input", (e) => {
      biquadFilterFreq = parseInt(e.target.value);
      labelCutoff.textContent = biquadFilterFreq + "Hz";
      if (biquadFilter) {
        biquadFilter.frequency.setValueAtTime(biquadFilterFreq, audioCtx.currentTime);
      }
    });

    const selectWave = document.getElementById("select-wave");
    selectWave.addEventListener("change", (e) => {
      waveType = e.target.value;
    });

    // Oscilloscope canvas system
    const canvas = document.getElementById("osc-canvas");
    const canvasCtx = canvas.getContext("2d");
    let analyserNode = null;

    function startOscilloscope() {
      if (!audioCtx) return;
      analyserNode = audioCtx.createAnalyser();
      analyserNode.fftSize = 254;
      biquadFilter.connect(analyserNode);

      const bufferLength = analyserNode.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      function drawOscilloscope() {
        requestAnimationFrame(drawOscilloscope);
        analyserNode.getByteTimeDomainData(dataArray);

        canvasCtx.fillStyle = "#09090c";
        canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

        canvasCtx.lineWidth = 3;
        canvasCtx.strokeStyle = "#A855F7";
        canvasCtx.beginPath();

        const sliceWidth = canvas.width / bufferLength;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const v = dataArray[i] / 128.0;
          const y = (v * canvas.height) / 2;

          if (i === 0) {
            canvasCtx.moveTo(x, y);
          } else {
            canvasCtx.lineTo(x, y);
          }
          x += sliceWidth;
        }

        canvasCtx.lineTo(canvas.width, canvas.height / 2);
        canvasCtx.stroke();
      }

      drawOscilloscope();
    }
  </script>
</body>
</html>`;
  }

  if (tag === "dados") {
    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} (Fallback)</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700&family=JetBrains+Mono&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Space Grotesk', sans-serif;
    }
    .mono {
      font-family: 'JetBrains Mono', monospace;
    }
  </style>
</head>
<body class="bg-neutral-100 text-black p-4 sm:p-6 min-h-screen flex flex-col justify-between">

  <!-- Main Grid Dashboard Container -->
  <div class="max-w-6xl w-full mx-auto flex-1 flex flex-col gap-6">
    
    <!-- Top Bar Block Branding -->
    <header class="flex flex-col md:flex-row justify-between items-stretch md:items-center bg-white border-[4px] border-black rounded-3xl p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] gap-4 select-none">
      <div class="flex items-center gap-4">
        <div class="w-14 h-14 bg-[#38B6FF] border-[3px] border-black rounded-full flex items-center justify-center text-black text-2xl font-black shadow-[2px_2px_0px_0px_#000]">
          📊
        </div>
        <div>
          <span class="px-2.5 py-0.5 bg-[#38B6FF] text-black text-[10px] font-black rounded-full border-2 border-black uppercase shadow-[1px_1.5px_0_0_#000]">
            ${tagLabel} fallback
          </span>
          <h1 class="text-2xl font-black uppercase italic leading-none mt-1 text-black">${title}</h1>
        </div>
      </div>
      
      <div class="flex items-center gap-2">
        <div class="bg-[#FF914D] border-[3px] border-black px-4 py-2 rounded-xl text-black font-mono text-xs font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          CPU REQUISITOS: LOCAL ENGINE
        </div>
        <button onclick="window.print()" class="px-4 py-2 bg-white hover:bg-neutral-100 border-[3px] border-black font-mono font-black text-xs rounded-xl shadow-[3px_3px_0_0_#000] active:translate-y-1 active:shadow-none transition-all cursor-pointer">
          EXPORTAR PDF
        </button>
      </div>
    </header>

    <!-- Notice Overlay Alert -->
    <div id="notice" class="bg-amber-100 border-[4px] border-black rounded-2xl p-4 flex items-center gap-4 shadow-[4px_4px_0_0_#000]">
      <div class="text-3xl">⚠️</div>
      <div class="flex-1">
        <span class="text-xs font-black uppercase text-[#FF5757] block">Aviso do Sistema de Compilação</span>
        <p class="text-xs font-bold font-sans text-neutral-800 leading-normal">
          Os servidores de IA estão enfrentando congestionamento temporário. Compilamos um Painel Analítico Local completo e responsivo para que você possa explorar todas as métricas detalhadas de forma instantânea!
        </p>
      </div>
      <button onclick="document.getElementById('notice').remove()" class="px-3 py-1 bg-white border-2 border-black rounded text-xs font-bold">FECHAR</button>
    </div>

    <!-- Core KPIs widgets (Row layout) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

      <!-- Box KPI 1 -->
      <div class="bg-white border-[4px] border-black p-5 rounded-3xl shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden flex flex-col justify-between">
        <div>
          <span class="mono text-[10px] font-black text-neutral-500 block uppercase">Nível Energético</span>
          <h3 class="text-2xl font-black italic uppercase text-black leading-none mt-1" id="kpi-coffee">0.0 L</h3>
        </div>
        <div class="mt-4 flex items-center justify-between">
          <span class="text-xs text-neutral-500 font-bold uppercase">Café Ingerido</span>
          <span class="px-2 py-0.5 bg-[#ebd050] border-2 border-black rounded text-[9px] font-black">STÁVEL</span>
        </div>
      </div>

      <!-- Box KPI 2 -->
      <div class="bg-white border-[4px] border-black p-5 rounded-3xl shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden flex flex-col justify-between">
        <div>
          <span class="mono text-[10px] font-black text-neutral-500 block uppercase">Foco de Trabalho</span>
          <h3 class="text-2xl font-black italic uppercase text-black leading-none mt-1" id="kpi-procrastination">35 %</h3>
        </div>
        <div class="mt-4 flex items-center justify-between">
          <span class="text-xs text-neutral-500 font-bold uppercase">Taxa de Ociosidade</span>
          <span class="px-2 py-0.5 bg-[#FF5757] text-white border-2 border-black rounded text-[9px] font-black" id="badge-procr">ALTA</span>
        </div>
      </div>

      <!-- Box KPI 3 -->
      <div class="bg-white border-[4px] border-black p-5 rounded-3xl shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden flex flex-col justify-between">
        <div>
          <span class="mono text-[10px] font-black text-neutral-500 block uppercase">Bugs Injetados / Resolvidos</span>
          <h3 class="text-2xl font-black italic uppercase text-black leading-none mt-1" id="kpi-bugs">0 / 0</h3>
        </div>
        <div class="mt-4 flex items-center justify-between">
          <span class="text-xs text-neutral-500 font-bold uppercase">Integridade Código</span>
          <span class="px-2 py-0.5 bg-[#7ED957] text-black border-2 border-black rounded text-[9px] font-black" id="badge-bugs">100% LIMPO</span>
        </div>
      </div>

      <!-- Box KPI 4 -->
      <div class="bg-white border-[4px] border-black p-5 rounded-3xl shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden flex flex-col justify-between">
        <div>
          <span class="mono text-[10px] font-black text-neutral-500 block uppercase">Epifanias Criativas</span>
          <h3 class="text-2xl font-black italic uppercase text-black leading-none mt-1" id="kpi-ideas">1 ideia</h3>
        </div>
        <div class="mt-4 flex items-center justify-between">
          <span class="text-xs text-neutral-500 font-bold uppercase">Ideias Geradas</span>
          <span class="px-2 py-0.5 bg-[#38B6FF] text-black border-2 border-black rounded text-[9px] font-black">BRILHANTE</span>
        </div>
      </div>

    </div>

    <!-- Live chart and Console Action log section -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
      
      <!-- Big SVG Chart Canvas card -->
      <div class="lg:col-span-8 bg-white border-[4px] border-black rounded-3xl p-5 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-sm font-black uppercase text-black italic">📈 GRÁFICO HISTÓRICO DE PRODUTIVIDADE (%)</h3>
          <span class="mono text-[10px] border-2 border-black bg-neutral-100 rounded px-2 py-0.5 font-bold">ATUALIZAÇÃO: AUTO (5s)</span>
        </div>
        
        <!-- Live drawing graph SVG -->
        <div class="w-full h-64 bg-neutral-50 border-2 border-black rounded-2xl relative p-2 overflow-hidden">
          <svg id="live-svg-graph" viewBox="0 0 500 240" class="w-full h-full overflow-visible"></svg>
        </div>
      </div>

      <!-- Live control buttons panel -->
      <div class="lg:col-span-4 bg-white border-[4px] border-black p-5 rounded-3xl shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
        <div>
          <h3 class="text-xs font-black uppercase border-b-2 border-black pb-1 mb-4">🎮 MODIFICADORES DE KPI</h3>
          <p class="text-xs text-neutral-600 font-bold mb-4">Clique nos testes para interferir instantaneamente nos gráficos corporativos do dashboard:</p>
          
          <div class="grid grid-cols-1 gap-2.5">
            <button id="btn-brew" class="py-2.5 px-4 bg-[#FFDE59] border-2 border-black rounded-xl text-xs font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none hover:bg-[#ebcc51] transition-all uppercase">
              ☕ Passar Café Forte (+1L)
            </button>
            <button id="btn-stress" class="py-2.5 px-4 bg-[#FF5757] text-white border-2 border-black rounded-xl text-xs font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none hover:bg-[#ff3f3f] transition-all uppercase">
              🚽 Procrastinar 10 Minutos
            </button>
            <button id="btn-bug" class="py-2.5 px-4 bg-neutral-800 text-white border-2 border-black rounded-xl text-xs font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none hover:bg-neutral-700 transition-all uppercase">
              🐛 Criar Bug Fatal de Código
            </button>
            <button id="btn-fix" class="py-2.5 px-4 bg-[#7ED957] border-2 border-black rounded-xl text-xs font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none hover:bg-[#6ec24a] transition-all uppercase">
              🛠️ Resolver Bug Pendente
            </button>
          </div>
        </div>

        <div class="pt-4 border-t-2 border-black mt-4">
          <span class="text-[10px] text-neutral-500 block leading-relaxed font-bold uppercase">Módulos descritivos:</span>
          <p class="text-[10px] text-neutral-400 mt-1">${desc}</p>
        </div>

      </div>

    </div>

    <!-- Live Event logger activity terminal -->
    <div class="bg-neutral-900 text-[#7ED957] border-[4px] border-black rounded-3xl p-5 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] font-mono">
      <div class="flex justify-between text-xs font-black text-neutral-400 border-b border-neutral-700 pb-2 mb-3">
        <span>🤖 CONSOLE LOG SYSTEM EVENTS</span>
        <span>STATUS: DIAGNÓSTICO ESTÁVEL</span>
      </div>
      <div class="space-y-1.5 text-xs select-all font-mono" id="terminal-logs">
        <div>[SYSTEM INTRO] Carregando metricas corporativas do tema: "${title}"...</div>
        <div>[CONNECTED] Integrado ao servidor local fallback. Motor de simulaço operacional.</div>
      </div>
    </div>

  </div>

  <footer class="max-w-6xl w-full mx-auto p-4 text-center text-xs text-neutral-500 font-bold mt-8">
    Métricas e modelagens estocásticas fictícias baseadas no tema "${title}".
  </footer>

  <script>
    // Variables state
    let coffeeLiters = 0.0;
    let procrastinationPercent = 35;
    let bugsCreated = 0;
    let bugsFixed = 0;
    let ideasGenerated = 1;

    let chartData = [50, 45, 60, 40, 75, 45, 60];

    // Dom bindings
    const kpiCoffee = document.getElementById("kpi-coffee");
    const kpiProcr = document.getElementById("kpi-procrastination");
    const badgeProcr = document.getElementById("badge-procr");
    const kpiBugs = document.getElementById("kpi-bugs");
    const badgeBugs = document.getElementById("badge-bugs");
    const kpiIdeas = document.getElementById("kpi-ideas");
    const terminalLogs = document.getElementById("terminal-logs");
    const liveSvgGraph = document.getElementById("live-svg-graph");

    function pushLog(message) {
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0];
      const div = document.createElement("div");
      div.className = "text-[#7ED957]";
      div.textContent = "[" + timeStr + "] " + message;
      terminalLogs.appendChild(div);
      
      // Keep only last 5 logs for styling limit
      while (terminalLogs.children.length > 6) {
        terminalLogs.children[0].remove();
      }
    }

    // SVG Drawing line chart logic
    function drawLiveGraph() {
      liveSvgGraph.innerHTML = "";
      
      const width = 500;
      const height = 240;
      const padding = 20;
      
      // Calculate coordinates
      let pointsStr = "";
      const stepX = (width - padding * 2) / (chartData.length - 1);
      
      chartData.forEach((val, idx) => {
        const x = padding + idx * stepX;
        // Mapping val (0-100) to svg height coordinate from bottom up
        const y = height - padding - (val / 100) * (height - padding * 2);
        pointsStr += x + "," + y + " ";

        // Draw dot circles
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", x.toString());
        circle.setAttribute("cy", y.toString());
        circle.setAttribute("r", "4.5");
        circle.setAttribute("fill", "#FF4D6D");
        circle.setAttribute("stroke", "#000");
        circle.setAttribute("stroke-width", "2");
        liveSvgGraph.appendChild(circle);

        // Draw text indicators
        const textVal = document.createElementNS("http://www.w3.org/2000/svg", "text");
        textVal.setAttribute("x", (x - 8).toString());
        textVal.setAttribute("y", (y - 8).toString());
        textVal.style.fontSize = "9px";
        textVal.style.fontWeight = "bold";
        textVal.style.fontFamily = "monospace";
        textVal.textContent = val + "%";
        liveSvgGraph.appendChild(textVal);
      });

      // Draw primary spline
      const polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
      polyline.setAttribute("points", pointsStr.trim());
      polyline.setAttribute("fill", "none");
      polyline.setAttribute("stroke", "#38B6FF");
      polyline.setAttribute("stroke-width", "4.5");
      polyline.setAttribute("stroke-linecap", "round");
      polyline.setAttribute("stroke-linejoin", "round");
      liveSvgGraph.insertBefore(polyline, liveSvgGraph.firstChild);
    }

    // Simulation updates on buttons triggers:
    document.getElementById("btn-brew").addEventListener("click", () => {
      coffeeLiters += 1.0;
      procrastinationPercent = Math.max(0, procrastinationPercent - 15);
      chartData.push(Math.min(100, chartData[chartData.length - 1] + 15));
      chartData.shift();

      kpiCoffee.textContent = coffeeLiters.toFixed(1) + " L";
      updateStateWidgets();
      drawLiveGraph();
      pushLog("Espresso super forte preparado! cafeína em alta. Produtividade subiu (+15%)");
    });

    document.getElementById("btn-stress").addEventListener("click", () => {
      procrastinationPercent = Math.min(100, procrastinationPercent + 25);
      chartData.push(Math.max(0, chartData[chartData.length - 1] - 20));
      chartData.shift();

      updateStateWidgets();
      drawLiveGraph();
      pushLog("Usuário deitou na cadeira para assistir compilado de gatos fofos. Procrastinaço disparada (+25%)");
    });

    document.getElementById("btn-bug").addEventListener("click", () => {
      bugsCreated += 1;
      procrastinationPercent = Math.min(100, procrastinationPercent + 10);
      chartData.push(Math.max(0, chartData[chartData.length - 1] - 15));
      chartData.shift();

      kpiBugs.textContent = bugsCreated + " / " + bugsFixed;
      updateStateWidgets();
      drawLiveGraph();
      pushLog("Criou um bug sinistro de NullPointerException no console de produço!");
    });

    document.getElementById("btn-fix").addEventListener("click", () => {
      if (bugsCreated > bugsFixed) {
        bugsFixed += 1;
        procrastinationPercent = Math.max(0, procrastinationPercent - 10);
        chartData.push(Math.min(100, chartData[chartData.length - 1] + 18));
        chartData.shift();
        
        // Random idea pop when bugs fixed successfully!
        if (Math.random() > 0.5) {
          ideasGenerated += 1;
          kpiIdeas.textContent = ideasGenerated + " ideias";
          pushLog("Sucesso! Epifania criativa! Uma ideia magnífica de site acaba de nascer.");
        }

        kpiBugs.textContent = bugsCreated + " / " + bugsFixed;
        updateStateWidgets();
        drawLiveGraph();
        pushLog("Nós de debug executados com orgulho, bug consertado no servidor (+18% produtividade)");
      } else {
        pushLog("Nenhum bug ativo para corrigir! Continue se preocupando com procrastinação.");
      }
    });

    function updateStateWidgets() {
      // Procrastination badge coloring
      kpiProcr.textContent = procrastinationPercent + " %";
      if (procrastinationPercent > 70) {
        badgeProcr.style.backgroundColor = "#FF5757";
        badgeProcr.textContent = "CRÍTICO";
      } else if (procrastinationPercent > 35) {
        badgeProcr.style.backgroundColor = "#ebd050";
        badgeProcr.textContent = "OCUPADO";
      } else {
        badgeProcr.style.backgroundColor = "#7ED957";
        badgeProcr.textContent = "ALERTA";
      }

      // Code integrity status badge
      const activeBugs = bugsCreated - bugsFixed;
      if (activeBugs > 2) {
        badgeBugs.style.backgroundColor = "#FF5757";
        badgeBugs.style.color = "#fff";
        badgeBugs.textContent = "COLAPSO IMINENTE";
      } else if (activeBugs > 0) {
        badgeBugs.style.backgroundColor = "#ebd050";
        badgeBugs.style.color = "#000";
        badgeBugs.textContent = activeBugs + " BUGS PENDENTES";
      } else {
        badgeBugs.style.backgroundColor = "#7ED957";
        badgeBugs.style.color = "#000";
        badgeBugs.textContent = "CÓDIGO INTACTO";
      }
    }

    // Automated periodic stocastic fluctuation spikes (keeps graph alive!)
    setInterval(() => {
      const activeBugs = bugsCreated - bugsFixed;
      const fluctuation = Math.floor(Math.random() * 11) - 5; // -5 to 5
      let nextVal = chartData[chartData.length - 1] + fluctuation;
      
      // Gravity drag down depending on active bugs
      if (activeBugs > 0) nextVal -= activeBugs * 2;
      
      nextVal = Math.max(5, Math.min(98, nextVal));
      chartData.push(nextVal);
      chartData.shift();
      drawLiveGraph();
    }, 5000);

    drawLiveGraph();
    updateStateWidgets();
  </script>
</body>
</html>`;
  }

  if (tag === "interativo") {
    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} (Fallback)</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700&family=JetBrains+Mono&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Space Grotesk', sans-serif;
    }
    .mono {
      font-family: 'JetBrains Mono', monospace;
    }
  </style>
</head>
<body class="bg-[#13131c] text-white relative min-h-screen overflow-hidden select-none">

  <!-- Interactive physics sandbox stages -->
  <canvas id="gravity-canvas" class="absolute inset-0 z-0 block"></canvas>

  <div class="absolute inset-0 z-10 p-6 flex flex-col justify-between pointer-events-none select-none">
    
    <!-- Header -->
    <header class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 w-full bg-[#181827]/90 border-4 border-black p-4 rounded-3xl shadow-[5px_5px_0px_0px_#000] pointer-events-auto">
      <div class="flex items-center gap-3">
        <span class="px-3.5 py-1 bg-[#5271FF] text-white text-xs font-black rounded-full border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] uppercase">
          ${tagLabel}
        </span>
        <h1 class="text-xl sm:text-2xl font-black uppercase italic tracking-tight text-white">${title}</h1>
      </div>
      <div class="mono text-xs bg-white/10 border-2 border-black text-neutral-300 font-bold px-3 py-1.5 rounded-xl uppercase">
        MODELO FÍSICO ESTOCÁSTICO EM EXECUÇÃO
      </div>
    </header>

    <!-- Overlay Alert -->
    <div id="notice" class="max-w-md mx-auto my-auto bg-neutral-900 border-4 border-black p-6 rounded-3xl text-center shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] pointer-events-auto">
      <div class="text-3xl">🧩</div>
      <h2 class="text-base font-black text-[#5271FF] uppercase mb-1 mt-1">EMERGÊNCIA DE COMUNICAÇÃO DE CLOUD</h2>
      <p class="text-xs text-neutral-300 leading-normal mb-4">
        As conexões com a API de IA estão com tempo limite estendido devido a picos mundiais de requisições. Compilamos um Simulador Gravitacional Vetorial completo com renderização física de alto desempenho no seu cliente!
      </p>
      <button onclick="document.getElementById('notice').remove()" class="w-full py-2 bg-[#5271FF] text-white font-black text-xs rounded-xl border-2 border-black shadow-[2px_2px_0_0_#000] hover:translate-y-0.5 active:translate-y-1 transition-all">
        MUDAR ÓRBITAS DOS PLANETAS ➜
      </button>
    </div>

    <!-- Bottom Controls and descriptor lists -->
    <footer class="flex flex-col md:flex-row justify-between items-stretch md:items-end gap-5 pointer-events-auto w-full">
      
      <!-- Descriptions card -->
      <div class="bg-[#181827]/95 border-4 border-black p-5 rounded-3xl max-w-sm shadow-[5px_5px_0_0_#000]">
        <h3 class="text-xs font-black text-[#5271FF] uppercase mb-1">SOBRE O PROJETO</h3>
        <p class="text-xs text-neutral-300 leading-relaxed mb-3">${desc}</p>
        <ul class="text-[11px] text-neutral-400 font-bold space-y-1">
          ${featuresList}
        </ul>
      </div>

      <!-- Control Settings Panel -->
      <div class="bg-white text-black border-4 border-black p-5 rounded-3xl w-full md:w-80 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        <h3 class="text-xs font-black uppercase border-b-2 border-black pb-1 mb-3">🌌 VETORES DE GRAVIDADE</h3>
        
        <div class="space-y-3">
          <div>
            <div class="flex justify-between text-[11px] font-black">
              <label>FORÇA GRAVITACIONAL G</label>
              <span id="label-gravity">G = 0.50</span>
            </div>
            <input id="slider-gravity" type="range" min="0.1" max="2.0" step="0.1" value="0.5" class="w-full accent-[#5271FF]">
          </div>

          <div>
            <div class="flex justify-between text-[11px] font-black">
              <label>DURAÇÃO DOS RASTROS</label>
              <span id="label-fade">Alta</span>
            </div>
            <input id="slider-fade" type="range" min="0.01" max="0.30" step="0.01" value="0.08" class="w-full accent-[#5271FF]">
          </div>

          <div class="flex gap-2 font-black pt-1">
            <button id="btn-pause" class="flex-1 py-1.5 bg-[#FFDE59] text-black text-xs rounded border-2 border-black shadow-[2px_2px_0px_0px_#000] active:translate-y-[1px] active:shadow-none uppercase">
              PAUSAR CONGELAR
            </button>
            <button id="btn-clear" class="flex-1 py-1.5 bg-[#FF5757] text-white text-xs rounded border-2 border-black shadow-[2px_2px_0px_0px_#000] active:translate-y-[1px] active:shadow-none uppercase">
              DESTRUIR ATOMS
            </button>
          </div>
        </div>

        <div class="pt-4 border-t-2 border-black mt-3 text-[9px] text-neutral-500 uppercase leading-normal font-bold">
          <span>Dica: Duplo clique para plantar nós magnéticos pretos de gravidade no vácuo espacial! Arraste e solte o mouse para arremessar meteoros.</span>
        </div>
      </div>

    </footer>

  </div>

  <script>
    const canvas = document.getElementById("gravity-canvas");
    const ctx = canvas.getContext("2d");

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Simulation parameters
    let G_constant = 0.5;
    let fadeCoefficient = 0.08;
    let isSimulationPaused = false;

    let particles = [];
    let attractors = [];

    // Mouse drag launching state
    const dragCoords = {
      isDragging: false,
      startX: 0,
      startY: 0,
      currentX: 0,
      currentY: 0
    };

    window.addEventListener("resize", () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    });

    // Start drag fling to insert particles
    window.addEventListener("mousedown", (e) => {
      // Guard elements clicking bypass
      if (e.target.tagName === "BUTTON" || e.target.tagName === "INPUT" || e.target.tagName === "SELECT" || e.target.closest("header") || e.target.closest("footer") || e.target.closest("#notice")) return;

      dragCoords.isDragging = true;
      dragCoords.startX = e.clientX;
      dragCoords.startY = e.clientY;
      dragCoords.currentX = e.clientX;
      dragCoords.currentY = e.clientY;
    });

    window.addEventListener("mousemove", (e) => {
      if (dragCoords.isDragging) {
        dragCoords.currentX = e.clientX;
        dragCoords.currentY = e.clientY;
      }
    });

    window.addEventListener("mouseup", (e) => {
      if (dragCoords.isDragging) {
        dragCoords.isDragging = false;
        
        const deltaX = dragCoords.startX - dragCoords.currentX;
        const deltaY = dragCoords.startY - dragCoords.currentY;
        
        // Spawn cluster of star particles flung with the drag velocity vector
        const count = Math.floor(Math.random() * 25) + 15;
        for (let i = 0; i < count; i++) {
          const spreadX = (Math.random() * 16 - 8);
          const spreadY = (Math.random() * 16 - 8);
          
          particles.push({
            x: dragCoords.startX + spreadX,
            y: dragCoords.startY + spreadY,
            vx: deltaX * 0.08 + (Math.random() * 1.5 - 0.75),
            vy: deltaY * 0.08 + (Math.random() * 1.5 - 0.75),
            color: "hsl(" + (Math.floor(Math.random() * 60) + 200) + ", 100%, 75%)",
            size: Math.random() * 2.5 + 1.2,
            life: 1.0,
            decay: Math.random() * 0.003 + 0.0015
          });
        }
      }
    });

    // Double click to plant heavy cosmic attractors
    window.addEventListener("dblclick", (e) => {
      if (e.target.tagName === "BUTTON" || e.target.tagName === "INPUT" || e.target.tagName === "SELECT") return;

      attractors.push({
        x: e.clientX,
        y: e.clientY,
        mass: Math.random() * 500 + 400,
        radius: 12
      });
    });

    // Seed 2 default heavy attractors at center
    function seedAttractors() {
      attractors = [
        { x: width * 0.35, y: height * 0.45, mass: 600, radius: 14 },
        { x: width * 0.65, y: height * 0.55, mass: 600, radius: 14 }
      ];

      // Spawn initial orbit stars
      for (let i = 0; i < 90; i++) {
        const theta = Math.random() * Math.PI * 2;
        const radius = Math.random() * 160 + 80;
        const spawnX = width * 0.5 + Math.cos(theta) * radius;
        const spawnY = height * 0.5 + Math.sin(theta) * radius;
        
        // Orbit speed projection
        const orbitalSpeed = Math.sqrt((G_constant * 600) / radius) * 1.3;
        particles.push({
          x: spawnX,
          y: spawnY,
          vx: -Math.sin(theta) * orbitalSpeed + (Math.random() * 0.4 - 0.2),
          vy: Math.cos(theta) * orbitalSpeed + (Math.random() * 0.4 - 0.2),
          color: "hsl(" + (Math.floor(Math.random() * 60) + 180) + ", 100%, 70%)",
          size: Math.random() * 2.5 + 1.0,
          life: 1.0,
          decay: Math.random() * 0.0015 + 0.0005
        });
      }
    }

    function animate() {
      // Space void repaint for trail effect
      ctx.fillStyle = "rgba(19, 19, 28, " + fadeCoefficient + ")";
      ctx.fillRect(0, 0, width, height);

      // Draw gravity preview slingshot rubber line
      if (dragCoords.isDragging) {
        ctx.save();
        ctx.strokeStyle = "#5271FF";
        ctx.lineWidth = 3;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(dragCoords.startX, dragCoords.startY);
        ctx.lineTo(dragCoords.currentX, dragCoords.currentY);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(dragCoords.startX, dragCoords.startY, 8, 0, Math.PI * 2);
        ctx.fillStyle = "#FF5757";
        ctx.fill();
        ctx.restore();
      }

      // Render heavy attractors
      attractors.forEach(node => {
        ctx.save();
        
        // Aura pulse glow rings
        const pulse = Math.sin(Date.now() * 0.005) * 4 + node.radius;
        ctx.beginPath();
        ctx.arc(node.x, node.y, pulse * 1.8, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(82, 113, 255, 0.22)";
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#000";
        ctx.strokeStyle = "#5271FF";
        ctx.lineWidth = 4.5;
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      });

      // Update and draw active orbiting particles
      if (!isSimulationPaused) {
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];

          // Newtonian forces summing from each attractor
          attractors.forEach(node => {
            const dx = node.x - p.x;
            const dy = node.y - p.y;
            const distSq = dx * dx + dy * dy;
            const distance = Math.sqrt(distSq);

            if (distance > 15) {
              // F = G * m1 * m2 / r^2
              const forceMagnitude = (G_constant * node.mass) / distSq;
              p.vx += (dx / distance) * forceMagnitude;
              p.vy += (dy / distance) * forceMagnitude;
            } else {
              // Absorption trigger
              p.life = 0;
            }
          });

          // Move
          p.x += p.vx;
          p.y += p.vy;

          // Out of bounds check
          if (p.x < -100 || p.x > width + 100 || p.y < -100 || p.y > height + 100) {
            p.life = 0;
          }

          // Render orbital dots
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
        }

        // Clean exploded or dead particles
        particles = particles.filter(p => p.life > 0);
      } else {
        // Draw inactive static particles
        particles.forEach(p => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
        });
      }

      requestAnimationFrame(animate);
    }

    // Connect slider inputs
    const sliderGravity = document.getElementById("slider-gravity");
    const labelGravity = document.getElementById("label-gravity");
    sliderGravity.addEventListener("input", (e) => {
      G_constant = parseFloat(e.target.value);
      labelGravity.textContent = "G = " + G_constant.toFixed(2);
    });

    const sliderFade = document.getElementById("slider-fade");
    const labelFade = document.getElementById("label-fade");
    sliderFade.addEventListener("input", (e) => {
      fadeCoefficient = parseFloat(e.target.value);
      labelFade.textContent = fadeCoefficient < 0.05 ? "Longo" : fadeCoefficient < 0.15 ? "Normal" : "Curto";
    });

    const btnPause = document.getElementById("btn-pause");
    btnPause.addEventListener("click", () => {
      isSimulationPaused = !isSimulationPaused;
      btnPause.textContent = isSimulationPaused ? "RETOMAR FLUXO" : "PAUSAR CONGELAR";
      btnPause.style.backgroundColor = isSimulationPaused ? "#7ED957" : "#FFDE59";
    });

    document.getElementById("btn-clear").addEventListener("click", () => {
      particles = [];
      attractors = [];
    });

    seedAttractors();
    animate();
  </script>
</body>
</html>`;
  }

  // Default fallback visual representation in HTML if anything falls outside
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
</head>
<body style="background:#111; color:#fff; font-family:sans-serif; text-align:center; padding:50px;">
  <h1>${title}</h1>
  <p>${desc}</p>
</body>
</html>`;
}

export function getFallbackImprovedHTML(originalCode: string, idea: any, improvementPrompt: string): string {
  const title = idea?.title || "Portal Criativo";

  const fallbackWidgetHtml = `
  <!-- ==================== LOCAL FALLBACK IMPROVEMENT WIDGET ==================== -->
  <div id="local-improvement-widget" style="position: fixed; bottom: 20px; right: 20px; z-index: 10000; font-family: 'Space Grotesk', system-ui, sans-serif; max-width: 320px; background: #fff; color: #000; border: 4px solid #000; border-radius: 20px; padding: 16px; box-shadow: 6px 6px 0px 0px #000; pointer-events: auto; text-align: left; animation: slideInUp 0.5s ease-out;">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
      <span style="background: #A855F7; color: #fff; border: 2px solid #000; font-size: 9px; font-weight: 900; padding: 2px 8px; border-radius: 10px; font-family: monospace; letter-spacing: 1px;">
        ✦ LOCAL UPGRADE
      </span>
      <button onclick="document.getElementById('local-improvement-widget').style.display='none'" style="cursor: pointer; background: #FF5757; color: #fff; border: 2px solid #000; font-weight: 900; width: 24px; height: 24px; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 11px; box-shadow: 2px 2px 0px #000; transform: translateY(0); transition: 0.1s;" onmousedown="this.style.transform='translateY(2px)'; this.style.boxShadow='none'" onmouseup="this.style.transform='translateY(0)'; this.style.boxShadow='2px 2px 0px #000'">X</button>
    </div>
    
    <h4 style="margin: 0 0 4px 0; font-size: 14px; font-weight: 900; text-transform: uppercase; font-style: italic; letter-spacing: -0.5px;">
      Portal Aprimorado!
    </h4>
    <p style="margin: 0 0 12px 0; font-size: 11px; font-weight: bold; color: #666; line-height: 1.3;">
      Atendendo à sugestão: <span style="color: #5271FF; text-decoration: underline;">"${improvementPrompt}"</span> via Motor de Contingência Local.
    </p>

    <!-- Interactive Features -->
    <div style="border-top: 2px solid #000; padding-top: 8px; font-size: 11px; display: flex; flex-direction: column; gap: 8px;">
      
      <!-- Palette Changer -->
      <div>
        <div style="font-weight: 900; margin-bottom: 4px; font-family: monospace; text-transform: uppercase;">🚀 Alternador de Cor Atmosférica</div>
        <div style="display: flex; gap: 4px;">
          <button onclick="changeFallbackTheme('#FF1493', '#111')" style="cursor: pointer; padding: 4px 6px; font-size: 9px; font-weight: 900; background: #FF1493; color: white; border: 2px solid #000; border-radius: 6px; box-shadow: 1px 1.5px 0px #000;">NEON</button>
          <button onclick="changeFallbackTheme('#8A2BE2', '#FF4500')" style="cursor: pointer; padding: 4px 6px; font-size: 9px; font-weight: 900; background: #8A2BE2; color: white; border: 2px solid #000; border-radius: 6px; box-shadow: 1px 1.5px 0px #000;">CYBER</button>
          <button onclick="changeFallbackTheme('#00FF00', '#111')" style="cursor: pointer; padding: 4px 6px; font-size: 9px; font-weight: 900; background: #00FF00; color: black; border: 2px solid #000; border-radius: 6px; box-shadow: 1px 1.5px 0px #000;">MATRIX</button>
          <button onclick="changeFallbackTheme('#FFD700', '#FF4D6D')" style="cursor: pointer; padding: 4px 6px; font-size: 9px; font-weight: 900; background: #FFD700; color: black; border: 2px solid #000; border-radius: 6px; box-shadow: 1px 1.5px 0px #000;">SOLAR</button>
        </div>
      </div>

      <!-- Synth trigger sound FX (Web Audio API) -->
      <div>
        <div style="font-weight: 900; margin-bottom: 4px; font-family: monospace; text-transform: uppercase;">🔊 Disparador Sonoro de Sintonia</div>
        <button onclick="playLocalSynthBeep()" style="cursor: pointer; width: 100%; padding: 6px; font-weight: 900; background: #7ED957; text-transform: uppercase; border: 2px solid #000; border-radius: 10px; box-shadow: 2px 2.5px 0px #000; font-size: 10px;" onmousedown="this.style.transform='translateY(1.5px)'; this.style.boxShadow='none'" onmouseup="this.style.transform='translateY(0)'; this.style.boxShadow='2px 2.5px 0px #000'">
          Emitir Onda Quântica ♪
        </button>
      </div>

      <!-- Live Speed Control -->
      <div>
        <div style="display: flex; justify-content: space-between; font-weight: 900; font-family: monospace;">
          <span>⚡ FLUXO MULTIPLICADOR</span>
          <span id="local-spd-label">1.5x</span>
        </div>
        <input type="range" min="0.5" max="4.0" step="0.1" value="1.5" style="width: 100%; accent-color: #5271FF;" oninput="adjustLocalFluxSpeed(this.value)">
      </div>

    </div>
  </div>

  <style>
    @keyframes slideInUp {
      from { transform: translateY(100px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
  </style>

  <script>
    // Local fallback Audio synthesizer
    let localAudioCtx = null;
    function playLocalSynthBeep() {
      try {
        if (!localAudioCtx) {
          localAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (localAudioCtx.state === 'suspended') {
          localAudioCtx.resume();
        }
        const osc = localAudioCtx.createOscillator();
        const gain = localAudioCtx.createGain();
        
        const notes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25];
        const randomNote = notes[Math.floor(Math.random() * notes.length)];
        
        const types = ['sine', 'triangle', 'sawtooth'];
        osc.type = types[Math.floor(Math.random() * types.length)];
        osc.frequency.value = randomNote;
        
        gain.gain.setValueAtTime(0.2, localAudioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, localAudioCtx.currentTime + 0.6);
        
        osc.connect(gain);
        gain.connect(localAudioCtx.destination);
        osc.start();
        osc.stop(localAudioCtx.currentTime + 0.6);
      } catch (e) {
        console.warn('Audio local fallback error:', e);
      }
    }

    // Dynamic color atmospheric modifications
    function changeFallbackTheme(primaryColor, secondaryColor) {
      document.body.style.backgroundColor = secondaryColor === '#111' ? '#111' : 'rgba(10, 10, 15, 0.9)';
      
      if (typeof activeColorMode !== 'undefined') {
        activeColorMode = 0; 
        if (typeof colorPalettes !== 'undefined' && colorPalettes[0]) {
          colorPalettes[0].particles = [primaryColor, secondaryColor, '#FFF'];
          colorPalettes[0].start = primaryColor;
          colorPalettes[0].end = secondaryColor;
        }
        if (typeof init === 'function') init();
      } else {
        const targetElements = document.querySelectorAll('header, footer, div');
        targetElements.forEach(el => {
          if (el.style.borderColor) el.style.borderColor = primaryColor;
          if (el.style.shadowColor) el.style.shadowColor = primaryColor;
        });
      }
    }

    // Speed multiplier adjusting
    function adjustLocalFluxSpeed(value) {
      document.getElementById('local-spd-label').textContent = parseFloat(value).toFixed(1) + 'x';
      if (typeof speedModifier !== 'undefined') {
        speedModifier = parseFloat(value);
      } else if (typeof speedCoefficient !== 'undefined') {
        speedCoefficient = parseFloat(value) * 0.05;
      }
    }
  </script>
  <!-- ==================== END LOCAL FALLBACK IMPROVEMENT WIDGET ==================== -->
  `;

  // Inject right before </body> or append
  if (originalCode.includes("</body>")) {
    return originalCode.replace("</body>", `${fallbackWidgetHtml}\n</body>`);
  } else {
    return `${originalCode}\n${fallbackWidgetHtml}`;
  }
}
