import { GoogleMaestro } from 'src/entities/pays/google_maestreo.entity';
import { DataSource } from 'typeorm';

export const googleMaestroRepository = [
  {
    provide: 'GOOGLE_MAESTRO_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(GoogleMaestro),
    inject: ['DATA_SOURCE'],
  },
];
