import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateCategoryVehicleDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  category_name: string;

  @IsNotEmpty()
  @IsString()
  category_description: string;
}
