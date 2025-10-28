import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

export const Auth = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<Request>();
    const employee = request.employee;
    if (employee) {
      return employee;
    } else {
      throw new UnauthorizedException('Unauthorized');
    }
  },
);
