import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { CurrentUser } from '@app/common';
import { JwtAuthGaurd } from './gaurds/jwt-auth.gaurd';
import { LocalAuthGaurd } from './gaurds/local-auth-gaurd';
import { UserDocument } from './users/models/user.schema';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGaurd)
  @Post('login')
  async login(
    @CurrentUser() user: UserDocument,
    @Res({ passthrough: true }) response: Response,
  ) {
    console.log('HELLO');
    await this.authService.login(user, response);

    response.send(user);
  }
  // allows us to accept incoming RPC calls on our chosen transport layer
  @UseGuards(JwtAuthGaurd)
  @MessagePattern('authenticate')
  async authenticate(@Payload() data: any) {
    return data.user;
  }
}
