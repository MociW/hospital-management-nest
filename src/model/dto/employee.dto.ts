import { Gender, UserStatus } from '../enum.entity';

export class EmployeeRegister {
  email: string;
  password: string;
  fullName: string;
  dateOfBirth: Date;
  gender: Gender;
  phone?: string;
  citizenId: string;
  employeeCode: string;
  departmentId?: string;
  userStatus: UserStatus;
  createdBy?: string | null;
  updatedBy?: string | null;
}

export class EmployeeLogin {
  email: string;
  password: string;
}

export class EmployeeUpdate {
  email?: string;
  password?: string;
  fullName?: string;
  dateOfBirth?: Date;
  gender: Gender;
  phone?: string;
  citizenId?: string;
}

export class EmployeeResponse {
  email: string;
  fullName: string;
  employeeCode: string;
  userStatus: UserStatus;
  dateOfBirth?: Date;
  gender?: Gender;
  phone?: string | null;
  citizenId?: string;
  departmentId?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
  createdBy?: string | null;
  updatedBy?: string | null;
  deletedBy?: string | null;
  token?: string;
}
