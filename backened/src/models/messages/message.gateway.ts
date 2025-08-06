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
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
  namespace: '/channel',
})
export class MessageGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private logger = new Logger('MessageGateway');

  constructor(private readonly messageService: MessageService) {}
@SubscribeMessage('connect')
  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }


  @SubscribeMessage('joinChannel')
  handleJoinChannel(
    @MessageBody() data: { channelId: string },
    @ConnectedSocket() client: Socket,
  ) {
    client.join(data.channelId);
    client.emit('joinedChannel', data.channelId);
    this.logger.log(`Client ${client.id} joined channel ${data.channelId}`);
  }

  
  @SubscribeMessage('leaveChannel')
  handleLeaveChannel(
    @MessageBody() data: { channelId: string },
    @ConnectedSocket() client: Socket,
  ) {
    client.leave(data.channelId);
    this.logger.log(`Client ${client.id} left channel ${data.channelId}`);
  }

  @SubscribeMessage('typing')
  handleTyping(
    @MessageBody() data: { channelId: string; username: string },
    @ConnectedSocket() client: Socket,
  ) {
    if (!data.channelId || !data.username) {
      client.emit('error', { message: 'Channel ID and Username are required' });
      return;
    }

    client.to(data.channelId).emit('userTyping', { username: data.username });
    this.logger.log(`User ${data.username} is typing in channel ${data.channelId}`);
  }


  @SubscribeMessage('stopTyping')
  handleStopTyping(
    @MessageBody() data: { channelId: string; username: string },
    @ConnectedSocket() client: Socket,
  ) {
    if (!data.channelId || !data.username) {
      client.emit('error', { message: 'Channel ID and Username are required' });
      return;
    }

    client.to(data.channelId).emit('userStoppedTyping', { username: data.username });
    this.logger.log(`User ${data.username} stopped typing in channel ${data.channelId}`);
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
        data.content,
      );

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
    } catch (error) {
      this.logger.error(`Error sending message: ${error.message}`);
      client.emit('error', { message: 'Failed to send message' });
    }
  }
}
