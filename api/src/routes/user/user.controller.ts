import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';
import { UserCreateDto } from './dto/user-create.dto';
import { UserUpdateDto } from './dto/user-update.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() user: UserCreateDto): Promise<User> {
    return this.userService.create(user);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOrCreate(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateData: UserUpdateDto): Promise<User> {
    return this.userService.update(id, updateData);
  }
}
