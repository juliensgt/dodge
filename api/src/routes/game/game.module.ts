import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { Game, GameSchema } from './game.schema';
import { CardModule } from '../card/card.module';
import { UserModule } from '../user/user.module';
import { PlayerModule } from '../players/player.module';
import { GameEntityManager } from './managers/game-entity.manager';
import { GameCardsManager } from './managers/game-cards.manager';
import { GameTimerManager } from './managers/game-timer.manager';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Game.name, schema: GameSchema }]),
    CardModule,
    UserModule,
    PlayerModule,
  ],
  controllers: [GameController],
  providers: [GameService, GameEntityManager, GameCardsManager, GameTimerManager],
  exports: [GameService, MongooseModule],
})
export class GameModule {}
