import {
  Injectable,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/entities/user.entity';

@Injectable()
export class AuthHelper {
  @InjectRepository(UserEntity)
  private readonly repository: Repository<UserEntity>;

  private readonly jwt: JwtService;

  constructor(jwt: JwtService) {
    this.jwt = jwt;
  }

  // Decoding the JWT Token
  public async decode(token: string): Promise<unknown> {
    return this.jwt.decode(token, null);
  }

  // Get UserDetailEntity by UserDetailEntity ID we get from decode()
  public async validateUserEntity(decoded: any): Promise<UserEntity> {
    return this.repository.findOne({
      where: { id: decoded.id },
      relations: ['role', 'user'],
    });
  }

  // Generate JWT Token
  public generateToken(user: UserEntity): string {
    const token: string = this.jwt.sign({
      id: user.id,
      username: user.username,
    });

    return token;
  }

  // Validate UserDetailEntity's password
  public isPasswordValid(password: string, userPassword: string): boolean {
    return password === userPassword;
  }

  // Encode UserDetailEntity's password
  // Validate JWT Token, throw forbidden error if JWT Token is invalid
  public async validate(token: string): Promise<boolean | never> {
    const decoded: unknown = this.jwt.verify(token);

    if (!decoded) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    const user: UserEntity = await this.validateUserEntity(decoded);

    if (!user) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
