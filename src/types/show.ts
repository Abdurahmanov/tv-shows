export interface ShowData {
  id: number;
  name: string;
  image?: { original: string; medium: string };
  genres: string[];
  language?: string;
  status?: string;
  premiered?: string;
  rating?: { average?: number };
  network?: { name?: string };
  summary?: string;
}

export interface GroupedShows {
  [genre: string]: ShowData[];
}
