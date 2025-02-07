import path from 'path';
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

import config from '../config';

const logLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3,
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    info: 'cyan',
    debug: 'green',
  },
};
winston.addColors(logLevels.colors);

// Custom format for the log
const logFormat = winston.format.printf(({ level, message, label, timestamp }) => {
  return `${timestamp} - ${level.toUpperCase()} - [${label}] - ${message}`;
});

/**
 * Class wrapper on top of Winston logger.
 */
export class Logger {
  logger: winston.Logger;
  label: string;

  constructor(logger: winston.Logger, label: string) {
    this.logger = logger;
    this.label = label;
  }
  error(message: string, params: unknown = undefined): void {
    if (!this.isFiltered()) this.logger.log('error', message + ` ${this.paramsToString(params)}`);
  }
  warn(message: string, params: unknown = undefined): void {
    if (!this.isFiltered()) this.logger.log('warn', message + ` ${this.paramsToString(params)}`);
  }
  info(message: string, params: unknown = undefined): void {
    if (!this.isFiltered()) this.logger.log('info', message + ` ${this.paramsToString(params)}`);
  }
  debug(message: string, params: unknown = undefined): void {
    if (!this.isFiltered()) this.logger.log('debug', message + ` ${this.paramsToString(params)}`);
  }

  private paramsToString(params: unknown): string {
    if (!params) return '';
    if (params instanceof Error) return `${params.message} -> ${params.stack}`;
    else return JSON.stringify(params);
  }

  private isFiltered(): boolean {
    const split = config.logs.filter.split(/[\s,]+/);
    const len = split.length;
    let result = false;
    for (let i = 0; i < len; i++) {
      if (split[i]) {
        if (split[i][0] === '-') {
          const regex = new RegExp('^' + split[i].slice(1) + '$');
          if (regex.test(this.label)) result = true;
        } else {
          const regex = new RegExp('^' + split[i] + '$');
          if (regex.test(this.label)) result = false;
        }
      }
    }
    return result;
  }
}

/**
 * Create a logger instance.
 */
export function getLogger(label: string): Logger {
  if (!winston.loggers.has(label)) {
    const transports = [];
    // In console we log everything with colors
    if (config.logs.console_level !== 'off') {
      transports.push(
        new winston.transports.Console({
          level: config.logs.console_level,
          format: winston.format.combine(
            winston.format.label({ label: label }),
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            logFormat,
            winston.format.colorize({ all: true }),
          ),
        }),
        new DailyRotateFile({
          filename: path.join(config.logs.file_path, 'application-%DATE%.log'),
          datePattern: 'YYYY-MM-DD',
          createSymlink: true,
          symlinkName: 'application.log',
          zippedArchive: true,
          maxSize: config.logs.file_maxsize,
          maxFiles: config.logs.file_retention,
          level: config.logs.file_level,
          format: winston.format.combine(
            winston.format.splat(),
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            winston.format.label({ label: label }),
            logFormat,
          ),
        }),
      );
    }
    winston.loggers.add(label, { levels: logLevels.levels, transports });
  }
  return new Logger(winston.loggers.get(label), label);
}
