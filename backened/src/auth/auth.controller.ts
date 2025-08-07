
import {
  Controller,
  Post,
  Body,
  Req,
  Res,
  Get,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() body: { username: string; email: string; password: string },
  ) {
    return this.authService.register(body);
  }

  @Post('login')
  async login(
    @Body() body: { email: string; password: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.validateUser(body.email, body.password);
    const tokens = await this.authService.login(user);

    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
      secure: true, 
      sameSite: 'strict',
      path: '/auth/login',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

   /* res.cookie('access_token', tokens.access_token, {
      httpOnly: true,
      secure: true, 
      sameSite: 'strict',
      path: '/auth/login',
      maxAge:  24 * 60 * 60 * 1000,
    });
*/
    return {
      access_token: tokens.access_token,
      user: {
        _id: user._id,
        email: user.email,
        username: user.username,
      },
      message: 'Logged in successfully',
    };
  }

 


@Get('csrf-token')
getCsrfToken(@Req() req: Request, @Res() res: Response) {
  return res.json({ csrfToken: res.locals.csrfToken });
}


}






