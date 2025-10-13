import { Module } from '@nestjs/common';
import { PlayerModule } from '../player.module';
import { PlayerHandService } from './player-hand.service';
import { PlayerHandController } from './player-hand.controller';
import { UserModule } from '../../user/user.module';

@Module({
  imports: [PlayerModule, UserModule],
  controllers: [PlayerHandController],
  providers: [PlayerHandService],
  exports: [PlayerHandService],
})
export class PlayerHandModule {}
