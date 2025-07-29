import { TeamMemberService } from '../services/team-member.service';
export declare class TeamMemberController {
    private readonly teamMemberService;
    constructor(teamMemberService: TeamMemberService);
    join(body: {
        teamId: string;
        userId: string;
    }): Promise<import("mongoose").Document<unknown, {}, import("../entities/team-member.schema").TeamMember, {}> & import("../entities/team-member.schema").TeamMember & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    createOwner(body: {
        teamId: string;
        userId: string;
    }): Promise<import("mongoose").Document<unknown, {}, import("../entities/team-member.schema").TeamMember, {}> & import("../entities/team-member.schema").TeamMember & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getUserTeams(userId: string): Promise<(import("mongoose").Document<unknown, {}, import("../entities/team-member.schema").TeamMember, {}> & import("../entities/team-member.schema").TeamMember & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
}
