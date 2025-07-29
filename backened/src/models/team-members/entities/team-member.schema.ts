// src/entities/team-member.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class TeamMember extends Document {
  @Prop({ required: true })
  teamId: string;

  @Prop({ required: true })
  userId: string;

  @Prop({
    required: true,
    enum: ['Owner', 'Admin', 'Member'],
    default: 'Member',
  })
  role: 'Owner' | 'Admin' | 'Member';
}

export const TeamMemberSchema = SchemaFactory.createForClass(TeamMember);
