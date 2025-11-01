import { useEffect } from "react";
import { startTransition } from "react";
import { preloadSkin, preloadSkins } from "@/enums/skins/SkinLoader";

/**
 * Hook pour précharger un skin de manière non-bloquante
 * @param skinId - ID du skin à précharger
 * @param immediate - Si true, précharge immédiatement, sinon utilise startTransition
 */
export function useSkinPreloader(skinId: string, immediate = false) {
  useEffect(() => {
    if (!skinId) return;

    const preload = () => {
      preloadSkin(skinId).catch((error) => {
        console.warn(`Failed to preload skin ${skinId}:`, error);
      });
    };

    if (immediate) {
      preload();
    } else {
      // Utiliser startTransition pour ne pas bloquer le rendu
      startTransition(() => {
        preload();
      });
    }
  }, [skinId, immediate]);
}

/**
 * Hook pour précharger plusieurs skins en parallèle
 * @param skinIds - Liste des IDs de skins à précharger
 * @param immediate - Si true, précharge immédiatement, sinon utilise startTransition
 */
export function useSkinsPreloader(skinIds: string[], immediate = false) {
  useEffect(() => {
    if (!skinIds || skinIds.length === 0) return;

    const preload = () => {
      preloadSkins(skinIds).catch((error) => {
        console.warn(`Failed to preload skins:`, error);
      });
    };

    if (immediate) {
      preload();
    } else {
      startTransition(() => {
        preload();
      });
    }
  }, [skinIds, immediate]);
}
