
import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { MessageService } from '../services/message.service';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { CsrfGuard } from '../../../auth/csrf.guard';
import { Request } from 'express';

@Controller('messages')
@UseGuards(JwtAuthGuard) 
export class MessageController {
  constructor(private readonly messageService: MessageService) {}


  @Get('channels/:channelId')
  async getMessages(@Param('channelId') channelId: string) {
    return this.messageService.getMessages(channelId);
  }


  @Post()
  @UseGuards(CsrfGuard)
  async sendMessage(
    @Body() body: { channelId: string; content: string },
    @Req() req: Request,
  ) {
    const userId = (req as any).user.userId;
    return this.messageService.sendMessage(body.channelId, userId, body.content);
  }
}
