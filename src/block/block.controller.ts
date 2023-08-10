import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { BlockService } from './block.service';
import { CreateBlockDto } from './dto/create-block.dto';
import { UpdateBlockDto } from './dto/update-block.dto';

@Controller('block')
export class BlockController {
  constructor(private readonly blockService: BlockService) {}

  @Post()
  create(@Body() createBlockDto: CreateBlockDto) {
    return this.blockService.create(createBlockDto);
  }

  @Get()
  findAll() {
    return this.blockService.findAll();
  }

  @Get('/getCurrentOccupation')
  getOccupationParking() {
    return this.blockService.getCurrentParkingOccupation();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blockService.findOne(+id);
  }

  @Get(':code')
  findOneByCode(@Param('code') code: string) {
    return this.blockService.findOneByBCode(code);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateBlockDto: UpdateBlockDto) {
    return this.blockService.update(+id, updateBlockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blockService.remove(+id);
  }
}
