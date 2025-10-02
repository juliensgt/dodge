import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { Game, GameSchema } from './game.schema';
import { Player, PlayerSchema } from '../players/player.schema';
import { Card, CardSchema } from '../card/card.schema';
import { User, UserSchema } from '../user/user.schema';
import { PlayerService } from '../players/player.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Game.name, schema: GameSchema },
      { name: Player.name, schema: PlayerSchema },
      { name: Card.name, schema: CardSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [GameController],
  providers: [GameService, PlayerService],
  exports: [GameService],
})
export class GameModule {}
