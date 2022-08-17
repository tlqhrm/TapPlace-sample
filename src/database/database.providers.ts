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
        // type: 'oracle',
        // username: 'admin',
        // password: 'Wlgns13579@@',
        // connectString: 'Wallet_O653N969L3A78WUZ',
        // entities: [__dirname + '/../**/*.entity.{js,ts}'],
        synchronize: true,

        // migrations: ['src/migration/*.ts'],
      });

      return dataSource.initialize();
    },
  },
];
