import { Injectable, BadRequestException } from '@nestjs/common';
import { GameService } from '../../routes/game/game.service';
import { ErrorEnum } from '../../enums/errors/error.enum';
//import { PlayerWithId } from 'src/routes/players/player.schema';
import { GameState } from 'src/enums/game-state.enum';
import { UserService } from '../../routes/user/user.service';

@Injectable()
export class ValidationService {
  constructor(
    private readonly gameService: GameService,
    private readonly userService: UserService,
  ) {}

  /*async validatePlayerTurn(gameId: string, playerId: string): Promise<void> {
    const isPlayerTurn = await this.gameService.isTourOfPlayer(gameId, playerId);
    if (!isPlayerTurn) {
      throw new BadRequestException('Not your turn', ErrorEnum['game/not-your-turn']);
    }
  }*/

  /*async validateIntervention(
    gameId: string,
    playerId: string,
    targetPlayerId: string,
  ): Promise<void> {
    // Vérifier que le joueur peut intervenir
    const game = await this.gameService.findOne(gameId);

    // Vérifier que ce n'est pas le tour du joueur qui intervient
    const isPlayerTurn = await this.gameService.isTourOfPlayer(gameId, playerId);
    if (isPlayerTurn) {
      throw new BadRequestException(
        'Cannot intervene during your own turn',
        ErrorEnum['game/cannot-intervene-own-turn'],
      );
    }

    // Vérifier que le joueur cible existe dans la partie
    const targetPlayer = game.players.find(
      (p) => (p as PlayerWithId)._id.toString() === targetPlayerId,
    );
    if (!targetPlayer) {
      throw new BadRequestException('Target player not found', ErrorEnum['player/not-found']);
    }
  }*/

  async validateInterventionResponse() //gameId: string,
  //playerId: string,
  //interventionId: string,
  : Promise<void> {
    // Vérifier que le joueur peut répondre à l'intervention
    //const game = await this.gameService.findOne(gameId);
    // Logique de validation spécifique aux réponses d'intervention
    // TODO: Implémenter selon les règles du jeu
  }

  async validateGameState(gameId: string, requiredState: GameState): Promise<void> {
    const game = await this.gameService.findOne(gameId);
    if (game.gameState !== requiredState) {
      throw new BadRequestException(
        `Game must be in ${requiredState} state`,
        ErrorEnum['game/invalid-state'],
      );
    }
  }

  async validateGameId(gameId: string): Promise<void> {
    const game = await this.gameService.findOne(gameId);
    if (!game) {
      throw new BadRequestException('Game not found', ErrorEnum['game/not-found']);
    }
  }

  async validateUserId(userId: string): Promise<void> {
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new BadRequestException('User not found', ErrorEnum['user/not-found']);
    }
  }
}
