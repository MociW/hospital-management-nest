import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Employee } from '../../model/employee.entity';
import { Request } from 'express';
import { DATA_SOURCE } from '../../database/type-orm/type-orm.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(@Inject(DATA_SOURCE) private dataSource: DataSource) {}

  async use(req: Request, res: any, next: () => void) {
    const token = req.headers['x-auth-token'] as string;

    if (token) {
      const employeeRepository = this.dataSource.getRepository(Employee);

      const data = await employeeRepository.findOne({
        where: {
          token: token,
        },
      });

      if (data) {
        req.employee = data;
      }
    }
    next();
  }
}
