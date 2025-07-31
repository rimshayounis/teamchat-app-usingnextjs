 import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../users/services/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException('User not found');


    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid password');

    return user;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    console.log(user); 

    const payload = { sub:(user as any)._id, email: user.email };

    return {
      message: 'Login successful',
      accessToken: this.jwtService.sign(payload),
      user,
    };
  }
}

