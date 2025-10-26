import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeService } from './employee.service';
import { EmployeeModule } from './employee.module';
import { EmployeeRegister } from '../model/dto/employee.dto';
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
      email: 'test@example.com',
      password: 'test1234',
      fullName: 'Test User',
      dateOfBirth: '2002-02-12',
      gender: Gender.MALE,
      phone: '081234567890',
      citizenId: 'ID-123',
      employeeCode: 'EMP-001',
      userStatus: UserStatus.ACTIVE,
    };

    const result = await service.register(dto);
    console.info(result);
  });
});
