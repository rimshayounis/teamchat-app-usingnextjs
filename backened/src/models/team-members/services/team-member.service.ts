
import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TeamMember, TeamMemberDocument } from '../entities/team-member.schema';
import { Model } from 'mongoose';

@Injectable()
export class TeamMemberService {
  constructor(
    @InjectModel(TeamMember.name) private teamMemberModel: Model<TeamMemberDocument>,
  ) {}

  async joinTeam(userId: string, teamId: string): Promise<TeamMember> {
    const existing = await this.teamMemberModel.findOne({ userId, teamId });
    if (existing) throw new ConflictException('User already joined this team');

    return this.teamMemberModel.create({
      userId,
      teamId,
      role: 'Member',
    });
  }

  async getUserTeams(userId: string): Promise<TeamMember[]> {
    return this.teamMemberModel.find({ userId });
  }

  async getUserRoleInTeam(userId: string, teamId: string): Promise<string> {
  const member = await this.teamMemberModel.findOne({ userId,  teamId });

  if (!member) {
    throw new Error('User is not a member of the team');
  }

  return member.role;
}

}





