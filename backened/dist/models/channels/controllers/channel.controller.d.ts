import { ChannelService } from '../services/channel.service';
export declare class ChannelController {
    private readonly service;
    constructor(service: ChannelService);
    create(dto: {
        name: string;
        teamId: string;
    }): Promise<import("mongoose").Document<unknown, {}, import("../entities/channel.schema").ChannelDocument, {}> & import("../entities/channel.schema").Channel & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getChannels(teamId: string): Promise<(import("mongoose").Document<unknown, {}, import("../entities/channel.schema").ChannelDocument, {}> & import("../entities/channel.schema").Channel & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    delete(channelId: string): Promise<import("mongodb").DeleteResult>;
}
