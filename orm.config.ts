import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { UserEntity } from './src/user/entities/user.entity';
import { EntitiesCreated1691476175729 } from './migrations/1691476175729-EntitiesCreated';
import { MainEntitiesCreatedFinish1691507340729 } from './migrations/1691507340729-MainEntitiesCreated_Finish';

config();

const configService = new ConfigService();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: configService.get('POSTGRES_HOST').toString(),
  port: configService.get('POSTGRES_PORT'),
  username: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD').toString(),
  database: configService.get('POSTGRES_DB'),
  entities: ['src/**/**/**/**/*.entity{.ts,.js}'],
  migrations: [MainEntitiesCreatedFinish1691507340729],
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
