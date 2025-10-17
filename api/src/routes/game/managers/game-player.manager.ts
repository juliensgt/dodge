import { Injectable, NotFoundException } from '@nestjs/common';
import { ErrorEnum } from 'src/enums/errors/error.enum';
import { GameStateWithPlayer } from 'src/websocket/types/game.types';
import { PlayerService } from 'src/routes/players/player.service';
import { PlayerCreateDto } from 'src/routes/players/dto/player-create.dto';
import { User } from 'src/routes/user/user.schema';
import { UserService } from 'src/routes/user/user.service';
import { GameState } from 'src/enums/game-state.enum';
import { GameEntityManager } from './game-entity.manager';
import { GameTimerManager } from './game-timer.manager';
import { Player } from 'src/routes/players/player.schema';

@Injectable()
export class GamePlayerManager {
  constructor(
    private gameEntityManager: GameEntityManager,
    private gameTimerManager: GameTimerManager,
    private playerService: PlayerService,
    private userService: UserService,
  ) {}

  async addPlayer(gameId: string, user: User): Promise<GameStateWithPlayer> {
    let player = await this.playerService.findByGameAndUser(gameId, user._id.toString());
    let gameData = await this.gameEntityManager.findOne(gameId);

    if (gameData.state !== GameState.WAITING && !player) {
      throw new NotFoundException('Game is not in waiting state', ErrorEnum['game/invalid-state']);
    } else if (gameData.players.length >= gameData.options.maxPlayers && !player) {
      throw new NotFoundException('Game is full', ErrorEnum['game/game-full']);
    }

    if (!player) {
      const playerCreateDto: PlayerCreateDto = { game: gameData, user };
      player = await this.playerService.create(playerCreateDto);
      gameData = await this.gameEntityManager.addPlayerToGame(gameId, player._id);
    }

    return { playerData: player, gameData: gameData };
  }

  async removePlayer(gameId: string, supabaseId: string): Promise<GameStateWithPlayer> {
    const user = await this.userService.findBySupabaseId(supabaseId);
    const player = await this.playerService.findByGameAndUser(gameId, user?._id.toString());
    let gameData = await this.gameEntityManager.findOne(gameId);

    if (!player) {
      throw new NotFoundException('Player not found', ErrorEnum['player/not-found']);
    } else if (!gameData.players.some((p) => p._id.toString() === player?._id.toString())) {
      throw new NotFoundException('Player not found in game', ErrorEnum['game/player-not-in-game']);
    }

    // delete timer
    this.gameTimerManager.phaseTimers.get(gameId)?.close();

    await this.playerService.delete(gameId, player._id.toString());
    gameData = await this.gameEntityManager.update(gameId, {
      state: GameState.WAITING,
      players: gameData.players.filter((p) => p._id.toString() !== player._id.toString()),
    });
    return { playerData: player, gameData };
  }

  async validatePlayerTurn(gameId: string, playerId: string): Promise<Player> {
    const player = await this.playerService.findOne(playerId);
    const game = await this.gameEntityManager.findOne(gameId);

    if (!player || !game) {
      throw new NotFoundException('Player or game not found', ErrorEnum['player/not-found']);
    }
    if (!game.players.some((p) => p._id.toString() === player._id.toString())) {
      throw new NotFoundException('Player not in game', ErrorEnum['game/player-not-in-game']);
    }
    if (game.playerWhoPlays?._id.toString() !== player._id.toString()) {
      throw new NotFoundException(
        'Player is not the current player',
        ErrorEnum['player/not-found'],
      );
    }

    return player;
  }
}
