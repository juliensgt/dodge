import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { CardService } from './card.service';
import { Card } from './card.schema';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RoleGuard } from 'src/common/guards/role.guard';
import { RequireRole } from 'src/common/decorators/require-role.decorator';
import { UserRole } from 'src/enums/auth/user-role.enum';

@Controller('cards')
@UseGuards(AuthGuard)
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post()
  @UseGuards(RoleGuard)
  @RequireRole(UserRole.ADMIN)
  async create(@Body() card: Card): Promise<Card> {
    return this.cardService.create(card);
  }

  @Get()
  @UseGuards(RoleGuard)
  @RequireRole(UserRole.ADMIN)
  async findAll(): Promise<Card[]> {
    return this.cardService.findAll();
  }

  @Get(':id')
  @UseGuards(RoleGuard)
  @RequireRole(UserRole.ADMIN)
  async findOne(@Param('id') id: string): Promise<Card> {
    return this.cardService.findOne(id);
  }
}
