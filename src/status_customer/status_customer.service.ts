import { Injectable } from '@nestjs/common';
import { CreateStatusCustomerDto } from './dto/create-status_customer.dto';
import { UpdateStatusCustomerDto } from './dto/update-status_customer.dto';

@Injectable()
export class StatusCustomerService {
  create(createStatusCustomerDto: CreateStatusCustomerDto) {
    return 'This action adds a new statusCustomer';
  }

  findAll() {
    return `This action returns all statusCustomer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} statusCustomer`;
  }

  update(id: number, updateStatusCustomerDto: UpdateStatusCustomerDto) {
    return `This action updates a #${id} statusCustomer`;
  }

  remove(id: number) {
    return `This action removes a #${id} statusCustomer`;
  }
}
