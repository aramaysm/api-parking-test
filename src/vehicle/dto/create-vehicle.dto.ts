import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { CategoryVehicleEntity } from '../../category_vehicle/entities/category_vehicle.entity';
import { CustomerEntity } from '../../customer/entities/customer.entity';

export class CreateVehicleDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  plate: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  category: CategoryVehicleEntity;

  owner: CustomerEntity;
}
