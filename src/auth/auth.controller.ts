import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '.jwt-auth-guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  async login(@Body() body) {
    return this.authService.login(body);
  }
  @Post('register')
  async register(@Body() body) {
    return this.authService.register(body.email, body.password);
  }

  @UseGuards(JwtAuthGuard)
  @Post('test')
  async test(@Req() req) {
    return req.user;
  }
}
