"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamModule = void 0;
const common_1 = require("@nestjs/common");
const team_service_1 = require("./services/team.service");
const team_controller_1 = require("./controllers/team.controller");
const mongoose_1 = require("@nestjs/mongoose");
const team_schema_1 = require("./entities/team.schema");
const team_member_schema_1 = require("../team-members/entities/team-member.schema");
let TeamModule = class TeamModule {
};
exports.TeamModule = TeamModule;
exports.TeamModule = TeamModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: team_schema_1.Team.name, schema: team_schema_1.TeamSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: team_member_schema_1.TeamMember.name, schema: team_member_schema_1.TeamMemberSchema }]),
        ],
        controllers: [team_controller_1.TeamController],
        providers: [team_service_1.TeamService],
    })
], TeamModule);
//# sourceMappingURL=team.module.js.map