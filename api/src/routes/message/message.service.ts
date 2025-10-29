import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from './message.schema';
import { ErrorEnum } from '../../enums/errors/error.enum';
import { MessageDto } from './dto/message.dto';
import { Player } from '../players/player.schema';
import { User } from '../user/user.schema';
import { Collection } from '../collections/collection.schema';

@Injectable()
export class MessageService {
  constructor(@InjectModel(Message.name) private messageModel: Model<MessageDocument>) {}

  async findAll(): Promise<Message[]> {
    return this.messageModel.find();
  }

  async findOne(id: string): Promise<Message> {
    const message = await this.messageModel.findById(id);
    if (!message) {
      throw new NotFoundException('Message not found', ErrorEnum['message/not-found']);
    }
    return message;
  }

  async findByGame(gameId: string): Promise<MessageDto[]> {
    const messages = await this.messageModel
      .find({ gameId })
      .populate({
        path: 'player',
        model: Player.name,
        populate: {
          path: 'user',
          model: User.name,
          populate: {
            path: 'collection',
            model: Collection.name,
          },
        },
      })
      .exec();
    // Return all messages, MessageDto will handle deleted players gracefully
    return Promise.all(messages.map((message) => MessageDto.fromMessage(message)));
  }

  async create(messageData: Partial<Message>): Promise<Message> {
    const message = new this.messageModel({
      ...messageData,
      date: new Date(),
    });
    return message.save();
  }
}
