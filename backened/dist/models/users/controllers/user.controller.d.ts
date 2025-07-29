import { UserService } from '../services/user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    register(body: any): Promise<{
        message: string;
        user: import("mongoose").Document<unknown, {}, import("../entities/user.schema").UserDocument, {}> & import("../entities/user.schema").User & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    login(body: any): Promise<{
        message: string;
        user: import("mongoose").Document<unknown, {}, import("../entities/user.schema").UserDocument, {}> & import("../entities/user.schema").User & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    findOne(id: string): Promise<(import("mongoose").Document<unknown, {}, import("../entities/user.schema").UserDocument, {}> & import("../entities/user.schema").User & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
}
