import { Document } from 'mongoose';
export declare class TeamMember extends Document {
    teamId: string;
    userId: string;
    role: 'Owner' | 'Admin' | 'Member';
}
export declare const TeamMemberSchema: import("mongoose").Schema<TeamMember, import("mongoose").Model<TeamMember, any, any, any, Document<unknown, any, TeamMember, any> & TeamMember & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, TeamMember, Document<unknown, {}, import("mongoose").FlatRecord<TeamMember>, {}> & import("mongoose").FlatRecord<TeamMember> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
