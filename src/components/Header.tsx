import { Sun, Moon, Trophy, HelpCircle } from "lucide-react";

interface HeaderProps {
  darkMode: boolean;
  onToggleTheme: () => void;
  unlockedCount: number;
  totalCount: number;
  onOpenAchievements: () => void;
  onStartTutorial: () => void;
}

export default function Header({ 
  darkMode, 
  onToggleTheme,
  unlockedCount,
  totalCount,
  onOpenAchievements,
  onStartTutorial
}: HeaderProps) {
  return (
    <header className="relative z-10 w-full max-w-5xl mx-auto px-4 mt-8 mb-6">
      <div className={`flex flex-col md:flex-row justify-between items-stretch md:items-center border-[4px] border-black rounded-3xl p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] gap-4 select-none transition-colors duration-300 ${
        darkMode ? "bg-[#1E1E24] text-white" : "bg-white text-black"
      }`}>
        
        {/* Left container: title & brand icon */}
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-[#5271FF] border-[3px] border-black rounded-full flex items-center justify-center text-white text-2xl font-black shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            💡
          </div>
          <div>
            <h1 className={`text-3xl sm:text-4xl font-black tracking-tight italic leading-none uppercase ${
              darkMode ? "text-white" : "text-black"
            }`}>
              Ideias pra vida
            </h1>
            <p className="font-mono text-[10px] sm:text-xs font-black text-[#5271FF] dark:text-[#38B6FF] uppercase mt-1">
              ↯ gerador inteligente com inteligência artificial
            </p>
          </div>
        </div>

        {/* Right container: system indicators */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Theme Selector */}
          <button
            id="header-theme-toggle"
            onClick={onToggleTheme}
            className={`flex items-center justify-center gap-2 px-4 py-2.5 border-[3px] border-black rounded-xl font-mono text-xs font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none transition-all duration-150 cursor-none select-none ${
              darkMode 
                ? "bg-[#FFDE59] text-black hover:bg-[#ebd050]" 
                : "bg-[#121214] text-white hover:bg-[#202024]"
            }`}
          >
            {darkMode ? (
              <>
                <Sun className="w-4 h-4 fill-[#121214] text-[#121214]" />
                MODO CLARO
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 fill-white text-white" />
                MODO ESCURO
              </>
            )}
          </button>

          {/* Achievements Trigger Button */}
          <button
            id="header-achievements-btn"
            onClick={onOpenAchievements}
            className={`flex items-center justify-center gap-2 px-4 py-2.5 border-[3px] border-black rounded-xl font-mono text-xs font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none transition-all duration-150 cursor-none select-none relative bg-[#FFDE59] text-black hover:bg-[#ebd050]`}
            title="Ver Conquistas Cartoon"
          >
            <Trophy className="w-4 h-4 text-black shrink-0" />
            CONQUISTAS ({unlockedCount}/{totalCount})
          </button>

          {/* Tutorial Trigger Button */}
          <button
            id="header-tutorial-btn"
            onClick={onStartTutorial}
            className={`flex items-center justify-center gap-2 px-4 py-2.5 border-[3px] border-black rounded-xl font-mono text-xs font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none transition-all duration-150 cursor-none select-none bg-[#38B6FF] text-black hover:bg-[#209ee7]`}
            title="Iniciar Tour Expresso"
          >
            <HelpCircle className="w-4 h-4 shrink-0" />
            TUTORIAL
          </button>

          <div className="hidden lg:block bg-[#38B6FF] border-[3px] border-black px-4 py-2.5 rounded-xl text-black font-mono text-xs font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            BUSCADOR: <span className="text-white drop-shadow-[1px_1px_0px_#000]">AUTO-SCANNING</span>
          </div>

          <div className={`hidden lg:block border-[3px] border-black px-4 py-2.5 rounded-xl font-mono text-xs font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-colors duration-300 ${
            darkMode ? "bg-purple-600 text-white" : "bg-[#FF5757] text-white"
          }`}>
            PALETA: {darkMode ? "NOIR ACCENTS" : "VIBRANTE"}
          </div>
        </div>

      </div>

      {/* Decorative subtitle row beneath brutalist header block */}
      <div className={`mt-4 px-2 flex flex-col md:flex-row justify-between gap-1.5 text-xs font-mono font-black transition-colors duration-300 ${
        darkMode ? "text-neutral-400" : "text-black"
      }`}>
        <span>[+] AUTO-DETECTANDO CHAVES DE IA EM TEMPO REAL...</span>
        <span>UPTIME: ESTÁVEL — 14:22:04</span>
      </div>
    </header>
  );
}
