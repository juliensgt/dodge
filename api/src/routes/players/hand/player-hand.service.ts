import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Player } from '../player.schema';
import { ErrorEnum } from 'src/enums/errors/error.enum';
import { Card } from 'src/routes/card/card.schema';
import { PlayerActionsPointsManager } from '../managers/player-actions-points.manager';

@Injectable()
export class PlayerHandService {
  constructor(
    @InjectModel(Player.name) private playerModel: Model<Player>,
    private playerActionsPointsManager: PlayerActionsPointsManager,
  ) {}

  async findAll(playerId: string): Promise<Card[]> {
    const player = await this.playerModel
      .findById(playerId)
      .populate({ path: 'main', model: Card.name })
      .exec();

    if (!player) {
      throw new NotFoundException('Player not found', ErrorEnum['player/not-found']);
    }
    return player.main;
  }

  async findOne(playerId: string, index: string): Promise<Card> {
    const player = await this.playerModel.findById(playerId).exec();

    if (!player) {
      throw new NotFoundException('Player not found', ErrorEnum['player/not-found']);
    }

    if (!player.main[index]) {
      throw new NotFoundException('Card not found', ErrorEnum['card/not-found']);
    }

    if (player.actionPoints <= 0) {
      throw new NotFoundException(
        'Player has no action points',
        ErrorEnum['player/no-action-points'],
      );
    }

    await this.playerActionsPointsManager.removeActionPoints(
      player.game._id.toString(),
      player._id.toString(),
      1,
    );

    return player.main[index] as Card;
  }
}
