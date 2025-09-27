export enum InterventionEvents {
  // ===== SYSTÈME D'INTERVENTIONS =====
  //TODO : look at this

  // Un joueur utilise une intervention contre un autre joueur
  // (pendant la phase d'interventions ouverte)
  INTERVENTION_USED = 'intervention:used',

  // Le joueur ciblé répond à une intervention (accepte ou refuse)
  INTERVENTION_RESPONSE = 'intervention:response',

  // Fin de la phase d'interventions (fermeture des interventions)
  INTERVENTION_PHASE_ENDED = 'intervention:phase-ended',

  // Une intervention est annulée (par exemple, si le joueur ciblé joue une carte de défense)
  INTERVENTION_CANCELLED = 'intervention:cancelled',
}
