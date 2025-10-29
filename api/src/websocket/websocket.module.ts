import { Module } from '@nestjs/common';
import { CommonModule } from '../common/common.module';
import { GameModule } from '../routes/game/game.module';
import { UserModule } from '../routes/user/user.module';
import { MessageModule } from '../routes/message/message.module';
import { CollectionModule } from '../routes/collections/collection.module';
import { PlayerModule } from '../routes/players/player.module';
import { GameGateway } from './game.gateway';
import { ValidationService } from './services/validation.service';
import { WsAuthGuard } from './guards/ws-auth.guard';
import { CardModule } from '../routes/card/card.module';

@Module({
  imports: [
    CommonModule,
    GameModule,
    UserModule,
    MessageModule,
    PlayerModule,
    CardModule,
    CollectionModule,
  ],
  providers: [GameGateway, ValidationService, WsAuthGuard],
  exports: [ValidationService, WsAuthGuard],
})
export class WebSocketModule {}
