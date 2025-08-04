import { JwtService } from '@nestjs/jwt';
import { UserDocument } from '../models/users/entities/user.schema';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private userModel;
    private jwtService;
    private configService;
    constructor(userModel: Model<UserDocument>, jwtService: JwtService, configService: ConfigService);
    validateUser(email: string, password: string): Promise<UserDocument>;
    login(user: UserDocument): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    refreshAccessToken(refreshToken: string): Promise<string>;
    register(userData: {
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
}
