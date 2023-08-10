import { VehicleEntity } from '../../vehicle/entities/vehicle.entity';
import { CategoryVehicleEntity } from '../../category_vehicle/entities/category_vehicle.entity';
import { UserEntity } from '../../user/entities/user.entity';
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

@Entity('tb_customers')
export class CustomerEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 11, nullable: false, unique: true })
  dni: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  payment_card: string;

  @ManyToOne((type) => UserEntity, (user) => user.customers)
  @JoinTable()
  public user: UserEntity;

  @Column({ type: 'varchar', default: 'Activo' })
  public status: string;

  @OneToMany((type) => VehicleEntity, (vehicle) => vehicle.owner)
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
