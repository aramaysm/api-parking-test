import { Injectable } from '@nestjs/common';
import { CreateParkingSlotDto } from './dto/create-parking_slot.dto';
import { UpdateParkingSlotDto } from './dto/update-parking_slot.dto';

@Injectable()
export class ParkingSlotService {
  create(createParkingSlotDto: CreateParkingSlotDto) {
    return 'This action adds a new parkingSlot';
  }

  findAll() {
    return `This action returns all parkingSlot`;
  }

  findOne(id: number) {
    return `This action returns a #${id} parkingSlot`;
  }

  update(id: number, updateParkingSlotDto: UpdateParkingSlotDto) {
    return `This action updates a #${id} parkingSlot`;
  }

  remove(id: number) {
    return `This action removes a #${id} parkingSlot`;
  }
}
