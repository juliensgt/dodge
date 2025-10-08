import { Controller, Get, Body, Param } from '@nestjs/common';
import { PlayerHandService } from './player-hand.service';
import { Card } from 'src/routes/card/card.schema';

@Controller('players/:playerId/hand')
export class PlayerHandController {
  constructor(private readonly playerHandService: PlayerHandService) {}

  @Get()
  async findAll(@Param('playerId') playerId: string): Promise<Card[]> {
    return this.playerHandService.findAll(playerId);
  }

  @Get(':index')
  async findOne(@Param('playerId') playerId: string, @Param('index') index: string): Promise<Card> {
    return this.playerHandService.findOne(playerId, index);
  }
}
