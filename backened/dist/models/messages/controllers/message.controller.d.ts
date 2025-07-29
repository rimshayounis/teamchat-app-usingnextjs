import { MessageService } from '../services/message.service';
export declare class MessageController {
    private readonly service;
    constructor(service: MessageService);
    send(dto: {
        channelId: string;
        senderId: string;
        content: string;
    }): Promise<import("mongoose").Document<unknown, {}, import("../entities/message.schema").Message, {}> & import("../entities/message.schema").Message & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getChannelMessages(channelId: string): Promise<(import("mongoose").Document<unknown, {}, import("../entities/message.schema").Message, {}> & import("../entities/message.schema").Message & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
}
