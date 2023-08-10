import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
  Length,
} from 'class-validator';
import { RoleEntity } from '../../role/entities/role.entity';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  fullname: string;

  @IsNotEmpty()
  @MaxLength(20)
  phone: string;

  @IsNotEmpty()
  role: RoleEntity;
}
