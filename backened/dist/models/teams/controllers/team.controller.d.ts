import { TeamService } from '../services/team.service';
export declare class TeamController {
    private readonly teamService;
    constructor(teamService: TeamService);
    create(body: {
        name: string;
        userId: string;
    }): Promise<import("mongoose").Document<unknown, {}, import("../entities/team.schema").Team, {}> & import("../entities/team.schema").Team & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("../entities/team.schema").Team, {}> & import("../entities/team.schema").Team & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    delete(id: string, body: {
        userId: string;
    }): Promise<{
        message: string;
    }>;
}
