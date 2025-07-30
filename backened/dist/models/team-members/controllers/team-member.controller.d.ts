import { TeamMemberService } from '../services/team-member.service';
export declare class TeamMemberController {
    private readonly teamMemberService;
    constructor(teamMemberService: TeamMemberService);
    joinTeam(body: {
        userId: string;
        teamId: string;
    }): Promise<import("../entities/team-member.schema").TeamMember>;
    getUserTeams(userId: string): Promise<import("../entities/team-member.schema").TeamMember[]>;
    getUserRole(userId: string, teamId: string): Promise<{
        role: string;
    }>;
}
