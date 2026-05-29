import { useEffect, useState } from "react";
import { Idea } from "../types";
import { X, Cpu, CheckCircle, Loader2 } from "lucide-react";
import { playCartoonClick, playWhip } from "../utils/audio";

interface ModalProps {
  idea: Idea | null;
  onClose: () => void;
  onBuildSite: (idea: Idea) => void;
  building: boolean;
  darkMode: boolean;
}

export default function IdeaModal({ idea, onClose, onBuildSite, building, darkMode }: ModalProps) {
  const [msgIndex, setMsgIndex] = useState(0);

  const playfulMessages = [
    "CONTRATANDO ROBÔS MÁGICOS...",
    "DESENHANDO PIXELS REBELDES...",
    "INJETANDO RETROCAOS...",
    "COZINHANDO ESTRUTURAS...",
    "ALIMENTANDO OS DUENDES...",
    "SOPRANDO POEIRA DO PONTEIRO...",
    "SINTETIZANDO EFEITOS...",
    "INVOCANDO PORTAIS..."
  ];

  useEffect(() => {
    if (!building) {
      setMsgIndex(0);
      return;
    }

    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % playfulMessages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [building, playfulMessages.length]);

  useEffect(() => {
    if (idea) {
      playWhip(); // Play funny cartoon slap/whip sound when modal slides open!
    }
  }, [idea]);

  if (!idea) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-[2px] transition-opacity duration-300">
      
      {/* Container Card */}
      <div className={`relative w-full max-w-lg border-[4px] border-black rounded-3xl p-6 sm:p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] animate-in fade-in zoom-in-95 duration-200 transition-colors duration-300 ${
        darkMode ? "bg-[#1E1E24] text-white" : "bg-white text-black"
      }`}>
        
        {/* Close Button */}
        <button
          onClick={() => {
            playCartoonClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-xl bg-[#FF5757] border-2 border-black text-white hover:bg-[#ff3c3c] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] active:shadow-none transition-all cursor-none"
        >
          <X className="w-4 h-4 stroke-[2.5]" />
        </button>

        {/* Tag Category */}
        <span
          className={`inline-block font-mono text-[10px] uppercase font-black tracking-wider px-3 py-1 rounded-full border-2 border-black mb-4 mt-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
            idea.tag === "visual"
              ? "bg-[#FF4D6D] text-white"
              : idea.tag === "dados"
              ? "bg-[#4DFFD2] text-black"
              : idea.tag === "audio"
              ? "bg-[#A855F7] text-white"
              : "bg-[#FFDE59] text-black"
          }`}
        >
          {idea.tagLabel}
        </span>

        {/* Title */}
        <h3 className={`font-black text-2xl sm:text-3xl italic tracking-tight uppercase mb-3 leading-tight transition-colors duration-200 ${
          darkMode ? "text-white" : "text-black"
        }`}>
          {idea.title}
        </h3>

        {/* Full Desc */}
        <p className={`text-sm font-bold leading-relaxed mb-6 transition-colors duration-250 ${
          darkMode ? "text-neutral-300" : "text-neutral-700"
        }`}>
          {idea.desc}
        </p>

        {/* Features Checklist */}
        <div className="mb-8">
          <span className={`font-mono text-[10px] uppercase font-black tracking-widest block mb-3 ${
            darkMode ? "text-neutral-400" : "text-black"
          }`}>
            RECURSOS TÉCNICOS DETECTADOS:
          </span>
          <div className="grid grid-cols-1 gap-2.5">
            {idea.features.map((feature, idx) => (
              <div key={idx} className={`flex items-start gap-2.5 text-sm font-bold transition-colors duration-200 ${
                darkMode ? "text-neutral-200" : "text-black/90"
              }`}>
                <CheckCircle className={`w-5 h-5 shrink-0 mt-0.5 stroke-[2.5] ${
                  idea.tag === "visual" ? "text-[#FF4D6D]" : 
                  idea.tag === "dados" ? "text-[#4DFFD2]" : 
                  idea.tag === "audio" ? "text-[#A855F7]" : "text-[#5271FF]"
                }`} />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions Button */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button
            onClick={() => {
              playCartoonClick();
              onBuildSite(idea);
            }}
            disabled={building}
            className={`flex-1 py-3.5 px-5 rounded-2xl border-[3px] border-black text-black font-mono text-xs sm:text-sm font-black flex items-center justify-center gap-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none transition-all cursor-none select-none ${
              building ? "bg-[#38B6FF] animate-pulse" : "bg-[#FFDE59] hover:bg-[#ebd050]"
            }`}
          >
            {building ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-black shrink-0" />
                <span className="truncate">{playfulMessages[msgIndex]}</span>
              </>
            ) : (
              <>
                <Cpu className="w-4 h-4 animate-bounce shrink-0" />
                <span>⚡ CONSTRUIR COM IA NOW</span>
              </>
            )}
          </button>
          
          <button
            onClick={() => {
              playCartoonClick();
              onClose();
            }}
            className={`py-3.5 px-5 rounded-2xl border-[3px] border-black font-mono text-sm font-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none transition-all cursor-none ${
              darkMode ? "bg-neutral-800 text-white hover:bg-neutral-700" : "bg-white hover:bg-neutral-100 text-black"
            }`}
          >
            Voltar
          </button>
        </div>

      </div>
    </div>
  );
}
