import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { userProviders } from './user.repository';

@Module({
  controllers: [UserController],
  providers: [UserService, ...userProviders],
})
export class UserModule {}
