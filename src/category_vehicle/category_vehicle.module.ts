import { Module } from '@nestjs/common';
import { CategoryVehicleService } from './category_vehicle.service';
import { CategoryVehicleController } from './category_vehicle.controller';
import { CategoryVehicleEntity } from './entities/category_vehicle.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryVehicleEntity]), ConfigModule],
  controllers: [CategoryVehicleController],
  providers: [CategoryVehicleService, ConfigService],
})
export class CategoryVehicleModule {}
