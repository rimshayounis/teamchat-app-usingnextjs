"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("../models/users/entities/user.schema");
const mongoose_2 = require("mongoose");
const config_1 = require("@nestjs/config");
let AuthService = class AuthService {
    userModel;
    jwtService;
    configService;
    constructor(userModel, jwtService, configService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async validateUser(email, password) {
        const user = await this.userModel.findOne({ email });
        if (!user)
            throw new common_1.UnauthorizedException('User not found');
        const passwordValid = await bcrypt.compare(password, user.password);
        if (!passwordValid)
            throw new common_1.UnauthorizedException('Invalid password');
        return user;
    }
    async login(user) {
        const payload = { userId: user._id, email: user.email };
        const accessToken = this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_ACCESS_SECRET'),
            expiresIn: '1h',
        });
        const refreshToken = this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_REFRESH_SECRET'),
            expiresIn: '7d',
        });
        return {
            access_token: accessToken,
            refresh_token: refreshToken,
        };
    }
    async refreshAccessToken(refreshToken) {
        try {
            const payload = await this.jwtService.verifyAsync(refreshToken, {
                secret: this.configService.get('JWT_REFRESH_SECRET'),
            });
            const newAccessToken = this.jwtService.sign({ userId: payload.userId, email: payload.email }, {
                secret: this.configService.get('JWT_ACCESS_SECRET'),
                expiresIn: '15m',
            });
            return newAccessToken;
        }
        catch (err) {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
    }
    async register(userData) {
        const { username, email, password } = userData;
        if (password.length < 7) {
            throw new common_1.BadRequestException('Password must be at least 7 characters long');
        }
        const existingUser = await this.userModel.findOne({ email });
        if (existingUser) {
            throw new common_1.BadRequestException('User is already Registered');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await this.userModel.create({
            username,
            email,
            password: hashedPassword,
        });
        return {
            message: 'Registered successfully',
            user: {
                _id: newUser._id,
                email: newUser.email,
                username: newUser.username,
                password: newUser.password
            },
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map