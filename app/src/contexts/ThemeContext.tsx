import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { ThemeType } from "@/enums/themes/Theme";
import {
  getTheme,
  getDefaultTheme,
  getAllThemes,
  getThemeColors,
  GradientTheme,
} from "@/enums/themes/ThemeManager";
import { ThemeColors } from "@/enums/themes/Theme";
import { getUnlockedSkins, getCardSkin } from "@/enums/skins/SkinManager";

interface ThemeContextType {
  currentTheme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  availableThemes: ReturnType<typeof getAllThemes>;
  getCurrentTheme: () => GradientTheme;
  getCurrentThemeColors: () => ThemeColors;
  // Card skin management
  selectedSkinId: string;
  selectSkin: (skinId: string) => void;
  getUnlockedSkins: () => ReturnType<typeof getUnlockedSkins>;
  getCardSkin: (skinId: string) => ReturnType<typeof getCardSkin>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [currentTheme, setCurrentThemeState] =
    useState<ThemeType>(getDefaultTheme());
  const [selectedSkinId, setSelectedSkinId] = useState<string>("default");

  useEffect(() => {
    const savedTheme = localStorage.getItem("dodge-theme");
    if (
      savedTheme &&
      Object.values(ThemeType).includes(savedTheme as ThemeType)
    ) {
      setCurrentThemeState(savedTheme as ThemeType);
    }

    const savedSkin = localStorage.getItem("dodge-card-skin");
    if (savedSkin) {
      setSelectedSkinId(savedSkin);
    }
  }, []);

  const setTheme = (theme: ThemeType) => {
    setCurrentThemeState(theme);
    localStorage.setItem("dodge-theme", theme);
  };

  const selectSkin = (skinId: string) => {
    setSelectedSkinId(skinId);
    localStorage.setItem("dodge-card-skin", skinId);
  };

  const getCurrentTheme = () => {
    return getTheme(currentTheme);
  };

  const getCurrentThemeColors = () => {
    return getThemeColors(currentTheme);
  };

  const value: ThemeContextType = {
    currentTheme,
    setTheme,
    availableThemes: getAllThemes(),
    getCurrentTheme,
    getCurrentThemeColors,
    // Card skin management
    selectedSkinId,
    selectSkin,
    getUnlockedSkins,
    getCardSkin,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
