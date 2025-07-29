import { Model } from 'mongoose';
import { Message } from '../entities/message.schema';
export declare class MessageService {
    private readonly messageModel;
    constructor(messageModel: Model<Message>);
    sendMessage(channelId: string, senderId: string, content: string): Promise<import("mongoose").Document<unknown, {}, Message, {}> & Message & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getMessages(channelId: string): Promise<(import("mongoose").Document<unknown, {}, Message, {}> & Message & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
}
