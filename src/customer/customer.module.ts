import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { CustomerEntity } from './entities/customer.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, CustomerEntity]),
    ConfigModule,
  ],
  controllers: [CustomerController],
  providers: [CustomerService, ConfigService],
})
export class CustomerModule {}
