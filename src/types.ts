export interface Idea {
  id: number;
  title: string;
  tag: 'visual' | 'interativo' | 'dados' | 'audio';
  tagLabel: string;
  short: string;
  desc: string;
  features: string[];
  featured: boolean;
}

export interface ApiStatus {
  hasKey: boolean;
  automatic: boolean;
  modelUsed: string;
  message: string;
}
