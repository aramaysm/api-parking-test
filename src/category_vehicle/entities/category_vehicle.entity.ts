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
import { UserEntity } from '../../user/entities/user.entity';
import { ParkingSlotEntity } from '../../parking_slot/entities/parking_slot.entity';
import { VehicleEntity } from '../../vehicle/entities/vehicle.entity';

@Entity('tb_vehicle_categories')
export class CategoryVehicleEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
  category_name: string;

  @Column({ type: 'varchar', length: 150, nullable: false })
  category_description: string;

  @OneToMany((type) => ParkingSlotEntity, (parkin_slot) => parkin_slot.category)
  @JoinTable()
  parking_slots: ParkingSlotEntity[];

  @OneToMany((type) => VehicleEntity, (vehicle) => vehicle.category)
  @JoinTable()
  vehicles: VehicleEntity[];

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
