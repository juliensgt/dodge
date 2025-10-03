import { Controller, Get, Post, Param, Body, HttpStatus } from '@nestjs/common';
import { GameService } from './game.service';
import { Game } from './game.schema';
import { GameCreateDto } from './dto/game-create.dto';

@Controller('games')
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
  async reset(@Param('id') id: string): Promise<HttpStatus> {
    await this.gameService.clearGame(id);
    return HttpStatus.OK;
  }
}
