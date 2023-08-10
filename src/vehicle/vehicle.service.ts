import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import {
  ConflictException,
  Inject,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { VehicleEntity } from './entities/vehicle.entity';
import { STATUS_VEHICLES } from 'src/status';
@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(VehicleEntity)
    private repository: Repository<VehicleEntity>,
    @Inject(ConfigService)
    private config: ConfigService,
  ) {}

  async create(createVehicleDto: CreateVehicleDto) {
    const vehicleInBd = await this.repository.findOne({
      where: { plate: createVehicleDto.plate },
    });

    if (vehicleInBd) throw new ConflictException('Vehicle already exist');

    const newVehicle = new VehicleEntity();
    newVehicle.plate = createVehicleDto.plate;
    newVehicle.description = createVehicleDto.description;
    newVehicle.category = createVehicleDto.category;
    newVehicle.owner = createVehicleDto.owner;

    const returnVehicle = await this.repository.save(newVehicle);

    return {
      status: STATUS_VEHICLES.CREATED,
      message: 'Vehicle created successfull',
      data: returnVehicle,
    };
  }

  async findAll() {
    return {
      status: STATUS_VEHICLES.LOAD,
      message: 'Vehicles loaded successfull',
      data: await this.repository.find({
        where: { status: 'Activo' },
        relations: ['category', 'owner'],
        order: {
          id: 'ASC', // "DESC"
        },
      }),
    };
  }

  async findOne(id: number) {
    const vehicleFounded = await this.repository.findOne({
      where: { id: id },
    });
    if (!vehicleFounded) {
      throw new NotFoundException('Vehicle not found');
    }

    return {
      status: STATUS_VEHICLES.LOAD,
      message: 'Vehicle loaded successfull',
      data: vehicleFounded,
    };
  }

  async update(id: number, updateVehicleDto: UpdateVehicleDto) {
    const vehicleFounded = await this.repository.findOne({
      where: { id: id },
    });
    if (!vehicleFounded) {
      throw new NotFoundException('Vehicle not found');
    }

    vehicleFounded.plate = updateVehicleDto.plate;
    vehicleFounded.description = updateVehicleDto.description;

    const returnVehicUpdated = await this.repository.save(vehicleFounded);

    return {
      status: STATUS_VEHICLES.LOAD,
      message: 'Vehicle updated successfull',
      data: returnVehicUpdated,
    };
  }

  async remove(id: number) {
    const vehicleFounded = await this.repository.findOne({
      where: { id: id },
    });
    if (!vehicleFounded) {
      throw new NotFoundException('Vehicle not found');
    }

    vehicleFounded.status = 'Inactivo';

    const returnVehicUpdated = await this.repository.save(vehicleFounded);

    return {
      status: STATUS_VEHICLES.DELETED,
      message: `Vehicle ${vehicleFounded.id} has been deleted successfully`,
      data: returnVehicUpdated,
    };
  }
}
