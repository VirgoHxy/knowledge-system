!(function () {
  'use strict';

  class JAFOErrorHandler {
    constructor(data) {
      this.init(data);
    }

    init(data) {
      if (typeof data != 'object') {
        console.log('init: 初始化参数不是一个Object');
        return;
      }
      let requiredObj = {
        url: {
          required: true
        }
      };
      let requiredStr = this._checkParam(requiredObj, data);
      if (!this._isNull(requiredStr)) {
        console.log('init: ' + requiredStr);
        return;
      }
      // 上报地址
      this.url = data.url;
      // POST或GET
      this.type = data.type || 'GET';
      // 上报次数上限(0为无限) 一天内同一个错误(不是详细错误)超过上限只计数 不上报具体原因
      this.time = data.time || 20;
      // 上报次数地址
      this.countUrl = data.countUrl;
      this._windowFlag = window ? true : false;
      // web错误收集
      if (this._windowFlag) {
        // window 分辨设备类型
        this._deviceType = this._getDeviceType();

        window.addEventListener('error', (event) => {
          let {
            message,
            filename,
            lineno,
            colno,
            error
          } = event;
          let param = {
            file: `${filename}_${lineno}行_${colno}列`,
            message,
            error
          };
          this.reportError(param, true);
        });

        // vue错误 正式vue 本地运行需要自行添加该代码
        if (window.Vue) {
          window.Vue.config.errorHandler = function(err) {
            setTimeout(() => {
              throw err;
            });
          };
        }
      }
    }

    reportError(data, eventFlag) {
      if (typeof data != 'object') {
        console.log('reportError: 上报信息不是一个Object');
        return;
      }
      if (eventFlag && !data.file) {
        console.log('reportError: 跨域 Script error 不上报');
        return;
      }
      if (!eventFlag) {
        let requiredObj = {
          url: {
            required: true
          },
          message: {
            required: true
          }
        };
        let requiredStr = this._checkParam(requiredObj, data);
        if (!this._isNull(requiredStr)) {
          console.log('reportError: 自行上报' + requiredStr);
          return;
        }
      }
      let messageStr = this._getErrorKeyMessageStr(data, eventFlag);
      let detailStr = this._getErrorKeyDetailStr(data, eventFlag);
      let param = Object.assign(data, {
        id: this._getErrorID(),
        device: this._deviceType,
        key: this._getErrorKey(messageStr),
        detailKey: this._getErrorKey(detailStr),
        message: messageStr,
        detailMessage: detailStr
      });
      if (data.error && data.error.stack) {
        // 这种正则 在iphone app编译后会导致语法错误 invalid regular expression invalid group specifier name
        // errorStack = data.error.stack.match(/(?<=at\s)(.+)(?=\s\()/g);
        let regExp = new RegExp('(?<=at\\s)(.+)(?=\\s\\()', 'g');
        let errorStack = data.error.stack.match(regExp);
        Object.assign(param, {
          errorStack
        });
      }
      if (this._windowFlag) {
        param.location = window.location.pathname;
        // 超上限 计数上报
        if (this.time != 0 && this.countUrl) {
          let num = this._getExpire(window.localStorage, `errorHandler${param.key}`) || 0;
          num++;
          this._setExpire(window.localStorage, `errorHandler${param.key}`, num, 24 * 60 * 60 * 1000);
          if (num >= this.time) {
            this._report(this.countUrl, {
              key: param.key,
              detailKey: param.detailKey,
              message: messageStr,
              detailMessage: detailStr
            });
            return;
          }
        }
      } else {
        // nodejs 超上限 计数上报
      }
      // 上报详细信息 后台接收并计数
      this._report(this.url, param);
    }

    _report(url, param) {
      if (this.type == 'GET') {
        let href = url;
        if (param) {
          href = this._urlMethod({
            url: url,
            type: 'objectSet',
            value: param
          });
        }
        (new Image).src = href;
      } else if (this.type == 'POST') {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(param ? JSON.stringify(param) : '');
      }
    }

    // 获取错误唯一标识
    _getErrorID() {
      return `${this._format(new Date(), 'YYYYMMDDhhmmss')}${this._randomStr()}`;
    }

    // 获取错误标识(统计)
    _getErrorKey(str) {
      let num = 0;
      for (let i = 0; i < str.length; i++) {
        num += str[i].charCodeAt();
      }
      return num;
    }

    // 获取错误标识的拼接字符串
    _getErrorKeyStr(data, eventFlag, arr) {
      let str = '';
      for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
          let element = data[key];
          (typeof element == 'object') && (element = JSON.stringify(element));
          // 错误标识生成
          if ((eventFlag && arr.indexOf(key) != -1) || (!eventFlag && arr
              .indexOf(key) != -1)) {
            str += element + ';';
          }
        }
      }
      return str;
    }

    // 获取错误标识的拼接字符串
    _getErrorKeyMessageStr(data, eventFlag) {
      return this._getErrorKeyStr(data, eventFlag, ['message']);
    }

    // 获取错误标识的拼接字符串
    _getErrorKeyDetailStr(data, eventFlag) {
      let array = eventFlag ? ['file', 'message'] : ['url', 'message'];
      return this._getErrorKeyStr(data, eventFlag, array);
    }

    _checkParam(
      condition,
      data
    ) {
      if (this._isNull(condition) || this._isNull(data)) {
        return '_checkParam: 缺少参数';
      }
      let msg = '';
      for (const key in condition) {
        if (Object.hasOwnProperty.call(condition, key)) {
          const element = condition[key];
          if (element.required && this._isNull(data[key])) {
            msg += `${key}: 不能为空;`;
          }
        }
      }
      return msg;
    }

    _isNull(val) {
      return (val == null || val === '');
    }

    /**
     * 操作url的方法
     * 
     * @param {String} [data.url] 链接地址 默认为当前浏览器地址
     * @param {String} data.type 操作类型
     * @param {String} data.key 参数的名称
     * @param {*} data.value 参数的值 非字符串转换为字符串
     * @param {Boolean} [data.hrefFlag = true] 是否返回字符串地址 true 返回字符串地址
     * 
     * @returns {*} 返回值
     */
    _urlMethod(data = {}) {
      let {
        url,
        type,
        key,
        value,
        hrefFlag = true
      } = data;
      let href = url || (window ? window.location.href : '');
      if (!href) {
        return 'url不能为空';
      }
      let URLObject = new URL(href);
      let params = URLObject.searchParams;
      // set get has delete
      switch (type) {
        case 'set':
          params.set(key, value);
          return !hrefFlag ? URLObject : URLObject.href;
        case 'objectSet':
          for (const key in value) {
            if (Object.prototype.hasOwnProperty.call(value, key)) {
              let element = value[key];
              if (typeof element == 'object') {
                element = JSON.stringify(element);
              }
              params.set(key, element);
            }
          }
          return !hrefFlag ? URLObject : URLObject.href;
        case 'get':
          return params.get(key);
        case 'has':
          return params.has(key);
        case 'delete':
          params.delete(key);
          return !hrefFlag ? URLObject : URLObject.href;

        default:
          return 'type类型错误 set,objectSet,get,has,delete';
      }
    }

    /**
     * 设置期限Storage
     * 
     * @param {Object} storage 存储对象类型 localStorage或者sessionStorage
     * @param {String} key 存储对象名称
     * @param {*} value 存储对象值
     * @param {number} expire 存储时间(毫秒)
     */
    _setExpire(storage, key, value, expire) {
      let obj = {
        data: value,
        time: Date.now(),
        expire: expire
      };
      storage.setItem(key, JSON.stringify(obj));
    }

    /**
     * 获取Storage
     * 
     * @param {Obeject} storage 存储对象类型 localStorage或者sessionStorage
     * @param {String} key 存储对象名称
     * 
     * @returns {*}
     */
    _getExpire(storage, key) {
      let val = storage.getItem(key);
      if (!val) {
        return val;
      }
      val = JSON.parse(val);
      if (val.expire) {
        if (Date.now() - val.time > val.expire) {
          storage.removeItem(key);
          return null;
        }
      }
      return val.data;
    }

    /**
     * 获取合规时间
     * 
     * @param {Date | String | Number} value 时间字符串
     * 
     * @returns {Date} 返回时间对象
     */
    _getRegularTime(value) {
      let getType = function (o) {
        let s = Object.prototype.toString.call(o);
        return s.match(/\[object (.*?)\]/)[1].toLowerCase();
      };

      if (getType(value) == 'string') {
        let ms = value.match(/\.([\d]{1,})[Z]*/) ? value.match(/\.([\d]{1,})[Z]*/)[1] : 0;
        if (/T/g.test(value)) { // 去T
          value = value.replace(/T/g, ' ');
        }
        if (/\./g.test(value)) { // 去毫秒 兼容ios ie firefox
          value = value.replace(/\.[\d]{1,}[Z]*/, '');
        }
        if (/-/g.test(value)) { // new Date兼容ios ie firefox
          value = value.replace(/-/g, '/');
        }
        let date = new Date(value);
        date.setMilliseconds(ms);
        return date;
      } else if (getType(value) == 'number') {
        return new Date(value);
      } else if (getType(value) == 'date') {
        return value;
      } else {
        return false;
      }
    }

    /**
     * 格式化时间(依赖getRegularTime方法)
     * 
     * @param {Date | String | Number} value 时间值
     * @param {String} [formatStr = "YYYY-MM-DD hh:mm:ss"] 格式化规则
     * 
     * @returns {String} 返回字符串时间
     */
    _format(value, formatStr) {
      let myDate = this._getRegularTime(value);
      if (typeof myDate == 'boolean') {
        return '请输入正确的日期';
      }
      if (isNaN(myDate.getTime())) {
        return '请输入正确的日期';
      }
      let str = formatStr || 'YYYY-MM-DD hh:mm:ss',
        week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
        fullYear = myDate.getFullYear(),
        year = Number(String(fullYear).substring(2)),
        month = myDate.getMonth(),
        date = myDate.getDate(),
        day = myDate.getDay(),
        hour = myDate.getHours(),
        minute = myDate.getMinutes(),
        second = myDate.getSeconds(),
        mSecond = myDate.getMilliseconds();
      //四位年份
      str = str.replace(/yyyy|YYYY/, fullYear);
      //两位年份，小于10补零
      str = str.replace(/yy|YY/, year > 9 ? year : '0' + year);
      //月份，小于10补零
      str = str.replace(/MM/, (month + 1) > 9 ? month + 1 : '0' + (month + 1));
      //月份，不补零
      str = str.replace(/\bM\b/, month + 1);
      //日期，小于10补零
      str = str.replace(/dd|DD/, date > 9 ? date : '0' + date);
      //日期，不补零
      str = str.replace(/d|D/, date);
      //小时，小于10补零
      str = str.replace(/hh|HH/, hour > 9 ? hour : '0' + hour);
      //小时，不补零
      str = str.replace(/h|H/, hour);
      //分钟，小于10补零
      str = str.replace(/mm/, minute > 9 ? minute : '0' + minute);
      //分钟，不补零
      str = str.replace(/\bm\b/, minute);
      //秒钟，小于10补零
      str = str.replace(/ss|SS/, second > 9 ? second : '0' + second);
      //秒钟，不补零
      str = str.replace(/\bs\b|\bS\b/, second);
      //星期几
      str = str.replace(/w|W/g, week[day]);
      //毫秒，小于9或99补零
      str = str.replace(/MS/, mSecond > 9 ? mSecond > 99 ? mSecond : '0' + mSecond : '00' + mSecond);
      //毫秒，不补零
      str = str.replace(/ms/, mSecond);
      return str;
    }

    _randomStr(length = 6) {
      let ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      ALPHABET += 'abcdefghijklmnopqrstuvwxyz';
      let str = '';
      for (let i = 0; i < length; ++i) {
        let rand = Math.floor(Math.random() * ALPHABET.length);
        str += ALPHABET.substring(rand, rand + 1);
      }
      return str;
    }

    _getDeviceType() {
      let isMobile = {
        Android: function () {
          return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
          return navigator.userAgent.match(/BlackBerry|BB10/i);
        },
        iOS: function () {
          return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
          return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
          return navigator.userAgent.match(/IEMobile/i);
        },
        Wechat: function () {
          return navigator.userAgent.match(/MicroMessenger/i);
        },
        Alipay: function () {
          return navigator.userAgent.match(/AlipayClient/i);
        },
        any: function () {
          return (
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.iOS() ||
            isMobile.Opera() ||
            isMobile.Windows() ||
            isMobile.Wechat() ||
            isMobile.Alipay()
          );
        },
        getOsName: function () {
          let osName = 'Unknown OS';
          if (isMobile.Android()) {
            osName = 'Android';
          }
          if (isMobile.BlackBerry()) {
            osName = 'BlackBerry';
          }
          if (isMobile.iOS()) {
            osName = 'iOS';
          }
          if (isMobile.Opera()) {
            osName = 'Opera Mini';
          }
          if (isMobile.Windows()) {
            osName = 'Windows';
          }
          if (isMobile.Wechat()) {
            osName = 'Wechat';
          }
          if (isMobile.Alipay()) {
            osName = 'Alipay';
          }
          return {
            osName,
            type: 'mobile'
          };
        }
      };
      let detectDesktopOS = function () {
        let unknown = '-';
        let nVer = navigator.appVersion;
        let nAgt = navigator.userAgent;
        let os = unknown;
        let clientStrings = [{
            s: 'Chrome OS',
            r: /CrOS/
          },
          {
            s: 'Windows 10',
            r: /(Windows 10.0|Windows NT 10.0)/
          },
          {
            s: 'Windows 8.1',
            r: /(Windows 8.1|Windows NT 6.3)/
          },
          {
            s: 'Windows 8',
            r: /(Windows 8|Windows NT 6.2)/
          },
          {
            s: 'Windows 7',
            r: /(Windows 7|Windows NT 6.1)/
          },
          {
            s: 'Windows Vista',
            r: /Windows NT 6.0/
          },
          {
            s: 'Windows Server 2003',
            r: /Windows NT 5.2/
          },
          {
            s: 'Windows XP',
            r: /(Windows NT 5.1|Windows XP)/
          },
          {
            s: 'Windows 2000',
            r: /(Windows NT 5.0|Windows 2000)/
          },
          {
            s: 'Windows ME',
            r: /(Win 9x 4.90|Windows ME)/
          },
          {
            s: 'Windows 98',
            r: /(Windows 98|Win98)/
          },
          {
            s: 'Windows 95',
            r: /(Windows 95|Win95|Windows_95)/
          },
          {
            s: 'Windows NT 4.0',
            r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/
          },
          {
            s: 'Windows CE',
            r: /Windows CE/
          },
          {
            s: 'Windows 3.11',
            r: /Win16/
          },
          {
            s: 'Android',
            r: /Android/
          },
          {
            s: 'Open BSD',
            r: /OpenBSD/
          },
          {
            s: 'Sun OS',
            r: /SunOS/
          },
          {
            s: 'Linux',
            r: /(Linux|X11)/
          },
          {
            s: 'iOS',
            r: /(iPhone|iPad|iPod)/
          },
          {
            s: 'Mac OS X',
            r: /Mac OS X/
          },
          {
            s: 'Mac OS',
            r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/
          },
          {
            s: 'QNX',
            r: /QNX/
          },
          {
            s: 'UNIX',
            r: /UNIX/
          },
          {
            s: 'BeOS',
            r: /BeOS/
          },
          {
            s: 'OS/2',
            r: /OS\/2/
          },
          {
            s: 'Search Bot',
            r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/
          }
        ];
        for (let i = 0, cs;
          (cs = clientStrings[i]); i++) {
          if (cs.r.test(nAgt)) {
            os = cs.s;
            break;
          }
        }
        let osVersion = unknown;
        if (/Windows/.test(os)) {
          if (/Windows (.*)/.test(os)) {
            osVersion = /Windows (.*)/.exec(os)[1];
          }
          os = 'Windows';
        }
        switch (os) {
          case 'Mac OS X':
            if (/Mac OS X (10[/._\d]+)/.test(nAgt)) {
              // eslint-disable-next-line no-useless-escape
              osVersion = /Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1];
            }
            break;
          case 'Android':
            // eslint-disable-next-line no-useless-escape
            if (/Android ([\.\_\d]+)/.test(nAgt)) {
              // eslint-disable-next-line no-useless-escape
              osVersion = /Android ([\.\_\d]+)/.exec(nAgt)[1];
            }
            break;
          case 'iOS':
            if (/OS (\d+)_(\d+)_?(\d+)?/.test(nAgt)) {
              osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
              osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
            }
            break;
        }
        return {
          osName: os + osVersion,
          type: 'desktop'
        };
      };

      if (isMobile.any()) {
        return isMobile.getOsName();
      } else {
        return detectDesktopOS();
      }
    }
  }

  let global = (function () { return this || (0, eval)('this'); }());

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = JAFOErrorHandler;
  } else if (typeof define === 'function' && define.amd) {
    define(function () {
      return JAFOErrorHandler;
    });
  } else {
    !('JAFOErrorHandler' in global) && (global.JAFOErrorHandler = JAFOErrorHandler);
  }
}());