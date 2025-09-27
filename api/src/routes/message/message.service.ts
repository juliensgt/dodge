import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from './message.schema';
import { ErrorEnum } from '../../enums/errors/error.enum';

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

  async findByGame(gameId: string): Promise<Message[]> {
    return this.messageModel.find({ gameId });
  }

  async create(messageData: Partial<Message>): Promise<Message> {
    const message = new this.messageModel({
      ...messageData,
      date: Date.now(),
    });
    return message.save();
  }
}
