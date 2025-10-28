import { Employee } from '../model/employee.entity';

declare global {
  namespace Express {
    interface Request {
      employee?: Employee;
    }
  }
}
