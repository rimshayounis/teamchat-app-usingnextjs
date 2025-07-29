import { Server, Socket } from 'socket.io';
export declare class MessageGateway {
    server: Server;
    handleJoin(data: {
        channel: string;
    }, client: Socket): void;
    handleMessage(data: {
        channel: string;
        user: string;
        message: string;
    }): void;
    handleTyping(data: {
        channel: string;
        user: string;
    }): void;
}
