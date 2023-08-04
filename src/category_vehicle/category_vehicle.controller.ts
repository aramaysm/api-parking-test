import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryVehicleService } from './category_vehicle.service';
import { CreateCategoryVehicleDto } from './dto/create-category_vehicle.dto';
import { UpdateCategoryVehicleDto } from './dto/update-category_vehicle.dto';

@Controller('category-vehicle')
export class CategoryVehicleController {
  constructor(private readonly categoryVehicleService: CategoryVehicleService) {}

  @Post()
  create(@Body() createCategoryVehicleDto: CreateCategoryVehicleDto) {
    return this.categoryVehicleService.create(createCategoryVehicleDto);
  }

  @Get()
  findAll() {
    return this.categoryVehicleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryVehicleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryVehicleDto: UpdateCategoryVehicleDto) {
    return this.categoryVehicleService.update(+id, updateCategoryVehicleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryVehicleService.remove(+id);
  }
}
