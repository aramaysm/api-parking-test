import { Module } from '@nestjs/common';
import { ParkingSlotService } from './parking_slot.service';
import { ParkingSlotController } from './parking_slot.controller';
import { BlockEntity } from '../block/entities/block.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryVehicleEntity } from '../category_vehicle/entities/category_vehicle.entity';
import { ParkingSlotEntity } from './entities/parking_slot.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CategoryVehicleEntity,
      ParkingSlotEntity,
      BlockEntity,
    ]),
    ConfigModule,
  ],
  controllers: [ParkingSlotController],
  providers: [ParkingSlotService, ConfigService],
})
export class ParkingSlotModule {}
