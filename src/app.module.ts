import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { TypeOrmModule } from './database/type-orm/type-orm.module';
import { EmployeeModule } from './employee/employee.module';
import { EmployeeModule } from './modules/employee/employee.module';

@Module({
  imports: [CommonModule, TypeOrmModule, EmployeeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
