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
exports.TeamService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const team_schema_1 = require("../entities/team.schema");
const mongoose_2 = require("mongoose");
const team_member_schema_1 = require("../../team-members/entities/team-member.schema");
let TeamService = class TeamService {
    teamModel;
    teamMemberModel;
    constructor(teamModel, teamMemberModel) {
        this.teamModel = teamModel;
        this.teamMemberModel = teamMemberModel;
    }
    async createTeam(name, userId) {
        const team = await this.teamModel.create({ name, ownerId: userId });
        await this.teamMemberModel.create({
            userId,
            teamId: team._id,
            role: 'Owner',
        });
        return team;
    }
    async getAllTeams() {
        return this.teamModel.find();
    }
    async deleteTeam(teamId, userId) {
        const team = await this.teamModel.findById(teamId);
        if (!team)
            throw new common_1.NotFoundException('Team not found');
        const member = await this.teamMemberModel.findOne({ userId, teamId });
        if (!member || (member.role !== 'Owner' && member.role !== 'Admin')) {
            throw new common_1.ForbiddenException('Only Owner or Admin can delete the team');
        }
        await this.teamModel.findByIdAndDelete(teamId);
        await this.teamMemberModel.deleteMany({ teamId });
    }
};
exports.TeamService = TeamService;
exports.TeamService = TeamService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(team_schema_1.Team.name)),
    __param(1, (0, mongoose_1.InjectModel)(team_member_schema_1.TeamMember.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], TeamService);
//# sourceMappingURL=team.service.js.map