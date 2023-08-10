import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateBlockDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  code_block: string;

  @IsNotEmpty()
  @IsNumber()
  total_slots: number;

  @IsNotEmpty()
  @IsNumber()
  slots_available: number;
}
