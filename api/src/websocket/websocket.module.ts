import { Module } from '@nestjs/common';
import { GameModule } from '../routes/game/game.module';
import { UserModule } from '../routes/user/user.module';
import { MessageModule } from '../routes/message/message.module';
import { GameGateway } from './game.gateway';
import { TurnHandler } from './handlers/turn.handler';
import { CardHandler } from './handlers/card.handler';
import { InterventionHandler } from './handlers/intervention.handler';
import { BroadcastService } from './services/broadcast.service';
import { GameBusService } from './services/game-bus.service';
import { ValidationService } from './services/validation.service';
import { WsAuthGuard } from './guards/ws-auth.guard';

@Module({
  imports: [GameModule, UserModule, MessageModule],
  providers: [
    GameGateway,
    TurnHandler,
    CardHandler,
    InterventionHandler,
    BroadcastService,
    GameBusService,
    ValidationService,
    WsAuthGuard,
  ],
})
export class WebSocketModule {}
