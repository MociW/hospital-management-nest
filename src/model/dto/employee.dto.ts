import { Gender, UserStatus } from '../enum.entity';
import { Employee } from '../employee.entity';

export class EmployeeRegister {
  email: string;
  password: string;
  fullName: string;
  dateOfBirth: Date;
  gender: Gender;
  phone: string;
  citizenId: string;
  employeeCode: string;
  departmentId?: string;
  userStatus: UserStatus;
  createdBy: string;
  updatedBy: string;
  deletedBy: string;
}

export class EmployeeResponse {
  email: string;
  fullName: string;
  dateOfBirth: Date;
  gender: Gender;
  phone: string;
  employeeCode: string;
  departmentId?: string;
  userStatus: UserStatus;
  createdBy: string;
  updatedBy: string;
  deletedBy: string;
  token?: string;
}

export function convertEmployeeRequestToUserResponse(
  employee: Employee,
): EmployeeResponse {
  return {
    email: employee.email,
    fullName: employee.fullName,
    dateOfBirth: employee.datOfBirth,
    gender: employee.gender,
    phone: employee.phone,
    employeeCode: employee.employeeCode,
    userStatus: employee.userStatus,
    createdBy: employee.createdBy,
    updatedBy: employee.updatedBy,
    deletedBy: employee.deletedBy,
  };
}
