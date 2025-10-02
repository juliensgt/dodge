import { Injectable, BadRequestException } from '@nestjs/common';
import { GameService } from '../../routes/game/game.service';
import { ErrorEnum } from '../../enums/errors/error.enum';
import { GameState } from 'src/enums/game-state.enum';
import { UserService } from '../../routes/user/user.service';
import { UserWithId } from 'src/routes/user/user.schema';
import { GameWithId } from 'src/routes/game/game.schema';

@Injectable()
export class ValidationService {
  constructor(
    private readonly gameService: GameService,
    private readonly userService: UserService,
  ) {}

  async validateGameState(gameId: string, requiredState: GameState): Promise<void> {
    const game = await this.gameService.findOne(gameId);
    if (game.gameState !== requiredState) {
      throw new BadRequestException(
        `Game must be in ${requiredState} state`,
        ErrorEnum['game/invalid-state'],
      );
    }
  }

  async validateGameId(gameId: string): Promise<GameWithId> {
    const game = await this.gameService.findOne(gameId);
    if (!game) {
      throw new BadRequestException('Game not found', ErrorEnum['game/not-found']);
    }
    return game;
  }

  async validateUserId(userId: string): Promise<UserWithId> {
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new BadRequestException('User not found', ErrorEnum['user/not-found']);
    }
    return user;
  }
}
