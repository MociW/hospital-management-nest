import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { entities } from '../../model/entities';

export const DATA_SOURCE = 'DATA_SOURCE';

export const databaseProviders = [
  {
    provide: DATA_SOURCE,
    inject: [ConfigService],
    useFactory: async (cfg: ConfigService) => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: cfg.get('DB_HOST', 'localhost'),
        port: Number(cfg.get('DB_PORT', 5432)),
        username: cfg.get('DB_USER', 'root'),
        password: cfg.get('DB_PASS', 'root'),
        database: cfg.get('DB_NAME', 'test'),
        entities: entities,
        synchronize: false,
      });

      return await dataSource.initialize();
    },
  },
];
