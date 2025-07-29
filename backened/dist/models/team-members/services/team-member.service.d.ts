import { TeamMember } from '../entities/team-member.schema';
import { Model } from 'mongoose';
export declare class TeamMemberService {
    private memberModel;
    constructor(memberModel: Model<TeamMember>);
    join(teamId: string, userId: string, role: 'Owner' | 'Admin' | 'Member'): Promise<import("mongoose").Document<unknown, {}, TeamMember, {}> & TeamMember & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    findByUser(userId: string): Promise<(import("mongoose").Document<unknown, {}, TeamMember, {}> & TeamMember & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
}
