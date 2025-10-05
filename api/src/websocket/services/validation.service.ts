import { Injectable, BadRequestException } from '@nestjs/common';
import { GameService } from '../../routes/game/game.service';
import { ErrorEnum } from '../../enums/errors/error.enum';
import { GameState } from 'src/enums/game-state.enum';
import { UserService } from '../../routes/user/user.service';
import { Game } from 'src/routes/game/game.schema';
import { User } from 'src/routes/user/user.schema';
import { Player } from 'src/routes/players/player.schema';
import { PlayerService } from 'src/routes/players/player.service';

@Injectable()
export class ValidationService {
  constructor(
    private readonly gameService: GameService,
    private readonly userService: UserService,
    private readonly playerService: PlayerService,
  ) {}

  async validateGameState(gameId: string, requiredState: GameState): Promise<void> {
    const game = await this.gameService.findOne(gameId);
    if (game.state !== requiredState) {
      throw new BadRequestException(
        `Game must be in ${requiredState} state`,
        ErrorEnum['game/invalid-state'],
      );
    }
  }

  async validateGameId(gameId: string): Promise<Game> {
    const game = await this.gameService.findOne(gameId);
    if (!game) {
      console.error('Game not found', gameId);
      throw new BadRequestException('Game not found', ErrorEnum['game/not-found']);
    }
    return game;
  }

  async validateUserId(userId: string): Promise<User> {
    const user = await this.userService.findBySupabaseId(userId);
    if (!user) {
      console.log('User not found', userId);
      throw new BadRequestException('User not found', ErrorEnum['user/not-found']);
    }
    return user;
  }

  async validateGameAndPlayer(gameId: string, playerId: string): Promise<Player> {
    const player = await this.playerService.findPlayerByGameAndPlayer(gameId, playerId);
    if (!player) {
      throw new BadRequestException('Player not found', ErrorEnum['player/not-found']);
    }
    return player;
  }
}
