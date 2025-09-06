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
  GradientTheme,
} from "@/enums/themes/ThemeManager";

interface ThemeContextType {
  currentTheme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  availableThemes: ReturnType<typeof getAllThemes>;
  getCurrentTheme: () => GradientTheme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [currentTheme, setCurrentThemeState] =
    useState<ThemeType>(getDefaultTheme());

  useEffect(() => {
    const savedTheme = localStorage.getItem("dodge-theme");
    if (
      savedTheme &&
      Object.values(ThemeType).includes(savedTheme as ThemeType)
    ) {
      setCurrentThemeState(savedTheme as ThemeType);
    }
  }, []);

  const setTheme = (theme: ThemeType) => {
    setCurrentThemeState(theme);
    localStorage.setItem("dodge-theme", theme);
  };

  const getCurrentTheme = () => {
    return getTheme(currentTheme);
  };

  const value: ThemeContextType = {
    currentTheme,
    setTheme,
    availableThemes: getAllThemes(),
    getCurrentTheme,
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
