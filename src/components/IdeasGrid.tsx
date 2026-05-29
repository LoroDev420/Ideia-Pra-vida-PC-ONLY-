import { useState, FormEvent } from "react";
import { Idea } from "../types";
import { Search, Compass, RefreshCw, Layers, Gamepad2, Database, Music2, Eye } from "lucide-react";
import { playCartoonClick, playBoing, playErrorBuzz } from "../utils/audio";
import { motion } from "motion/react";

interface GridProps {
  ideas: Idea[];
  loading: boolean;
  isLocked: boolean;
  onSelectIdea: (idea: Idea) => void;
  onGenerateNew: (theme: string) => void;
  darkMode: boolean;
}

export default function IdeasGrid({
  ideas,
  loading,
  isLocked,
  onSelectIdea,
  onGenerateNew,
  darkMode
}: GridProps) {
  const [themeInput, setThemeInput] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("todos");

  // Tag filter mapping
  const tagsList = [
    { value: "todos", label: "todos", icon: Layers, activeBg: "bg-[#FFDE59] text-black", border: "border-black" },
    { value: "interativo", label: "interativo", icon: Gamepad2, activeBg: "bg-[#5271FF] text-white", border: "border-black" },
    { value: "visual", label: "visual", icon: Eye, activeBg: "bg-[#FF4D6D] text-white", border: "border-black" },
    { value: "dados", label: "dados", icon: Database, activeBg: "bg-[#38B6FF] text-black", border: "border-black" },
    { value: "audio", label: "áudio", icon: Music2, activeBg: "bg-[#A855F7] text-white", border: "border-black" }
  ];

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isLocked) return;
    playBoing(); // Fun boing when generating ideas!
    onGenerateNew(themeInput);
  };

  // Filter ideas locally
  const filteredIdeas = selectedTag === "todos" 
    ? ideas 
    : ideas.filter(idea => idea.tag === selectedTag);

  return (
    <div className="relative z-10 w-full max-w-5xl mx-auto px-4 mt-8 pb-16">
      
      {/* ── TOOLBAR / GENERATION INPUT ── */}
      <div className="mb-8">
        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row items-stretch gap-6">
          <div className={`relative flex-1 border-[4px] border-black rounded-[24px] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${
            darkMode 
              ? "bg-[#16161b] text-white" 
              : "bg-white text-black"
          } overflow-hidden group`}>
            
            {/* Cartoon Badge */}
            <div className="absolute left-0 top-0 bottom-0 bg-[#FFDE59] text-black border-r-[3px] border-black flex items-center justify-center px-5 font-mono text-xs font-black uppercase tracking-wider select-none italic transform -skew-x-[6deg] origin-left -translate-x-[1px]">
              TEMA ⚙
            </div>

            <input
              id="ideas-search-input"
              type="text"
              value={themeInput}
              onChange={(e) => setThemeInput(e.target.value)}
              disabled={isLocked || loading}
              placeholder="ex: gravidade, pixel art, sintetizadores, espaço... ou em branco"
              className={`w-full pl-28 pr-6 py-5 font-black text-sm md:text-base focus:outline-none bg-transparent transition-all duration-150 ${
                darkMode ? "text-white placeholder-neutral-400" : "text-black placeholder-neutral-500"
              }`}
            />
          </div>
          
          <button
            id="ideas-search-button"
            type="submit"
            aria-disabled={isLocked || loading}
            onClick={(e) => {
              if (isLocked || loading) {
                e.preventDefault();
              }
            }}
            className={`px-8 py-5 rounded-[24px] font-mono text-sm font-black flex items-center justify-center gap-2.5 select-none transition-all duration-100 border-[4px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${
              isLocked || loading
                ? "bg-neutral-500 text-neutral-300 cursor-not-allowed"
                : "bg-[#FF5757] hover:bg-[#ff3c3c] text-white cursor-none active:translate-y-1 active:shadow-none"
            }`}
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Dando asas à imaginação...
              </>
            ) : (
              <>
                <Compass className="w-4 h-4" />
                ✦ GERAR IDEIAS DE SITES
              </>
            )}
          </button>
        </form>
      </div>

      {/* ── CATEGORY FILTERS ── */}
      <div id="ideas-category-filters" className="flex flex-wrap items-center justify-center gap-3 mb-8">
        {tagsList.map((tag) => {
          const TagIcon = tag.icon;
          const isActive = selectedTag === tag.value;
          return (
            <button
              key={tag.value}
              disabled={isLocked}
              onClick={() => {
                playCartoonClick();
                setSelectedTag(tag.value);
              }}
              className={`px-5 py-2.5 rounded-2xl border-[3px] border-black font-mono text-xs font-black cursor-none select-none flex items-center gap-2 hover:translate-y-[-2px] active:translate-y-0 transition-all duration-150 hover:animate-pulse ${
                isActive
                  ? `${tag.activeBg} shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]`
                  : `${darkMode ? "bg-neutral-800 text-neutral-250 hover:bg-neutral-700" : "bg-white text-black hover:bg-neutral-100"} shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]`
              }`}
            >
              <TagIcon className="w-3.5 h-3.5" />
              {tag.label}
            </button>
          );
        })}
      </div>

      {/* ── IDEAS GRID SECTION WITH LOCK OVERLAY ── */}
      <div id="ideas-grid-section" className={`relative rounded-3xl border-[4px] border-black overflow-hidden shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] min-h-[350px] transition-colors duration-300 ${
        darkMode ? "bg-[#1E1E24]" : "bg-white"
      }`}>
        
        {/* Render cards */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 divide-y divide-x divide-black border-black transition duration-500 ${
          darkMode ? "bg-black" : "bg-neutral-200"
        } ${isLocked ? "blur-sm select-none pointer-events-none" : ""}`}>
          {loading ? (
            // Skeletons during generation
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className={`p-8 animate-pulse flex flex-col gap-3 min-h-[220px] ${
                darkMode ? "bg-[#16161b]" : "bg-white"
              }`}>
                <div className={`w-20 h-6 rounded border-2 border-black ${darkMode ? "bg-neutral-800" : "bg-neutral-200"}`} />
                <div className={`w-3/4 h-8 rounded border-2 border-black mt-2 ${darkMode ? "bg-neutral-800" : "bg-neutral-200"}`} />
                <div className={`w-full h-4 rounded mt-2 ${darkMode ? "bg-neutral-700" : "bg-neutral-200"}`} />
                <div className={`w-5/6 h-4 rounded ${darkMode ? "bg-neutral-700" : "bg-neutral-200"}`} />
              </div>
            ))
          ) : filteredIdeas.length === 0 ? (
            <div className={`col-span-full py-24 px-4 text-center transition-colors duration-300 ${
              darkMode ? "bg-[#1E1E24]" : "bg-white"
            }`}>
              <Compass className={`w-12 h-12 mx-auto mb-4 animate-bounce ${darkMode ? "text-white" : "text-black"}`} />
              <p className={`font-mono text-sm font-black uppercase ${darkMode ? "text-white" : "text-black"}`}>
                Vazio! Nenhuma ideia nesta categoria. Redefina o tema ou filtre novamente!
              </p>
            </div>
          ) : (
            filteredIdeas.map((idea, index) => (
              <motion.div
                key={idea.id}
                initial={{ opacity: 0, scale: 0.93, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  duration: 0.35,
                  ease: [0.175, 0.885, 0.32, 1.1], // Custom playful elastic ease-out curve
                  delay: Math.min(index * 0.04, 0.3) // Incremental staggered lag capped to 0.3s max
                }}
                onClick={() => {
                  playCartoonClick();
                  onSelectIdea(idea);
                }}
                className={`group relative p-8 transition-colors duration-200 cursor-none flex flex-col justify-between min-h-[260px] ${
                  darkMode
                    ? idea.featured 
                      ? "md:col-span-2 bg-[#17171d] hover:bg-[#202028]" 
                      : "bg-[#1E1E24] hover:bg-[#202028]"
                    : idea.featured 
                      ? "md:col-span-2 bg-[#FFFFF2] hover:bg-[#FFFCE6]" 
                      : "bg-white hover:bg-[#FFFCE6]"
                }`}
              >
                <div>
                  <div className="flex justify-between items-center mb-4">
                    {/* Badge Category Tag */}
                    <span
                      className={`font-mono text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
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

                    {/* ID Tag */}
                    <span className={`font-mono font-black text-xs italic ${
                      darkMode ? "text-neutral-400" : "text-black"
                    }`}>
                      #{String(idea.id).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className={`font-black mb-3 italic tracking-tight uppercase leading-tight transition-colors duration-200 ${
                    darkMode ? "text-white" : "text-black"
                  } ${
                    idea.featured ? "text-2xl sm:text-3xl" : "text-xl"
                  }`}>
                    {idea.title}
                  </h3>

                  {/* Description */}
                  <p className={`text-sm font-medium leading-relaxed mb-6 transition-colors duration-200 ${
                    darkMode ? "text-neutral-350" : "text-neutral-700"
                  }`}>
                    {idea.short}
                  </p>
                </div>

                {/* Arrow hint */}
                <div className={`flex items-center gap-2 font-mono text-xs font-black underline group-hover:no-underline transition-colors duration-150 ${
                  darkMode ? "text-neutral-200 hover:text-[#38B6FF]" : "text-black hover:text-[#5271FF]"
                }`}>
                  VER DETALHES <span>➜</span>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* ── LOCKED OVERLAY (When simulateNoKey or noKey is active) ── */}
        {isLocked && (
          <div 
            onClick={() => playErrorBuzz()}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-8 bg-black/80 backdrop-blur-[2px] select-all cursor-none"
          >
            
            {/* Lock Cartoon Animation vector style (Lock Overlay) */}
            <div className="bg-[#FF3131] p-8 border-[6px] border-white rounded-[40px] shadow-[12px_12px_0px_0px_rgba(255,255,255,0.15)] max-w-md w-full animate-bounce">
              <div className="text-6xl mb-4">🚫</div>
              <h2 className="text-white text-4.5xl font-black italic mb-3 tracking-tight uppercase">
                LISTA BLOQUEADA
              </h2>
              <p className="text-white font-bold text-sm tracking-wide leading-relaxed mb-4">
                Por favor, ative os parâmetros ou simule novamente para desbloquear o motor criativo!
              </p>
              <div className="h-4 w-full bg-black border-2 border-white rounded-full overflow-hidden">
                <div className="h-full bg-white w-2/3 animate-pulse"></div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
