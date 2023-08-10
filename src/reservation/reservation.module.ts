import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { VehicleEntity } from '../vehicle/entities/vehicle.entity';
import { ReservationEntity } from './entities/reservation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingSlotEntity } from '../parking_slot/entities/parking_slot.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      VehicleEntity,
      ParkingSlotEntity,
      ReservationEntity,
    ]),
  ],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
