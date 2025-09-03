import { Module } from '@nestjs/common';
import { GameModule } from '../routes/game/game.module';
import { UserModule } from '../routes/user/user.module';
import { MessageModule } from '../routes/message/message.module';
import { GameGateway } from './game.gateway';

@Module({
  imports: [GameModule, UserModule, MessageModule],
  providers: [GameGateway],
})
export class WebSocketModule {}
