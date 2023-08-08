import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  BaseEntity,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ParkingSlotEntity } from '../../parking_slot/entities/parking_slot.entity';

@Entity('tb_blocks')
export class BlockEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
  code_block: string;

  @Column({ type: 'int', nullable: false })
  total_slots: number;

  @Column({ type: 'int', nullable: false })
  slots_available: number;

  @OneToMany((type) => ParkingSlotEntity, (parkin_slot) => parkin_slot.block)
  @JoinTable()
  parking_slots: ParkingSlotEntity[];

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'update_at',
  })
  updateAt: Date;
}
