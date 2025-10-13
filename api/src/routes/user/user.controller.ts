import { Controller, Get, Post, Put, Body, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';
import { UserCreateDto } from './dto/user-create.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RoleGuard } from 'src/common/guards/role.guard';
import { RequireRole } from 'src/common/decorators/require-role.decorator';
import { UserRole } from 'src/enums/auth/user-role.enum';

@Controller('users')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseGuards(RoleGuard)
  @RequireRole(UserRole.ADMIN)
  async create(@Body() user: UserCreateDto): Promise<User> {
    return this.userService.create(user);
  }

  @Get()
  @UseGuards(RoleGuard)
  @RequireRole(UserRole.ADMIN)
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOrCreate(id);
  }

  @Put(':id')
  @UseGuards(RoleGuard)
  @RequireRole(UserRole.ADMIN)
  async update(@Param('id') id: string, @Body() updateData: UserUpdateDto): Promise<User> {
    return this.userService.update(id, updateData);
  }
}
