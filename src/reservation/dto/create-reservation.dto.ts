import { IsNumber, IsNotEmpty } from 'class-validator';
import { VehicleEntity } from '../../vehicle/entities/vehicle.entity';

export class CreateReservationDto {
  @IsNotEmpty()
  duration: number;

  vehicle: VehicleEntity;
}
