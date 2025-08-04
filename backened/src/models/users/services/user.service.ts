
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../entities/user.schema';


@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async createUser(data: { username: string; email: string; password: string }) {
    const { email } = data;
    const existing = await this.userModel.findOne({ email });
    if (existing) {
      throw new BadRequestException('User already exists');
    }



    const user = new this.userModel(data);
    await user.save();
    return user;
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email });
  }
  

  async getUserById(id: string) {
    return this.userModel.findById(id);
  }
  
}

