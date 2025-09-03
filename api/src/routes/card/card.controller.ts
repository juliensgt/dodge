import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CardService } from './card.service';
import { Card } from './card.schema';

@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post()
  async create(@Body() card: Card): Promise<Card> {
    return this.cardService.create(card);
  }

  @Get()
  async findAll(): Promise<Card[]> {
    return this.cardService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Card> {
    return this.cardService.findOne(id);
  }
}
