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
exports.MessageGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const common_1 = require("@nestjs/common");
const message_service_1 = require("./services/message.service");
let MessageGateway = class MessageGateway {
    messageService;
    server;
    logger = new common_1.Logger('MessageGateway');
    constructor(messageService) {
        this.messageService = messageService;
    }
    handleConnection(client) {
        this.logger.log(`Client connected: ${client.id}`);
    }
    handleDisconnect(client) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }
    handleJoin(data, client) {
        if (!data.channel) {
            client.emit('error', { message: 'Channel is required' });
            return;
        }
        client.join(data.channel);
        client.emit('joinedRoom', { channel: data.channel });
        this.logger.log(`Client ${client.id} joined room ${data.channel}`);
    }
    handleLeave(data, client) {
        if (!data.channel) {
            client.emit('error', { message: 'Channel is required' });
            return;
        }
        client.leave(data.channel);
        client.emit('leftRoom', { channel: data.channel });
        this.logger.log(`Client ${client.id} left room ${data.channel}`);
    }
    async handleMessage(data, client) {
        try {
            if (!data.channelId || !data.senderId || !data.content) {
                client.emit('error', { message: 'Missing required fields' });
                return;
            }
            const savedMessage = await this.messageService.sendMessage(data.channelId, data.senderId, data.content);
            const populatedMessage = await savedMessage.populate([
                { path: 'sender', select: 'username email' },
                { path: 'channel', select: 'name description' }
            ]);
            this.server.to(data.channelId).emit('receiveMessage', {
                id: populatedMessage._id,
                content: populatedMessage.content,
                sender: populatedMessage.sender,
                channel: populatedMessage.channel,
                createdAt: populatedMessage[`createdAt`],
                updatedAt: populatedMessage[`updatedAt`]
            });
        }
        catch (error) {
            this.logger.error(`Error sending message: ${error.message}`);
            client.emit('error', { message: 'Failed to send message' });
        }
    }
};
exports.MessageGateway = MessageGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], MessageGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('channel'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], MessageGateway.prototype, "handleJoin", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('leaveRoom'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], MessageGateway.prototype, "handleLeave", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('sendMessage'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], MessageGateway.prototype, "handleMessage", null);
exports.MessageGateway = MessageGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: process.env.FRONTEND_URL,
            credentials: true
        },
        namespace: '/channel'
    }),
    __metadata("design:paramtypes", [message_service_1.MessageService])
], MessageGateway);
//# sourceMappingURL=message.gateway.js.map