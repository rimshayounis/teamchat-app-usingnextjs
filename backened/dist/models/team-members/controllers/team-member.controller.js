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
exports.TeamMemberController = void 0;
const common_1 = require("@nestjs/common");
const team_member_service_1 = require("../services/team-member.service");
let TeamMemberController = class TeamMemberController {
    teamMemberService;
    constructor(teamMemberService) {
        this.teamMemberService = teamMemberService;
    }
    async joinTeam(body) {
        return this.teamMemberService.joinTeam(body.userId, body.teamId);
    }
    async getUserTeams(userId) {
        return this.teamMemberService.getUserTeams(userId);
    }
    async getUserRole(userId, teamId) {
        const role = await this.teamMemberService.getUserRoleInTeam(userId, teamId);
        return { role };
    }
};
exports.TeamMemberController = TeamMemberController;
__decorate([
    (0, common_1.Post)('join'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TeamMemberController.prototype, "joinTeam", null);
__decorate([
    (0, common_1.Get)('user/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TeamMemberController.prototype, "getUserTeams", null);
__decorate([
    (0, common_1.Get)('role'),
    __param(0, (0, common_1.Query)('userId')),
    __param(1, (0, common_1.Query)('teamId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TeamMemberController.prototype, "getUserRole", null);
exports.TeamMemberController = TeamMemberController = __decorate([
    (0, common_1.Controller)('team-members'),
    __metadata("design:paramtypes", [team_member_service_1.TeamMemberService])
], TeamMemberController);
//# sourceMappingURL=team-member.controller.js.map