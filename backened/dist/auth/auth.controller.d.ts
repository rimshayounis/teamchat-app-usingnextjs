import { AuthService } from './auth.service';
import { Response, Request } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(body: {
        username: string;
        email: string;
        password: string;
    }): Promise<{
        message: string;
        user: {
            _id: unknown;
            email: string;
            username: string;
            password: string;
        };
    }>;
    login(body: {
        email: string;
        password: string;
    }, res: Response): Promise<{
        access_token: string;
        user: {
            _id: unknown;
            email: string;
            username: string;
        };
        message: string;
    }>;
    getCsrfToken(req: Request, res: Response): Response<any, Record<string, any>>;
}
