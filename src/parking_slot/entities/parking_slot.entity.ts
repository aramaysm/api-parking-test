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

  @Column({ type: 'varchar', nullable: false, unique: true })
  public slot_code: string;

  @Column({ type: 'bool', default: true })
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

  @Column({ type: 'varchar', default: 'Activo' })
  public status: string;

  @OneToMany(
    (type) => ReservationEntity,
    (reservation) => reservation.parking_slot,
  )
  @JoinTable()
  reservations: ReservationEntity[];
}
