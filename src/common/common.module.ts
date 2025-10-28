import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { ValidationService } from './validation/validation.service';
import * as winston from 'winston';
import { APP_FILTER } from '@nestjs/core';
import { ErrorFilter } from './error/error.filter';
import { AuthMiddleware } from './auth/auth.middleware';
import { TypeOrmModule } from '../database/type-orm/type-orm.module';
import { DepartementModule } from './departement/departement.module';
import { DepartementModule } from './departement/departement.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    WinstonModule.forRoot({
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.json(),
      ),
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.printf(
              (info) =>
                `${info.timestamp as string} ${info.level}: ${info.message as string}`,
            ),
          ),
          handleRejections: true,
          handleExceptions: true,
        }),
      ],
    }),
    TypeOrmModule,
    DepartementModule,
  ],
  providers: [
    ValidationService,
    {
      provide: APP_FILTER,
      useClass: ErrorFilter,
    },
  ],
  exports: [ValidationService],
})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('/');
  }
}
