import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Employee } from '../../model/employee.entity';
import { ValidationService } from '../../common/validation/validation.service';

@Injectable()
export class EmployeeService {
  constructor(
    @Inject('EMPLOYEE_REPOSITORY')
    private employeeRepository: Repository<Employee>,
    private validationService: ValidationService,
  ) {}
}
