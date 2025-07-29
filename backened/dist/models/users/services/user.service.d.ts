import { Model } from 'mongoose';
import { User, UserDocument } from '../entities/user.schema';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    register(username: string, email: string, password: string): Promise<{
        message: string;
        user: import("mongoose").Document<unknown, {}, UserDocument, {}> & User & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    login(email: string, password: string): Promise<{
        message: string;
        user: import("mongoose").Document<unknown, {}, UserDocument, {}> & User & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    getUserById(id: string): Promise<(import("mongoose").Document<unknown, {}, UserDocument, {}> & User & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
}
