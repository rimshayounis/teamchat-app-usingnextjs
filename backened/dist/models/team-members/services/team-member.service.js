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
exports.TeamMemberService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const team_member_schema_1 = require("../entities/team-member.schema");
const mongoose_2 = require("mongoose");
let TeamMemberService = class TeamMemberService {
    teamMemberModel;
    constructor(teamMemberModel) {
        this.teamMemberModel = teamMemberModel;
    }
    async joinTeam(userId, teamId) {
        const existing = await this.teamMemberModel.findOne({ userId, teamId });
        if (existing)
            throw new common_1.ConflictException('User already joined this team');
        return this.teamMemberModel.create({
            userId,
            teamId,
            role: 'Member',
        });
    }
    async getUserTeams(userId) {
        return this.teamMemberModel.find({ userId });
    }
    async getUserRoleInTeam(userId, teamId) {
        const member = await this.teamMemberModel.findOne({ userId, teamId });
        if (!member) {
            throw new Error('User is not a member of the team');
        }
        return member.role;
    }
};
exports.TeamMemberService = TeamMemberService;
exports.TeamMemberService = TeamMemberService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(team_member_schema_1.TeamMember.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TeamMemberService);
//# sourceMappingURL=team-member.service.js.map