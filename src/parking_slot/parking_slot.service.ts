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
import { CreateParkingSlotDto } from './dto/create-parking_slot.dto';
import { UpdateParkingSlotDto } from './dto/update-parking_slot.dto';
import { ParkingSlotEntity } from './entities/parking_slot.entity';
import { STATUS_PARKING_SLOT } from 'src/status';

@Injectable()
export class ParkingSlotService {
  constructor(
    @InjectRepository(ParkingSlotEntity)
    private repository: Repository<ParkingSlotEntity>,
    @Inject(ConfigService)
    private config: ConfigService,
  ) {}

  async create(createParkingSlotDto: CreateParkingSlotDto) {
    const slotInBd = await this.repository.findOne({
      where: { slot_code: createParkingSlotDto.slot_code },
    });

    if (slotInBd) throw new ConflictException('Parking slot already exist');
    if (createParkingSlotDto.block.slots_available == 0)
      throw new NotAcceptableException(
        'The assigned block is full, choose another',
      );

    const newSlot = new ParkingSlotEntity();
    newSlot.slot_code = createParkingSlotDto.slot_code;
    newSlot.block = createParkingSlotDto.block;
    newSlot.category = createParkingSlotDto.category_vehicle;

    const returnSlot = await this.repository.save(newSlot);

    return {
      status: STATUS_PARKING_SLOT.CREATED,
      message: 'Parking slot created successfull',
      data: returnSlot,
    };
  }

  async findAll() {
    return {
      status: STATUS_PARKING_SLOT.LOAD,
      message: 'Parking slots loaded successfull',
      data: await this.repository.find({
        where: { status: 'Activo' },
        order: {
          id: 'ASC', // "DESC"
        },
      }),
    };
  }

  async findAllAvailables() {
    return {
      status: STATUS_PARKING_SLOT.LOAD,
      message: 'Parking slots loaded successfull',
      data: await this.repository.find({
        where: { status: 'Activo', is_slot_available: true },
        order: {
          id: 'ASC', // "DESC"
        },
        relations: ['category', 'block'],
      }),
    };
  }

  async findAllAvailablesByBlock(id_block: number) {
    return {
      status: STATUS_PARKING_SLOT.LOAD,
      message: 'Parking slots loaded successfull',
      data: await this.repository.find({
        where: {
          status: 'Activo',
          is_slot_available: true,
          block: { id: id_block },
        },
        order: {
          id: 'ASC', // "DESC"
        },
        relations: ['block'],
      }),
    };
  }

  async findOne(id: number) {
    const slotFounded = await this.repository.findOne({ where: { id: id } });
    if (!slotFounded) {
      throw new NotFoundException('Parking slot not found');
    }

    return {
      status: STATUS_PARKING_SLOT.LOAD,
      message: 'Parking slot loaded successfull',
      data: slotFounded,
    };
  }

  async update(id: number, updateParkingSlotDto: UpdateParkingSlotDto) {
    const slotFounded = await this.repository.findOne({ where: { id: id } });
    if (!slotFounded) {
      throw new NotFoundException('Parking slot not found');
    }

    slotFounded.slot_code = updateParkingSlotDto.slot_code;
    slotFounded.block = updateParkingSlotDto.block;
    slotFounded.category = updateParkingSlotDto.category_vehicle;

    const returnSlotUpdated = await this.repository.save(slotFounded);

    return {
      status: STATUS_PARKING_SLOT.LOAD,
      message: 'Parking slot updated successfull',
      data: returnSlotUpdated,
    };
  }

  async changeAvailability(id: number) {
    const slotFounded = await this.repository.findOne({ where: { id: id } });
    if (!slotFounded) {
      throw new NotFoundException('Parking slot not found');
    }

    slotFounded.is_slot_available = !slotFounded.is_slot_available;

    const returnSlotUpdated = await this.repository.update(id, slotFounded);

    return {
      status: STATUS_PARKING_SLOT.UPDATED,
      message: 'Parking slot updated successfull',
      data: returnSlotUpdated,
    };
  }

  async remove(id: number) {
    const slotFounded = await this.repository.findOne({ where: { id: id } });
    if (!slotFounded) {
      throw new NotFoundException('Parking slot not found');
    }

    slotFounded.status = 'Inactivo';

    const returnSlotUpdated = await this.repository.save(slotFounded);

    return {
      status: STATUS_PARKING_SLOT.DELETED,
      message: `Slot ${slotFounded.slot_code} has been deleted successfully`,
      data: returnSlotUpdated,
    };
  }
}
