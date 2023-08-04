import { PartialType } from '@nestjs/mapped-types';
import { CreateStatusCustomerDto } from './create-status_customer.dto';

export class UpdateStatusCustomerDto extends PartialType(CreateStatusCustomerDto) {}
