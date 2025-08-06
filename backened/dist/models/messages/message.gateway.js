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
    handleJoinChannel(data, client) {
        client.join(data.channelId);
        client.emit('joinedChannel', data.channelId);
        this.logger.log(`Client ${client.id} joined channel ${data.channelId}`);
    }
    handleLeaveChannel(data, client) {
        client.leave(data.channelId);
        this.logger.log(`Client ${client.id} left channel ${data.channelId}`);
    }
    handleTyping(data, client) {
        if (!data.channelId || !data.username) {
            client.emit('error', { message: 'Channel ID and Username are required' });
            return;
        }
        client.to(data.channelId).emit('userTyping', { username: data.username });
        this.logger.log(`User ${data.username} is typing in channel ${data.channelId}`);
    }
    handleStopTyping(data, client) {
        if (!data.channelId || !data.username) {
            client.emit('error', { message: 'Channel ID and Username are required' });
            return;
        }
        client.to(data.channelId).emit('userStoppedTyping', { username: data.username });
        this.logger.log(`User ${data.username} stopped typing in channel ${data.channelId}`);
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
                { path: 'channel', select: 'name description' },
            ]);
            this.server.to(data.channelId).emit('receiveMessage', {
                id: populatedMessage._id,
                content: populatedMessage.content,
                sender: populatedMessage.sender,
                channel: populatedMessage.channel,
                createdAt: populatedMessage[`createdAt`],
                updatedAt: populatedMessage[`updatedAt`],
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
    (0, websockets_1.SubscribeMessage)('connect'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], MessageGateway.prototype, "handleConnection", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('joinChannel'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], MessageGateway.prototype, "handleJoinChannel", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('leaveChannel'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], MessageGateway.prototype, "handleLeaveChannel", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('typing'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], MessageGateway.prototype, "handleTyping", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('stopTyping'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], MessageGateway.prototype, "handleStopTyping", null);
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
            origin: process.env.CLIENT_URL,
            credentials: true,
        },
        namespace: '/channel',
    }),
    __metadata("design:paramtypes", [message_service_1.MessageService])
], MessageGateway);
//# sourceMappingURL=message.gateway.js.map