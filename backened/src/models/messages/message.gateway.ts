import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { MessageService } from './services/message.service';

@WebSocketGateway({ 

  cors: {
    origin: process.env.FRONTEND_URL,

    credentials: true
  },
  namespace: '/channel'
})
export class MessageGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private logger = new Logger('MessageGateway');

  constructor(private readonly messageService: MessageService) {}

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('channel')
  handleJoin(
    @MessageBody() data: { channel: string },
    @ConnectedSocket() client: Socket,
  ) {
    if (!data.channel) {
      client.emit('error', { message: 'Channel is required' });
      return;
    }

    client.join(data.channel);
    client.emit('joinedRoom', { channel: data.channel });
    this.logger.log(`Client ${client.id} joined room ${data.channel}`);
  }

  @SubscribeMessage('leaveRoom')
  handleLeave(
    @MessageBody() data: { channel: string },
    @ConnectedSocket() client: Socket,
  ) {
    if (!data.channel) {
      client.emit('error', { message: 'Channel is required' });
      return;
    }

    client.leave(data.channel);
    client.emit('leftRoom', { channel: data.channel });
    this.logger.log(`Client ${client.id} left room ${data.channel}`);
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody() data: { channelId: string; senderId: string; content: string },
    @ConnectedSocket() client: Socket,
  ) {
    try {
      if (!data.channelId || !data.senderId || !data.content) {
        client.emit('error', { message: 'Missing required fields' });
        return;
      }

      const savedMessage = await this.messageService.sendMessage(
        data.channelId,
        data.senderId,
        data.content
      );

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

    } catch (error) {
      this.logger.error(`Error sending message: ${error.message}`);
      client.emit('error', { message: 'Failed to send message' });
    }
  }

  
}