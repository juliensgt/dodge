import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ErrorEnum } from '../../enums/errors/error.enum';
import { Player, PlayerDocument, PlayerWithId } from './player.schema';
import { PlayerCreateDto } from './dto/player-create.dto';

@Injectable()
export class PlayerService {
  constructor(@InjectModel(Player.name) private playerModel: Model<PlayerDocument>) {}

  async create(playerCreateDto: PlayerCreateDto): Promise<PlayerWithId> {
    const player = new this.playerModel({
      ...playerCreateDto,
      points: 0,
      currentTime: 0,
      skinCards: '',
    });
    return player.save();
  }

  async findOne(id: string): Promise<PlayerWithId> {
    const player = await this.playerModel.findById(id).exec();

    if (!player) {
      throw new NotFoundException('Player not found', ErrorEnum['player/not-found']);
    }

    return player;
  }

  async findAll(): Promise<PlayerWithId[]> {
    const players = await this.playerModel.find().exec();

    return players;
  }

  async findByGameAndUser(gameId: string, userId: string): Promise<PlayerWithId | null> {
    const player = await this.playerModel
      .findOne({
        game: new Types.ObjectId(gameId),
        user: new Types.ObjectId(userId),
      })
      .exec();

    return player;
  }

  async deleteAllByGame(gameId: string): Promise<void> {
    await this.playerModel.deleteMany({ game: new Types.ObjectId(gameId) });
  }
}
