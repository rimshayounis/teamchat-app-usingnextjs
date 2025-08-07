


import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ChannelService } from '../services/channel.service';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user: {
    userId: string;
    email: string;
  };
}

@Controller('channels')
export class ChannelController {
  constructor(private readonly service: ChannelService) {}

  @Post()
  @UseGuards(JwtAuthGuard) 
  async create(
    @Body() dto: { name: string; teamId: string },
    @Req() req: AuthenticatedRequest,
  ) {
    console.log('Creating channel by user:', req.user);
    return this.service.create(dto.name, dto.teamId);
  }

  @Get('teams/:teamId')
  @UseGuards(JwtAuthGuard) 
  async getChannels(
    @Param('teamId') teamId: string,
    @Req() req: AuthenticatedRequest,
  ) {
    console.log('Fetching channels — user:', req.user); 
    return this.service.findByTeam(teamId);
  }

  @Delete(':channelId')
  @UseGuards(JwtAuthGuard) 
  async delete(
    @Param('channelId') channelId: string,
    @Req() req: AuthenticatedRequest,
  ) {
    console.log('Deleting channel by user:', req.user);
    return this.service.deleteChannel(channelId);
  }
}
