import { Injectable } from '@nestjs/common';
import { GameService } from '../../routes/game/game.service';
import { ValidationService } from '../services/validation.service';
//import { CardEvents } from '../events/card.events';
import { BroadcastService } from '../services/broadcast.service';

@Injectable()
export class CardHandler {
  constructor(
    private readonly gameService: GameService,
    private readonly broadcastService: BroadcastService,
    private readonly validationService: ValidationService,
  ) {}

  /*async handlePlayCard(gameId: string, playerId: string, cardId: string) {
    await this.validationService.validatePlayerTurn(gameId, playerId);

    const result = await this.gameService.playCard(gameId, playerId, cardId);

    this.broadcastService.broadcastToGame(gameId, CardEvents.CARD_PLAYED, {
      playerId,
      cardId,
      result,
    });

    return { success: true, result };
  }

  async handleSpecialCard(
    gameId: string,
    playerId: string,
    cardId: string,
    specialAction: string,
  ) {
    await this.validationService.validatePlayerTurn(gameId, playerId);

    const result: any = await this.gameService.handleSpecialCard(
      gameId,
      playerId,
      cardId,
      specialAction,
    );

    this.broadcastService.broadcastToGame(
      gameId,
      CardEvents.SPECIAL_CARD_USED,
      {
        playerId,
        cardId,
        specialAction,
        result,
      },
    );

    return { success: true, result };
  }

  async handleDodge(gameId: string, playerId: string) {
    await this.validationService.validatePlayerTurn(gameId, playerId);

    const result: any = await this.gameService.dodge(gameId, playerId);

    this.broadcastService.broadcastToGame(
      gameId,
      CardEvents.PLAYER_DODGED as string,
      {
        playerId,
        result,
      },
    );

    return { success: true, result };
  }*/
}
