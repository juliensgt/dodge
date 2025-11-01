import { useEffect } from "react";
import { StatusBar, Style } from "@capacitor/status-bar";
import { Capacitor } from "@capacitor/core";
import { useCollection } from "@/contexts/CollectionContext";
import { getThemeColors } from "@/enums/themes/ThemeManager";

/**
 * Hook qui met à jour la barre de statut en fonction du thème actuel
 */
export function useStatusBar() {
  const { currentTheme } = useCollection();

  useEffect(() => {
    // Vérifier si on est sur une plateforme native (mobile)
    if (!Capacitor.isNativePlatform()) {
      return;
    }

    const updateStatusBar = async () => {
      try {
        const themeColors = getThemeColors(currentTheme);
        const backgroundColor = themeColors.background;

        // Convertir la couleur hex en format RGBA avec alpha pour Capacitor
        // Capacitor attend le format "#RRGGBBAA" ou "#RRGGBB"
        const hexColor = backgroundColor.startsWith("#")
          ? backgroundColor
          : `#${backgroundColor}`;

        // S'assurer que la couleur est au format 8 caractères avec alpha
        let colorWithAlpha = hexColor;
        if (hexColor.length === 7) {
          // Ajouter FF pour l'opacité complète si alpha manquant
          colorWithAlpha = `${hexColor}ff`;
        }

        await StatusBar.setBackgroundColor({
          color: colorWithAlpha,
        });

        // Utiliser le style DARK car les fonds sont sombres (texte blanc)
        await StatusBar.setStyle({
          style: Style.Dark,
        });
      } catch (error) {
        // Ignorer les erreurs si le plugin n'est pas disponible
        console.warn("StatusBar plugin not available:", error);
      }
    };

    updateStatusBar();
  }, [currentTheme]);
}
