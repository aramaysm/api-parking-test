import { ParkingSlotEntity } from '../../parking_slot/entities/parking_slot.entity';

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
import { VehicleEntity } from '../../vehicle/entities/vehicle.entity';

@Entity('tb_reservations')
export class ReservationEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  start_timestamp: Date;

  @Column({ type: 'int', nullable: false })
  duration_in_minutes: string;

  @ManyToOne((type) => ParkingSlotEntity, (slot) => slot.reservations)
  @JoinTable()
  public parking_slot: ParkingSlotEntity;

  @ManyToOne((type) => VehicleEntity, (vehicle) => vehicle.reservations)
  @JoinTable()
  public vehicle: VehicleEntity;

  @Column({
    type: 'varchar',
    length: 10,
    nullable: false,
  })
  status: string;

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
