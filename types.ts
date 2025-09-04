
export interface ContentItem {
  id: string;
  title: string;
  synopsis: string;
  year: number;
  rating: number;
  genres: string[];
  posterUrl: string;
}

export interface Ambiance {
  mood: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  musicSuggestion: string;
}

export enum ContentType {
  MOVIES = 'movies',
  SERIES = 'series',
  ANIME = 'anime',
}

export enum View {
    HOME = 'HOME',
    DETAILS = 'DETAILS',
}
