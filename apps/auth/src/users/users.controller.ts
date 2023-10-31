import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CurrentUser, UserDocument } from '@app/common';
import { JwtAuthGaurd } from '../gaurds/jwt-auth.gaurd';
import { CreateUserDto } from './dto/create-user.dto';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Post()
  async createUser(@Body() createuserDto: CreateUserDto) {
    return this.userService.create(createuserDto);
  }

  @Get()
  @UseGuards(JwtAuthGaurd)
  async getUser(@CurrentUser() user: UserDocument) {
    return user;
  }
}
