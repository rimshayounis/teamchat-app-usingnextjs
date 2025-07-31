import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(body: any): Promise<{
        message: string;
        accessToken: string;
        user: import("../../users/entities/user.schema").User;
    }>;
}
