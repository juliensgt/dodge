import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { MessageService } from './message.service';
import { Message } from './message.schema';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  async create(@Body() message: Message): Promise<Message> {
    return this.messageService.create(message);
  }

  @Get()
  async findAll(): Promise<Message[]> {
    return this.messageService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Message> {
    return this.messageService.findOne(id);
  }

  @Get('game/:gameId')
  async findByGame(@Param('gameId') gameId: string): Promise<Message[]> {
    return this.messageService.findByGame(gameId);
  }
}
