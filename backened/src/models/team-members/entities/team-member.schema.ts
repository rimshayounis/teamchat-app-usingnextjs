



import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TeamMemberDocument = TeamMember & Document;

@Schema()
export class TeamMember {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  teamId: string;

  @Prop({ required: true, enum: ['Owner', 'Admin', 'Member'], default: 'Member' })
  role: string;
}

export const TeamMemberSchema = SchemaFactory.createForClass(TeamMember);
