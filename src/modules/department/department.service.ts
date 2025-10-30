import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Department } from '../../model/department.entity';

@Injectable()
export class DepartmentService {
  constructor(
    @Inject('DEPARTMENT_REPOSITORY')
    departmentRepository: Repository<Department>,
  ) {}
}
