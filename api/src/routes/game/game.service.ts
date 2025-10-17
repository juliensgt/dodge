import { Injectable } from '@nestjs/common';
import { Game } from './game.schema';
import { GameState } from '../../enums/game-state.enum';
import { GameStateWithPlayer } from 'src/websocket/types/game.types';
import { User } from '../user/user.schema';
import { ActionType } from '../../enums/action-type.enum';
import { GameEntityManager } from './managers/game-entity.manager';
import { GameCreateDto } from './dto/game-create.dto';
import { PlayerService } from '../players/player.service';
import { GamePlayerManager } from './managers/game-player.manager';
import { GameFlowManager } from './managers/game-flow.manager';
import { GameTurnManager } from './managers/game-turn.manager';

/**
 * GameService acts as a facade/orchestrator for all game-related operations.
 * It delegates responsibilities to specialized managers:
 * - GamePlayerManager: Player management (add, remove, validate)
 * - GameFlowManager: Game flow and state management (phases, rounds, turns)
 * - GameTurnManager: Turn actions (card choices, switches)
 * - GameEntityManager: CRUD operations on Game entity
 */
@Injectable()
export class GameService {
  constructor(
    private gameEntityManager: GameEntityManager,
    private gamePlayerManager: GamePlayerManager,
    private gameFlowManager: GameFlowManager,
    private gameTurnManager: GameTurnManager,
    private playerService: PlayerService,
  ) {}

  // ===== PLAYER MANAGEMENT =====
  async addPlayer(gameId: string, user: User): Promise<GameStateWithPlayer> {
    return await this.gamePlayerManager.addPlayer(gameId, user);
  }

  async removePlayer(gameId: string, supabaseId: string): Promise<GameStateWithPlayer> {
    return await this.gamePlayerManager.removePlayer(gameId, supabaseId);
  }

  // ===== GAME FLOW =====
  async startWaitingGame(gameId: string): Promise<Game> {
    return await this.gameFlowManager.startWaitingGame(gameId);
  }

  async startCoupOeil(gameId: string): Promise<Game> {
    return await this.gameFlowManager.startCoupOeil(gameId);
  }

  async startGame(gameId: string): Promise<Game> {
    return await this.gameFlowManager.startGame(gameId);
  }

  async startRound(gameId: string): Promise<Game> {
    return await this.gameFlowManager.startRound(gameId);
  }

  async startTurn(gameId: string): Promise<void> {
    await this.gameFlowManager.startTurn(gameId);
  }

  async nextTurn(gameId: string): Promise<void> {
    await this.gameFlowManager.nextTurn(gameId);
  }

  async changeGameState(gameId: string, state: GameState): Promise<Game> {
    return await this.gameFlowManager.changeGameState(gameId, state);
  }

  async clearGame(gameId: string): Promise<void> {
    await this.gameFlowManager.clearGame(gameId);
  }

  // ===== TURN ACTIONS =====
  async handleCardSourceChosen(
    gameId: string,
    playerId: string,
    choice: ActionType.GET_CARD_IN_DECK | ActionType.GET_CARD_IN_DEFAUSSE,
  ): Promise<void> {
    await this.gameTurnManager.handleCardSourceChosen(gameId, playerId, choice);
  }

  async handleCardSwitched(
    gameId: string,
    playerId: string,
    choice: ActionType,
    targetCardIndex?: number,
  ): Promise<void> {
    await this.gameTurnManager.handleCardSwitched(gameId, playerId, choice, targetCardIndex);
  }

  // ===== CRUD OPERATIONS =====
  async findOne(gameId: string): Promise<Game> {
    return await this.gameEntityManager.findOne(gameId);
  }

  async findAll(): Promise<Game[]> {
    return await this.gameEntityManager.findAll();
  }

  async create(gameCreateDto: GameCreateDto): Promise<Game> {
    return await this.gameEntityManager.create(gameCreateDto);
  }

  async deleteGame(gameId: string): Promise<void> {
    await this.gameEntityManager.delete(gameId);
    await this.playerService.deleteAllByGame(gameId);
  }
}
