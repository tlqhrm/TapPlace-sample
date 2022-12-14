import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mariadb',
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: [__dirname + '/../**/*.entity.{js,ts}'],
        synchronize: process.env.DB_SYNC == 'true' ? true : false,
        logging: process.env.LOGGING == 'true' ? true : false,
      });

      return dataSource.initialize();
    },
  },
];
