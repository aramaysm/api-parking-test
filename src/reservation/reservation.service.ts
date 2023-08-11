import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationEntity } from './entities/reservation.entity';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { VehicleEntity } from '../vehicle/entities/vehicle.entity';
import { Equal, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { STATUS_RESERVATION } from '../status';
import { ParkingSlotEntity } from '../parking_slot/entities/parking_slot.entity';
const cron = require('node-cron');

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(VehicleEntity)
    private vehicle_repository: Repository<VehicleEntity>,
    @InjectRepository(ParkingSlotEntity)
    private parkin_slot_repository: Repository<ParkingSlotEntity>,
    @InjectRepository(ReservationEntity)
    private repository: Repository<ReservationEntity>,
    @Inject(ConfigService)
    private config: ConfigService,
  ) {}

  async create(createReservationDto: CreateReservationDto) {
    let vehicleReserve;
    const vehicleInBd = await this.vehicle_repository.findOne({
      where: { plate: createReservationDto.vehicle.plate },
    });

    if (!vehicleInBd) {
      const newVehicle = new VehicleEntity();
      newVehicle.plate = createReservationDto.vehicle.plate;
      newVehicle.description = createReservationDto.vehicle.description;
      newVehicle.category = createReservationDto.vehicle.category;
      newVehicle.owner = createReservationDto.vehicle.owner;
      vehicleReserve = await this.vehicle_repository.save(newVehicle);
    } else {
      vehicleReserve = vehicleInBd;
    }

    const allSlotReservated = (await this.getAllSlotReservated()).map(
      (item) => item.parking_slot,
    );

    const allSlotsAvailable = await this.parkin_slot_repository.find({
      where: {
        status: 'Activo',
        is_slot_available: true,
        category: vehicleReserve.category,
      },
      order: {
        id: 'ASC', // "DESC"
      },
    });

    const slotsWithoutReserve = allSlotsAvailable.filter((x) => {
      const founded = allSlotReservated.find((reserv) => {
        return x.id !== reserv.id;
      });
      return founded;
    });

    console.log('All slots availables:', allSlotsAvailable);
    console.log('All slots reservated:', allSlotReservated);
    console.log('All slots without reserve:', slotsWithoutReserve);

    const randomIndex = Math.floor(Math.random() * slotsWithoutReserve.length);

    const slotSelected = slotsWithoutReserve[randomIndex];
    slotSelected.is_slot_available = false;
    this.parkin_slot_repository.update(slotSelected.id, {
      is_slot_available: false,
    });

    const newReservation = new ReservationEntity();
    newReservation.duration_in_minutes = createReservationDto.duration;
    newReservation.parking_slot = slotSelected;
    newReservation.vehicle = vehicleReserve;

    const returnReservation = await this.repository.save(newReservation);

    const tasks = cron.schedule(
      '*/' + createReservationDto.duration + ' * * * *',
      function () {
        console.log('I am ejecuteing....');
        this.parkin_slot_repository.update(slotSelected.id, {
          is_slot_available: true,
        });
      },
    );
    tasks.stop();

    return {
      status: STATUS_RESERVATION.CREATED,
      message: 'Reserve created successfull',
      data: returnReservation,
    };
  }

  async getAllSlotReservated() {
    return await this.repository.find({
      where: {
        status: 'Confirmed',
      },
      select: ['parking_slot'],
      relations: ['vehicle', 'parking_slot'],
      order: {
        id: 'ASC', // "DESC"
      },
    });
  }

  async confirmReserve(id: number) {
    const reservFounded = await this.repository.findOne({ where: { id: id } });
    if (!reservFounded) {
      throw new NotFoundException('Reserve not found');
    }

    const returnReserve = this.repository.update(id, {
      status: 'Confirmed',
    });

    return {
      status: STATUS_RESERVATION.UPDATED,
      message: 'Reserve confirmed successfull',
      data: returnReserve,
    };
  }

  async cancelReserve(id: number) {
    const reservFounded = await this.repository.findOne({ where: { id: id } });
    if (!reservFounded) {
      throw new NotFoundException('Reserve not found');
    }

    const returnReserve = this.repository.update(id, {
      status: 'Cancelled',
    });

    return {
      status: STATUS_RESERVATION.UPDATED,
      message: 'Reserve cancelled successfull',
      data: returnReserve,
    };
  }

  async findAll() {
    return {
      status: STATUS_RESERVATION.LOAD,
      message: 'Reservations loaded successfull',
      data: await this.repository.find({
        order: {
          id: 'ASC', // "DESC"
        },
        relations: ['parking_slot', 'vehicle'],
      }),
    };
  }
  async findAllConfirmed() {
    return {
      status: STATUS_RESERVATION.LOAD,
      message: 'Reservations loaded successfull',
      data: await this.repository.find({
        where: {
          status: 'Confirmed',
        },
        order: {
          id: 'ASC', // "DESC"
        },
        relations: ['parking_slot', 'vehicle'],
      }),
    };
  }

  async findAllPending() {
    return {
      status: STATUS_RESERVATION.LOAD,
      message: 'Reservations loaded successfull',
      data: await this.repository.find({
        where: {
          status: 'Pending',
        },
        order: {
          id: 'ASC', // "DESC"
        },
        relations: ['parking_slot', 'vehicle'],
      }),
    };
  }

  async findAllCancelled() {
    return {
      status: STATUS_RESERVATION.LOAD,
      message: 'Reservations loaded successfull',
      data: await this.repository.find({
        where: {
          status: 'Cancelled',
        },
        order: {
          id: 'ASC', // "DESC"
        },
        relations: ['parking_slot', 'vehicle'],
      }),
    };
  }

  async ChangeDateReserve(id: number, newReservation: UpdateReservationDto) {
    this.cancelReserve(id);
    const reservFounded = await this.repository.findOne({ where: { id: id } });
    if (!reservFounded) {
      throw new NotFoundException('Reserve not found');
    }
    let newReserve = new ReservationEntity();
    newReserve = reservFounded;
    newReserve.duration_in_minutes = newReservation.duration;

    const returnReservation = await this.repository.save(newReserve);

    const tasks = cron.schedule(
      '*/' +
        (newReservation.duration - reservFounded.duration_in_minutes) +
        ' * * * *',
      function () {
        this.parkin_slot_repository.update(returnReservation.parking_slot.id, {
          is_slot_available: true,
        });
      },
    );
    tasks.stop();

    return {
      status: STATUS_RESERVATION.UPDATED,
      message: 'Reserve date updated successfull',
      data: returnReservation,
    };
  }

  async findOne(id: number) {
    const reservFounded = await this.repository.findOne({ where: { id: id } });
    if (!reservFounded) {
      throw new NotFoundException('Reserve not found');
    }

    return {
      status: STATUS_RESERVATION.LOAD,
      message: 'Reservation loaded successfull',
      data: reservFounded,
    };
  }

  update(id: number, updateReservationDto: UpdateReservationDto) {
    return `This action updates a #${id} reservation`;
  }

  remove(id: number) {
    return `This action removes a #${id} reservation`;
  }
}
