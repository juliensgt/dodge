import { Module } from '@nestjs/common';
import { PlayerModule } from '../player.module';
import { PlayerHandService } from './player-hand.service';
import { PlayerHandController } from './player-hand.controller';

@Module({
  imports: [PlayerModule],
  controllers: [PlayerHandController],
  providers: [PlayerHandService],
  exports: [PlayerHandService],
})
export class PlayerHandModule {}
