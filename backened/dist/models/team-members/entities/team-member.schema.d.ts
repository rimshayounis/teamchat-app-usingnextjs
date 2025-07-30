import { Document } from 'mongoose';
export type TeamMemberDocument = TeamMember & Document;
export declare class TeamMember {
    userId: string;
    teamId: string;
    role: string;
}
export declare const TeamMemberSchema: import("mongoose").Schema<TeamMember, import("mongoose").Model<TeamMember, any, any, any, Document<unknown, any, TeamMember, any> & TeamMember & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, TeamMember, Document<unknown, {}, import("mongoose").FlatRecord<TeamMember>, {}> & import("mongoose").FlatRecord<TeamMember> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
