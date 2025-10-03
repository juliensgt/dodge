export enum GameEvents {
  // ===== ÉTATS DE JEU GLOBAUX =====

  // La partie commence (passage de WAITING à STARTED)
  GAME_STARTED = "game:started",

  // La partie se termine (passage à END_GAME)
  GAME_ENDED = "game:ended",

  // Un nouveau round commence (incrémentation du round)
  ROUND_STARTED = "game:round-started",

  // Un round se termine (passage à END_ROUND)
  ROUND_ENDED = "game:round-ended",

  // Un joueur rejoint la partie
  PLAYER_JOINED = "game:player-joined",

  // Un joueur quitte la partie
  PLAYER_LEFT = "game:player-left",

  // Changement d'état de jeu (WAITING → STARTED → IN_GAME → etc.)
  // TODO : look at this
  GAME_STATE_CHANGED = "game:state-changed",

  // Reset la partie
  RESET_GAME = "game:reset",
}
