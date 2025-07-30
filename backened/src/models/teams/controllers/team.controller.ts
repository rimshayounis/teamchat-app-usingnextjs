 import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TeamService } from '../services/team.service';

@Controller('teams')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  async createTeam(@Body() body: { name: string; userId: string }) {
    return this.teamService.createTeam(body.name, body.userId);
  }

  @Get()
  async getAllTeams() {
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
