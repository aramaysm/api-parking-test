import { Module } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehicleController } from './vehicle.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEntity } from '../customer/entities/customer.entity';
import { VehicleEntity } from './entities/vehicle.entity';
import { CategoryVehicleEntity } from '../category_vehicle/entities/category_vehicle.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      VehicleEntity,
      CategoryVehicleEntity,
      CustomerEntity,
    ]),
    ConfigModule,
  ],
  controllers: [VehicleController],
  providers: [VehicleService, ConfigService],
})
export class VehicleModule {}
