import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { CardModule } from './routes/card/card.module';
import { GameModule } from './routes/game/game.module';
import { MessageModule } from './routes/message/message.module';
import { UserModule } from './routes/user/user.module';
import { WebSocketModule } from './websocket/websocket.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost/nest'),
    UserModule,
    CardModule,
    GameModule,
    MessageModule,
    WebSocketModule,
  ],
})
export class AppModule {}
