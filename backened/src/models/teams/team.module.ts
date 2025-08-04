import { Module } from '@nestjs/common';
import { TeamService } from './services/team.service';
import { TeamController } from './controllers/team.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Team, TeamSchema } from './entities/team.schema';
import { TeamMember, TeamMemberSchema } from '../team-members/entities/team-member.schema';
import { AuthModule } from '../../auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: Team.name, schema: TeamSchema }]),
    MongooseModule.forFeature([{ name: TeamMember.name, schema: TeamMemberSchema }]),
  ],
  controllers: [TeamController],
  providers: [TeamService],

})
export class TeamModule {}
