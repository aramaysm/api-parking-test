import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { RoleEntity } from '../role/entities/role.entity';
import { CustomerEntity } from '../customer/entities/customer.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, RoleEntity, CustomerEntity]),
    ConfigModule,
  ],
  controllers: [UserController],
  providers: [UserService, ConfigService],
})
export class UserModule {}
