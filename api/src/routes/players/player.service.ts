import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ErrorEnum } from '../../enums/errors/error.enum';
import { Player } from './player.schema';
import { PlayerCreateDto } from './dto/player-create.dto';
import { User } from '../user/user.schema';

@Injectable()
export class PlayerService {
  constructor(@InjectModel(Player.name) private playerModel: Model<Player>) {}

  async create(playerCreateDto: PlayerCreateDto): Promise<Player> {
    const player = new this.playerModel({
      ...playerCreateDto,
      points: 0,
      currentTime: 0,
      skinCards: '',
    });
    return await player.save();
  }

  async findOne(id: string): Promise<Player> {
    const player = await this.playerModel.findById(id).populate('user').exec();

    if (!player) {
      throw new NotFoundException('Player not found', ErrorEnum['player/not-found']);
    }

    return player;
  }

  async findAll(): Promise<Player[]> {
    const players = await this.playerModel.find().exec();

    return players;
  }

  async findByGameAndUser(gameId: string, userId: string): Promise<Player | null> {
    const player = await this.playerModel
      .findOne({ game: new Types.ObjectId(gameId), user: new Types.ObjectId(userId) })
      .populate({ path: 'user', model: User.name })
      .exec();

    return player;
  }

  async findPlayerByGameAndPlayer(gameId: string, playerId: string): Promise<Player | null> {
    const player = await this.playerModel
      .findOne({
        game: new Types.ObjectId(gameId),
        _id: new Types.ObjectId(playerId),
      })
      .exec();

    return player;
  }

  async deleteAllByGame(gameId: string): Promise<void> {
    await this.playerModel.deleteMany({ game: new Types.ObjectId(gameId) });
  }

  async delete(gameId: string, playerId: string): Promise<void> {
    await this.playerModel.findOneAndDelete({
      game: new Types.ObjectId(gameId),
      _id: new Types.ObjectId(playerId),
    });
  }
}
