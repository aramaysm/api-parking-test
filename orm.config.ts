import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { MainEntitiesCreated1691519430245 } from './migrations/1691519430245-MainEntitiesCreated';
import { join } from 'path';

config();

const configService = new ConfigService();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: configService.get('POSTGRES_HOST').toString(),
  port: configService.get('POSTGRES_PORT'),
  username: configService.get('POSTGRES_USER').toString(),
  password: configService.get('POSTGRES_PASSWORD').toString(),
  database: configService.get('POSTGRES_DB').toString(),
  entities: [join(__dirname, '**', '*.entity.{ts,js}')],
  migrations: [MainEntitiesCreated1691519430245],
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
