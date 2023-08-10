import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ParkingSlotService } from './parking_slot.service';
import { CreateParkingSlotDto } from './dto/create-parking_slot.dto';
import { UpdateParkingSlotDto } from './dto/update-parking_slot.dto';

@Controller('parking-slot')
export class ParkingSlotController {
  constructor(private readonly parkingSlotService: ParkingSlotService) {}

  @Post()
  create(@Body() createParkingSlotDto: CreateParkingSlotDto) {
    return this.parkingSlotService.create(createParkingSlotDto);
  }

  @Get()
  findAll() {
    return this.parkingSlotService.findAll();
  }

  @Get('/availables')
  findAllAvailables() {
    return this.parkingSlotService.findAllAvailables();
  }
  @Get('/availables_by_block/:id')
  findAllAvailablesByBlock(@Param('id') id: string) {
    return this.parkingSlotService.findAllAvailablesByBlock(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.parkingSlotService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateParkingSlotDto: UpdateParkingSlotDto,
  ) {
    return this.parkingSlotService.update(+id, updateParkingSlotDto);
  }

  @Put('change_availability/:id')
  changeAvailabity(@Param('id') id: string) {
    return this.parkingSlotService.changeAvailability(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.parkingSlotService.remove(+id);
  }
}
