import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Player, PlayerSchema } from '../players/player.schema';
import { PlayerService } from './player.service';
import { PlayerActionsPointsManager } from './managers/player-actions-points.manager';

@Module({
  imports: [MongooseModule.forFeature([{ name: Player.name, schema: PlayerSchema }])],
  controllers: [],
  providers: [PlayerService, PlayerActionsPointsManager],
  exports: [PlayerService, MongooseModule, PlayerActionsPointsManager],
})
export class PlayerModule {}
