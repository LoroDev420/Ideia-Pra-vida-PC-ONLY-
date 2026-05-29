import { ApiStatus } from "../types";
import { Key, ShieldCheck, ToggleLeft, ToggleRight, AlertCircle, RefreshCw } from "lucide-react";
import { playCartoonClick } from "../utils/audio";

interface ApiBarProps {
  status: ApiStatus | null;
  loading: boolean;
  simulateNoKey: boolean;
  onToggleSimulation: () => void;
  onRefresh: () => void;
  darkMode: boolean;
}

export default function ApiKeyBar({
  status,
  loading,
  simulateNoKey,
  onToggleSimulation,
  onRefresh,
  darkMode
}: ApiBarProps) {
  const isCurrentlyLocked = simulateNoKey || !status?.hasKey;

  return (
    <div className="relative z-10 w-full max-w-5xl mx-auto px-4 mt-6">
      <div className={`border-[4px] border-black rounded-3xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-colors duration-300 ${
        darkMode ? "bg-[#1E1E24] text-white" : "bg-white text-black"
      }`}>
        
        {/* Left Side: Status display */}
        <div className="flex items-start sm:items-center gap-4">
          <div className={`p-3 rounded-2xl border-[3px] border-black shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
            isCurrentlyLocked ? "bg-[#FF5757] text-white" : "bg-[#7ED957] text-black"
          }`}>
            {isCurrentlyLocked ? (
              <Key className="w-5 h-5 stroke-[2.5]" />
            ) : (
              <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
            )}
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`font-mono text-xs font-black uppercase tracking-wider ${
                darkMode ? "text-neutral-300" : "text-black"
              }`}>
                STATUS DA API:
              </span>
              
              {loading ? (
                <span className="inline-flex items-center justify-center gap-1.5 px-3 py-1 w-[155px] shrink-0 rounded-xl text-xs font-bold font-mono bg-amber-400 border-2 border-black text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  PROCURANDO...
                </span>
              ) : isCurrentlyLocked ? (
                <span className="inline-flex items-center justify-center gap-1.5 px-3 py-1 w-[155px] shrink-0 rounded-xl text-xs font-bold font-mono bg-[#FF5757] text-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  BLOQUEADO
                </span>
              ) : (
                <span className="inline-flex items-center justify-center gap-1.5 px-3 py-1 w-[155px] shrink-0 rounded-xl text-xs font-bold font-mono bg-[#7ED957] text-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  ATIVO E PRONTO
                </span>
              )}
            </div>

            <p className={`text-xs sm:text-sm font-black mt-1 uppercase tracking-tight italic min-h-[42px] sm:min-h-[24px] flex items-center ${
              darkMode ? "text-neutral-200" : "text-black"
            }`}>
              {loading ? (
                "Sintetizando status com o servidor..."
              ) : isCurrentlyLocked ? (
                "A API ESTÁ CONGELADA COMINALMENTE! TESTE O BLOQUEIO VISUAL DO CURSOR AO LADO."
              ) : (
                "CHAVE GEMINI INTEGRADA AUTOMATICAMENTE PELO SERVIDOR! STATUS DE GERAÇÃO ESTÁ ATIVO."
              )}
            </p>
          </div>
        </div>

        {/* Right Side: Simulation switcher & Action button */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          
          <button
            id="api-toggle-simulation"
            onClick={onToggleSimulation}
            className={`flex items-center justify-center gap-2 px-5 py-3 rounded-2xl border-[3px] border-black font-mono text-xs font-black transition-all duration-150 cursor-none select-none shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none ${
              simulateNoKey
                ? "bg-[#FF5757] text-white hover:bg-[#ff3c3c]"
                : darkMode
                  ? "bg-neutral-800 text-white hover:bg-neutral-700"
                  : "bg-white text-black hover:bg-neutral-100"
            }`}
          >
            {simulateNoKey ? (
              <>
                <ToggleRight className="w-4 h-4 stroke-[2.5]" />
                DESATIVAR SIMULAÇÃO
              </>
            ) : (
              <>
                <ToggleLeft className="w-4 h-4 stroke-[2.5]" />
                SIMULAR AUSÊNCIA C/ LOCK
              </>
            )}
          </button>

          <button
            onClick={() => {
              playCartoonClick();
              onRefresh();
            }}
            className="px-5 py-3 rounded-2xl bg-[#38B6FF] hover:bg-[#209ee7] border-[3px] border-black text-black font-mono text-xs font-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none cursor-none select-none"
          >
            RE-ESCANEAR
          </button>
        </div>

      </div>
    </div>
  );
}
