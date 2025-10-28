import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { TypeOrmModule } from './database/type-orm/type-orm.module';
import { EmployeeModule } from './modules/employee/employee.module';
import { DepartementModule } from './modules/departement/departement.module';
import { DepartmentController } from './modules/department/department.controller';
import { DepartmentModule } from './modules/department/department.module';
import { AuthModule } from './modules/auth/auth.module';
import { DoctorModule } from './modules/doctor/doctor.module';

@Module({
  imports: [
    CommonModule,
    TypeOrmModule,
    EmployeeModule,
    DepartementModule,
    DepartmentModule,
    AuthModule,
    DoctorModule,
  ],
  controllers: [DepartmentController],
  providers: [],
})
export class AppModule {}
