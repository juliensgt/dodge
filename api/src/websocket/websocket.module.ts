import { Module } from '@nestjs/common';
import { GameModule } from '../routes/game/game.module';
import { UserModule } from '../routes/user/user.module';
import { MessageModule } from '../routes/message/message.module';
import { GameGateway } from './game.gateway';
import { TurnHandler } from './handlers/turn.handler';
import { CardHandler } from './handlers/card.handler';
import { InterventionHandler } from './handlers/intervention.handler';
import { BroadcastService } from './services/broadcast.service';
import { ValidationService } from './services/validation.service';

@Module({
  imports: [GameModule, UserModule, MessageModule],
  providers: [
    GameGateway,
    TurnHandler,
    CardHandler,
    InterventionHandler,
    BroadcastService,
    ValidationService,
  ],
})
export class WebSocketModule {}
