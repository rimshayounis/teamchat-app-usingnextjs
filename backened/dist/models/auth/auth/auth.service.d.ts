import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../users/services/user.service';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<import("../../users/entities/user.schema").User>;
    login(email: string, password: string): Promise<{
        message: string;
        accessToken: string;
        user: import("../../users/entities/user.schema").User;
    }>;
}
