import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class RoleDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  role_name: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
