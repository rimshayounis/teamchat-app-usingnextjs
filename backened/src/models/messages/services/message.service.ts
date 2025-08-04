





import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Message } from '../entities/message.schema';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name)
    private readonly messageModel: Model<Message>,
  ) {}

  async sendMessage(channelId: string, senderId: string, content: string) {
    if (!Types.ObjectId.isValid(channelId) || !Types.ObjectId.isValid(senderId)) {
      throw new Error('Invalid ObjectId format');
    }

    const message = new this.messageModel({
      content,
      sender: new Types.ObjectId(senderId),
      channel: new Types.ObjectId(channelId),
    });

    return await message.save();
  }

  async getMessages(channelId: string) {
    if (!Types.ObjectId.isValid(channelId)) {
      throw new NotFoundException('Invalid channel ID format');
    }

    return this.messageModel
      .find({ channel: new Types.ObjectId(channelId) })
      .populate('sender', 'username email') 
      .populate('channel', 'name description') 
      .sort({ createdAt: 1 })
      .exec();
  }
}