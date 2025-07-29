//message.service
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from '../entities/message.schema';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name)
    private readonly messageModel: Model<Message>,
  ) {}

  async sendMessage(channelId: string, senderId: string, content: string) {
    const message = new this.messageModel({
      content,
      sender: senderId,
      channel: channelId,
    });

    return await message.save();

  }
  async getMessages(channelId: string) {
  return this.messageModel
    .find({ channel: channelId })
    .populate('sender', 'username')         // populate 'name' field from User
    .populate('channel', 'name')        // populate 'name' field from Channel
    .sort({ createdAt: 1 });
}


  
}



