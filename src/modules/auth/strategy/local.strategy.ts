import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { EmployeeLogin } from '../../../model/dto/employee.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(req: EmployeeLogin): Promise<any> {
    const user = await this.authService.validateUser(req);
    if (!user) {
      throw new BadRequestException('User Not Found');
    }
    return user;
  }
}
