import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TeamMember, TeamMemberSchema } from './entities/team-member.schema';
import { TeamMemberController } from './controllers/team-member.controller';
import { TeamMemberService } from './services/team-member.service';
import { AuthModule } from '../../auth/auth.module';

@Module({
  imports: [
     AuthModule,

    MongooseModule.forFeature([{ name: TeamMember.name, schema: TeamMemberSchema }]),
  ],
  controllers: [TeamMemberController],
  providers: [TeamMemberService],
})
export class TeamMemberModule {}
