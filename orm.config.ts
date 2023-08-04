import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { UserEntity } from './src/user/entities/user.entity';
import { UserDB1691132572320 } from './migrations/1691132572320-UserDB';

config();

const configService = new ConfigService();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: configService.get('POSTGRES_HOST').toString(),
  port: configService.get('POSTGRES_PORT'),
  username: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD').toString(),
  database: configService.get('POSTGRES_DB'),
  entities: [UserEntity],
  migrations: [UserDB1691132572320],
  synchronize: true,
});

/**
 * 
 * host: configService.get('POSTGRES_HOST').toString(),
  port: configService.get('POSTGRES_PORT'),
  username: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD').toString(),
  database: configService.get('POSTGRES_DB'),
 */
