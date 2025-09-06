export enum ThemeType {
  PURPLE = "purple",
  OCEAN = "ocean",
  FOREST = "forest",
  SUNSET = "sunset",
  NEON = "neon",
  MONOCHROME = "monochrome",
}

export interface Theme {
  id: ThemeType;
  name: string;
  description: string;
  preview: string; // Classe CSS pour l'aperçu
}
