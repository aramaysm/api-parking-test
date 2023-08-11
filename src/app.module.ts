import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';
import { CategoryVehicleModule } from './category_vehicle/category_vehicle.module';
import { CustomerModule } from './customer/customer.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { ParkingSlotModule } from './parking_slot/parking_slot.module';
import { BlockModule } from './block/block.module';
import { ReservationModule } from './reservation/reservation.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    RoleModule,
    UserModule,
    CategoryVehicleModule,
    CustomerModule,
    VehicleModule,
    ParkingSlotModule,
    BlockModule,
    DatabaseModule,
    ReservationModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
