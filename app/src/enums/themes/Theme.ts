import { CardSkinRarity } from "../skins/SkinRarity";

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
  type: "skin" | "theme";
  name: string;
  description: string;
  preview: string; // Classe CSS pour l'aperçu
  price: number;
  originalPrice?: number;
  discount?: number;
  rarity?: CardSkinRarity;
  theme: unknown;
}

export interface ThemeColors {
  primary: string; // Couleur hexadécimale primaire
  secondary: string; // Couleur hexadécimale secondaire
  background: string; // Couleur hexadécimale de fond
  text: string; // Couleur hexadécimale du texte
}
