import { Injectable, NotFoundException, forwardRef, Inject } from '@nestjs/common';
import { ErrorEnum } from 'src/enums/errors/error.enum';
import { GameState } from 'src/enums/game-state.enum';
import { ActionType } from 'src/enums/action-type.enum';
import { GameEvents } from 'src/websocket/events/game.events';
import { TurnEvents } from 'src/websocket/events/turn.events';
import { socketService } from 'src/websocket/services/socket.service';
import { GameDto } from '../dto/game.dto';
import { PlayerDto } from 'src/routes/players/dto/player.dto';
import { GameCardsManager } from './game-cards.manager';
import { GameTimerManager } from './game-timer.manager';
import { GameEntityManager } from './game-entity.manager';
import { GameTurnManager } from './game-turn.manager';
import { PlayerActionsPointsManager } from 'src/routes/players/managers/player-actions-points.manager';
import { PlayerService } from 'src/routes/players/player.service';
import { Game } from '../game.schema';

@Injectable()
export class GameFlowManager {
  constructor(
    private gameEntityManager: GameEntityManager,
    private gameCardsManager: GameCardsManager,
    private gameTimerManager: GameTimerManager,
    private playerActionsPointsManager: PlayerActionsPointsManager,
    private playerService: PlayerService,
    @Inject(forwardRef(() => GameTurnManager))
    private gameTurnManager: GameTurnManager,
  ) {}

  async startWaitingGame(gameId: string): Promise<Game> {
    const game = await this.changeGameState(gameId, GameState.STARTED);

    this.gameTimerManager.scheduleNextPhase(
      gameId,
      game.options.timeToStartGame * 1000,
      async () => {
        await this.gameCardsManager.initDeck(gameId);
        await this.gameCardsManager.shuffleDeck(gameId);
        await this.gameCardsManager.distributeCards(gameId);
        await this.startCoupOeil(gameId);
      },
    );

    return game;
  }

  async startCoupOeil(gameId: string): Promise<Game> {
    const game = await this.changeGameState(gameId, GameState.COUP_OEIL);

    await this.playerActionsPointsManager.addActionPoints(
      gameId,
      undefined,
      game.options.nbSeeFirstCards,
    );

    this.gameTimerManager.scheduleNextPhase(
      gameId,
      game.options.timeToSeeCards * 1000,
      async () => {
        await this.startGame(gameId);
      },
    );

    return game;
  }

  async startGame(gameId: string): Promise<Game> {
    await this.playerActionsPointsManager.resetActionPoints(gameId);
    const game = await this.changeGameState(gameId, GameState.IN_GAME);

    //Choose first player randomly
    const firstPlayer = game.players[Math.floor(Math.random() * game.players.length)];
    game.playerWhoPlays = firstPlayer;
    await this.gameEntityManager.update(gameId, { playerWhoPlays: firstPlayer });

    socketService.broadcastToGame(gameId, GameEvents.GAME_STARTED, {
      gameData: GameDto.fromGame(game),
    });

    //Start round
    await this.startRound(gameId);

    return game;
  }

  async startRound(gameId: string): Promise<Game> {
    const game = await this.gameEntityManager.findOne(gameId);
    game.round++;
    await this.gameEntityManager.update(gameId, { round: game.round });

    //Start turn
    await this.startTurn(gameId);
    return game;
  }

  async startTurn(gameId: string): Promise<void> {
    const game = await this.gameEntityManager.findOne(gameId);

    if (!game.playerWhoPlays) {
      throw new NotFoundException('Player not found', ErrorEnum['player/not-found']);
    }

    const playerWhoPlays = await this.playerService.findOne(game.playerWhoPlays._id.toString());

    socketService.broadcastToGame(gameId, TurnEvents.TURN_STARTED, {
      player: PlayerDto.fromPlayer(playerWhoPlays, playerWhoPlays.user),
      nextChoices: [ActionType.GET_CARD_IN_DECK, ActionType.GET_CARD_IN_DEFAUSSE],
    });

    // Start the card source choosing phase
    await this.gameTurnManager.startCardSourceChosen(gameId, playerWhoPlays);
  }

  async nextTurn(gameId: string): Promise<void> {
    console.log('nextTurn', gameId);
    const game = await this.gameEntityManager.findOne(gameId);

    const indexPlayerWhoPlays = game.players.findIndex(
      (player) => player._id.toString() === game.playerWhoPlays?._id.toString(),
    );
    if (indexPlayerWhoPlays === -1) {
      throw new NotFoundException('Player not found', ErrorEnum['player/not-found']);
    }
    const nextPlayerIndex =
      indexPlayerWhoPlays + 1 >= game.players.length ? 0 : indexPlayerWhoPlays + 1;
    const nextPlayer = game.players[nextPlayerIndex];

    await this.gameEntityManager.update(gameId, { playerWhoPlays: nextPlayer });
    await this.startTurn(gameId);
  }

  async changeGameState(gameId: string, state: GameState): Promise<Game> {
    const game = await this.gameEntityManager.update(gameId, { state });
    socketService.broadcastToGame(gameId, GameEvents.GAME_STATE_CHANGED, {
      gameData: GameDto.fromGame(game),
    });
    return game;
  }

  async clearGame(gameId: string): Promise<void> {
    const game = await this.gameEntityManager.findOne(gameId);
    game.deck = [];
    game.defausse = [];
    game.players = [];
    game.state = GameState.WAITING;
    game.round = 0;
    game.tour = 0;
    game.playerWhoPlays = null;
    game.playerDodge = '';

    await this.gameEntityManager.update(gameId, game);
    await this.playerService.deleteAllByGame(gameId);
  }
}
