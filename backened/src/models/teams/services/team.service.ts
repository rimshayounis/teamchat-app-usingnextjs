import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Team } from '../entities/team.schema';
import { Model } from 'mongoose';
import { TeamMember } from '../../team-members/entities/team-member.schema';

@Injectable()
export class TeamService {
  constructor(
    @InjectModel(Team.name) private teamModel: Model<Team>,
    @InjectModel(TeamMember.name) private teamMemberModel: Model<TeamMember>,
  ) {}

  async create(name: string, userId: string) {
    // Only allow hardcoded Owner to create team
    const ownerId = '6881f88f559b4c3e91663c58';
    if (userId !== ownerId) throw new ForbiddenException('Only the owner can create a team');

    const newTeam = await this.teamModel.create({ name, ownerId });
    await this.teamMemberModel.create({
      teamId: newTeam._id,
      userId,
      role: 'Owner',
    });
    return newTeam;
  }

  async findAll() {
    return this.teamModel.find();
  }

  async delete(teamId: string, userId: string) {
    const member = await this.teamMemberModel.findOne({ teamId, userId });
    if (!member || (member.role !== 'Owner' && member.role !== 'Admin')) {
      throw new ForbiddenException('Only Owner or Admin can delete the team');
    }
    await this.teamModel.deleteOne({ _id: teamId });
    await this.teamMemberModel.deleteMany({ teamId });
    return { message: 'Team deleted' };
  }
}
