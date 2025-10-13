/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Player } from '../../routes/players/player.schema';

@Injectable()
export class ActionPointsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectModel(Player.name) private playerModel: Model<Player>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPoints = this.reflector.get<number>('requiredActionPoints', context.getHandler());

    if (requiredPoints === undefined) {
      return true; // No action points required
    }

    const request = context.switchToHttp().getRequest();
    const playerId = request.headers['x-player-id'] as string;

    if (!playerId) {
      throw new BadRequestException('Player ID is required in X-Player-ID header');
    }

    const player = await this.playerModel.findById(playerId);
    if (!player) {
      throw new BadRequestException('Player not found');
    }

    if (player.actionPoints < requiredPoints) {
      throw new ForbiddenException(
        `Insufficient action points. Required: ${requiredPoints}, Available: ${player.actionPoints}`,
      );
    }

    return true;
  }
}
