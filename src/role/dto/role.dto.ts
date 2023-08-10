import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class RoleDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
