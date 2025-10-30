import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { TypeOrmModule } from './database/type-orm/type-orm.module';
import { EmployeeModule } from './modules/employee/employee.module';
import { DepartmentController } from './modules/department/department.controller';
import { DepartmentModule } from './modules/department/department.module';
import { AuthModule } from './modules/auth/auth.module';
import { DoctorModule } from './modules/doctor/doctor.module';
import { RoleModule } from './modules/role/role.module';

@Module({
  imports: [
    CommonModule,
    TypeOrmModule,
    EmployeeModule,
    DepartmentModule,
    AuthModule,
    DoctorModule,
    RoleModule,
  ],
  controllers: [DepartmentController],
  providers: [],
})
export class AppModule {}
