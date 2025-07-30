import { TeamService } from '../services/team.service';
export declare class TeamController {
    private readonly teamService;
    constructor(teamService: TeamService);
    createTeam(body: {
        name: string;
        userId: string;
    }): Promise<import("../entities/team.schema").Team>;
    getAllTeams(): Promise<import("../entities/team.schema").Team[]>;
    deleteTeam(teamId: string, body: {
        userId: string;
    }): Promise<{
        message: string;
    }>;
}
