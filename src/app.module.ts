import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { TypeOrmModule } from './database/type-orm/type-orm.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [CommonModule, TypeOrmModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
