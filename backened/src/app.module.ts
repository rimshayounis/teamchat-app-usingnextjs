import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from './models/users/user.module';
import { TeamModule } from './models/teams/team.module';
import { TeamMemberModule } from './models/team-members/team-member.module';
import { ChannelModule } from './models/channels/channel.module';
import { MessageModule } from './models/messages/message.module';
import { AuthMiddleware } from './auth/auth.middleware';
import { MessageGateway } from './models/messages/message.gateway';

import { AuthModule } from './auth/auth.module'; 

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/chat-app'),
    UserModule,
    TeamModule,
    TeamMemberModule,
    ChannelModule,
    MessageModule,
    AuthModule, // ✅ Add to imports
  ],
  providers: [MessageGateway], // ✅ Only Gateway, not AuthService here
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'teams/*', method: RequestMethod.ALL },
        { path: 'channels/*', method: RequestMethod.ALL },
        { path: 'messages/*', method: RequestMethod.ALL },
      );
  }
}
