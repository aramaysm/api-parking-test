import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tb_user')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column({ type: 'varchar', length: 25, nullable: false, unique: true })
  public username: string;

  @Column({ type: 'varchar', length: 65, nullable: false })
  public password: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'login_last_at',
  })
  public loginLastAt: Date;

  @Column({ type: 'varchar', default: 'Activo' })
  public status: string;
}
