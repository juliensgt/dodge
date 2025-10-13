import { Controller, Get, Body, Param, UseGuards } from '@nestjs/common';
import { PlayerHandService } from './player-hand.service';
import { Card } from 'src/routes/card/card.schema';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { ActionPointsGuard } from 'src/common/guards/action-points.guard';
import { RequireActionPoints } from 'src/common/decorators/require-action-points.decorator';

@Controller('players/:playerId/hand')
@UseGuards(AuthGuard)
export class PlayerHandController {
  constructor(private readonly playerHandService: PlayerHandService) {}

  @Get()
  @UseGuards(ActionPointsGuard)
  @RequireActionPoints(1)
  async findAll(@Param('playerId') playerId: string): Promise<Card[]> {
    return this.playerHandService.findAll(playerId);
  }

  @Get(':index')
  @UseGuards(ActionPointsGuard)
  @RequireActionPoints(1)
  async findOne(@Param('playerId') playerId: string, @Param('index') index: string): Promise<Card> {
    return this.playerHandService.findOne(playerId, index);
  }
}
