import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { CardModule } from './routes/card/card.module';
import { GameModule } from './routes/game/game.module';
import { MessageModule } from './routes/message/message.module';
import { UserModule } from './routes/user/user.module';
import { WebSocketModule } from './websocket/websocket.module';
import { PlayerModule } from './routes/players/player.module';
import { PlayerHandModule } from './routes/players/hand/player-hand.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost/nest'),
    CommonModule,
    UserModule,
    CardModule,
    GameModule,
    PlayerModule,
    PlayerHandModule,
    MessageModule,
    WebSocketModule,
  ],
})
export class AppModule {}
