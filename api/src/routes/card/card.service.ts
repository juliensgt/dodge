import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Card, CardDocument } from './card.schema';
import { ErrorEnum } from '../../enums/errors/error.enum';

@Injectable()
export class CardService {
  constructor(@InjectModel(Card.name) private cardModel: Model<CardDocument>) {}

  async create(cardData: Partial<Card>): Promise<Card> {
    const card = new this.cardModel(cardData);
    return card.save();
  }

  async findAll(): Promise<Card[]> {
    return this.cardModel.find();
  }

  async findOne(id: string): Promise<Card> {
    const card = await this.cardModel.findById(id);
    if (!card) {
      throw new NotFoundException('Card not found', ErrorEnum['card/not-found']);
    }
    return card;
  }
}
