export interface Achievement {
  id: string;
  title: string;
  description: string;
  emoji: string;
  category: 'clicks' | 'themes' | 'searches' | 'locks' | 'builds' | 'secret';
  target: number;
}

export interface UserProgress {
  clicks: number; // number of unique idea clicks
  themes: number; // number of theme changes
  searches: number; // number of idea searches/genres
  locks: number; // number of times blocked/error buzzed
  builds: number; // number of websites successfully built
  unlockedList: string[]; // List of unlocked achievement IDs
  clickedIds: number[]; // Set of idea IDs clicked to check uniqueness
  fastClicks?: number; // Secret tap/click speed indicator
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "idea_hunter",
    title: "Caçador de Ideias",
    description: "Curioso nato! Abra e explore os detalhes técnicos de 3 de nossas mentes criativas.",
    emoji: "🔎",
    category: "clicks",
    target: 3
  },
  {
    id: "portal_master",
    title: "Mestre do Portal",
    description: "Criador de canais! Transforme sonhos em código gerando 2 sites de IA completos.",
    emoji: "🔮",
    category: "builds",
    target: 2
  },
  {
    id: "chameleon",
    title: "Mestre Camaleão",
    description: "Viajante planar! Transite entre os planos de luz e trevas alternando o tema 3 vezes.",
    emoji: "🦎",
    category: "themes",
    target: 3
  },
  {
    id: "insistent",
    title: "Ultra Insistente",
    description: "Teimosia criativa! Tente invocar recursos enquanto estão bloqueados na simulação por 3 vezes.",
    emoji: "💥",
    category: "locks",
    target: 3
  },
  {
    id: "cosmonaut",
    title: "Cosmonauta do Tema",
    description: "Explorador de conceitos! Faça 2 pesquisas ou requisições personalizadas pelo input de tema.",
    emoji: "🚀",
    category: "searches",
    target: 2
  },
  {
    id: "click_click_boom",
    title: "Click Click Boom",
    description: "Metralhadora de cliques! Ative o easter egg clicando 10 vezes super rápido na tela.",
    emoji: "💣",
    category: "secret",
    target: 10
  }
];

export const INITIAL_PROGRESS: UserProgress = {
  clicks: 0,
  themes: 0,
  searches: 0,
  locks: 0,
  builds: 0,
  unlockedList: [],
  clickedIds: [],
  fastClicks: 0
};

export function getSavedProgress(): UserProgress {
  try {
    const saved = localStorage.getItem("cartoon_achievements_progress");
    if (saved) {
      const parsed = JSON.parse(saved);
      // Ensure compatibility if any missing key
      return {
        ...INITIAL_PROGRESS,
        ...parsed,
        unlockedList: parsed.unlockedList || [],
        clickedIds: parsed.clickedIds || []
      };
    }
  } catch (e) {
    console.error("Error reading achievements progress:", e);
  }
  return { ...INITIAL_PROGRESS };
}

export function saveProgress(progress: UserProgress) {
  try {
    localStorage.setItem("cartoon_achievements_progress", JSON.stringify(progress));
  } catch (e) {
    console.error("Error saving achievements progress:", e);
  }
}
