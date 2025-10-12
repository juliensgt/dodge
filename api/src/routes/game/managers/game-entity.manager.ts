import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Game } from '../game.schema';
import { ErrorEnum } from 'src/enums/errors/error.enum';
import { Player } from 'src/routes/players/player.schema';
import { User } from 'src/routes/user/user.schema';
import { defaultGameCreateDto, GameCreateDto } from '../dto/game-create.dto';

@Injectable()
export class GameEntityManager {
  constructor(@InjectModel(Game.name) private gameModel: Model<Game>) {}

  async findOne(id: string): Promise<Game> {
    const gameData = await this.gameModel
      .findById(id)
      .populate({
        path: 'players',
        model: Player.name,
        populate: {
          path: 'user',
          model: User.name,
        },
      })
      .exec();
    if (!gameData) {
      throw new NotFoundException('Game not found', ErrorEnum['game/not-found']);
    }
    return gameData;
  }

  async create(gameCreateDto: GameCreateDto): Promise<Game> {
    console.log('gameCreateDto', gameCreateDto);
    const game = await this.gameModel.create(gameCreateDto || defaultGameCreateDto);
    if (!game) {
      throw new NotFoundException('Failed to create game', ErrorEnum['game/not-found']);
    }
    return await game.save();
  }

  async findAll(): Promise<Game[]> {
    const games = await this.gameModel
      .find()
      .populate({
        path: 'players',
        model: Player.name,
        populate: {
          path: 'user',
          model: User.name,
        },
      })
      .exec();
    if (!games || games.length === 0) {
      throw new NotFoundException('No games found', ErrorEnum['game/not-found']);
    }
    return games;
  }

  async update(gameId: string, updateData: object): Promise<Game> {
    return (await this.gameModel
      .findByIdAndUpdate(
        gameId,
        {
          $set: updateData,
        },
        { new: true },
      )
      .populate({
        path: 'players',
        model: Player.name,
        populate: { path: 'user', model: User.name },
      })) as Game;
  }

  async addPlayerToGame(gameId: string, playerId: Types.ObjectId): Promise<Game> {
    return (await this.gameModel
      .findByIdAndUpdate(
        gameId,
        {
          $addToSet: { players: playerId },
        },
        { new: true },
      )
      .populate({
        path: 'players',
        model: Player.name,
        populate: { path: 'user', model: User.name },
      })) as Game;
  }
}
