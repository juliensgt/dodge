import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CardController } from './card.controller';
import { CardService } from './card.service';
import { Card, CardSchema } from './card.schema';
import { UserModule } from '../user/user.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Card.name, schema: CardSchema }]), UserModule],
  controllers: [CardController],
  providers: [CardService],
  exports: [CardService, MongooseModule],
})
export class CardModule {}
