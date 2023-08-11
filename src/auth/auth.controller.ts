import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { JwtAuthGuard } from './auth.guard';
import { Request } from 'express';
import {
  Body,
  Controller,
  Inject,
  Post,
  ClassSerializerInterceptor,
  UseInterceptors,
  UseGuards,
  Param,
  Req,
  Get,
} from '@nestjs/common';
import { UserEntity } from '../user/entities/user.entity';
import RoleGuard from '../role/role.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  private login(@Body() body: any) {
    return this.authService.login(body);
  }

  @Get('user')
  @UseGuards(JwtAuthGuard)
  getUserByToken() {
    this.authService.getUserByToken();
  }
}
