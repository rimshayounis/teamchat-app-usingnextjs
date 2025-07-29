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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../entities/user.schema");
let UserService = class UserService {
    userModel;
    constructor(userModel) {
        this.userModel = userModel;
    }
    async register(username, email, password) {
        if (typeof password !== 'string') {
            throw new common_1.BadRequestException('Password must be a string');
        }
        if (password.length < 7) {
            throw new common_1.BadRequestException('Password must be at least 7 characters long');
        }
        const existing = await this.userModel.findOne({ email });
        if (existing) {
            throw new common_1.BadRequestException('User already exists');
        }
        const user = new this.userModel({ username, email, password });
        await user.save();
        return { message: 'User registered successfully', user };
    }
    async login(email, password) {
        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new common_1.BadRequestException('User not found');
        }
        if (user.password !== password) {
            throw new common_1.BadRequestException('Invalid password');
        }
        return { message: 'Login successful', user };
    }
    async getUserById(id) {
        return this.userModel.findById(id);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
//# sourceMappingURL=user.service.js.map