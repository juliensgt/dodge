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
  getThemeColors,
} from "@/enums/themes/ThemeManager";
import { ThemeColors } from "@/enums/themes/Theme";
import { getCardSkin, CardSkin } from "@/enums/skins/SkinManager";
import { collectionService } from "@/services/collection/collection.service";
import { useAuth } from "@/contexts/AuthContext";
import { ITheme } from "@/enums/themes/ITheme";

interface CollectionContextType {
  // setters
  setTheme: (theme: ThemeType) => void;
  setSkin: (skin: string) => void;

  // getters
  getCurrentTheme: () => ITheme;
  getCurrentSkin: () => CardSkin;
  getCurrentThemeColors: () => ThemeColors;
}

const CollectionContext = createContext<CollectionContextType | undefined>(
  undefined
);

interface CollectionProviderProps {
  children: ReactNode;
}

export function CollectionProvider({ children }: CollectionProviderProps) {
  const { isAuthenticated } = useAuth();
  const [currentTheme, setCurrentTheme] =
    useState<ThemeType>(getDefaultTheme());
  const [currentSkin, setCurrentSkin] = useState<string>("default");

  // Load collection from API on mount and when authenticated
  useEffect(() => {
    const loadCollection = async () => {
      if (!isAuthenticated) return;

      try {
        const collection = await collectionService.getCollection();
        setCurrentTheme(collection?.selectedCollection?.theme as ThemeType);
        setCurrentSkin(collection?.selectedCollection?.skin);
      } catch (error) {
        console.error("Error loading collection:", error);
      }
    };

    loadCollection();
  }, [isAuthenticated]);

  const setTheme = async (theme: ThemeType) => {
    setCurrentTheme(theme);

    if (isAuthenticated) {
      try {
        await collectionService.updateEquipped(undefined, theme);
      } catch (error) {
        console.error("Error updating theme:", error);
      }
    }
  };

  const setSkin = async (skin: string) => {
    setCurrentSkin(skin);

    if (isAuthenticated) {
      try {
        await collectionService.updateEquipped(skin, undefined);
      } catch (error) {
        console.error("Error updating skin:", error);
      }
    }
  };

  const getCurrentSkin = () => {
    return getCardSkin(currentSkin);
  };

  const getCurrentTheme = () => {
    return getTheme(currentTheme);
  };

  const getCurrentThemeColors = () => {
    return getThemeColors(currentTheme);
  };

  const value: CollectionContextType = {
    //getters
    getCurrentTheme,
    getCurrentSkin,
    getCurrentThemeColors,
    //setters
    setTheme,
    setSkin,
  };

  return (
    <CollectionContext.Provider value={value}>
      {children}
    </CollectionContext.Provider>
  );
}

export function useCollection() {
  const context = useContext(CollectionContext);
  if (context === undefined) {
    throw new Error("useCollection must be used within a CollectionProvider");
  }
  return context;
}
