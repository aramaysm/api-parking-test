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
  CreateDateColumn,
} from 'typeorm';
import { VehicleEntity } from '../../vehicle/entities/vehicle.entity';

@Entity('tb_reservations')
export class ReservationEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'int', nullable: false, default: 0 })
  duration_in_minutes: number;

  @ManyToOne((type) => ParkingSlotEntity, (slot) => slot.reservations)
  @JoinTable()
  public parking_slot: ParkingSlotEntity;

  @ManyToOne((type) => VehicleEntity, (vehicle) => vehicle.reservations)
  @JoinTable()
  public vehicle: VehicleEntity;

  @Column({
    type: 'varchar',
    nullable: false,
    default: 'Pending',
  })
  status: string;

  @CreateDateColumn({
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
