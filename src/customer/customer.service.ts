import {
  ConflictException,
  Inject,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomerEntity } from './entities/customer.entity';
import { STATUS_CUSTOMER } from 'src/status';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerEntity)
    private repository: Repository<CustomerEntity>,
    @InjectRepository(UserEntity)
    private user_repository: Repository<UserEntity>,
    @Inject(ConfigService)
    private config: ConfigService,
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    const customerInBd = await this.repository.findOne({
      where: { dni: createCustomerDto.dni },
    });

    const userInBd = await this.user_repository.findOne({
      where: { id: createCustomerDto.user.id },
    });

    if (customerInBd) throw new ConflictException('Customer already exist');
    if (!userInBd) throw new NotFoundException('User not exist');

    const newCustomer = new CustomerEntity();
    newCustomer.dni = createCustomerDto.dni;
    newCustomer.payment_card = createCustomerDto.payment_card;
    newCustomer.user = createCustomerDto.user;

    const returnCustomer = await this.repository.save(newCustomer);

    return {
      status: STATUS_CUSTOMER.CREATED,
      message: 'Customer created successfull',
      data: returnCustomer,
    };
  }

  async findAll() {
    return {
      status: STATUS_CUSTOMER.LOAD,
      message: 'Customers loaded successfull',
      data: await this.repository.find({
        where: { status: 'Activo' },
        order: {
          id: 'ASC', // "DESC"
        },
      }),
    };
  }

  async findOne(id: number) {
    const customerFounded = await this.repository.findOne({
      where: { id: id },
    });
    if (!customerFounded) {
      throw new NotFoundException('Customer not found');
    }

    return {
      status: STATUS_CUSTOMER.LOAD,
      message: 'Customer loaded successfull',
      data: customerFounded,
    };
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const customerFounded = await this.repository.findOne({
      where: { id: id },
    });
    if (!customerFounded) {
      throw new NotFoundException('Customer not found');
    }

    customerFounded.dni = updateCustomerDto.dni;
    customerFounded.payment_card = updateCustomerDto.payment_card;
    customerFounded.user = updateCustomerDto.user;

    const returnCustUpdated = await this.repository.save(customerFounded);

    return {
      status: STATUS_CUSTOMER.LOAD,
      message: 'Customer updated successfull',
      data: returnCustUpdated,
    };
  }

  async remove(id: number) {
    const customerFounded = await this.repository.findOne({
      where: { id: id },
    });
    if (!customerFounded) {
      throw new NotFoundException('Customer not found');
    }

    customerFounded.status = 'Inactivo';

    const returnCustUpdated = await this.repository.save(customerFounded);

    return {
      status: STATUS_CUSTOMER.DELETED,
      message: `Customer ${customerFounded.id} has been deleted successfully`,
      data: returnCustUpdated,
    };
  }
}
