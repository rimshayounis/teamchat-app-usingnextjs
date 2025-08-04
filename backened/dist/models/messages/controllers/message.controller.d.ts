import { MessageService } from '../services/message.service';
import { Request } from 'express';
export declare class MessageController {
    private readonly messageService;
    constructor(messageService: MessageService);
    getMessages(channelId: string): Promise<(import("mongoose").Document<unknown, {}, import("../entities/message.schema").Message, {}> & import("../entities/message.schema").Message & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    sendMessage(body: {
        channelId: string;
        content: string;
    }, req: Request): Promise<import("mongoose").Document<unknown, {}, import("../entities/message.schema").Message, {}> & import("../entities/message.schema").Message & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
