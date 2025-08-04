// channel module 
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Channel, ChannelSchema } from './entities/channel.schema';
import { ChannelService } from './services/channel.service';
import { ChannelController } from './controllers/channel.controller';
import { AuthModule } from '../../auth/auth.module';

@Module({
  imports: [
      AuthModule,
    MongooseModule.forFeature([
      { name: Channel.name, schema: ChannelSchema },
    ]),
  ],
  providers: [ChannelService],
  controllers: [ChannelController],
  exports: [ChannelService],
})
export class ChannelModule {}

