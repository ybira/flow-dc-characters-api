import { Injectable, Logger } from '@nestjs/common';
import * as winston from 'winston';
import { DateTime } from 'luxon';

@Injectable()
export class Winston extends Logger {
  public logger;

  constructor() {
    super();

    const customFormat = winston.format.printf(({ level, message, timestamp }) => {
      return `[${level}] ${timestamp} ${message}`;
    });

    const date = `${DateTime.local().toFormat('yyyy.MM.dd')}`;

    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        customFormat
      ),
      transports: [
        new winston.transports.File({
          filename: `logs/${date}.log`,
        }),
      ],
    });
  }

  error(message: string, trace: string) {
    this.logger.log({
      level: 'error',
      message: `[${trace}] ${message}`,
    });
    super.error(message, trace);
  }

  log(message: string, trace: string) {
    this.logger.log({
      level: 'info',
      message: `[${trace}] ${message}`,
    });
    super.log(message, trace);
  }

  warn(message: string, trace: string) {
    this.logger.log({
      level: 'warn',
      message: `[${trace}] ${message}`,
    });
    super.warn(message, trace);
  }

  debug(message: string, trace: string) {
    this.logger.log({
      level: 'debug',
      message: `[${trace}] ${message}`,
    });
    super.debug(message, trace);
  }

  verbose(message: string, trace: string) {
    this.logger.log({
      level: 'verbose',
      message: `[${trace}] ${message}`,
    });
    super.verbose(message, trace);
  }
}
