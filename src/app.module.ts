import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { TypeOrmModule } from './database/type-orm/type-orm.module';
import { UserModule } from './user/user.module';
import { EmployeeModule } from './employee/employee.module';

@Module({
  imports: [CommonModule, TypeOrmModule, UserModule, EmployeeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
