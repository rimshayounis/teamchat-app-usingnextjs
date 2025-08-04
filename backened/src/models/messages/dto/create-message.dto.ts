

import { IsString, IsNotEmpty, IsMongoId } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  channelId: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}
