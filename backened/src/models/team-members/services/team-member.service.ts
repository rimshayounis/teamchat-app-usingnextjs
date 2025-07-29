

// src/team-member/team-member.service.ts
import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TeamMember } from '../entities/team-member.schema';
import { Model } from 'mongoose';

@Injectable()
export class TeamMemberService {
  constructor(
    @InjectModel(TeamMember.name) private memberModel: Model<TeamMember>,
  ) {}

  async join(teamId: string, userId: string, role: 'Owner' | 'Admin' | 'Member') {
    const exists = await this.memberModel.findOne({ teamId, userId });
    if (exists) throw new ConflictException('Already a member');

    return this.memberModel.create({ teamId, userId, role });
  }

  async findByUser(userId: string) {
    return this.memberModel.find({ userId });
  }
}

