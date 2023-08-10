import { Module } from '@nestjs/common';
import { BlockService } from './block.service';
import { BlockController } from './block.controller';
import { BlockEntity } from './entities/block.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([BlockEntity]), ConfigModule],
  controllers: [BlockController],
  providers: [BlockService, ConfigService],
})
export class BlockModule {}
