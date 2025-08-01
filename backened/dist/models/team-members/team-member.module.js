"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamMemberModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const team_member_schema_1 = require("./entities/team-member.schema");
const team_member_controller_1 = require("./controllers/team-member.controller");
const team_member_service_1 = require("./services/team-member.service");
let TeamMemberModule = class TeamMemberModule {
};
exports.TeamMemberModule = TeamMemberModule;
exports.TeamMemberModule = TeamMemberModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: team_member_schema_1.TeamMember.name, schema: team_member_schema_1.TeamMemberSchema }]),
        ],
        controllers: [team_member_controller_1.TeamMemberController],
        providers: [team_member_service_1.TeamMemberService],
    })
], TeamMemberModule);
//# sourceMappingURL=team-member.module.js.map