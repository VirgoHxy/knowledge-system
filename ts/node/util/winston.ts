import path from 'path';
import { SPLAT } from 'triple-beam';
import winston from 'winston';
import 'winston-daily-rotate-file';
import DailyRotateFile from 'winston-daily-rotate-file';
import { ConsoleTransportInstance } from 'winston/lib/winston/transports';

export enum TransportEnum {
  all = 'all',
  onlyConsole = 'onlyConsole',
  category = 'category',
}

export interface LoggerArg {
  logPath?: string;
  transportType?: TransportEnum;
  minLevel?: string;
}

export class Logger {
  static instance = new Logger({ transportType: TransportEnum.all });
  private winstonLogger: winston.Logger;
  private loggerOptions: winston.LoggerOptions;

  private options = {
    console: {
      handleExceptions: true,
      handleRejections: true,
      json: false,
      colorize: true,
    },
    dailyRotateFile: {
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '14d',
      json: false,
      zippedArchive: true,
    },
    all: {
      dirname: path.resolve(__dirname, '../../logs/'),
    },
    category: {
      dirname: path.resolve(__dirname, '../../logs/%DATE%/'),
    },
  };

  private filterFn = {
    errorFilter: winston.format(info => {
      return info.level === 'error' ? info : false;
    }),

    warnFilter: winston.format(info => {
      return info.level === 'warn' ? info : false;
    }),

    infoFilter: winston.format(info => {
      return info.level === 'info' ? info : false;
    }),

    debugFilter: winston.format(info => {
      return info.level === 'debug' ? info : false;
    }),
  };

  constructor(arg?: LoggerArg) {
    const { logPath, transportType = TransportEnum.all, minLevel } = arg ?? {};
    if (logPath) {
      this.options.all.dirname = logPath;
      this.options.category.dirname = logPath + '/%DATE%/';
    }
    const transportTypeObj: {
      console: ConsoleTransportInstance[];
      all: DailyRotateFile[];
      category: DailyRotateFile[];
    } = {
      console: [
        new winston.transports.Console({
          ...this.options.console,
          level: minLevel,
          format: winston.format.combine(winston.format.colorize({ all: true })),
          handleRejections: true,
          handleExceptions: true,
        }),
      ],
      all: [],
      category: [],
    };
    const exceptionHandlers: {
      all: DailyRotateFile[];
      category: DailyRotateFile[];
    } = {
      all: [],
      category: [],
    };
    const rejectionHandlers: {
      all: DailyRotateFile[];
      category: DailyRotateFile[];
    } = {
      all: [],
      category: [],
    };
    if (transportType === TransportEnum.all) {
      transportTypeObj.all = [
        new winston.transports.DailyRotateFile({
          ...this.options.dailyRotateFile,
          ...this.options.all,
          level: minLevel,
          filename: '%DATE%.log',
        }),
      ];
      exceptionHandlers.all = [
        new winston.transports.DailyRotateFile({
          ...this.options.dailyRotateFile,
          ...this.options.all,
          filename: '%DATE%.log',
        }),
      ];
      rejectionHandlers.all = [
        new winston.transports.DailyRotateFile({
          ...this.options.dailyRotateFile,
          ...this.options.all,
          filename: '%DATE%.log',
        }),
      ];
    } else if (transportType === TransportEnum.category) {
      transportTypeObj.category = [
        new winston.transports.DailyRotateFile({
          ...this.options.dailyRotateFile,
          ...this.options.category,
          level: 'error',
          filename: 'error.log',
          format: winston.format.combine(this.filterFn.errorFilter()),
        }),
        new winston.transports.DailyRotateFile({
          ...this.options.dailyRotateFile,
          ...this.options.category,
          level: 'warn',
          filename: 'warn.log',
          format: winston.format.combine(this.filterFn.warnFilter()),
        }),
        new winston.transports.DailyRotateFile({
          ...this.options.dailyRotateFile,
          ...this.options.category,
          level: 'info',
          filename: 'info.log',
          format: winston.format.combine(this.filterFn.infoFilter()),
        }),
        new winston.transports.DailyRotateFile({
          ...this.options.dailyRotateFile,
          ...this.options.category,
          level: 'debug',
          filename: 'debug.log',
          format: winston.format.combine(this.filterFn.debugFilter()),
        }),
      ];
      exceptionHandlers.category = [
        new winston.transports.DailyRotateFile({
          ...this.options.dailyRotateFile,
          ...this.options.category,
          filename: 'exception.log',
        }),
      ];
      rejectionHandlers.category = [
        new winston.transports.DailyRotateFile({
          ...this.options.dailyRotateFile,
          ...this.options.category,
          filename: 'rejections.log',
        }),
      ];
    }
    const transports = {
      all: [...transportTypeObj.console, ...transportTypeObj.all],
      onlyConsole: [...transportTypeObj.console],
      category: [...transportTypeObj.console, ...transportTypeObj.category],
    };
    this.loggerOptions = {
      format: winston.format.combine(winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), this.customFormat()),
      transports: transports[transportType],
      exceptionHandlers: transportType !== 'onlyConsole' ? exceptionHandlers[transportType] : [],
      rejectionHandlers: transportType !== 'onlyConsole' ? rejectionHandlers[transportType] : [],
    };
    this.winstonLogger = winston.createLogger(this.loggerOptions);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private formatMeta(meta: any): any {
    const splat = meta[SPLAT];
    if (splat?.length) {
      return splat.length === 1 ? splat[0] : splat;
    }
    return '';
  }

  private customFormat() {
    return winston.format.printf(info => {
      const { timestamp, level, message, ...meta } = info;
      const metaData = this.formatMeta(meta);
      let str = `timestamp: ${timestamp},
  level: ${level.toUpperCase()},
  message: ${message}`;
      if (metaData) {
        const data = metaData;
        str += `,\r\n  data: ${
          typeof data === 'object'
            ? !data.stack
              ? JSON.stringify(data)
              : JSON.stringify(data.stack.toString().split(/\n.*at\s/))
            : data
        }`;
      }
      return `{ ${str} }`;
    });
  }

  getLogger(label?: string) {
    return {
      winstonLogger: this.winstonLogger,
      error: (message: unknown, ...meta: unknown[]) => {
        console.error(message);
        message += `,\r\n  label: ${label}`;
        this.winstonLogger.error(message as string, ...meta);
      },
      warn: (message: unknown, ...meta: unknown[]) => {
        message += `,\r\n  label: ${label}`;
        this.winstonLogger.warn(message as string, ...meta);
      },
      info: (message: unknown, ...meta: unknown[]) => {
        message += `,\r\n  label: ${label}`;
        this.winstonLogger.info(message as string, ...meta);
      },
      debug: (message: unknown, ...meta: unknown[]) => {
        message += `,\r\n  label: ${label}`;
        this.winstonLogger.debug(message as string, ...meta);
      },
    };
  }
}
