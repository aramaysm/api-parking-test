import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import RoleGuard from 'src/role/role.guard';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  @UseGuards(RoleGuard('employed'))
  create(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationService.create(createReservationDto);
  }

  @Get()
  @UseGuards(RoleGuard('employed'))
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.reservationService.findAll();
  }
  @Get('confirmed')
  @UseGuards(RoleGuard('employed'))
  @UseGuards(JwtAuthGuard)
  findAllConfirmed() {
    return this.reservationService.findAllConfirmed();
  }

  @Get('pending')
  @UseGuards(RoleGuard('employed'))
  @UseGuards(JwtAuthGuard)
  findAllPending() {
    return this.reservationService.findAllPending();
  }
  @Get('cancelled')
  @UseGuards(RoleGuard('employed'))
  @UseGuards(JwtAuthGuard)
  findAllCancelled() {
    return this.reservationService.findAllCancelled();
  }

  @Get(':id')
  @UseGuards(RoleGuard('employed'))
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.reservationService.findOne(+id);
  }
  @Put('/change_date/:id')
  @UseGuards(RoleGuard('employed'))
  @UseGuards(JwtAuthGuard)
  changeDate(
    @Param('id') id: string,
    @Body() updateReservDto: UpdateReservationDto,
  ) {
    return this.reservationService.ChangeDateReserve(+id, updateReservDto);
  }

  @Put('/confirm/:id')
  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard('employed'))
  confirmReserve(@Param('id') id: string) {
    return this.reservationService.confirmReserve(+id);
  }
  @Put('/cancel/:id')
  @UseGuards(RoleGuard('employed'))
  @UseGuards(JwtAuthGuard)
  cancelReserve(@Param('id') id: string) {
    return this.reservationService.cancelReserve(+id);
  }

  @Delete(':id')
  @UseGuards(RoleGuard('employed'))
  remove(@Param('id') id: string) {
    return this.reservationService.remove(+id);
  }
}
