import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageService } from './services/message.service';
export declare class MessageGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly messageService;
    server: Server;
    private logger;
    constructor(messageService: MessageService);
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleJoinChannel(data: {
        channelId: string;
    }, client: Socket): void;
    handleLeaveChannel(data: {
        channelId: string;
    }, client: Socket): void;
    handleTyping(data: {
        channelId: string;
        username: string;
    }, client: Socket): void;
    handleStopTyping(data: {
        channelId: string;
        username: string;
    }, client: Socket): void;
    handleMessage(data: {
        channelId: string;
        senderId: string;
        content: string;
    }, client: Socket): Promise<void>;
}
