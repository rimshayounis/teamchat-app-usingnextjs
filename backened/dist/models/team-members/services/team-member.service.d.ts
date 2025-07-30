import { TeamMember, TeamMemberDocument } from '../entities/team-member.schema';
import { Model } from 'mongoose';
export declare class TeamMemberService {
    private teamMemberModel;
    constructor(teamMemberModel: Model<TeamMemberDocument>);
    joinTeam(userId: string, teamId: string): Promise<TeamMember>;
    getUserTeams(userId: string): Promise<TeamMember[]>;
    getUserRoleInTeam(userId: string, teamId: string): Promise<string>;
}
