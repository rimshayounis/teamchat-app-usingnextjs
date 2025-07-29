import { Team } from '../entities/team.schema';
import { Model } from 'mongoose';
import { TeamMember } from '../../team-members/entities/team-member.schema';
export declare class TeamService {
    private teamModel;
    private teamMemberModel;
    constructor(teamModel: Model<Team>, teamMemberModel: Model<TeamMember>);
    create(name: string, userId: string): Promise<import("mongoose").Document<unknown, {}, Team, {}> & Team & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, Team, {}> & Team & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    delete(teamId: string, userId: string): Promise<{
        message: string;
    }>;
}
