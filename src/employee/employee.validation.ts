import { z, ZodType } from 'zod';

export class EmployeeValidation {
  static readonly REGISTER: ZodType = z.object({
    email: z.email(),
    password: z.string().min(8),
    fullName: z.string().min(8),
    dateOfBirth: z.iso.date(),
    phone: z
      .string()
      .regex(
        new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/),
      ),
    citizenId: z.string(),
  });
}
