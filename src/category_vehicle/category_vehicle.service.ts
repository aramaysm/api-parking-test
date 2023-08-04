import { Injectable } from '@nestjs/common';
import { CreateCategoryVehicleDto } from './dto/create-category_vehicle.dto';
import { UpdateCategoryVehicleDto } from './dto/update-category_vehicle.dto';

@Injectable()
export class CategoryVehicleService {
  create(createCategoryVehicleDto: CreateCategoryVehicleDto) {
    return 'This action adds a new categoryVehicle';
  }

  findAll() {
    return `This action returns all categoryVehicle`;
  }

  findOne(id: number) {
    return `This action returns a #${id} categoryVehicle`;
  }

  update(id: number, updateCategoryVehicleDto: UpdateCategoryVehicleDto) {
    return `This action updates a #${id} categoryVehicle`;
  }

  remove(id: number) {
    return `This action removes a #${id} categoryVehicle`;
  }
}
