import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument, UserWithId } from './user.schema';
import { ErrorEnum } from '../../enums/errors/error.enum';
import { Player } from '../players/player.schema';
import { UserCreateDto } from './dto/user-create.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { UserDetailsDto } from './dto/user-details.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(userData: UserCreateDto): Promise<User> {
    const user = new this.userModel({
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return user.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async findOne(id: string): Promise<UserDetailsDto> {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('User not found', ErrorEnum['user/not-found']);
    }

    return {
      _id: user._id.toString(),
      supabaseId: user.supabaseId,
      name: user.name,
      email: user.email,
      skinCards: user.skinCards,
      language: user.language,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async update(id: string, updateData: UserUpdateDto): Promise<User> {
    return await this.userModel
      .findOneAndUpdate({ _id: id }, { ...updateData, updatedAt: new Date() }, { new: true })
      .then((user) => {
        return user as User;
      })
      .catch((error) => {
        console.error('Error updating user:', error);
        throw new NotFoundException('User not found', ErrorEnum['user/not-found']);
      });
  }

  async findByPlayer(player: Player): Promise<User> {
    return this.findOne((player.user as UserWithId)._id.toString());
  }

  async findOrCreate(supabaseId: string, userData?: Partial<UserCreateDto>): Promise<User> {
    try {
      return await this.findBySupabaseId(supabaseId);
    } catch {
      // User doesn't exist, create a new one
      const createData: UserCreateDto = {
        supabaseId,
        name: userData?.name || 'Guest',
        email: userData?.email,
        language: userData?.language || 'en',
        skinCards: userData?.skinCards || '',
        userMetadata: userData?.userMetadata,
        appMetadata: userData?.appMetadata,
      };
      return this.create(createData);
    }
  }

  async findBySupabaseId(supabaseId: string): Promise<User> {
    const user = await this.userModel.findOne({ supabaseId });
    if (!user) {
      throw new NotFoundException('User not found', ErrorEnum['user/not-found']);
    }
    return user;
  }
}
