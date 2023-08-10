import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBlockDto } from './dto/create-block.dto';
import { UpdateBlockDto } from './dto/update-block.dto';
import { BlockEntity } from './entities/block.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Repository, Not } from 'typeorm';
import { STATUS_BLOCK } from 'src/status';
@Injectable()
export class BlockService {
  constructor(
    @InjectRepository(BlockEntity)
    private repository: Repository<BlockEntity>,
    @Inject(ConfigService)
    private config: ConfigService,
  ) {}

  async create(createBlockDto: CreateBlockDto) {
    const blockInBd = await this.repository.findOne({
      where: { code_block: createBlockDto.code_block },
    });

    if (blockInBd) throw new ConflictException('Block already exist');
    if (createBlockDto.slots_available > createBlockDto.total_slots)
      throw new ConflictException(
        'The number of parking slots available must not be greater than the total number of parking slot',
      );

    const newBlock = new BlockEntity();
    newBlock.code_block = createBlockDto.code_block;
    newBlock.total_slots = createBlockDto.total_slots;
    newBlock.slots_available = createBlockDto.slots_available;

    const returnBlock = await this.repository.save(newBlock);

    return {
      status: STATUS_BLOCK.CREATED,
      message: 'Block of parking created successfull',
      data: returnBlock,
    };
  }

  async findAll() {
    return {
      status: STATUS_BLOCK.LOAD,
      message: 'Blocks loaded successfull',
      data: await this.repository.find({
        where: { status: 'Activo' },
        order: {
          id: 'ASC', // "DESC"
        },
      }),
    };
  }

  async getCurrentParkingOccupation() {
    const totalSlotOfParking = await this.repository.sum('total_slots', {
      status: 'Activo',
    });
    const totalSlotAvailable = await this.repository.sum('slots_available', {
      status: 'Activo',
    });

    return {
      status: STATUS_BLOCK.LOAD,
      message: 'Blocks loaded successfull',
      data: {
        totalSlotsOfParking: Number(totalSlotOfParking.toFixed()),
        slotsAvailable: Number(Number(totalSlotAvailable).toFixed()) || 0,
      },
    };
  }

  async findOne(id: number) {
    const blockFounded = await this.repository.findOne({ where: { id: id } });
    if (!blockFounded) {
      throw new NotFoundException('Block not found');
    }

    return {
      status: STATUS_BLOCK.LOAD,
      message: 'Block loaded successfull',
      data: blockFounded,
    };
  }

  async findOneByBCode(code: string) {
    const blockFounded = await this.repository.findOne({
      where: { code_block: code },
    });
    if (!blockFounded) {
      throw new NotFoundException('Block not found');
    }

    return {
      status: STATUS_BLOCK.LOAD,
      message: 'Block loaded successfull',
      data: blockFounded,
    };
  }

  async update(id: number, updateBlockDto: UpdateBlockDto) {
    const blockFounded = await this.repository.findOne({ where: { id: id } });
    if (!blockFounded) {
      throw new NotFoundException('Block not found');
    }

    blockFounded.total_slots = updateBlockDto.total_slots;
    blockFounded.slots_available = updateBlockDto.slots_available;

    const returnBlockUpdated = await this.repository.save(blockFounded);

    return {
      status: STATUS_BLOCK.LOAD,
      message: 'Block updated successfull',
      data: returnBlockUpdated,
    };
  }

  async remove(id: number) {
    const blockFounded = await this.repository.findOne({ where: { id: id } });
    if (!blockFounded) {
      throw new NotFoundException('Block not found');
    }

    blockFounded.status = 'Inactivo';

    const returnBlockUpdated = await this.repository.save(blockFounded);

    return {
      status: STATUS_BLOCK.DELETED,
      message: `Block ${blockFounded.code_block} has been deleted successfully`,
      data: returnBlockUpdated,
    };
  }
}
