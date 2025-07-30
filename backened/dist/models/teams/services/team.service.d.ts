import { Team, TeamDocument } from '../entities/team.schema';
import { Model } from 'mongoose';
import { TeamMemberDocument } from '../../team-members/entities/team-member.schema';
export declare class TeamService {
    private teamModel;
    private teamMemberModel;
    constructor(teamModel: Model<TeamDocument>, teamMemberModel: Model<TeamMemberDocument>);
    createTeam(name: string, userId: string): Promise<Team>;
    getAllTeams(): Promise<Team[]>;
    deleteTeam(teamId: string, userId: string): Promise<void>;
}
