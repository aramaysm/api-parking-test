import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { VehicleEntity } from '../vehicle/entities/vehicle.entity';
import { ReservationEntity } from './entities/reservation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingSlotEntity } from '../parking_slot/entities/parking_slot.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      VehicleEntity,
      ParkingSlotEntity,
      ReservationEntity,
    ]),
    ConfigModule,
  ],
  controllers: [ReservationController],
  providers: [ReservationService, ConfigService],
})
export class ReservationModule {}
