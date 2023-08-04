import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryVehicleDto } from './create-category_vehicle.dto';

export class UpdateCategoryVehicleDto extends PartialType(CreateCategoryVehicleDto) {}
