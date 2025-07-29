import { Document, Types } from 'mongoose';
export declare class Channel extends Document {
    name: string;
    teamId: Types.ObjectId;
}
export type ChannelDocument = Channel & Document;
export declare const ChannelSchema: import("mongoose").Schema<Channel, import("mongoose").Model<Channel, any, any, any, Document<unknown, any, Channel, any> & Channel & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Channel, Document<unknown, {}, import("mongoose").FlatRecord<Channel>, {}> & import("mongoose").FlatRecord<Channel> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
