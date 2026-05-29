import { useState, useEffect } from "react";
import { Award, Trophy, CheckCircle2, Lock, X, Play, RotateCcw } from "lucide-react";
import { Achievement, ACHIEVEMENTS, UserProgress } from "../utils/achievements";
import { playCartoonClick, playAchievementUnlock } from "../utils/audio";
import CartoonConfetti from "./CartoonConfetti";

interface AchievementsPanelProps {
  progress: UserProgress;
  onResetProgress: () => void;
  unlockedQueue: string[]; // List of achievement IDs waiting to pop up
  onDismissNotification: (id: string) => void;
  darkMode: boolean;
  isOpen: boolean;
  onTogglePanel: () => void;
}

export default function AchievementsPanel({
  progress,
  onResetProgress,
  unlockedQueue,
  onDismissNotification,
  darkMode,
  isOpen,
  onTogglePanel
}: AchievementsPanelProps) {
  const [currentNotification, setCurrentNotification] = useState<Achievement | null>(null);
  const [confettiTrigger, setConfettiTrigger] = useState(false);

  // Manage popup sequence for newly unlocked achievements
  useEffect(() => {
    if (unlockedQueue.length > 0 && !currentNotification) {
      const nextId = unlockedQueue[0];
      const match = ACHIEVEMENTS.find(a => a.id === nextId);
      if (match) {
        // Play epic cartoon success fanfare!
        playAchievementUnlock();
        setCurrentNotification(match);
        
        // Trigger celebratory cartoon confetti physics
        setConfettiTrigger(true);
        const resetConfettiTimer = setTimeout(() => {
          setConfettiTrigger(false);
        }, 150);
        
        // Auto-dismiss after 4.5 seconds
        const timer = setTimeout(() => {
          handleDismissNotify(nextId);
        }, 4500);
        
        return () => {
          clearTimeout(resetConfettiTimer);
          clearTimeout(timer);
        };
      } else {
        // Fallback dismiss if invalid
        onDismissNotification(nextId);
      }
    }
  }, [unlockedQueue, currentNotification]);

  const handleDismissNotify = (id: string) => {
    setCurrentNotification(null);
    onDismissNotification(id);
  };

  const handleResetClick = () => {
    playCartoonClick();
    if (window.confirm("Deseja realmente resetar suas conquistas cartoon? Os progressos serão reiniciados.")) {
      onResetProgress();
    }
  };

  // Calculate unlock percentage
  const unlockedCount = progress.unlockedList.length;
  const totalCount = ACHIEVEMENTS.length;
  const globalProgressPercent = Math.round((unlockedCount / totalCount) * 100);

  return (
    <>
      <CartoonConfetti active={confettiTrigger} />

      {/* ── REAL-TIME CELEBRATIVE BANNER POPUP ── */}
      {currentNotification && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[500] w-[92vw] max-w-md animate-in zoom-in-90 slide-in-from-top-12 duration-300">
          <div className="relative bg-[#FFDE59] border-[4px] border-black rounded-[32px] p-5 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] text-black flex items-start gap-4 overflow-hidden">
            {/* Retro Sunburst Background Effect */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/30 via-transparent to-transparent opacity-60 pointer-events-none" />
            
            <div className="relative shrink-0 w-14 h-14 rounded-2xl bg-white border-[3px] border-black flex items-center justify-center text-3xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] animate-bounce">
              {currentNotification.emoji}
            </div>
            
            <div className="relative flex-1">
              <span className="bg-[#FF5757] text-white border-2 border-black text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-lg font-mono">
                DESBLOQUEADO 🏆
              </span>
              <h4 className="font-black text-base uppercase tracking-tight italic mt-1.5 text-black">
                {currentNotification.title}
              </h4>
              <p className="text-xs font-bold text-black/85 mt-0.5 leading-snug">
                {currentNotification.description}
              </p>
            </div>

            <button
              onClick={() => handleDismissNotify(currentNotification.id)}
              className="relative p-1.5 rounded-full hover:bg-black/10 transition shrink-0 cursor-none"
              title="Fechar Notificação"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        </div>
      )}

      {/* ── SLIDE DRAWER OVERLAY ── */}
      {isOpen && (
        <div className="fixed inset-0 z-[250] flex items-center justify-end p-4 bg-black/60 backdrop-blur-[3px] animate-in fade-in duration-200">
          {/* Dismiss Click Area outside the box */}
          <div className="absolute inset-0" onClick={onTogglePanel} />

          {/* Core Panel Content */}
          <div className={`relative w-full max-w-md h-[90vh] md:h-[85vh] border-[4px] border-black rounded-[36px] flex flex-col overflow-hidden shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] animate-in slide-in-from-right-16 duration-300 ${
            darkMode ? "bg-[#16161b] text-white" : "bg-white text-black"
          }`}>
            
            {/* Dynamic Card Header */}
            <div className="p-6 border-b-[3px] border-black bg-[#5271FF] text-white relative">
              <button
                onClick={onTogglePanel}
                className="absolute top-4 right-4 p-2 rounded-xl bg-[#FF4D6D] hover:bg-[#ff3056] border-2 border-black text-white active:translate-y-[1px] active:shadow-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition cursor-none"
                title="Fechar Painel"
              >
                <X className="w-4 h-4 stroke-[2.5]" />
              </button>

              <div className="flex items-center gap-2.5">
                <Trophy className="w-6 h-6 text-[#FFDE59] animate-bounce" />
                <h3 className="font-black text-lg sm:text-xl uppercase tracking-tight italic text-white leading-none">
                  CONQUISTAS CARTOON
                </h3>
              </div>
              <p className="font-mono text-xs font-black text-white/90 mt-2">
                DESAFIE SUA MENTE CRITIADA!
              </p>

              {/* Progress Bar Container */}
              <div className="mt-4 bg-black/30 border-2 border-black rounded-full h-6 p-0.5 overflow-hidden flex items-center relative">
                <div 
                  className="bg-[#22C55E] h-full rounded-full transition-all duration-500 border-r-2 border-black"
                  style={{ width: `${globalProgressPercent}%` }}
                />
                <span className="absolute inset-0 flex items-center justify-center font-mono text-[10px] font-black text-white drop-shadow-[1px_1px_0_rgba(0,0,0,1)]">
                  {globalProgressPercent}% COMPLETO ({unlockedCount}/{totalCount})
                </span>
              </div>
            </div>

            {/* Achievements List Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {ACHIEVEMENTS.map((item) => {
                const isUnlocked = progress.unlockedList.includes(item.id);
                
                // Retrieve precise quantitative values
                let currentVal = 0;
                if (item.category === "clicks") currentVal = progress.clicks;
                if (item.category === "themes") currentVal = progress.themes;
                if (item.category === "searches") currentVal = progress.searches;
                if (item.category === "locks") currentVal = progress.locks;
                if (item.category === "builds") currentVal = progress.builds;
                if (item.category === "secret") currentVal = progress.fastClicks || 0;

                const cappedVal = Math.min(currentVal, item.target);
                const percent = Math.round((cappedVal / item.target) * 100);

                return (
                  <div
                    key={item.id}
                    className={`relative border-[3px] border-black rounded-2xl p-4 transition-all duration-150 flex gap-3.5 ${
                      isUnlocked
                        ? darkMode
                          ? "bg-[#253229] border-[#22C55E]/60 shadow-[3px_3px_0px_0px_#22C55E]"
                          : "bg-[#F3FFF5] border-[#22C55E] shadow-[4px_4px_0px_0px_#22C55E]"
                        : darkMode
                        ? "bg-[#1E1E24]/60 opacity-65 text-neutral-400"
                        : "bg-neutral-50/70 opacity-70 text-neutral-600"
                    }`}
                  >
                    {/* Badge Emoji */}
                    <div className={`shrink-0 w-12 h-12 border-2 border-black rounded-xl flex items-center justify-center text-2xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                      isUnlocked ? "bg-[#FFDE59]" : "bg-neutral-200"
                    }`}>
                      {isUnlocked ? item.emoji : "🔒"}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h4 className={`font-black text-sm uppercase tracking-tight italic ${
                          isUnlocked ? "text-green-500" : ""
                        }`}>
                          {item.title}
                        </h4>
                        {isUnlocked && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-green-500 fill-current shrink-0" />
                        )}
                      </div>

                      {/* Small mini tracking line */}
                      <div className="mt-3 flex items-center gap-2">
                        <div className="flex-1 bg-black/10 border border-black rounded-full h-2.5 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${isUnlocked ? "bg-[#22C55E]" : "bg-[#FF5757]"}`}
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                        <span className="font-mono text-[9px] font-black select-none shrink-0 border border-black/20 bg-black/5 px-1.5 py-0.5 rounded">
                          {cappedVal} / {item.target}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Actions Drawer Panel */}
            <div className={`p-4 border-t-[3px] border-black flex justify-between items-center ${
              darkMode ? "bg-neutral-900" : "bg-neutral-50"
            }`}>
              <span className="font-mono text-[9px] font-black opacity-60">
                PRODUTO DO RETRO MOTOR-CRIATIVO
              </span>
              <button
                onClick={handleResetClick}
                className="px-3 py-1.5 border-2 border-black rounded-lg bg-[#FF5757] hover:bg-[#ff3c3c] text-white font-mono text-[10px] font-black flex items-center gap-1 cursor-none active:translate-y-[1px] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none"
              >
                <RotateCcw className="w-3 h-3" />
                RESETAR
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
