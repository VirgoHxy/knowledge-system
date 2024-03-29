const log4js = require('log4js');
const path = require('path');

// log4js权重等级
// {
//   ALL: new Level(Number.MIN_VALUE, "ALL"),
//   TRACE: new Level(5000, "TRACE"),
//   DEBUG: new Level(10000, "DEBUG"),
//   INFO: new Level(20000, "INFO"),
//   WARN: new Level(30000, "WARN"),
//   ERROR: new Level(40000, "ERROR"),
//   FATAL: new Level(50000, "FATAL"),
//   MARK: new Level(9007199254740992, "MARK"), // 2^53
//   OFF: new Level(Number.MAX_VALUE, "OFF")
// }

module.exports = class Logger {
  /**
   * 实例化参数
   * @param {Object} param 参数
   * @param {string} [param.logPath] 日志位置
   * @param {string} [param.category] 类别
   */
  constructor({ logPath, category, minLevel } = {}) {
    logPath = logPath || path.resolve(__dirname, '../../logs');
    category = category || 'default';
    minLevel = minLevel || 'INFO';
    // log4 配置
    const templateConfig = {
      appenders: {
        layout: {
          type: 'pattern',
          pattern: '************************ log ************************%m',
        },
        dateFile: {
          filedir: `${logPath}/`,
          alwaysIncludePattern: true,
          pattern: 'yyyy-MM-dd.log',
          encoding: 'utf-8',
        },
      },
    };
    const config = {
      appenders: {
        console: {
          type: 'console',
          layout: {
            type: 'pattern',
            pattern: '%[************************ log ************************%m%]',
          },
        },
      },
      categories: {
        // 终端输出和日期文件，所有类型放在一个文件
        default: {
          appenders: ['console', 'all'],
          level: minLevel,
        },
        // 仅包含终端输出
        console: {
          appenders: ['console'],
          level: minLevel,
        },
        // 日期文件，五种类型会分别在五个文件夹
        dateFile: {
          appenders: ['justDebug', 'justInfo', 'justWarn', 'justError', 'justFatal'],
          level: minLevel,
        },
      },
    };
    for (let array = ['all', 'debug', 'info', 'warn', 'error', 'fatal'], index = 0; index < array.length; index++) {
      const element = array[index];
      if (element != 'all') {
        config.appenders[`${element}DateFile`] = {
          type: 'dateFile',
          filename: `${templateConfig.appenders.dateFile.filedir}${element}`,
          alwaysIncludePattern: templateConfig.appenders.dateFile.alwaysIncludePattern,
          pattern: templateConfig.appenders.dateFile.pattern,
          encoding: templateConfig.appenders.dateFile.encoding,
          layout: templateConfig.appenders.layout,
        };
        config.appenders[`just${element.replace(element[0], element[0].toUpperCase())}`] = {
          type: 'logLevelFilter',
          appender: `${element}DateFile`,
          level: element.toUpperCase(),
          maxLevel: element.toUpperCase(),
        };
      } else {
        config.appenders.all = {
          type: 'dateFile',
          filename: `${templateConfig.appenders.dateFile.filedir}${element}`,
          alwaysIncludePattern: templateConfig.appenders.dateFile.alwaysIncludePattern,
          pattern: templateConfig.appenders.dateFile.pattern,
          encoding: templateConfig.appenders.dateFile.encoding,
          layout: templateConfig.appenders.layout,
        };
      }
    }
    for (const key in config.categories) {
      if (Object.hasOwnProperty.call(config.categories, key)) {
        if (key != category) {
          delete config.categories[key];
        }
      }
    }
    if (!config.categories.default) {
      config.categories.default = {
        appenders: ['console'],
        level: 'DEBUG',
      };
    }
    log4js.configure(config);
    this.log4js = log4js;
    this.log4jsLogger = log4js.getLogger(category);
    this.logLevel = ['DEBUG', 'INFO', 'WARN', 'ERROR', 'FATAL'];
    this.logPath = logPath;
  }

  /**
   * 日志输出方法
   * @param {Object} data
   * @param {string} [data.location] 位置
   * @param {string} data.level 等级
   * @param {string} data.message 信息
   * @param {Object} [data.data] 对象信息
   */
  log(data = {}) {
    const logObj = this.logFormat(data);
    const { text, level } = logObj;
    this.log4jsLogger[this.logLevel.includes(level.toUpperCase()) ? level : 'warn'](text);
  }

  /**
   * debug日志
   * @param {string} data.message 信息
   * @param {Object} [data.args] 其他栏位
   */
  debug(message, args = {}) {
    this.log(
      Object.assign(args, {
        level: 'DEBUG',
        message,
      })
    );
  }

  /**
   * info日志
   * @param {string} data.message 信息
   * @param {Object} [data.args] 其他栏位
   */
  info(message, args = {}) {
    this.log(
      Object.assign(args, {
        level: 'INFO',
        message,
      })
    );
  }

  /**
   * warn日志
   * @param {string} data.message 信息
   * @param {Object} [data.args] 其他栏位
   */
  warn(message, args = {}) {
    this.log(
      Object.assign(args, {
        level: 'WARN',
        message,
      })
    );
  }

  /**
   * error日志
   * @param {string} data.message 信息
   * @param {Object} [data.args] 其他栏位
   */
  error(message, args = {}) {
    this.log(
      Object.assign(args, {
        level: 'ERROR',
        message,
      })
    );
  }

  /**
   * fatal日志
   * @param {string} data.message 信息
   * @param {Object} [data.args] 其他栏位
   */
  fatal(message, args = {}) {
    this.log(
      Object.assign(args, {
        level: 'FATAL',
        message,
      })
    );
  }

  /**
   * 日志格式化方法
   * @param {Object} data
   * @param {string} [data.location] 位置
   * @param {string} [data.level] 等级
   * @param {string} data.message 信息
   * @param {Object} [data.data] 对象信息
   * @returns {{text: string, level: string}} log字符串和等级的对象
   */
  logFormat({ location, level, message, data } = {}) {
    let file = '';
    try {
      let stackArray = new Error().stack.toString().split(/\n.*at\s/);
      for (let index = 1; index < stackArray.length; index++) {
        const element = stackArray[index];
        // console.log(element);
        if (element.toLowerCase().indexOf('log4') == -1) {
          let fileMatch = element.match(/\((.*)\)/);
          file = fileMatch ? fileMatch[1] : element;
          break;
        }
      }
      // eslint-disable-next-line
    } catch {}
    level = level ? (this.logLevel.includes(level.toUpperCase()) ? level.toUpperCase() : 'UNKNOWN') : 'UNKNOWN';
    location = location || file;
    const nowDate = new Date();
    const now = `${nowDate.getFullYear()}-${
      nowDate.getMonth() + 1
    }-${nowDate.getDate()} ${nowDate.getHours()}:${nowDate.getMinutes()}:${nowDate.getSeconds()}`;
    const obj = {
      text: `
【Time】: ${now}
【Location】: ${location}
【Level】: ${level}
【Message】: ${message}\n`,
      level: level.toLowerCase(),
    };
    data != null &&
      (obj.text += `【Data】：${
        typeof data === 'object'
          ? !data.stack
            ? JSON.stringify(data)
            : JSON.stringify(data.stack.toString().split(/\n.*at\s/))
          : data
      }\n`);
    return obj;
  }
};
