import { TypeOrmModuleOptions } from '@nestjs/typeorm';
const username = process.env.DB_USERNAME || 'root';
const password = process.env.DB_PASSWORD || '123456';
const dbName = process.env.DB_NAME || 'testdb';
const synchronize = process.env.NODE_ENV === 'production' ? false : true;

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOSTNAME || '127.0.0.1',
  port: parseInt(process.env.DB_PORT) || 3306,
  username: username,
  password: password,
  database: dbName,
  entities: [],
  synchronize: synchronize,
  autoLoadEntities: true,
  logging: true,
  logger: 'file',
  dateStrings: ['DATE', 'DATETIME', 'TIMESTAMP'],
};
