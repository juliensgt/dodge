import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument, UserWithId } from './user.schema';
import { ErrorEnum } from '../../enums/errors/error.enum';
import { Player } from '../players/player.schema';
import { UserCreateDto } from './dto/user-create.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(userData: UserCreateDto): Promise<User> {
    const user = new this.userModel(userData);
    return user.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('User not found', ErrorEnum['user/not-found']);
    }
    return user;
  }

  async findByPlayer(player: Player): Promise<User> {
    return this.findOne((player.user as UserWithId)._id.toString());
  }
}
