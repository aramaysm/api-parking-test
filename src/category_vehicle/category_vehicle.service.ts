import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { CreateCategoryVehicleDto } from './dto/create-category_vehicle.dto';
import { UpdateCategoryVehicleDto } from './dto/update-category_vehicle.dto';
import { CategoryVehicleEntity } from './entities/category_vehicle.entity';
import { STATUS_VEHICLE_CATEGORIES } from 'src/status';

@Injectable()
export class CategoryVehicleService {
  constructor(
    @InjectRepository(CategoryVehicleEntity)
    private repository: Repository<CategoryVehicleEntity>,
    @Inject(ConfigService)
    private config: ConfigService,
  ) {}

  async create(createCategoryVehicleDto: CreateCategoryVehicleDto) {
    const categoryInBd = await this.repository.findOne({
      where: { category_name: createCategoryVehicleDto.category_name },
    });

    if (categoryInBd)
      throw new ConflictException('category vehicle already exist');

    const newCategory = new CategoryVehicleEntity();
    newCategory.category_name = createCategoryVehicleDto.category_name;
    newCategory.category_description =
      createCategoryVehicleDto.category_description;

    const returnCategory = await this.repository.save(newCategory);

    return {
      status: STATUS_VEHICLE_CATEGORIES.CREATED,
      message: 'Category vehicle of parking created successfull',
      data: returnCategory,
    };
  }

  async findAll() {
    return {
      status: STATUS_VEHICLE_CATEGORIES.LOAD,
      message: 'Categories vehicles loaded successfull',
      data: await this.repository.find({
        order: {
          id: 'ASC', // "DESC"
        },
      }),
    };
  }

  async findOne(id: number) {
    const categoryFounded = await this.repository.findOne({
      where: { id: id },
    });
    if (!categoryFounded) {
      throw new NotFoundException('Category vehicle not found');
    }

    return {
      status: STATUS_VEHICLE_CATEGORIES.LOAD,
      message: 'Category vehicle loaded successfull',
      data: categoryFounded,
    };
  }

  async update(id: number, updateCategoryVehicleDto: UpdateCategoryVehicleDto) {
    const categoryFounded = await this.repository.findOne({
      where: { id: id },
    });
    if (!categoryFounded) {
      throw new NotFoundException('Category vehicle not found');
    }

    categoryFounded.category_name = updateCategoryVehicleDto.category_name;
    categoryFounded.category_description =
      updateCategoryVehicleDto.category_description;

    const returnCategoryUpdated = await this.repository.save(categoryFounded);

    return {
      status: STATUS_VEHICLE_CATEGORIES.LOAD,
      message: 'Category vehicle updated successfull',
      data: returnCategoryUpdated,
    };
  }

  async remove(id: number) {
    return `This action removes a #${id} categoryVehicle`;
  }
}
