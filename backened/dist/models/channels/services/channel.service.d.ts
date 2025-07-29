import { Channel, ChannelDocument } from '../entities/channel.schema';
import { Model } from 'mongoose';
export declare class ChannelService {
    private model;
    constructor(model: Model<ChannelDocument>);
    create(name: string, teamId: string): Promise<import("mongoose").Document<unknown, {}, ChannelDocument, {}> & Channel & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    findByTeam(teamId: string): Promise<(import("mongoose").Document<unknown, {}, ChannelDocument, {}> & Channel & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    deleteChannel(channelId: string): Promise<import("mongodb").DeleteResult>;
}
