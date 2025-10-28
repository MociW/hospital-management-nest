import { DataSource } from 'typeorm';
import { Department } from '../../model/department.entity';

export const departmentProviders = [
  {
    provide: 'department_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Department),
    inject: ['DATA_SOURCE'],
  },
];
