import { Injectable } from '@nestjs/common';
import { GameService } from '../../routes/game/game.service';
import { BroadcastService } from '../services/broadcast.service';
import { ValidationService } from '../services/validation.service';
//import { TurnEvents } from '../events/turn.events';

@Injectable()
export class TurnHandler {
  constructor(
    private readonly gameService: GameService,
    private readonly broadcastService: BroadcastService,
    private readonly validationService: ValidationService,
  ) {}

  /**
   * WORKFLOW ÉTAPE 2: GET_CARD_IN_DECK_OR_DEFAUSSE
   * Le joueur choisit entre tirer une carte du deck ou de la défausse
   *
   * @param gameId - ID de la partie
   * @param playerId - ID du joueur qui fait l'action
   * @param choice - Choix du joueur: 'deck' ou 'defausse'
   */
  /*async handleGetCardInDeckOrDefausse(
    gameId: string,
    playerId: string,
    choice: 'deck' | 'defausse',
  ) {
    // Validation: vérifier que c'est bien le tour du joueur
    await this.validationService.validatePlayerTurn(gameId, playerId);

    // Logique métier: récupérer l'état de la partie
    const game = await this.gameService.findOne(gameId);

    // Broadcast: notifier tous les joueurs du choix effectué
    this.broadcastService.broadcastToGame(gameId, TurnEvents.CARD_SOURCE_CHOSEN as string, {
      playerId,
      choice,
      gameState: game.gameState,
    });

    return { success: true, choice };
  }*/

  /**
   * WORKFLOW ÉTAPE 3A: SWITCH_WITH_DECK
   * Le joueur tire une carte du deck et peut soit:
   * - deckToDefausse: déposer la carte dans la défausse
   * - deckToPlayer: échanger avec une carte de sa main
   *
   * @param gameId - ID de la partie
   * @param playerId - ID du joueur qui fait l'action
   * @param action - Type d'action: 'deckToDefausse' ou 'deckToPlayer'
   * @param targetCardId - ID de la carte à échanger (requis pour deckToPlayer)
   */
  /*async handleSwitchWithDeck(
    gameId: string,
    playerId: string,
    //action: 'deckToDefausse' | 'deckToPlayer',
    //targetCardId?: string,
  ) {
    // Validation: vérifier que c'est bien le tour du joueur
    await this.validationService.validatePlayerTurn(gameId, playerId);

    // Logique métier: effectuer l'échange avec le deck
    const result: any = await this.gameService.switchWithDeck(
      gameId,
      playerId,
      action,
      targetCardId,
    );

    // Broadcast: notifier tous les joueurs de l'échange effectué
    this.broadcastService.broadcastToGame(
      gameId,
      TurnEvents.CARD_SWITCHED as string,
      {
        playerId,
        action,
        result,
      },
    );

    return { success: true, result: null };
  }*/

  /**
   * WORKFLOW ÉTAPE 3B: SWITCH_WITH_DEFAUSSE
   * Le joueur tire une carte de la défausse et échange avec une carte de sa main
   *
   * @param gameId - ID de la partie
   * @param playerId - ID du joueur qui fait l'action
   * @param targetCardId - ID de la carte de sa main à échanger
   */
  /*async handleSwitchWithDefausse(
    gameId: string,
    playerId: string,
    //targetCardId: string,
  ) {
    // Validation: vérifier que c'est bien le tour du joueur
    await this.validationService.validatePlayerTurn(gameId, playerId);

    // Logique métier: effectuer l'échange avec la défausse
    const result: any = await this.gameService.switchWithDefausse(
      gameId,
      playerId,
      targetCardId,
    );

    // Broadcast: notifier tous les joueurs de l'échange effectué
    /*  this.broadcastService.broadcastToGame(
      gameId,
      TurnEvents.CARD_SWITCHED as string,
      {
        playerId,
        action: 'defausseToPlayer',
        result,
      },
    );

    return { success: true, result: null };
  }*/

  /**
   * WORKFLOW ÉTAPE 7: FIN DU TOUR
   * Le joueur termine son tour, passage au joueur suivant
   *
   * @param gameId - ID de la partie
   * @param playerId - ID du joueur qui termine son tour
   */
  /*async handleEndTurn(gameId: string, playerId: string) {
    // Validation: vérifier que c'est bien le tour du joueur
    await this.validationService.validatePlayerTurn(gameId, playerId);

    // Logique métier: passer au joueur suivant
    const nextPlayer: string = await this.gameService.endTurn(gameId, playerId);

    // Broadcast: notifier tous les joueurs du changement de tour
    this.broadcastService.broadcastToGame(
      gameId,
      TurnEvents.TURN_ENDED as string,
      {
        previousPlayerId: playerId,
        nextPlayerId: nextPlayer,
      },
    );

    return { success: true, nextPlayer: null };
  } */
}
