import { Module } from '@nestjs/common';
import { databaseProviders } from './type-orm.service';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class TypeOrmModule {}
