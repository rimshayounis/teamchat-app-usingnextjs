

import { Body, Controller, Get, Param, Post, Query} from '@nestjs/common';
import { TeamMemberService } from '../services/team-member.service';

@Controller('team-members')
export class TeamMemberController {
  constructor(private readonly teamMemberService: TeamMemberService) {}

  @Post('join')
  async joinTeam(@Body() body: { userId: string; teamId: string }) {
    return this.teamMemberService.joinTeam(body.userId, body.teamId);
  }

  @Get('user/:userId')
  async getUserTeams(@Param('userId') userId: string) {
    return this.teamMemberService.getUserTeams(userId);
  }

@Get('role')
async getUserRole(
  @Query('userId') userId: string,
  @Query('teamId') teamId: string,
) {
  const role = await this.teamMemberService.getUserRoleInTeam(userId, teamId);
  return { role };
}
}















