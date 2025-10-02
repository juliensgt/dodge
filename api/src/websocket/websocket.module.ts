import { Module } from '@nestjs/common';
import { GameModule } from '../routes/game/game.module';
import { UserModule } from '../routes/user/user.module';
import { MessageModule } from '../routes/message/message.module';
import { GameGateway } from './game.gateway';
import { ValidationService } from './services/validation.service';
import { WsAuthGuard } from './guards/ws-auth.guard';
@Module({
  imports: [GameModule, UserModule, MessageModule],
  providers: [GameGateway, ValidationService, WsAuthGuard],
  exports: [ValidationService, WsAuthGuard],
})
export class WebSocketModule {}
