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
exports.ChannelService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const channel_schema_1 = require("../entities/channel.schema");
const mongoose_2 = require("mongoose");
let ChannelService = class ChannelService {
    model;
    constructor(model) {
        this.model = model;
    }
    async create(name, teamId) {
        return this.model.create({
            name,
            teamId: new mongoose_2.Types.ObjectId(teamId),
        });
    }
    async findByTeam(teamId) {
        return this.model
            .find({ teamId: new mongoose_2.Types.ObjectId(teamId) })
            .populate('teamId', 'name')
            .exec();
    }
    async deleteChannel(channelId) {
        return this.model.deleteOne({ _id: new mongoose_2.Types.ObjectId(channelId) });
    }
};
exports.ChannelService = ChannelService;
exports.ChannelService = ChannelService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(channel_schema_1.Channel.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ChannelService);
//# sourceMappingURL=channel.service.js.map