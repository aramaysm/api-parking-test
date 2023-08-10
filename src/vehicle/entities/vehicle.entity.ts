import { ReservationEntity } from '../../reservation/entities/reservation.entity';
import { CategoryVehicleEntity } from '../../category_vehicle/entities/category_vehicle.entity';
import { CustomerEntity } from '../../customer/entities/customer.entity';
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

@Entity('tb_vehicles')
export class VehicleEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 10, nullable: false, unique: true })
  plate: string;

  @Column({ type: 'varchar', length: 250, nullable: false })
  description: string;

  @ManyToOne((type) => CategoryVehicleEntity, (category) => category.vehicles)
  @JoinTable()
  public category: CategoryVehicleEntity;

  @ManyToOne((type) => CustomerEntity, (owner) => owner.vehicles)
  @JoinTable()
  public owner: CustomerEntity;

  @Column({ type: 'varchar', default: 'Activo' })
  public status: string;

  @OneToMany((type) => ReservationEntity, (reservation) => reservation.vehicle)
  @JoinTable()
  reservations: ReservationEntity[];

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
