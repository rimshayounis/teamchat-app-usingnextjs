


// src/team-member/team-member.controller.ts
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { TeamMemberService } from '../services/team-member.service';

@Controller('team-members')
export class TeamMemberController {
  constructor(private readonly teamMemberService: TeamMemberService) {}

  @Post('join')
  join(@Body() body: { teamId: string; userId: string }) {
    return this.teamMemberService.join(body.teamId, body.userId, 'Member');
  }

  @Post('owner')
  createOwner(@Body() body: { teamId: string; userId: string }) {
    return this.teamMemberService.join(body.teamId, body.userId, 'Owner');
  }

  @Get('user/:userId')
  getUserTeams(@Param('userId') userId: string) {
    return this.teamMemberService.findByUser(userId);
  }
}











