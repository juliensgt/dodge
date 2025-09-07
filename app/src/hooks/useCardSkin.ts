import { useTheme } from "@/contexts/ThemeContext";

export function useCardSkin() {
  const theme = useTheme();

  return {
    selectedSkinId: theme.selectedSkinId,
    selectSkin: theme.selectSkin,
    getUnlockedSkins: theme.getUnlockedSkins,
    getCardSkin: theme.getCardSkin,
  };
}
