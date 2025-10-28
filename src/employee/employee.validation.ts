import { z, ZodType } from 'zod';
import { Gender, UserStatus } from '../model/enum.entity';

export class EmployeeValidation {
  static readonly REGISTER: ZodType = z.object({
    email: z.email(),
    password: z.string().min(8),
    fullName: z.string().min(2),
    dateOfBirth: z.coerce.date(),
    gender: z.enum(Gender),
    phone: z
      .string()
      .regex(
        new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/),
      )
      .optional(),
    citizenId: z.string(),
    employeeCode: z.string(),
    userStatus: z.enum(UserStatus),
    createdBy: z.string().optional(),
    updatedBy: z.string().optional(),
  });

  static readonly LOGIN: ZodType = z.object({
    email: z.email(),
    password: z.string().min(8),
  });
}
