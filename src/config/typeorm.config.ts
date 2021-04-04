import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { get } from 'config';


export const typeOrmConfig: TypeOrmModuleOptions = {
  type: get<'postgres'>('db.type'),
  host: process.env.DB_HOST || get<string>('db.host'),
  port: process.env.DB_PORT as unknown as number || get<number>('db.port'),
  username: process.env.DB_USERNAME || get<string>('db.username'),
  password: process.env.DB_PASSWORD || get<string>('db.password'),
  database: process.env.DB_DATABASE || get<string>('db.database'),
  entities: [__dirname + '/../../dist/**/*.entity{.ts,.js}'],
  synchronize: get<boolean>('db.synchronize')
};
