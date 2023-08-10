import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { STATUS_USERS } from 'src/status';
import { Not, Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from '../role/entities/role.entity';
import { UserEntity } from './entities/user.entity';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
    @InjectRepository(RoleEntity)
    private repositoryRole: Repository<RoleEntity>,
    @Inject(ConfigService)
    private config: ConfigService,
  ) {}

  async create(createUserDto: UserDto) {
    const userInBd = await this.repository.findOne({
      where: { username: createUserDto.username },
    });

    if (userInBd) throw new ConflictException('User already exist');

    const newUser = new UserEntity();
    newUser.username = createUserDto.username;
    newUser.password = CryptoJS.SHA256(
      createUserDto.username + createUserDto.phone.slice(0, 6),
    ).toString();
    newUser.email = createUserDto.email;
    newUser.phone = createUserDto.phone;

    const returnUser = await this.repository.save(newUser);

    return {
      status: STATUS_USERS.CREATED,
      message: 'User  created successfull',
      data: returnUser,
    };
  }

  async findAll() {
    return {
      status: STATUS_USERS.LOAD,
      message: 'Users loaded successfull',
      data: await this.repository.find({
        relations: ['role'],
        order: {
          id: 'ASC', // "DESC"
        },
      }),
    };
  }

  async findOne(id: number) {
    const userFounded = await this.repository.findOne({ where: { id: id } });
    if (!userFounded) {
      throw new NotFoundException('User not found');
    }

    return {
      status: STATUS_USERS.LOAD,
      message: 'User loaded successfull',
      data: userFounded,
    };
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const userExist = await this.repository.findOne({
      where: { id: id, status: 'Activo' },
    });

    if (!userExist) throw new NotFoundException('User not found');
    else {
      const newUser = new UserEntity();
      newUser.username = updateUserDto.username;
      newUser.email = updateUserDto.email;
      newUser.phone = updateUserDto.phone;

      const returnUser = await this.repository.update(id, newUser);

      return {
        status: STATUS_USERS.UPDATED,
        message: 'User updated successfull',
        data: returnUser,
      };
    }
  }

  async changeStatus(id: number) {
    const userExist = await this.repository.findOne({
      where: { id: id },
    });

    if (!userExist) throw new NotFoundException('User not found');
    else {
      if (userExist.status === 'Activo') {
        const returnUser = await this.repository.update(id, {
          status: 'Inactivo',
        });

        return {
          status: STATUS_USERS.UPDATED,
          message: 'User deactivated successfull',
          data: returnUser,
        };
      } else {
        const returnUser = await this.repository.update(id, {
          status: 'Activo',
        });

        return {
          status: STATUS_USERS.UPDATED,
          message: 'User activated successfull',
          data: returnUser,
        };
      }
    }
  }
}
