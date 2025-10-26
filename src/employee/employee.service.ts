import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Employee } from '../model/employee.entity';
import {
  convertEmployeeRequestToUserResponse,
  EmployeeRegister,
  EmployeeResponse,
} from '../model/dto/employee.dto';
import { ValidationService } from '../common/validation/validation.service';
import { EmployeeValidation } from './employee.validation';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EmployeeService {
  constructor(
    @Inject('EMPLOYEE_REPOSITORY')
    private employeeRepository: Repository<Employee>,
    private validationService: ValidationService,
  ) {}

  async register(req: EmployeeRegister): Promise<EmployeeResponse> {
    const validatedData = this.validationService.validate(
      EmployeeValidation.REGISTER,
      req,
    ) as EmployeeRegister;

    const checkUserEmail = await this.employeeRepository.count({
      where: {
        email: validatedData.email,
      },
    });

    if (checkUserEmail !== 0) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }

    const passwordHash = await bcrypt.hash(validatedData.password, 12);

    const data = this.employeeRepository.create({
      ...validatedData,
      password: passwordHash,
    });

    return convertEmployeeRequestToUserResponse(data);
  }
}
