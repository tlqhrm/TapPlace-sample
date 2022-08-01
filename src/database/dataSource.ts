import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'wlgns13579@',
  database: 'board-app',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: false,
  migrations: ['dist/migration/*.js'],
});
