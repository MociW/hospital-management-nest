import { DataSource } from 'typeorm';
import { UserEntity } from '../model/user.entity';

export const userProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (data: DataSource) => data.getRepository(UserEntity),
    inject: ['DATA_SOURCE'],
  },
];
