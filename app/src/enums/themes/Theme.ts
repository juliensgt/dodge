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

export interface ThemeColors {
  primary: string; // Couleur hexadécimale primaire
  secondary: string; // Couleur hexadécimale secondaire
  background: string; // Couleur hexadécimale de fond
  text: string; // Couleur hexadécimale du texte
}
