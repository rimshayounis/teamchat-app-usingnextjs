"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
const user_module_1 = require("./models/users/user.module");
const team_module_1 = require("./models/teams/team.module");
const team_member_module_1 = require("./models/team-members/team-member.module");
const channel_module_1 = require("./models/channels/channel.module");
const message_module_1 = require("./models/messages/message.module");
const message_gateway_1 = require("./models/messages/message.gateway");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            mongoose_1.MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/chat-app'),
            user_module_1.UserModule,
            team_module_1.TeamModule,
            team_member_module_1.TeamMemberModule,
            channel_module_1.ChannelModule,
            message_module_1.MessageModule,
        ],
        providers: [message_gateway_1.MessageGateway],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map