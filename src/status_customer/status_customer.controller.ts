import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StatusCustomerService } from './status_customer.service';
import { CreateStatusCustomerDto } from './dto/create-status_customer.dto';
import { UpdateStatusCustomerDto } from './dto/update-status_customer.dto';

@Controller('status-customer')
export class StatusCustomerController {
  constructor(private readonly statusCustomerService: StatusCustomerService) {}

  @Post()
  create(@Body() createStatusCustomerDto: CreateStatusCustomerDto) {
    return this.statusCustomerService.create(createStatusCustomerDto);
  }

  @Get()
  findAll() {
    return this.statusCustomerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.statusCustomerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStatusCustomerDto: UpdateStatusCustomerDto) {
    return this.statusCustomerService.update(+id, updateStatusCustomerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statusCustomerService.remove(+id);
  }
}
