import { Injectable } from '@nestjs/common';
import { GameService } from '../../routes/game/game.service';
import { BroadcastService } from '../services/broadcast.service';
import { ValidationService } from '../services/validation.service';
//import { InterventionEvents } from '../events/intervention.events';

@Injectable()
export class InterventionHandler {
  constructor(
    private readonly gameService: GameService,
    private readonly broadcastService: BroadcastService,
    private readonly validationService: ValidationService,
  ) {}

  /*async handleIntervention(
    gameId: string,
    playerId: string,
    targetPlayerId: string,
    interventionType: string,
    cardId: string,
  ) {
    await this.validationService.validateIntervention(
      gameId,
      playerId,
      targetPlayerId,
    );

    const result: any = await this.gameService.handleIntervention(
      gameId,
      playerId,
      targetPlayerId,
      interventionType,
      cardId,
    );

    this.broadcastService.broadcastToGame(
      gameId,
      InterventionEvents.INTERVENTION_USED,
      {
        playerId,
        targetPlayerId,
        interventionType,
        cardId,
        result,
      },
    );

    return { success: true, result };
  }

  async handleInterventionResponse(
    gameId: string,
    playerId: string,
    interventionId: string,
    response: 'accept' | 'decline',
  ) {
    await this.validationService.validateInterventionResponse(
      gameId,
      playerId,
      interventionId,
    );

    const result: any = await this.gameService.handleInterventionResponse(
      gameId,
      playerId,
      interventionId,
      response,
    );

    this.broadcastService.broadcastToGame(
      gameId,
      InterventionEvents.INTERVENTION_RESPONSE,
      {
        playerId,
        interventionId,
        response,
        result,
      },
    );

    return { success: true, result };
  }

  async handleEndInterventionPhase(gameId: string, playerId: string) {
    await this.validationService.validatePlayerTurn(gameId, playerId);

    const result: any = await this.gameService.endInterventionPhase(gameId);

    this.broadcastService.broadcastToGame(
      gameId,
      InterventionEvents.INTERVENTION_PHASE_ENDED,
      {
        playerId,
        result,
      },
    );

    return { success: true, result };
  }*/
}
