import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ErrorEnum } from '../../enums/errors/error.enum';
import { Player, PlayerDocument, PlayerWithId } from './player.schema';
import { PlayerCreateDto } from './dto/player-create.dto';

@Injectable()
export class PlayerService {
  constructor(@InjectModel(Player.name) private playerModel: Model<PlayerDocument>) {}

  async create(playerCreateDto: PlayerCreateDto): Promise<PlayerWithId> {
    const player = new this.playerModel(playerCreateDto);
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
}
