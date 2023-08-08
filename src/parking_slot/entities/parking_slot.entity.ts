import { ReservationEntity } from '../../reservation/entities/reservation.entity';
import { BlockEntity } from '../../block/entities/block.entity';
import { CategoryVehicleEntity } from '../../category_vehicle/entities/category_vehicle.entity';

import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tb_parking_slots')
export class ParkingSlotEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column({ type: 'int', nullable: false, unique: true })
  public slot_number: number;

  @Column({ type: 'bool', default: false })
  public is_slot_available: boolean;

  @ManyToOne(
    (type) => CategoryVehicleEntity,
    (category) => category.parking_slots,
  )
  @JoinTable()
  public category: CategoryVehicleEntity;

  @ManyToOne((type) => BlockEntity, (block) => block.parking_slots)
  @JoinTable()
  public block: BlockEntity;

  @OneToMany(
    (type) => ReservationEntity,
    (reservation) => reservation.parking_slot,
  )
  @JoinTable()
  reservations: ReservationEntity[];
}
