 
 
 
 import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
 import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { TeamService } from '../services/team.service';
import { Request } from 'express';


@Controller('teams')
@UseGuards(JwtAuthGuard)
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  async createTeam(@Body() body: { name: string; userId: string }) {
    return this.teamService.createTeam(body.name, body.userId);
  }


@Get()
async getAllTeams(@Req() req: Request) {
  console.log('Authenticated user:', req.user);
  return this.teamService.getAllTeams();
}
@Delete(':id')
  async deleteTeam(
    @Param('id') teamId: string,
    @Body() body: { userId: string },
  ) {
    await this.teamService.deleteTeam(teamId, body.userId);
    return { message: 'Team deleted' };
  }
}







