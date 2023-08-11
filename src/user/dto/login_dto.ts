import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
  Length,
} from 'class-validator';

export default class Login_Dto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  username: string;

  password: string;
}
