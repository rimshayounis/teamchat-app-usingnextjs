import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserModule } from '../../users/user.module';
import { AuthController } from './auth.controller';
import { JwtStrategy } from '../jwt.strategy';

@Module({
  imports: [
    PassportModule,
    
    
    JwtModule.register({
      secret: 'jwt-secret-key', 
      signOptions: { expiresIn: '1d' },
    }),
    UserModule,
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}




