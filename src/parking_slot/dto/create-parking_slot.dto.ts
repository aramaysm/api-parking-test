import { BlockEntity } from 'src/block/entities/block.entity';
import { CategoryVehicleEntity } from 'src/category_vehicle/entities/category_vehicle.entity';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateParkingSlotDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  slot_code: string;

  block: BlockEntity;

  category_vehicle: CategoryVehicleEntity;
}
