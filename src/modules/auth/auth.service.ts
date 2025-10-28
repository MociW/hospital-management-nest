import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Employee } from '../../model/employee.entity';
import { ValidationService } from '../../common/validation/validation.service';
import {
  EmployeeLogin,
  EmployeeRegister,
  EmployeeResponse,
  EmployeeUpdate,
} from '../../model/dto/employee.dto';
import { EmploymentStatus } from '../../model/enum.entity';
import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { AuthValidation } from './auth.validation';

@Injectable()
export class AuthService {
  constructor(
    @Inject('EMPLOYEE_REPOSITORY') private repository: Repository<Employee>,
    private validationService: ValidationService,
  ) {}

  async register(req: EmployeeRegister): Promise<EmployeeResponse> {
    const validatedData = this.validationService.validate(
      AuthValidation.REGISTER,
      req,
    ) as EmployeeRegister;

    const checkUserEmail = await this.repository.count({
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

    const result = await this.repository.save(data);

    const employee: EmployeeResponse = {
      email: result.email,
      fullName: result.fullName,
      employeeCode: result.employeeCode,
      userStatus: result.userStatus,
    };

    return { ...employee };
  }

  async login(req: EmployeeLogin): Promise<EmployeeResponse> {
    const validateData = this.validationService.validate(
      AuthValidation.LOGIN,
      req,
    ) as EmployeeLogin;

    const employee = await this.repository.findOne({
      where: { email: validateData.email },
    });

    if (!employee) {
      throw new HttpException(
        'Email or Password is invalid',
        HttpStatus.BAD_REQUEST,
      );
    }

    const isPasswordValid = await bcrypt.compare(
      validateData.password,
      employee.password,
    );

    if (!isPasswordValid) {
      throw new HttpException(
        'Email or Password is invalid',
        HttpStatus.BAD_REQUEST,
      );
    }

    const token = uuid();

    await this.repository
      .createQueryBuilder()
      .update()
      .set({ token: token })
      .where('id = :id', { id: employee.id })
      .execute();

    const data: EmployeeResponse = {
      email: employee.email,
      fullName: employee.fullName,
      employeeCode: employee.employeeCode,
      userStatus: employee.userStatus,
      token: token,
    };

    return { ...data };
  }

  async profile(req: Employee): Promise<EmployeeResponse> {
    return Promise.resolve({
      email: req.email,
      fullName: req.fullName,
      employeeCode: req.employeeCode,
      userStatus: req.userStatus,
      dateOfBirth: req.dateOfBirth,
      gender: req.gender,
      phone: req.phone,
      citizenId: req.citizenId,
      departmentId: req.departmentId,
      token: req.token!,
    });
  }

  async update(req: EmployeeUpdate): Promise<EmployeeResponse> {
    const validateData = this.validationService.validate(
      AuthValidation.UPDATE,
      req,
    ) as EmployeeUpdate;

    await this.repository.update(
      { email: validateData.email },
      { ...validateData },
    );

    const updatedEmployee = await this.repository.findOne({
      where: { email: validateData.email },
    });

    if (!updatedEmployee) {
      throw new Error('Employee not found');
    }

    const data: EmployeeResponse = {
      email: updatedEmployee.email,
      fullName: updatedEmployee.fullName,
      employeeCode: updatedEmployee.employeeCode,
      userStatus: updatedEmployee.userStatus,
      dateOfBirth: updatedEmployee.dateOfBirth,
      gender: updatedEmployee.gender,
      phone: updatedEmployee.phone,
      citizenId: updatedEmployee.citizenId,
      departmentId: updatedEmployee.departmentId,
      token: updatedEmployee.token!,
    };

    return { ...data };
  }

  async logout(req: Employee): Promise<void> {
    await this.repository.update({ email: req.email }, { token: null });
  }
}
