import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { ValidationService } from './validation/validation.service';
import * as winston from 'winston';

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
  ],
  providers: [ValidationService],
  exports: [ValidationService],
})
export class CommonModule {}
