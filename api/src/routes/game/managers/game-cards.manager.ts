import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ErrorEnum } from 'src/enums/errors/error.enum';
import { Game } from '../game.schema';
import { Card } from 'src/routes/card/card.schema';
import { Player } from 'src/routes/players/player.schema';

@Injectable()
export class GameCardsManager {
  constructor(
    @InjectModel(Game.name) private gameModel: Model<Game>,
    @InjectModel(Card.name) private cardModel: Model<Card>,
    @InjectModel(Player.name) private playerModel: Model<Player>,
  ) {}

  async initDeck(gameId: string): Promise<void> {
    const game = await this.gameModel.findById(gameId);
    if (!game) {
      throw new NotFoundException('Game not found', ErrorEnum['game/not-found']);
    }
    game.deck = await this.cardModel.find({ modeDeJeu: { $in: game.options.modeDeJeu } });
    await this.gameModel.updateOne({ _id: gameId }, { $set: { deck: game.deck } });
  }

  async shuffleDeck(gameId: string): Promise<void> {
    const game = await this.gameModel.findById(gameId);
    if (!game) {
      throw new NotFoundException('Game not found', ErrorEnum['game/not-found']);
    }
    game.deck = game.deck.sort(() => Math.random() - 0.5);
    await this.gameModel.updateOne({ _id: gameId }, { $set: { deck: game.deck } });
  }

  async distributeCards(gameId: string): Promise<void> {
    const game = await this.gameModel.findById(gameId);
    if (!game) {
      throw new NotFoundException('Game not found', ErrorEnum['game/not-found']);
    }
    const players = game.players;
    const deck = game.deck;

    // Distribuer les cartes aux joueurs
    for (const player of players) {
      for (let i = 0; i < game.options.nbCardsPerPlayer; i++) {
        const card = deck.shift();
        if (!card) {
          throw new NotFoundException('Deck is empty', ErrorEnum['deck/empty']);
        }
        if (!player.main) {
          player.main = [];
        }
        player.main.push(card);
      }
    }

    // Mettre à jour les mains des joueurs
    for (const player of players) {
      await this.playerModel.updateOne({ _id: player._id }, { $set: { main: player.main } });
    }
    // Mettre à jour le deck du jeu
    await this.gameModel.updateOne({ _id: gameId }, { $set: { deck } });
  }

  async getCardFromDeck(gameId: string): Promise<Card> {
    const game = await this.gameModel.findById(gameId);
    if (!game) {
      throw new NotFoundException('Game not found', ErrorEnum['game/not-found']);
    }
    // get card from deck on top of the stack, but not remove it from the deck
    const card = game.deck[0];
    if (!card) {
      throw new NotFoundException('No cards in deck');
    }
    return card;
  }

  async getCardFromDefausse(gameId: string): Promise<Card> {
    const game = await this.gameModel.findById(gameId);
    if (!game) {
      throw new NotFoundException('Game not found', ErrorEnum['game/not-found']);
    }
    // get card from defausse on top of the stack, but not remove it from the defausse
    const card = game.defausse[0];
    if (!card) {
      throw new NotFoundException('No cards in defausse');
    }
    return card;
  }

  /**
   * Switch a card from the deck to the defausse
   * @param gameId Game id
   * @returns Card from the deck added to the defausse
   */
  async switchFromDeckToDefausse(gameId: string): Promise<Card> {
    const game = await this.gameModel.findById(gameId);
    if (!game) {
      throw new NotFoundException('Game not found', ErrorEnum['game/not-found']);
    }
    // remove card from deck on top of the stack
    const card = game.deck.shift();
    if (!card) {
      throw new NotFoundException('No cards in deck');
    }
    // add card to defausse on top of the stack
    game.defausse.unshift(card);
    await this.gameModel.updateOne(
      { _id: gameId },
      { $set: { deck: game.deck, defausse: game.defausse } },
    );

    return card;
  }

  /**
   * Switch a card from the defausse to the player's main and add the player's main card to the defausse
   * @param gameId Game id
   * @param playerId Player id
   * @param targetCardIndex Target card index
   * @returns Card from the player's main added to the defausse
   */
  async switchFromDefausseToPlayer(
    gameId: string,
    playerId: string,
    targetCardIndex: number,
  ): Promise<Card> {
    const game = await this.gameModel.findById(gameId);
    const player = await this.playerModel.findById(playerId).exec();
    if (!game) {
      throw new NotFoundException('Game not found', ErrorEnum['game/not-found']);
    }
    if (!player) {
      throw new NotFoundException('Player not found', ErrorEnum['player/not-found']);
    }
    const cardDefausse = game.defausse.shift();
    if (!cardDefausse) {
      throw new NotFoundException('No cards in defausse');
    }
    // add card to player's main at the target card index
    if (!player.main.at(targetCardIndex)) {
      throw new NotFoundException('Target card index is out of bounds : ' + targetCardIndex);
    }
    const cardPlayer = player.main.at(targetCardIndex);
    if (!cardPlayer) {
      throw new NotFoundException('Card player not found');
    }
    game.defausse.unshift(cardPlayer);
    player.main[targetCardIndex] = cardDefausse;
    await this.gameModel.updateOne({ _id: gameId }, { $set: { defausse: game.defausse } });
    await this.playerModel.updateOne({ _id: player._id }, { $set: { main: player.main } });
    console.log('SWITCH FROM DEFAUSSE TO PLAYER');
    console.log('ADD defausse', cardPlayer.valeur);
    console.log('ADD player', cardDefausse.valeur);
    return cardPlayer;
  }

  /**
   * Switch a card from the deck to the player's main and add the player's main card to the defausse
   * @param gameId Game id
   * @param playerId Player id
   * @param targetCardIndex Target card index
   * @returns Card from the player's main added to the defausse
   */
  async switchFromDeckToPlayer(
    gameId: string,
    playerId: string,
    targetCardIndex: number,
  ): Promise<Card> {
    const game = await this.gameModel.findById(gameId);
    const player = await this.playerModel.findById(playerId).exec();
    if (!game) {
      throw new NotFoundException('Game not found', ErrorEnum['game/not-found']);
    }
    if (!player) {
      throw new NotFoundException('Player not found', ErrorEnum['player/not-found']);
    }
    const cardDeck = game.deck.shift();
    if (!cardDeck) {
      throw new NotFoundException('No cards in deck');
    }
    const cardPlayer = player.main.at(targetCardIndex);
    if (!cardPlayer) {
      throw new NotFoundException('Target card index is out of bounds : ' + targetCardIndex);
    }
    game.defausse.unshift(cardPlayer);
    player.main[targetCardIndex] = cardDeck;
    await this.gameModel.updateOne(
      { _id: gameId },
      { $set: { deck: game.deck, defausse: game.defausse } },
    );
    await this.playerModel.updateOne({ _id: player._id }, { $set: { main: player.main } });
    console.log('SWITCH FROM DECK TO PLAYER');
    console.log('ADD defausse', cardPlayer.valeur);
    console.log('ADD player', cardDeck.valeur);
    return cardPlayer;
  }
}
