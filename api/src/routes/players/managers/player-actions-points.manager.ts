import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Player } from 'src/routes/players/player.schema';

@Injectable()
export class PlayerActionsPointsManager {
  constructor(@InjectModel(Player.name) private playerModel: Model<Player>) {}

  async addActionPoints(gameId: string, playerId?: string, actionPoints?: number): Promise<void> {
    if (playerId) {
      await this.playerModel.updateOne(
        { _id: playerId },
        { $inc: { actionPoints: actionPoints || 0 } },
      );
    } else {
      await this.playerModel.updateMany(
        { game: new Types.ObjectId(gameId) },
        { $inc: { actionPoints: actionPoints || 0 } },
      );
      console.log('Action points added to all players in game', gameId);
    }
  }

  async removeActionPoints(
    gameId: string,
    playerId?: string,
    actionPoints?: number,
  ): Promise<void> {
    if (playerId) {
      await this.playerModel.updateOne(
        { _id: playerId },
        { $inc: { actionPoints: -(actionPoints || 1) } },
      );
    } else {
      await this.playerModel.updateMany(
        { game: new Types.ObjectId(gameId) },
        { $inc: { actionPoints: -(actionPoints || 1) } },
      );
    }
  }

  async resetActionPoints(gameId: string, playerId?: string): Promise<void> {
    await this.removeActionPoints(gameId, playerId, 0);
  }
}
