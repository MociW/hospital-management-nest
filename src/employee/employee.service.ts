import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Employee } from '../model/employee.entity';
import {
  EmployeeLogin,
  EmployeeRegister,
  EmployeeResponse,
  toEmployeeResponse,
} from '../model/dto/employee.dto';
import { ValidationService } from '../common/validation/validation.service';
import { EmployeeValidation } from './employee.validation';
import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { EmploymentStatus } from '../model/enum.entity';

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
    const now = new Date();

    const data: Employee = {
      ...validatedData,
      id: uuid(),
      password: passwordHash,
      employmentStatus: EmploymentStatus.ACTIVE,
      departmentId: validatedData.departmentId || null,
      phone: validatedData.phone || null,
      createAt: now,
      updateAt: now,
      createdBy: validatedData.createdBy || null,
      updatedBy: validatedData.updatedBy || null,
    };

    const result = await this.employeeRepository.save(data);

    return toEmployeeResponse(result);
  }

  async login(req: EmployeeLogin): Promise<EmployeeResponse> {
    const validateData = this.validationService.validate(
      EmployeeValidation.LOGIN,
      req,
    ) as EmployeeLogin;

    const employee = await this.employeeRepository.findOne({
      where: { email: validateData.email },
    });

    if (!employee) {
      throw new HttpException('Email not exists', HttpStatus.BAD_REQUEST);
    }

    const isPasswordValid = await bcrypt.compare(
      validateData.password,
      employee.password,
    );

    if (!isPasswordValid) {
      throw new HttpException(
        'Email or Passwords do not match',
        HttpStatus.BAD_REQUEST,
      );
    }

    const token = uuid();

    await this.employeeRepository
      .createQueryBuilder()
      .update()
      .set({ token: token })
      .where('id = :id', { id: employee.id })
      .execute();

    return toEmployeeResponse(employee, token);
  }
}
