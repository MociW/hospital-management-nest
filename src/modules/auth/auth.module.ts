import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { employeeProviders } from '../employee/employee.repository';
import { TypeOrmModule } from '../../database/type-orm/type-orm.module';
import { CommonModule } from '../../common/common.module';

@Module({
  imports: [TypeOrmModule, CommonModule],
  providers: [AuthService, ...employeeProviders],
  controllers: [AuthController],
})
export class AuthModule {}
