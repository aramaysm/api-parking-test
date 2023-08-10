import { CustomerEntity } from '../../customer/entities/customer.entity';
import { RoleEntity } from '../../role/entities/role.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tb_users')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column({ type: 'varchar', length: 25, nullable: false, unique: true })
  public username: string;

  @Column({ type: 'varchar', length: 65, nullable: false })
  public password: string;

  @Column({ type: 'varchar', nullable: false })
  public fullname: string;

  @Column({ type: 'varchar', length: 65, nullable: false })
  public email: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  public phone: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'login_last_at',
  })
  public loginLastAt: Date;

  @Column({ type: 'varchar', default: 'Activo' })
  public status: string;

  @ManyToOne((type) => RoleEntity, (role) => role.users)
  @JoinTable()
  public role: RoleEntity;

  @OneToMany((type) => CustomerEntity, (customer) => customer.user)
  @JoinTable()
  customers: CustomerEntity[];
}
