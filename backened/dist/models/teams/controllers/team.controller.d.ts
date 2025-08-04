import { TeamService } from '../services/team.service';
import { Request } from 'express';
export declare class TeamController {
    private readonly teamService;
    constructor(teamService: TeamService);
    createTeam(body: {
        name: string;
        userId: string;
    }): Promise<import("../entities/team.schema").Team>;
    getAllTeams(req: Request): Promise<import("../entities/team.schema").Team[]>;
    deleteTeam(teamId: string, body: {
        userId: string;
    }): Promise<{
        message: string;
    }>;
}
