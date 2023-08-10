import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RoleDto } from './dto/role.dto';
import { STATUS_ROLES } from '../status';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from './entities/role.entity';
import { ConfigService } from '@nestjs/config';
import { Repository, Not } from 'typeorm';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private repository: Repository<RoleEntity>,
    @Inject(ConfigService)
    private config: ConfigService,
  ) {}

  async create(createRoleDto: RoleDto) {
    const newRole = new RoleEntity();
    newRole.name = createRoleDto.name;
    newRole.description = createRoleDto.description;

    console.log('Role received is:', newRole);
    const returnRole = await this.repository.save(newRole);

    return {
      status: STATUS_ROLES.CREATED,
      message: 'Role created successfull',
      data: returnRole,
    };
  }

  async findAll() {
    return {
      status: STATUS_ROLES.LOAD,
      message: 'Roles loaded successfull',
      data: await this.repository.find({
        where: { name: Not('admin') },
        order: {
          id: 'ASC', // "DESC"
        },
      }),
    };
  }

  async findOne(id: number) {
    const roleFounded = await this.repository.findOne({ where: { id: id } });
    if (!roleFounded) {
      throw new NotFoundException('Role not found');
    }

    return {
      status: STATUS_ROLES.LOAD,
      message: 'Role loaded successfull',
      data: roleFounded,
    };
  }

  async update(id: number, updateRoleDto: RoleDto) {
    const roleFounded = await this.repository.findOne({ where: { id: id } });
    if (!roleFounded) {
      throw new NotFoundException('Role not found');
    }

    roleFounded.name = updateRoleDto.name;
    roleFounded.description = updateRoleDto.description;

    const returnRoleUpdated = await this.repository.save(roleFounded);

    return {
      status: STATUS_ROLES.LOAD,
      message: 'Role updated successfull',
      data: returnRoleUpdated,
    };
  }

  async remove(id: number) {
    const roleFounded = await this.repository.findOne({ where: { id: id } });
    if (!roleFounded) {
      throw new NotFoundException('Role not found');
    }

    roleFounded.is_active = false;

    const returnRoleUpdated = await this.repository.save(roleFounded);

    return {
      status: STATUS_ROLES.DELETED,
      message: `Role ${roleFounded.name} has been deleted successfully`,
      data: returnRoleUpdated,
    };
  }
}
