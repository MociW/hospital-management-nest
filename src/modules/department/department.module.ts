import { Module } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { departmentProviders } from './department.repository';
import { DepartmentController } from './department.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '../../common/common.module';

@Module({
  imports: [TypeOrmModule, CommonModule],
  providers: [DepartmentService, ...departmentProviders],
  controllers: [DepartmentController],
})
export class DepartmentModule {}
