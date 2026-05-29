import { useEffect, useState, FormEvent } from "react";
import { X, Sparkles, Wand2, Loader2 } from "lucide-react";
import { playCartoonClick, playWhip } from "../utils/audio";

interface ImproveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImprove: (prompt: string) => void;
  loading: boolean;
  projectTitle: string;
  darkMode: boolean;
}

export default function ImproveModal({
  isOpen,
  onClose,
  onImprove,
  loading,
  projectTitle,
  darkMode,
}: ImproveModalProps) {
  const [improvementText, setImprovementText] = useState("");
  const [msgIndex, setMsgIndex] = useState(0);

  const funnyWaitingMessages = [
    "RECONSTRUINDO OS PORTAIS...",
    "MISTURANDO ESTILOS REBELDES...",
    "AQUECENDO COMPILADORES QUÂNTICOS...",
    "ADICIONANDO DIVERSÃO RETRO...",
    "LIMPANDO FÓRMULAS DE CANVAS...",
    "ENSINANDO NOVOS TRUQUES AO MOUSE...",
    "POLINDO PIXELS ADICIONAIS...",
    "CONJURANDO MÁGICA WEB..."
  ];

  const presetSuggestions = [
    "Adicionar um placar/contador ativo no topo",
    "Mudar as cores do tema para neon Cyberpunk 💜💙",
    "Adicionar um sintetizador sonoro de bateria/passos",
    "Incluir um painel de ajuda interativo explicando os segredos",
    "Adicionar física de atração magnética ao arrastar o mouse",
  ];

  // Rotate messages while loading
  useEffect(() => {
    if (!loading) {
      setMsgIndex(0);
      return;
    }

    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % funnyWaitingMessages.length);
    }, 2200);

    return () => clearInterval(interval);
  }, [loading]);

  // Open Sound FX
  useEffect(() => {
    if (isOpen) {
      playWhip();
      // Keep input clear on opening
      setImprovementText("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!improvementText.trim() || loading) return;
    playCartoonClick();
    onImprove(improvementText);
  };

  const selectPreset = (preset: string) => {
    playCartoonClick();
    setImprovementText(preset);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-[2px] transition-opacity duration-300">
      {/* Cartoon Outer Wrap */}
      <div
        className={`relative w-full max-w-lg border-[4px] border-black rounded-3xl p-6 sm:p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] animate-in fade-in zoom-in-95 duration-200 transition-colors duration-300 ${
          darkMode ? "bg-[#1E1E24] text-white" : "bg-white text-black"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            playCartoonClick();
            onClose();
          }}
          disabled={loading}
          className="absolute top-4 right-4 p-2 rounded-xl bg-[#FF5757] border-2 border-black text-white hover:bg-[#ff3c3c] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] active:shadow-none transition-all cursor-none select-none disabled:opacity-50"
        >
          <X className="w-4 h-4 stroke-[2.5]" />
        </button>

        {/* Badge header */}
        <div className="flex items-center gap-2 mb-3 mt-2">
          <span className="bg-[#FFBD59] text-black border-2 border-black font-mono text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#FF3131] animate-spin" />
            EVOLUÇÃO DOS PORTAIS
          </span>
        </div>

        {/* Title */}
        <h3 className="font-black text-xl sm:text-2xl italic tracking-tight uppercase leading-tight mb-1">
          Melhorar o Portal
        </h3>
        <p className="text-xs font-bold text-neutral-500 mb-5">
          Projeto atual: <span className="text-[#5271FF] dark:text-[#38B6FF] underline">{projectTitle}</span>
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-mono text-[10px] font-black uppercase tracking-wider mb-2 text-neutral-400">
              O que você quer melhorar ou adicionar no projeto?
            </label>
            <textarea
              value={improvementText}
              onChange={(e) => setImprovementText(e.target.value)}
              disabled={loading}
              placeholder="Ex: Adicionar um placar flutuante de pontos, colocar trilha sonora ambiente ou mudar as cores para tons cyberpunk violeta..."
              className={`w-full h-28 border-[3px] border-black rounded-2xl p-4 font-mono text-xs font-bold focus:outline-none focus:ring-0 cursor-none select-none ${
                darkMode
                  ? "bg-[#121214] border-white text-white placeholder-neutral-500 focus:border-[#4DFFD2]"
                  : "bg-neutral-50 border-black text-black placeholder-neutral-400 focus:border-[#5271FF]"
              }`}
            />
          </div>

          {/* Quick presets suggestions if empty */}
          {!loading && (
            <div className="space-y-2">
              <span className="block font-mono text-[9px] font-black uppercase tracking-widest text-[#5271FF] dark:text-[#38B6FF]">
                💡 Ideias Rápidas de Evolução:
              </span>
              <div className="flex flex-wrap gap-1.5 max-h-[140px] overflow-y-auto pr-1">
                {presetSuggestions.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => selectPreset(preset)}
                    className={`text-[10.5px] font-mono font-black text-left px-2.5 py-1.5 border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] active:shadow-none transition-all cursor-none select-none ${
                      darkMode
                        ? "bg-[#25252D] hover:bg-[#2d2d38] text-white"
                        : "bg-white hover:bg-neutral-100 text-black"
                    }`}
                  >
                    🚀 {preset}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch gap-2.5">
            <button
              type="submit"
              disabled={loading || !improvementText.trim()}
              className={`flex-1 py-3.5 px-5 rounded-2xl border-[3px] border-black text-black font-mono text-xs sm:text-sm font-black flex items-center justify-center gap-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none transition-all cursor-none select-none disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:translate-y-0 ${
                loading
                  ? "bg-[#38B6FF] animate-pulse cursor-wait"
                  : "bg-[#7ED957] hover:bg-[#6ec24a]"
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-black shrink-0" />
                  <span className="truncate">{funnyWaitingMessages[msgIndex]}</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4 shrink-0 animate-bounce text-[#FF3131]" />
                  <span>APRIMORAR PORTAL COM IA ✨</span>
                </>
              )}
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={() => {
                playCartoonClick();
                onClose();
              }}
              className={`py-3 px-5 rounded-2xl border-[3px] border-black font-mono text-xs sm:text-sm font-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none transition-all cursor-none select-none ${
                darkMode
                  ? "bg-transparent text-white hover:bg-white/5"
                  : "bg-transparent text-black hover:bg-black/5"
              }`}
            >
              CANCELAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
