import { useEffect, useState } from "react";
import { Idea } from "../types";
import { Loader2 } from "lucide-react";

interface BuildProps {
  idea: Idea | null;
  active: boolean;
  isReady: boolean;
  onComplete: () => void;
  darkMode: boolean;
}

export default function BuildOverlay({ idea, active, isReady, onComplete, darkMode }: BuildProps) {
  const [progress, setProgress] = useState(0);

  const steps = [
    { text: "arquitetando sistema modular...", limit: 12 },
    { text: "importando tipografia e paletas escuras premium...", limit: 25 },
    { text: "estruturando canvas 2D de alta taxa de quadros...", limit: 42 },
    { text: "escrevendo funções para rastro animado no ponteiro...", limit: 58 },
    { text: "injetando sintetizadores com Web Audio API...", limit: 74 },
    { text: "validando tags HTML fechadas e consistência de scripts...", limit: 89 },
    { text: "finalizando otimizações lógicas...", limit: 95 },
    { text: "sintetizando respostas com o servidor de IA...", limit: 98 },
    { text: "construção completa! abrindo portal interativo...", limit: 100 }
  ];

  // Purely derived status message - zero side-effects, immune to React infinite-render deadlocks
  const currentMsg = steps.find(step => progress <= step.limit) || steps[steps.length - 1];
  const statusMsg = currentMsg.text;

  useEffect(() => {
    if (!active) {
      setProgress(0);
      return;
    }

    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }

        // Cap at 95% if the API has not finished answering yet
        if (prev >= 95 && !isReady) {
          return 95;
        }

        // Regular steps
        let increment = Math.floor(Math.random() * 3) + 1; // 1 to 3%
        
        // Accelerated finish when backend successfully completed
        if (isReady && prev >= 85) {
          increment = 20; // Fast finish
        }

        return Math.min(prev + increment, 100);
      });
    }, 200); // 200ms per tick for faster subjective perception


    return () => clearInterval(interval);
  }, [active, isReady]);

  // Handle calling the completion callback only when progress and active states reach 100%
  useEffect(() => {
    if (active && progress >= 100) {
      const delay = setTimeout(() => {
        onComplete();
      }, 750);
      return () => clearTimeout(delay);
    }
  }, [active, progress, onComplete]);

  if (!active || !idea) return null;

  return (
    <div className={`fixed inset-0 z-[200] flex flex-col items-center justify-center p-6 sm:p-12 animate-in fade-in duration-300 select-none transition-colors duration-300 ${
      darkMode ? "bg-[#121214]" : "bg-[#FFDE59]"
    }`}>
      
      {/* Retro comic dot backdrop style */}
      <div className={`absolute inset-0 pointer-events-none z-0 bg-[size:24px_24px] ${
        darkMode 
          ? "bg-[radial-gradient(rgba(255,255,255,0.06)_1.5px,transparent_1.5px)]" 
          : "bg-[radial-gradient(rgba(0,0,0,0.15)_1.5px,transparent_1.5px)]"
      }`} />

      <div className={`border-[4px] border-black rounded-[40px] p-8 sm:p-10 max-w-lg w-full relative z-10 flex flex-col items-center text-center transition-all duration-300 ${
        darkMode 
          ? "bg-[#1E1E24] text-white shadow-[12px_12px_0px_0px_rgba(255,255,255,0.05)]" 
          : "bg-white text-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"
      }`}>
        
        {/* Animated loader */}
        <div className="relative mb-8 text-[#FF5757]">
          <Loader2 className="w-20 h-20 animate-spin text-neutral-100 dark:text-neutral-800" />
          <Loader2 className="w-20 h-20 animate-spin absolute inset-0 text-[#FF5757] stroke-[3]" style={{ transformOrigin: "center center", animationDuration: "1.2s" }} />
          
          <span className={`absolute inset-0 flex items-center justify-center font-mono font-black text-lg ${
            darkMode ? "text-white" : "text-black"
          }`}>
            {progress}%
          </span>
        </div>

        {/* Small subtitle */}
        <span className={`font-mono text-xs font-black uppercase tracking-widest block mb-2 ${
          darkMode ? "text-neutral-400" : "text-black"
        }`}>
          🔨 COMPILADOR DE PORTAIS ATIVO
        </span>

        {/* Dynamic Title */}
        <h2 className={`text-3.5xl sm:text-4xl font-black mb-6 italic uppercase leading-none ${
          darkMode ? "text-white" : "text-black"
        }`}>
          CONSTRUINDO <br />
          <span className="text-[#5271FF] dark:text-[#38B6FF] font-black italic">"{idea.title}"</span>
        </h2>

        {/* Progress Bar Container in bold cartoon design */}
        <div className={`w-full h-8 border-[3px] border-black rounded-2xl overflow-hidden mb-6 relative transition-all duration-300 ${
          darkMode ? "bg-[#13111C] shadow-[3px_3px_0px_0px_rgba(255,255,255,0.05)]" : "bg-neutral-100 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
        }`}>
          <div
            className="h-full bg-[#7ED957] border-r-4 border-black transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
          {/* Internal percentage text overlay */}
          <div className={`absolute inset-0 flex items-center justify-center font-mono text-xs font-black ${
            darkMode ? "text-white" : "text-black"
          }`}>
            {progress >= 100 ? "PRONTO PARA DECOLAR" : `PROCESSANDO: ${progress}%`}
          </div>
        </div>

        {/* Message Status */}
        <p className={`font-mono text-xs font-black border-2 border-black rounded-xl py-3 px-4 w-full flex items-center justify-center gap-2 tracking-wide transition-all duration-300 ${
          darkMode ? "bg-black/40 text-neutral-200" : "bg-[#38B6FF]/10 text-black"
        }`}>
          <span className="text-[#FF5757] animate-ping font-black">●</span> {statusMsg}
        </p>

        <p className={`mt-4 font-mono text-[10px] font-bold uppercase ${
          darkMode ? "text-neutral-500" : "text-neutral-400"
        }`}>
          Tempo máximo de criação: 6 minutos
        </p>
      </div>
    </div>
  );
}
