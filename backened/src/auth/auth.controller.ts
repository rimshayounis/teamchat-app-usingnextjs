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

    console.log("user:", user);
    console.log("tokens:", tokens);

    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/auth/refresh',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.json({
  access_token: tokens.access_token,
  user: {
    _id: user._id,
    email: user.email,
    username: user.username,
  },
  message: 'Logged in successfully',
});


   
  }

  @Post('refresh')
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshToken = req.cookies['refresh_token'];
    if (!refreshToken) {
      throw new UnauthorizedException('No refresh token provided');
    }

    try {
      const accessToken = await this.authService.refreshAccessToken(refreshToken);
      return res.json({ access_token: accessToken });
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  @Get('csrf-token')
  getCsrfToken(@Req() req: Request, @Res() res: Response) {
    const csrfToken = res.locals.csrfToken;
    return res.json({ csrfToken });
  }
}



