import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { TeamService } from '../services/team.service';

@Controller('teams')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  create(@Body() body: { name: string; userId: string }) {
    return this.teamService.create(body.name, body.userId);
  }

  @Get()
  findAll() {
    return this.teamService.findAll();
  }

  @Delete(':id')
  delete(@Param('id') id: string, @Body() body: { userId: string }) {
    return this.teamService.delete(id, body.userId);
  }
}
