import {
  HttpException,
  BadRequestException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from '../user/dto/user.dto';
import { UserEntity } from '../user/entities/user.entity';
import { LessThan, Repository } from 'typeorm';
import { AuthDto } from './dto/auth.dto';
import { AuthHelper } from './auth.helper';
import { ConfigService } from '@nestjs/config';
import { AuthEntity } from './entities/auth.entity';
import { validate } from 'class-validator';
import * as bcrypt from 'bcrypt';
import Login_Dto from '../user/dto/login_dto';
import { ExtractJwt } from 'passport-jwt';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthEntity)
    private readonly authRepository: Repository<AuthEntity>,
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,

    @Inject(AuthHelper)
    @Inject(ConfigService)
    private readonly helper: AuthHelper,
    private config: ConfigService,
  ) {}

  async login(signInDto: Login_Dto) {
    const { username, password } = signInDto;

    const user = await this.usersRepository.findOne({
      where: {
        username: username,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const passwordIsValid = this.helper.isPasswordValid(
      CryptoJS.SHA256(password).toString(),
      user.password,
    );

    if (!passwordIsValid) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const accessToken = this.helper.generateToken(user);

    return {
      message: 'Authentication succesfully ',
      access_token: accessToken,
    };
  }

  async getUserByToken() {
    const token = ExtractJwt.fromAuthHeaderAsBearerToken().toString();

    const isTokenValid = await this.helper.validate(token);

    if (isTokenValid) {
      return {
        status: 200,
        message: 'Authenticated user loaded',
        data: this.helper.decode(token),
      };
    } else {
      throw new HttpException('Acceso denegado ', HttpStatus.FORBIDDEN);
    }
  }
}
