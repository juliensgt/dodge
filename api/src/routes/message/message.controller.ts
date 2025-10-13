import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { MessageService } from './message.service';
import { Message } from './message.schema';
import { MessageDto } from './dto/message.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RoleGuard } from 'src/common/guards/role.guard';
import { RequireRole } from 'src/common/decorators/require-role.decorator';
import { UserRole } from 'src/enums/auth/user-role.enum';

@Controller('messages')
@UseGuards(AuthGuard)
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  async create(@Body() message: Message): Promise<Message> {
    return this.messageService.create(message);
  }

  @Get()
  @UseGuards(RoleGuard)
  @RequireRole(UserRole.ADMIN)
  async findAll(): Promise<Message[]> {
    return this.messageService.findAll();
  }

  @Get(':id')
  @UseGuards(RoleGuard)
  @RequireRole(UserRole.ADMIN)
  async findOne(@Param('id') id: string): Promise<Message> {
    return this.messageService.findOne(id);
  }

  @Get('game/:gameId')
  async findByGame(@Param('gameId') gameId: string): Promise<MessageDto[]> {
    return this.messageService.findByGame(gameId);
  }
}
