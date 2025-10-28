import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeService } from './employee.service';
import { EmployeeModule } from './employee.module';
import { EmployeeLogin, EmployeeRegister } from '../model/dto/employee.dto';
import { Gender, UserStatus } from '../model/enum.entity';

describe('EmployeeService (integration)', () => {
  let service: EmployeeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [EmployeeModule],
    }).compile();

    service = module.get<EmployeeService>(EmployeeService);
  });

  it('should be able to register new data', async () => {
    const dto: EmployeeRegister = {
      email: 'system@local.sys',
      password: 'systemlocal',
      fullName: 'SYSTEM',
      dateOfBirth: new Date(),
      gender: Gender.UNKNOWN,
      citizenId: '00000000000',
      employeeCode: 'EMP-000',
      userStatus: UserStatus.ACTIVE,
    };

    const result = await service.register(dto);
    console.info(result);
  });

  it('should be able to login employee data', async () => {
    const dto: EmployeeLogin = {
      email: 'system@local.sys',
      password: 'systemlocal',
    };

    const result = await service.login(dto);
    console.info(result);
  });
});
