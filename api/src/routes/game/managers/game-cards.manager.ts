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
}
