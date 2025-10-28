import { Gender, UserStatus } from '../enum.entity';
import { Employee } from '../employee.entity';

// ============================================
// Request DTOs
// ============================================

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
  token?: string;
}

// ============================================
// Single Flexible Response DTO
// ============================================

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

// ============================================
// Simple Converter Function
// ============================================

export function toEmployeeResponse(
  employee: Employee,
  token?: string,
): EmployeeResponse {
  return {
    email: employee.email,
    fullName: employee.fullName,
    employeeCode: employee.employeeCode,
    userStatus: employee.userStatus,
    dateOfBirth: employee.dateOfBirth,
    gender: employee.gender,
    phone: employee.phone || null,
    citizenId: employee.citizenId,
    departmentId: employee.departmentId || null,
    createdAt: employee.createAt,
    updatedAt: employee.updateAt,
    deletedAt: employee.deletedAt || null,
    createdBy: employee.createdBy || null,
    updatedBy: employee.updatedBy || null,
    deletedBy: employee.deletedBy || null,
    ...(token && { token }), // Only include token if provided
  };
}
