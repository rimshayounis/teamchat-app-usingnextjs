import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Channel, ChannelDocument } from '../entities/channel.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class ChannelService {
  constructor(
    @InjectModel(Channel.name)
    private model: Model<ChannelDocument>,
  ) {}

  async create(name: string, teamId: string) {
    return this.model.create({
      name,
      teamId: new Types.ObjectId(teamId),
    });
  }

  async findByTeam(teamId: string) {
    return this.model
      .find({ teamId: new Types.ObjectId(teamId) })
      .populate('teamId', 'name')
      .exec();
  }

  async deleteChannel(channelId: string) {
    return this.model.deleteOne({ _id: new Types.ObjectId(channelId) });
  }
}
