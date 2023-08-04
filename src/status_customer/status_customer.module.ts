import { Module } from '@nestjs/common';
import { StatusCustomerService } from './status_customer.service';
import { StatusCustomerController } from './status_customer.controller';

@Module({
  controllers: [StatusCustomerController],
  providers: [StatusCustomerService]
})
export class StatusCustomerModule {}
