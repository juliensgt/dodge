import { Injectable, NotFoundException, forwardRef, Inject } from '@nestjs/common';
import { ErrorEnum } from 'src/enums/errors/error.enum';
import { ActionType } from 'src/enums/action-type.enum';
import { TurnEvents } from 'src/websocket/events/turn.events';
import { socketService } from 'src/websocket/services/socket.service';
import { GameCardsManager } from './game-cards.manager';
import { GameTimerManager } from './game-timer.manager';
import { GameEntityManager } from './game-entity.manager';
import { GamePlayerManager } from './game-player.manager';
import { GameFlowManager } from './game-flow.manager';
import { Player } from 'src/routes/players/player.schema';
import { Card } from 'src/routes/card/card.schema';

@Injectable()
export class GameTurnManager {
  constructor(
    private gameEntityManager: GameEntityManager,
    private gameCardsManager: GameCardsManager,
    private gameTimerManager: GameTimerManager,
    private gamePlayerManager: GamePlayerManager,
    @Inject(forwardRef(() => GameFlowManager))
    private gameFlowManager: GameFlowManager,
  ) {}

  async handleCardSourceChosen(
    gameId: string,
    playerId: string,
    choice: ActionType.GET_CARD_IN_DECK | ActionType.GET_CARD_IN_DEFAUSSE,
  ): Promise<void> {
    const player = await this.gamePlayerManager.validatePlayerTurn(gameId, playerId);
    this.gameTimerManager.cancelPlayerTimer(player._id.toString());

    let card: Card | undefined;
    let nextChoices: ActionType[] = [];

    if (choice === ActionType.GET_CARD_IN_DECK) {
      card = await this.gameCardsManager.getCardFromDeck(gameId);
      nextChoices = [
        ActionType.SWITCH_FROM_DECK_TO_DEFAUSSE,
        ActionType.SWITCH_FROM_DECK_TO_PLAYER,
      ];
    } else if (choice === ActionType.GET_CARD_IN_DEFAUSSE) {
      card = await this.gameCardsManager.getCardFromDefausse(gameId);
      nextChoices = [ActionType.SWITCH_FROM_DEFAUSSE_TO_PLAYER];
    }

    if (!card) {
      throw new NotFoundException('Card not found', ErrorEnum['player/not-found']);
    }

    socketService.broadcastToGame(gameId, TurnEvents.CARD_SOURCE_CHOSEN, {
      choice,
      card,
      nextChoices,
    });

    await this.startCardSwitched(gameId, player, card, choice);
  }

  async startCardSourceChosen(gameId: string, playerWhoPlays: Player): Promise<void> {
    const game = await this.gameEntityManager.findOne(gameId);
    this.gameTimerManager.schedulePlayerTurn(
      playerWhoPlays._id.toString(),
      game.options.timeToPlay * 1000,
      async () => {
        // Default action: get card from deck
        const choice = ActionType.GET_CARD_IN_DECK;
        const card = await this.gameCardsManager.getCardFromDeck(gameId);

        const nextChoices = [
          ActionType.SWITCH_FROM_DECK_TO_PLAYER,
          ActionType.SWITCH_FROM_DECK_TO_DEFAUSSE,
        ];

        socketService.broadcastToGame(gameId, TurnEvents.CARD_SOURCE_CHOSEN, {
          choice,
          card,
          nextChoices,
        });

        this.gameTimerManager.cancelPlayerTimer(playerWhoPlays._id.toString());
        await this.startCardSwitched(gameId, playerWhoPlays, card, choice);
      },
    );
  }

  async handleCardSwitched(
    gameId: string,
    playerId: string,
    choice: ActionType,
    targetCardIndex?: number,
  ): Promise<void> {
    const player = await this.gamePlayerManager.validatePlayerTurn(gameId, playerId);

    if (choice !== ActionType.SWITCH_FROM_DECK_TO_DEFAUSSE && targetCardIndex === undefined) {
      throw new NotFoundException('Target card index not found', ErrorEnum['player/not-found']);
    }

    let card: Card | undefined;
    if (choice === ActionType.SWITCH_FROM_DECK_TO_DEFAUSSE) {
      card = await this.gameCardsManager.switchFromDeckToDefausse(gameId);
    } else if (choice === ActionType.SWITCH_FROM_DEFAUSSE_TO_PLAYER) {
      card = await this.gameCardsManager.switchFromDefausseToPlayer(
        gameId,
        playerId,
        targetCardIndex!,
      );
    } else if (choice === ActionType.SWITCH_FROM_DECK_TO_PLAYER) {
      card = await this.gameCardsManager.switchFromDeckToPlayer(gameId, playerId, targetCardIndex!);
    }

    if (!card) {
      throw new NotFoundException('Card not found', ErrorEnum['player/not-found']);
    }

    socketService.broadcastToGame(gameId, TurnEvents.CARD_SWITCHED, {
      choice,
      card,
      targetCardIndex,
    });

    this.gameTimerManager.cancelPlayerTimer(player._id.toString());
    await this.startSpecialCardDetected(gameId, player, card);
  }

  async startCardSwitched(
    gameId: string,
    playerWhoPlays: Player,
    card: Card,
    previousChoice: ActionType,
  ): Promise<void> {
    const game = await this.gameEntityManager.findOne(gameId);
    this.gameTimerManager.schedulePlayerTurn(
      playerWhoPlays._id.toString(),
      game.options.timeToPlay * 1000,
      async () => {
        if (previousChoice == ActionType.GET_CARD_IN_DECK) {
          card = await this.gameCardsManager.switchFromDeckToDefausse(gameId);
          socketService.broadcastToGame(gameId, TurnEvents.CARD_SWITCHED, {
            choice: ActionType.SWITCH_FROM_DECK_TO_DEFAUSSE,
            card: card,
          });
        } else if (previousChoice == ActionType.GET_CARD_IN_DEFAUSSE) {
          // Choose a random card from the player's hand
          const targetCardIndex = Math.floor(Math.random() * playerWhoPlays.main.length);
          console.log('targetCardIndex', targetCardIndex);
          card = await this.gameCardsManager.switchFromDefausseToPlayer(
            gameId,
            playerWhoPlays._id.toString(),
            targetCardIndex,
          );
          socketService.broadcastToGame(gameId, TurnEvents.CARD_SWITCHED, {
            choice: ActionType.SWITCH_FROM_DEFAUSSE_TO_PLAYER,
            card: card,
            targetCardIndex,
          });
        }
        this.gameTimerManager.cancelPlayerTimer(playerWhoPlays._id.toString());
        await this.startSpecialCardDetected(gameId, playerWhoPlays, card);
      },
    );
  }

  async startSpecialCardDetected(
    gameId: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _playerWhoPlays: Player,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _card: Card,
  ): Promise<void> {
    // TODO: Implement special card detected logic
    // For now, we just move to next turn
    await this.gameFlowManager.nextTurn(gameId);
  }
}
