import { useAnimationStore } from "@/store/animations";

export const useBannerUtils = () => {
  const { showBanner } = useAnimationStore();

  return {
    // Messages de jeu
    showGameStart: () => showBanner("Début de partie !", 3000),
    showRoundStart: (roundNumber: number) =>
      showBanner(`Manche ${roundNumber}`, 2500),
    showRoundEnd: (roundNumber: number) =>
      showBanner(`Fin de la manche ${roundNumber}`, 2000),
    showGameEnd: () => showBanner("Fin de partie !", 4000),

    // Messages de victoire/défaite
    showVictory: (playerName: string) =>
      showBanner(`${playerName} a gagné !`, 5000),
    showDefeat: () => showBanner("Défaite !", 3000),
    showDraw: () => showBanner("Match nul !", 3000),

    // Messages d'action
    showCardPlayed: (cardName: string) =>
      showBanner(`${cardName} jouée !`, 2000),
    showSpecialAction: (actionName: string) => showBanner(actionName, 3000),
    showError: (message: string) => showBanner(`Erreur: ${message}`, 4000),

    // Messages de statut
    showWaiting: (playerName: string) =>
      showBanner(`En attente de ${playerName}...`, 2000),
    showTurn: (playerName: string) => showBanner(`Tour de ${playerName}`, 2500),

    // Messages personnalisés avec durées
    showCustom: (text: string, duration: number = 3000) =>
      showBanner(text, duration),

    // Messages rapides (1-2 secondes)
    showQuick: (text: string) => showBanner(text, 1500),

    // Messages longs (5+ secondes)
    showImportant: (text: string) => showBanner(text, 6000),
  };
};

/**
 * Constantes pour les durées de bannière
 */
export const BANNER_DURATIONS = {
  QUICK: 1000, // 1 seconde - messages très rapides
  SHORT: 2000, // 2 secondes - messages courts
  NORMAL: 3000, // 3 secondes - messages standard
  LONG: 5000, // 5 secondes - messages importants
  VERY_LONG: 8000, // 8 secondes - messages très importants
} as const;

/**
 * Exemples d'utilisation :
 *
 * const bannerUtils = useBannerUtils();
 *
 * // Messages de jeu
 * bannerUtils.showGameStart();
 * bannerUtils.showRoundStart(1);
 * bannerUtils.showVictory("Alice");
 *
 * // Messages personnalisés
 * bannerUtils.showCustom("Bienvenue !", BANNER_DURATIONS.LONG);
 * bannerUtils.showQuick("Action effectuée");
 * bannerUtils.showImportant("Attention !");
 */
