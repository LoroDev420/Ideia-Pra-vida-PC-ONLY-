import { useEffect, useState } from "react";
import { Idea, ApiStatus } from "./types";
import { SEED_IDEAS } from "./data";
import Header from "./components/Header";
import ApiKeyBar from "./components/ApiKeyBar";
import IdeasGrid from "./components/IdeasGrid";
import IdeaModal from "./components/IdeaModal";
import BuildOverlay from "./components/BuildOverlay";
import CartoonCursor from "./components/CartoonCursor";
import { FileDown, ExternalLink, Sparkles, X, Wand2 } from "lucide-react";
import { playCartoonClick, playBoing, playSuccessChime, playErrorBuzz, playAchievementUnlock } from "./utils/audio";
import AchievementsPanel from "./components/AchievementsPanel";
import { getSavedProgress, saveProgress, ACHIEVEMENTS, UserProgress } from "./utils/achievements";
import ImproveModal from "./components/ImproveModal";
import CartoonTutorial from "./components/CartoonTutorial";

export default function App() {
  // Achievements State & Queue
  const [progress, setProgress] = useState<UserProgress>(() => getSavedProgress());
  const [unlockedQueue, setUnlockedQueue] = useState<string[]>([]);

  const triggerProgress = (category: 'clicks' | 'themes' | 'searches' | 'locks' | 'builds', payload?: any) => {
    setProgress((prev) => {
      const updated = { ...prev };
      
      if (category === "clicks") {
        const ideaId = payload as number;
        if (!updated.clickedIds.includes(ideaId)) {
          updated.clickedIds = [...updated.clickedIds, ideaId];
          updated.clicks = updated.clickedIds.length;
        }
      } else {
        updated[category] = (updated[category] || 0) + 1;
      }

      // Identify newly unlocked achievements
      const newlyUnlocked: string[] = [];
      ACHIEVEMENTS.forEach((ach) => {
        if (!updated.unlockedList.includes(ach.id)) {
          let currentVal = 0;
          if (ach.category === "clicks") currentVal = updated.clicks;
          if (ach.category === "themes") currentVal = updated.themes;
          if (ach.category === "searches") currentVal = updated.searches;
          if (ach.category === "locks") currentVal = updated.locks;
          if (ach.category === "builds") currentVal = updated.builds;

          if (currentVal >= ach.target) {
            updated.unlockedList = [...updated.unlockedList, ach.id];
            newlyUnlocked.push(ach.id);
          }
        }
      });

      if (newlyUnlocked.length > 0) {
        setUnlockedQueue((prevQueue) => [...prevQueue, ...newlyUnlocked]);
      }

      saveProgress(updated);
      return updated;
    });
  };

  const handleResetProgress = () => {
    const fresh: UserProgress = {
      clicks: 0,
      themes: 0,
      searches: 0,
      locks: 0,
      builds: 0,
      unlockedList: [],
      clickedIds: []
    };
    setProgress(fresh);
    saveProgress(fresh);
    setUnlockedQueue([]);
    triggerToast("Progresso de conquistas resetado!");
  };

  const handleDismissNotification = (id: string) => {
    setUnlockedQueue((prev) => prev.filter(item => item !== id));
  };

  // Core states
  const [apiStatus, setApiStatus] = useState<ApiStatus | null>(null);
  const [loadingApi, setLoadingApi] = useState(true);
  const [simulateNoKey, setSimulateNoKey] = useState(false);

  // Global Theme Mode State
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const localValue = localStorage.getItem("ideas_ai_theme");
      return localValue === "dark";
    } catch {
      return false;
    }
  });

  // Ideas generator states
  const [ideas, setIdeas] = useState<Idea[]>(SEED_IDEAS);
  const [loadingIdeas, setLoadingIdeas] = useState(false);

  // Modals & overlay states
  const [activeModalIdea, setActiveModalIdea] = useState<Idea | null>(null);
  const [buildingSite, setBuildingSite] = useState(false);
  const [buildReady, setBuildReady] = useState(false);
  const [activeBuildIdea, setActiveBuildIdea] = useState<Idea | null>(null);
  const [isAchievementsOpen, setIsAchievementsOpen] = useState(false);
  const [isImproveModalOpen, setIsImproveModalOpen] = useState(false);
  const [improvingSite, setImprovingSite] = useState(false);
  const [isTutorialActive, setIsTutorialActive] = useState(false);

  // Successful site build result
  const [buildResult, setBuildResult] = useState<{
    title: string;
    code: string;
    url: string;
  } | null>(null);

  const [temporalBuildResult, setTemporalBuildResult] = useState<{
    title: string;
    code: string;
    url: string;
    fallback?: boolean;
    isQuotaError?: boolean;
  } | null>(null);

  // Custom Toast State
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Alert/Toast trigger helper
  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg((prev) => (prev === msg ? null : prev));
    }, 4500);
  };

  // Easter Egg: Click Cartoon Mouse 10 times quickly to trigger Click Click Boom!
  const [clickCount, setClickCount] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);

  useEffect(() => {
    const handleGlobalClick = () => {
      const now = Date.now();
      const isFast = now - lastClickTime < 450; // generous 450ms window
      
      setLastClickTime(now);

      setClickCount((prev) => {
        const nextVal = isFast ? prev + 1 : 1;
        
        setProgress((curr) => {
          if (curr.unlockedList.includes("click_click_boom")) {
            return curr;
          }
          
          const maxFast = Math.max(curr.fastClicks || 0, nextVal);
          const updated = {
            ...curr,
            fastClicks: maxFast
          };

          if (nextVal >= 10) {
            updated.unlockedList = [...updated.unlockedList, "click_click_boom"];
            setUnlockedQueue((prevQueue) => {
              if (!prevQueue.includes("click_click_boom")) {
                return [...prevQueue, "click_click_boom"];
              }
              return prevQueue;
            });
            triggerToast("💣 EASTER EGG ATIVADO: CLICK CLICK BOOM! 💥");
          }

          saveProgress(updated);
          return updated;
        });

        if (nextVal >= 10) {
          return 0;
        }
        return nextVal;
      });
    };

    window.addEventListener("mousedown", handleGlobalClick);
    return () => window.removeEventListener("mousedown", handleGlobalClick);
  }, [lastClickTime]);

  const handleToggleTheme = () => {
    playBoing(); // Cartoon Boing Sound on Theme Transition!
    triggerProgress("themes");
    setDarkMode((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("ideas_ai_theme", next ? "dark" : "light");
      } catch (e) {
        console.error(e);
      }
      return next;
    });
  };

  const handleResetAppAll = () => {
    playErrorBuzz();
    const confirmed = window.confirm(
      "Aviso Cartoon: Isso irá resetar e deletar de vez todo o seu progresso, conquistas secretas obtidas e preferências de tema! Deseja continuar?"
    );
    if (confirmed) {
      playBoing();
      try {
        localStorage.clear();
      } catch (e) {
        console.error(e);
      }
      // Brief delay to let audio play if supported, then reload
      setTimeout(() => {
        window.location.reload();
      }, 300);
    }
  };

  // 1. Check AI Key status from Express endpoint automatically
  const checkApiStatus = async () => {
    setLoadingApi(true);
    try {
      const response = await fetch("/api/ai-status");
      if (!response.ok) {
        throw new Error("Erro na conexão com o servidor de status.");
      }
      const data = await response.json();
      setApiStatus(data);
    } catch (error) {
      console.error(error);
      setApiStatus({
        hasKey: false,
        automatic: false,
        modelUsed: "gemini-3.5-flash",
        message: "Erro de rede ao buscar status da API Key."
      });
      triggerToast("Não foi possível alcançar o servidor para escanear a API.");
    } finally {
      setLoadingApi(false);
    }
  };

  useEffect(() => {
    checkApiStatus();
  }, []);

  // 2. Generate custom ideas via Gemini endpoint
  const handleGenerateIdeas = async (theme: string) => {
    if (simulateNoKey || (apiStatus && !apiStatus.hasKey)) {
      playErrorBuzz();
      triggerProgress("locks");
      triggerToast("Erro: Conexão bloqueada! Por favor, desligue o modo de simulação.");
      return;
    }

    triggerProgress("searches");
    setLoadingIdeas(true);
    triggerToast("Invocando o Gemini para conceber novas ideias...");

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6 * 60 * 1000);

      const response = await fetch("/api/generate-ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ theme, simulateNoKey }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || "Falha do servidor de IA ao conceber as ideias.");
      }

      const data = await response.json();
      if (data.ideas && Array.isArray(data.ideas)) {
        // Map clean sequential IDs
        const mapped: Idea[] = data.ideas.map((item: any, index: number) => ({
          ...item,
          id: index + 1,
        }));
        setIdeas(mapped);
        if (data.fallback) {
          triggerToast("✦ Ideias geradas com sucesso pelo Motor Criativo de Contingência!");
        } else {
          triggerToast("✦ Novas ideias geradas brilhantemente!");
        }
      } else {
        throw new Error("Formato de ideias inválido recebido.");
      }
    } catch (error: any) {
      console.error(error);
      triggerToast(error.message || "Erro de geração. Mantivemos a lista original.");
    } finally {
      setLoadingIdeas(false);
    }
  };

  // 3. Compile complete standalone HTML code
  const handleBuildSite = async (idea: Idea) => {
    if (simulateNoKey || (apiStatus && !apiStatus.hasKey)) {
      playErrorBuzz();
      triggerProgress("locks");
      triggerToast("Operação bloqueada! Chave de IA ausente ou simulada.");
      return;
    }

    setActiveModalIdea(null); // Close description modal
    setBuildingSite(true);
    setBuildReady(false);
    setActiveBuildIdea(idea);
    setBuildResult(null);
    setTemporalBuildResult(null);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6 * 60 * 1000); // 6 minutes max

      const response = await fetch("/api/build-site", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea, simulateNoKey }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || "Limite ou falha na compilação do site.");
      }

      const data = await response.json();
      if (!data.code) {
        throw new Error("O código recebido do motor criativo está vazio.");
      }

      // Create downloadable local Blob object URL
      const blob = new Blob([data.code], { type: "text/html" });
      const createdUrl = URL.createObjectURL(blob);

      setTemporalBuildResult({
        title: idea.title,
        code: data.code,
        url: createdUrl,
        fallback: data.fallback,
        isQuotaError: data.isQuotaError,
      });

      setBuildReady(true); // Signal the overlay to accelerate and finish to 100%

    } catch (error: any) {
      console.error(error);
      triggerToast(`Erro na compilação: ${error.message || "tente novamente."}`);
      setBuildingSite(false);
      setBuildReady(false);
    }
  };

  // Handler invoked when build animation finishes at 100%
  const handleBuildOverlayComplete = () => {
    if (temporalBuildResult) {
      playSuccessChime(); // Play retro success chime!
      triggerProgress("builds");
      setBuildResult({
        title: temporalBuildResult.title,
        code: temporalBuildResult.code,
        url: temporalBuildResult.url,
      });

      if (temporalBuildResult.fallback) {
        if (temporalBuildResult.isQuotaError) {
          triggerToast("⚠️ Cota gratuita de IA excedida (Código 429)! Compilamos o portal com o Motor Local Inteligente.");
        } else {
          triggerToast("🌌 Portal compilado com sucesso via Motor de Contingência Local!");
        }
      } else {
        triggerToast("🌌 Portal construído com sucesso!");
      }

      // Try automatic launch (popup block helper)
      const newWin = window.open(temporalBuildResult.url, "_blank");
      if (!newWin) {
        triggerToast("Popup bloqueado! Use o card de resultados para baixar ou abrir.");
      }
    }
    setBuildingSite(false);
    setBuildReady(false);
  };

  // 4. Improve/Edit/Add details to existing fully built page
  const handleImproveSite = async (improvementPrompt: string) => {
    if (!buildResult || !activeBuildIdea) {
      triggerToast("Nenhum portal foi gerado ainda para poder aprimorar.");
      return;
    }

    if (simulateNoKey || (apiStatus && !apiStatus.hasKey)) {
      playErrorBuzz();
      triggerProgress("locks");
      triggerToast("Operação bloqueada! Chave de IA ausente ou simulada.");
      return;
    }

    setImprovingSite(true);
    triggerToast("Invocando o Gemini para polir e aprimorar o portal...");

    try {
      const response = await fetch("/api/improve-site", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: buildResult.code,
          idea: activeBuildIdea,
          improvement: improvementPrompt,
          simulateNoKey,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || "Falha do servidor de IA ao aprimorar o site.");
      }

      const data = await response.json();
      if (!data.code) {
        throw new Error("O código aprimorado recebido do motor criativo está vazio.");
      }

      const blob = new Blob([data.code], { type: "text/html" });
      const createdUrl = URL.createObjectURL(blob);

      playSuccessChime();
      triggerProgress("builds"); // Contribui para conquistas!

      const enhancedTitle = activeBuildIdea.title.endsWith("✨") 
        ? activeBuildIdea.title 
        : `${activeBuildIdea.title} ✨`;

      setBuildResult({
        title: enhancedTitle,
        code: data.code,
        url: createdUrl,
      });

      setIsImproveModalOpen(false);
      if (data.fallback) {
        if (data.isQuotaError) {
          triggerToast("⚠️ Cota de IA excedida (Código 429)! Aplicamos o aprimoramento local dinâmico ao seu portal.");
        } else {
          triggerToast("🌌 Portal aprimorado com sucesso via Motor de Contingência Local!");
        }
      } else {
        triggerToast("🌌 Portal aprimorado de forma incrível com sucesso!");
      }

      const newWin = window.open(createdUrl, "_blank");
      if (!newWin) {
        triggerToast("Portal atualizado! Abra ou baixe pelos botões do card de resultados.");
      }
    } catch (error: any) {
      console.error(error);
      triggerToast(`Erro ao aprimorar: ${error.message || "tente novamente."}`);
    } finally {
      setImprovingSite(false);
    }
  };

  // Toggle simulate lock overlay handler
  const handleToggleSimulation = () => {
    playBoing(); // Play custom funny cartoon boing!
    setSimulateNoKey((prev) => {
      const next = !prev;
      return next;
    });
  };

  // Manual download fallback helper
  const handleDownloadCode = () => {
    if (!buildResult) return;
    playCartoonClick(); // Click sound!
    const a = document.createElement("a");
    a.href = buildResult.url;
    // Format simple safe slug
    const slug = buildResult.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    a.download = `criativa-${slug || "site-ia"}.html`;
    a.click();
    triggerToast("Arquivo HTML baixado com sucesso!");
  };

  const handleSelectIdea = (idea: Idea | null) => {
    setActiveModalIdea(idea);
    if (idea) {
      triggerProgress("clicks", idea.id);
    }
  };

  const isLocked = simulateNoKey || (apiStatus !== null && !apiStatus.hasKey);

  return (
    <div className={`relative min-h-screen font-sans overflow-x-hidden selection:bg-black pb-12 transition-colors duration-300 ${
      darkMode 
        ? "bg-[#121214] text-white selection:text-white" 
        : "bg-[#FFDE59] text-black selection:text-[#FFDE59]"
    }`}>
      
      {/* ── CUSTOM CARTOON CURSER ── */}
      <CartoonCursor 
        isLocked={isLocked} 
        isGenerating={buildingSite} 
        onBlockedAction={() => triggerProgress("locks")}
      />

      {/* Retro comic dot backdrop style */}
      <div className={`absolute inset-0 pointer-events-none z-0 bg-[size:24px_24px] ${
        darkMode 
          ? "bg-[radial-gradient(rgba(255,255,255,0.06)_1.5px,transparent_1.5px)]" 
          : "bg-[radial-gradient(rgba(0,0,0,0.15)_1.5px,transparent_1.5px)]"
      }`} />

      {/* ── MAIN LAYOUT CODES ── */}
      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* Header */}
        <Header 
          darkMode={darkMode} 
          onToggleTheme={handleToggleTheme}
          unlockedCount={progress.unlockedList.length}
          totalCount={ACHIEVEMENTS.length}
          onOpenAchievements={() => {
            playCartoonClick();
            setIsAchievementsOpen(true);
          }}
          onStartTutorial={() => {
            playAchievementUnlock?.();
            setIsTutorialActive(true);
          }}
        />

        {/* Api key automatic discovery indicator bar */}
        <ApiKeyBar
          status={apiStatus}
          loading={loadingApi}
          simulateNoKey={simulateNoKey}
          onToggleSimulation={handleToggleSimulation}
          onRefresh={checkApiStatus}
          darkMode={darkMode}
        />

        {/* Dynamic Idea Result card (Showcasing code generated HTML ready for download / open) */}
        {buildResult && (
          <div className="w-full max-w-5xl mx-auto px-4 mt-6 animate-in fade-in slide-in-from-bottom-6 duration-300">
            <div className="bg-[#7ED957] border-[4px] border-black rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-black">
              
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-white border-[3px] border-black text-black shrink-0 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                  <Sparkles className="w-6 h-6 animate-bounce text-[#FF3131]" />
                </div>
                <div>
                  <h4 className="text-black font-black text-lg uppercase tracking-tight italic">
                    CONSTRUÇÃO COMPLETA: {buildResult.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-black font-bold opacity-80 mt-1">
                    Seu site interativo autossuficiente foi montado com sucesso e está pronto para o lançamento!
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => {
                    playCartoonClick();
                    setIsImproveModalOpen(true);
                  }}
                  className="px-5 py-3 rounded-2xl bg-[#FFBD59] hover:bg-[#ffad33] border-[3px] border-black text-black font-mono text-xs font-black cursor-none select-none flex items-center gap-1.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none transition-all duration-100"
                >
                  <Wand2 className="w-4 h-4 text-[#FF3131] animate-bounce shrink-0" />
                  MELHORAR / ADICIONAR ✨
                </button>

                <button
                  onClick={handleDownloadCode}
                  className="px-5 py-3 rounded-2xl bg-white hover:bg-neutral-100 border-[3px] border-black text-black font-mono text-xs font-black cursor-none select-none flex items-center gap-1.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none transition-all duration-100"
                >
                  <FileDown className="w-4 h-4 text-[#FF3131]" />
                  BAIXAR .HTML
                </button>

                <a
                  href={buildResult.url}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => playCartoonClick()}
                  className="px-5 py-3 rounded-2xl bg-[#5271FF] hover:bg-[#3d5eff] text-white border-[3px] border-black font-mono text-xs font-black cursor-none select-none flex items-center gap-1.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none transition-all duration-100"
                >
                  <ExternalLink className="w-4 h-4" />
                  ABRIR SITE
                </a>

                <button
                  onClick={() => {
                    playCartoonClick();
                    setBuildResult(null);
                  }}
                  className="p-2 text-black hover:bg-black/10 rounded-full transition cursor-none"
                  title="Fechar"
                >
                  <X className="w-5 h-5 stroke-[2.5]" />
                </button>
              </div>

            </div>
          </div>
        )}

        {/* Ideas grid list showcasing core search prompt and categorized filters */}
        <IdeasGrid
          ideas={ideas}
          loading={loadingIdeas}
          isLocked={isLocked}
          onSelectIdea={handleSelectIdea}
          onGenerateNew={handleGenerateIdeas}
          darkMode={darkMode}
        />

        {/* Footer */}
        <footer className={`mt-auto mb-8 mx-4 sm:mx-8 py-8 text-center border-[4px] border-black rounded-3xl font-mono text-xs font-black uppercase tracking-wider transition-colors duration-300 ${
          darkMode ? "bg-[#1E1E24] text-neutral-300 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]" : "bg-white text-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
        }`}>
          <div className="flex flex-col items-center gap-4 max-w-5xl mx-auto px-4">
            <span className="text-center">— clique em qualquer card para ver os detalhes técnicos e construir a página —</span>
            
            <button
              id="footer-reset-btn"
              onClick={handleResetAppAll}
              className={`flex items-center gap-2 px-6 py-3 border-[3px] border-black rounded-xl font-mono text-xs font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#ff3c3c] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none transition-all duration-150 cursor-none select-none bg-[#FF5757] text-white`}
              title="Resetar todo o progresso do aplicativo"
            >
              ⚠️ RESETAR APP (LIMPAR TUDO)
            </button>
          </div>
        </footer>

      </div>

      {/* ── FLOAT MODALS AND INTERACTION MODULES ── */}

      {/* Core details modal */}
      <IdeaModal
        idea={activeModalIdea}
        onClose={() => setActiveModalIdea(null)}
        onBuildSite={handleBuildSite}
        building={buildingSite}
        darkMode={darkMode}
      />

      {/* Heavy generation builder modal loader */}
      <BuildOverlay
        idea={activeBuildIdea}
        active={buildingSite}
        isReady={buildReady}
        onComplete={handleBuildOverlayComplete}
        darkMode={darkMode}
      />

      {/* Custom Floating Toast Alert Popup */}
      {toastMsg && (
        <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[300] border-[3.5px] border-black px-6 py-3.5 rounded-2xl text-xs font-mono font-black flex items-center gap-2.5 max-w-[90vw] animate-in fade-in slide-in-from-bottom-8 duration-300 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-colors duration-350 ${
          darkMode ? "bg-[#1E1E24] text-white" : "bg-white text-black"
        }`}>
          <div className="w-2 h-2 rounded-full bg-[#FF4D6D] border border-black animate-ping" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Real-time Achievement Panel/Drawer and Notifications */}
      <AchievementsPanel
        progress={progress}
        onResetProgress={handleResetProgress}
        unlockedQueue={unlockedQueue}
        onDismissNotification={handleDismissNotification}
        darkMode={darkMode}
        isOpen={isAchievementsOpen}
        onTogglePanel={() => {
          playCartoonClick();
          setIsAchievementsOpen(!isAchievementsOpen);
        }}
      />

      {/* Advanced AI portal revision/evolution form */}
      <ImproveModal
        isOpen={isImproveModalOpen}
        onClose={() => setIsImproveModalOpen(false)}
        onImprove={handleImproveSite}
        loading={improvingSite}
        projectTitle={activeBuildIdea?.title || ""}
        darkMode={darkMode}
      />

      {/* Tutorial */}
      <CartoonTutorial 
        isActive={isTutorialActive}
        setIsActive={setIsTutorialActive}
        darkMode={darkMode}
      />

    </div>
  );
}
