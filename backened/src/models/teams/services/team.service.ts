import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Team, TeamDocument } from '../entities/team.schema';
import { Model } from 'mongoose';
import { TeamMember, TeamMemberDocument } from '../../team-members/entities/team-member.schema';

@Injectable()
export class TeamService {
  constructor(
    @InjectModel(Team.name) private teamModel: Model<TeamDocument>,
    @InjectModel(TeamMember.name) private teamMemberModel: Model<TeamMemberDocument>,
  ) {}

  async createTeam(name: string, userId: string): Promise<Team> {
    const team = await this.teamModel.create({ name, ownerId: userId });

    await this.teamMemberModel.create({
      userId,
      teamId: team._id,
      role: 'Owner',
    });

    return team;
  }

  async getAllTeams(): Promise<Team[]> {
    return this.teamModel.find();
  }

  async deleteTeam(teamId: string, userId: string): Promise<void> {
    const team = await this.teamModel.findById(teamId);
    if (!team) throw new NotFoundException('Team not found');

    const member = await this.teamMemberModel.findOne({ userId, teamId });
    if (!member || (member.role !== 'Owner' && member.role !== 'Admin')) {
      throw new ForbiddenException('Only Owner or Admin can delete the team');
    }

    await this.teamModel.findByIdAndDelete(teamId);
    await this.teamMemberModel.deleteMany({ teamId }); // clean up members
  }
}
