import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { UserEntity } from '../../user/entities/user.entity';

export class CreateCustomerDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(11)
  dni: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(16)
  payment_card: string;

  user: UserEntity;
}
