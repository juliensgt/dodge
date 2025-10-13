import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Player, PlayerSchema } from '../players/player.schema';
import { PlayerService } from './player.service';
import { PlayerActionsPointsManager } from './managers/player-actions-points.manager';
import { UserModule } from '../user/user.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Player.name, schema: PlayerSchema }]), UserModule],
  controllers: [],
  providers: [PlayerService, PlayerActionsPointsManager],
  exports: [PlayerService, MongooseModule, PlayerActionsPointsManager],
})
export class PlayerModule {}
