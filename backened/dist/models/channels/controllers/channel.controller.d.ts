import { ChannelService } from '../services/channel.service';
import { Request } from 'express';
interface AuthenticatedRequest extends Request {
    user: {
        userId: string;
        email: string;
    };
}
export declare class ChannelController {
    private readonly service;
    constructor(service: ChannelService);
    create(dto: {
        name: string;
        teamId: string;
    }, req: AuthenticatedRequest): Promise<import("mongoose").Document<unknown, {}, import("../entities/channel.schema").ChannelDocument, {}> & import("../entities/channel.schema").Channel & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getChannels(teamId: string, req: AuthenticatedRequest): Promise<(import("mongoose").Document<unknown, {}, import("../entities/channel.schema").ChannelDocument, {}> & import("../entities/channel.schema").Channel & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    delete(channelId: string, req: AuthenticatedRequest): Promise<import("mongodb").DeleteResult>;
}
export {};
