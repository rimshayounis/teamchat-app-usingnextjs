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
exports.ChannelController = void 0;
const common_1 = require("@nestjs/common");
const channel_service_1 = require("../services/channel.service");
let ChannelController = class ChannelController {
    service;
    constructor(service) {
        this.service = service;
    }
    async create(dto) {
        return this.service.create(dto.name, dto.teamId);
    }
    async getChannels(teamId) {
        return this.service.findByTeam(teamId);
    }
    async delete(channelId) {
        return this.service.deleteChannel(channelId);
    }
};
exports.ChannelController = ChannelController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':teamId'),
    __param(0, (0, common_1.Param)('teamId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "getChannels", null);
__decorate([
    (0, common_1.Delete)(':channelId'),
    __param(0, (0, common_1.Param)('channelId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "delete", null);
exports.ChannelController = ChannelController = __decorate([
    (0, common_1.Controller)('channels'),
    __metadata("design:paramtypes", [channel_service_1.ChannelService])
], ChannelController);
//# sourceMappingURL=channel.controller.js.map