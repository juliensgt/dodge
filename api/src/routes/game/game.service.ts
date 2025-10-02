import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Game, GameDocument } from './game.schema';
import { GameWithId } from './game.schema';
import { GameState } from '../../enums/game-state.enum';
import { defaultGameCreateDto, GameCreateDto } from './dto/game-create.dto';
import { ErrorEnum } from '../../enums/errors/error.enum';

@Injectable()
export class GameService {
  constructor(@InjectModel(Game.name) private gameModel: Model<GameDocument>) {}

  async create(gameCreateDto: GameCreateDto): Promise<Game> {
    const game = new this.gameModel(gameCreateDto || defaultGameCreateDto);
    return game.save();
  }

  async findOne(id: string): Promise<GameWithId> {
    const game = await this.gameModel
      .findById(id)
      .populate('players')
      .populate('deck')
      .populate('defausse');

    if (!game) {
      throw new NotFoundException('Game not found', ErrorEnum['game/not-found']);
    }

    return game;
  }

  async findAll(): Promise<Game[]> {
    const games = await this.gameModel
      .find()
      .populate('players')
      .populate('deck')
      .populate('defausse')
      .exec();

    return games;
  }

  async addPlayer(gameId: string) {
    // TODO :Verify if can add player

    // Create the player
    const playerData = undefined;

    // TODO : Broadcast to the player : game data
    const gameData = await this.findOne(gameId);

    // Return the response
    return {
      success: true,
      gameData,
      playerData,
    };
  }

  /*async dodge(gameId: string, playerId: string): Promise<void> {
    const game = await this.findOne(gameId);

    // TODO: Implement dodge logic here
    game.playerDodge = playerId;
    game.indexLastPlayerWhoPlay = game.indexPlayerWhoPlays;
    await this.gameModel.findByIdAndUpdate((game as GameWithId)._id, game);
  }*/

  /*async isTourOfPlayer(gameId: string, playerId: string): Promise<boolean> {
    const game = await this.findOne(gameId);
    if (
      game.indexPlayerWhoPlays < 0 ||
      game.indexPlayerWhoPlays >= game.players.length
    ) {
      return false;
    }
    return (
      (
        game.players[game.indexPlayerWhoPlays] as PlayerWithId
      )._id.toString() === playerId
    );
  }*/

  async clearGame(gameId: string): Promise<void> {
    const game = await this.findOne(gameId);
    game.deck = [];
    game.defausse = [];
    game.players = [];
    game.gameState = GameState.WAITING;
    game.round = 0;
    game.tour = 0;
    game.indexPlayerWhoPlays = -1;
    game.playerDodge = '';
    await this.gameModel.findByIdAndUpdate(game._id, game);
  }

  // ===== TURN MANAGEMENT =====
  /*async switchWithDeck(
    gameId: string,
    playerId: string,
    action: 'deckToDefausse' | 'deckToPlayer',
    targetCardId?: string,
  ): Promise<any> {
    const game = await this.findOne(gameId);
    const player = await this.getPlayerByGameAndId(gameId, playerId);

    if (game.deck.length === 0) {
      throw new Error('Deck is empty');
    }

    const drawnCard = game.deck.pop();
    if (!drawnCard) {
      throw new Error('No card to draw from deck');
    }

    if (action === 'deckToDefausse') {
      game.defausse.push(drawnCard);
    } else if (action === 'deckToPlayer') {
      if (!targetCardId) {
        throw new Error('Target card ID required for deckToPlayer action');
      }
      // Remove target card from player's hand
      const targetCardIndex = player.main.findIndex(
        (card) => (card as CardWithId)._id.toString() === targetCardId,
      );
      if (targetCardIndex === -1) {
        throw new Error('Target card not found in player hand');
      }
      const targetCard = player.main.splice(targetCardIndex, 1)[0];
      game.defausse.push(targetCard);
      player.main.push(drawnCard);
    }

    await this.gameModel.findByIdAndUpdate((game as GameWithId)._id, game);
    await this.playerModel.findByIdAndUpdate(
      (player as PlayerWithId)._id,
      player,
    );

    return {
      drawnCard,
      action,
      gameState: game.gameState,
    };
  }*/

  /*async switchWithDefausse(
    gameId: string,
    playerId: string,
    targetCardId: string,
  ): Promise<any> {
    const game = await this.findOne(gameId);
    const player = await this.getPlayerByGameAndId(gameId, playerId);

    if (game.defausse.length === 0) {
      throw new Error('Defausse is empty');
    }

    const drawnCard = game.defausse.pop();
    if (!drawnCard) {
      throw new Error('No card to draw from defausse');
    }

    // Remove target card from player's hand
    const targetCardIndex = player.main.findIndex(
      (card) => (card as CardWithId)._id.toString() === targetCardId,
    );
    if (targetCardIndex === -1) {
      throw new Error('Target card not found in player hand');
    }
    const targetCard = player.main.splice(targetCardIndex, 1)[0];
    game.defausse.push(targetCard);
    player.main.push(drawnCard);

    await this.gameModel.findByIdAndUpdate((game as GameWithId)._id, game);
    await this.playerModel.findByIdAndUpdate(
      (player as PlayerWithId)._id,
      player,
    );

    return {
      drawnCard,
      targetCard,
      gameState: game.gameState,
    };
  }*/

  /*async endTurn(gameId: string): Promise<string> {
    const game = await this.findOne(gameId);

    // Move to next player
    game.indexPlayerWhoPlays =
      (game.indexPlayerWhoPlays + 1) % game.players.length;

    await this.gameModel.findByIdAndUpdate((game as GameWithId)._id, game);

    return (
      game.players[game.indexPlayerWhoPlays] as PlayerWithId
    )._id.toString();
  }*/

  // ===== CARD ACTIONS =====
  /*async playCard(
    gameId: string,
    playerId: string,
    cardId: string,
  ): Promise<any> {
    const game = await this.findOne(gameId);
    const player = await this.getPlayerByGameAndId(gameId, playerId);

    const cardIndex = player.main.findIndex(
      (card) => (card as CardWithId)._id.toString() === cardId,
    );
    if (cardIndex === -1) {
      throw new Error('Card not found in player hand');
    }

    const playedCard = player.main.splice(cardIndex, 1)[0];
    game.defausse.push(playedCard);

    await this.gameModel.findByIdAndUpdate((game as GameWithId)._id, game);
    await this.playerModel.findByIdAndUpdate(
      (player as PlayerWithId)._id,
      player,
    );

    return {
      playedCard,
      gameState: game.gameState,
    };
  }*/

  /*async handleSpecialCard(
    gameId: string,
    playerId: string,
    cardId: string,
    specialAction: string,
  ): Promise<any> {
    // TODO: Implement special card logic based on card type
    return { specialAction, cardId };
  }*/

  // ===== INTERVENTION ACTIONS =====
  /*async handleIntervention(
    gameId: string,
    playerId: string,
    targetPlayerId: string,
    interventionType: string,
    cardId: string,
  ): Promise<any> {
    // TODO: Implement intervention logic
    return { interventionType, targetPlayerId, cardId };
  }*/

  /*async handleInterventionResponse(
    gameId: string,
    playerId: string,
    interventionId: string,
    response: 'accept' | 'decline',
  ): Promise<any> {
    // TODO: Implement intervention response logic
    return { interventionId, response };
  }

  /*async endInterventionPhase(gameId: string): Promise<any> {
    const game = await this.findOne(gameId);
    // TODO: Implement intervention phase end logic
    return { gameState: game.gameState };
  }*/
}
