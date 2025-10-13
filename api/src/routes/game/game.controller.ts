import { Controller, Get, Post, Delete, Param, Body, HttpStatus, UseGuards } from '@nestjs/common';
import { GameService } from './game.service';
import { Game } from './game.schema';
import { GameCreateDto } from './dto/game-create.dto';
import { AuthGuard } from '../../common/guards/auth.guard';
import { RoleGuard } from '../../common/guards/role.guard';
import { ActionPointsGuard } from '../../common/guards/action-points.guard';
import { RequireRole } from '../../common/decorators/require-role.decorator';
import { RequireActionPoints } from '../../common/decorators/require-action-points.decorator';
import { UserRole } from '../../enums/auth/user-role.enum';

@Controller('games')
@UseGuards(AuthGuard)
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post()
  async create(@Body() game: GameCreateDto): Promise<Game> {
    return this.gameService.create(game);
  }

  @Get()
  async findAll(): Promise<Game[]> {
    return this.gameService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Game> {
    return this.gameService.findOne(id);
  }

  @Post(':id/reset')
  @UseGuards(RoleGuard)
  @RequireRole(UserRole.ADMIN)
  async reset(@Param('id') id: string): Promise<HttpStatus> {
    await this.gameService.clearGame(id);
    return HttpStatus.OK;
  }

  @Delete(':id')
  @UseGuards(RoleGuard)
  @RequireRole(UserRole.ADMIN)
  async deleteGame(@Param('id') id: string): Promise<HttpStatus> {
    await this.gameService.deleteGame(id);
    return HttpStatus.OK;
  }

  @Post(':gameId/actions/draw-card')
  @UseGuards(AuthGuard, ActionPointsGuard)
  @RequireActionPoints(1)
  drawCard(): HttpStatus {
    // Implementation would go here
    // This endpoint requires 1 action point
    // Player ID is automatically available via X-Player-ID header
    return HttpStatus.OK;
  }

  @Post(':gameId/actions/switch-cards')
  @UseGuards(AuthGuard, ActionPointsGuard)
  @RequireActionPoints(2)
  switchCards(): HttpStatus {
    // Implementation would go here
    // This endpoint requires 2 action points
    // Player ID is automatically available via X-Player-ID header
    return HttpStatus.OK;
  }

  @Post(':gameId/actions/special-action')
  @UseGuards(AuthGuard, ActionPointsGuard)
  @RequireActionPoints(3)
  specialAction(): HttpStatus {
    // Implementation would go here
    // This endpoint requires 3 action points
    // Player ID is automatically available via X-Player-ID header
    return HttpStatus.OK;
  }
}
