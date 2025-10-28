import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { employeeProviders } from './employee.repository';
import { TypeOrmModule } from '../../database/type-orm/type-orm.module';
import { CommonModule } from '../../common/common.module';

@Module({
  imports: [TypeOrmModule, CommonModule],
  providers: [EmployeeService, ...employeeProviders],
  controllers: [EmployeeController],
})
export class EmployeeModule {}
