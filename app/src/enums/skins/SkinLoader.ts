import { lazy, ComponentType } from "react";
import { Size } from "@/scripts/references/playerLayouts";

// Map des IDs de skins vers leurs imports dynamiques
const skinImportMap: Record<
  string,
  () => Promise<{ default: ComponentType<{ size?: Size }> }>
> = {
  default: () => import("./list/DefaultSkin"),
  classic: () => import("./list/ClassicSkin"),
  neon: () => import("./list/NeonSkin"),
  pixelArt: () => import("./list/PixelArtSkin"),
  galaxy: () => import("./list/GalaxySkin"),
  paper: () => import("./list/PaperSkin"),
  cyber: () => import("./list/CyberSkin"),
  barbie: () => import("./list/BarbieSkin"),
};

// Cache des composants lazy déjà créés pour éviter les re-créations
const lazyComponentCache: Record<string, ComponentType<{ size?: Size }>> = {};

/**
 * Obtient un composant lazy pour un skin donné
 * @param skinId - ID du skin
 * @returns Composant lazy React ou le composant par défaut si le skin n'existe pas
 */
export function getSkinLoader(skinId: string): ComponentType<{ size?: Size }> {
  const normalizedId = skinId || "default";
  const importFn = skinImportMap[normalizedId];

  if (!importFn) {
    // Fallback vers default si le skin n'existe pas
    return getSkinLoader("default");
  }

  // Retourner depuis le cache si déjà créé
  if (lazyComponentCache[normalizedId]) {
    return lazyComponentCache[normalizedId];
  }

  // Créer un nouveau lazy component
  const LazyComponent = lazy(importFn);
  lazyComponentCache[normalizedId] = LazyComponent;

  return LazyComponent;
}

/**
 * Précharge un skin en forçant son import
 * @param skinId - ID du skin à précharger
 * @returns Promise qui se résout quand le skin est chargé
 */
export function preloadSkin(skinId: string): Promise<void> {
  const normalizedId = skinId || "default";
  const importFn = skinImportMap[normalizedId];

  if (!importFn) {
    // Précharger le default si le skin n'existe pas
    return preloadSkin("default");
  }

  // Si déjà dans le cache, la promesse est déjà résolue
  if (lazyComponentCache[normalizedId]) {
    return Promise.resolve();
  }

  // Forcer l'import pour précharger
  return importFn().then(() => {
    // Créer le lazy component après l'import pour qu'il soit dans le cache
    getSkinLoader(normalizedId);
  });
}

/**
 * Précharge plusieurs skins en parallèle
 * @param skinIds - Liste des IDs de skins à précharger
 * @returns Promise qui se résout quand tous les skins sont chargés
 */
export function preloadSkins(skinIds: string[]): Promise<void[]> {
  return Promise.all(skinIds.map((id) => preloadSkin(id)));
}
