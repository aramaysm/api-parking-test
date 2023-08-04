import { Module } from '@nestjs/common';
import { CategoryVehicleService } from './category_vehicle.service';
import { CategoryVehicleController } from './category_vehicle.controller';

@Module({
  controllers: [CategoryVehicleController],
  providers: [CategoryVehicleService]
})
export class CategoryVehicleModule {}
