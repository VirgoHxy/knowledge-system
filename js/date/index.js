/**
 * 获取合规日期时间
 * @param {Date | string | number} value 日期时间值
 * @returns {Date | undefined} Date实例对象
 */
function getRegularDate(value) {
  let type = Object.prototype.toString
    .call(value)
    .match(/\[object (.*?)\]/)[1]
    .toLowerCase();

  switch (type) {
    case 'string': {
      !Number.isNaN(Number(value)) && (value = Number(value));
      if (typeof value == 'string') {
        if (/\/Date\(\d+\)\//.test(value)) {
          value = Number(String(value).replace(/\/Date\((\d+)\)\//gi, '$1'));
        } else if (!value.includes('T')) {
          value = /-/.test(value) ? value.replace(/-/g, '/') : value;
        }
      }
      let date = new Date(value);
      return !Number.isNaN(date.getTime()) ? date : undefined;
    }
    case 'date':
    case 'number':
      return new Date(value);
    default:
      return undefined;
  }
}

/**
 * 格式化日期时间
 *
 * 依赖方法 getRegularDate
 * @param {Date | string | number} value 日期时间值
 * @param {string} [formatStr = "YYYY-MM-DD hh:mm:ss"] 格式化规则
 * @returns {string | undefined} 日期时间字符串
 */
function format(value, formatStr = 'YYYY-MM-DD hh:mm:ss') {
  let myDate = getRegularDate(value);
  if (!myDate) {
    return undefined;
  }
  let fullYear = myDate.getFullYear(),
    year = String(fullYear).substring(2),
    month = myDate.getMonth(),
    date = myDate.getDate(),
    day = myDate.getDay(),
    hour = myDate.getHours(),
    minute = myDate.getMinutes(),
    second = myDate.getSeconds(),
    mSecond = myDate.getMilliseconds(),
    week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    regexp = [
      //四位年份
      [/yyyy|YYYY/, fullYear],
      //两位年份，小于10补零
      [/yy|YY/, year],
      //月份，小于10补零
      [/MM/, month + 1 > 9 ? month + 1 : '0' + (month + 1)],
      //月份，不补零
      [/\bM\b/, month + 1],
      //日期，小于10补零
      [/dd|DD/, date > 9 ? date : '0' + date],
      //日期，不补零
      [/d|D/, date],
      //小时，小于10补零
      [/hh|HH/, hour > 9 ? hour : '0' + hour],
      //小时，不补零
      [/h|H/, hour],
      //分钟，小于10补零
      [/mm/, minute > 9 ? minute : '0' + minute],
      //分钟，不补零
      [/\bm\b/, minute],
      //秒钟，小于10补零
      [/ss|SS/, second > 9 ? second : '0' + second],
      //秒钟，不补零
      [/\bs\b|\bS\b/, second],
      //星期几
      [/w|W/g, week[day]],
      //毫秒，小于9或99补零
      [/MS/, mSecond > 9 ? (mSecond > 99 ? mSecond : '0' + mSecond) : '00' + mSecond],
      //毫秒，不补零
      [/ms/, mSecond],
    ];
  for (let index = 0; index < regexp.length; index++) {
    const element = regexp[index];
    formatStr = formatStr.replace(element[0], element[1]);
  }
  return formatStr;
}

/**
 * 格式化日期时间
 *
 * 挂载在Date原型上
 * @param {string} [formatStr = "YYYY-MM-DD hh:mm:ss"] 格式化规则
 * @returns {string} 日期时间字符串
 */
Date.prototype.format = function (fmt = 'YYYY-MM-DD hh:mm:ss') {
  let o = {
    'y+|Y+': this.getFullYear(), // 年
    'M+': this.getMonth() + 1, // 月
    'd+|D+': this.getDate(), // 日
    'h+|H+': this.getHours(), // 时
    'm+': this.getMinutes(), // 分
    's+|S+': this.getSeconds(), // 秒
    'ms|MS': this.getMilliseconds(), // 毫秒
    'w+|W+': this.getDay(), // 星期
  };
  for (let k in o) {
    let match = fmt.match(new RegExp('(' + k + ')'));
    if (match) {
      if (k == 'y+|Y+') {
        fmt = fmt.replace(match[1], String(o[k]).substring(4 - match[1].length));
        continue;
      }
      if (k == 'ms|MS') {
        let ms = o[k] > 9 ? (o[k] > 99 ? o[k] : '0' + o[k]) : '00' + o[k];
        fmt = fmt.replace(match[1], ms);
        continue;
      }
      if (k == 'w+|W+') {
        fmt = fmt.replace(
          match[1],
          (match[1].length > 0 ? (match[1].length > 1 ? '星期' : '周') : '') + '日一二三四五六'.charAt(o[k])
        );
        continue;
      }
      fmt = fmt.replace(match[1], match[1].length == 1 ? o[k] : ('00' + o[k]).substring(('' + o[k]).length));
    }
  }
  return fmt;
};

/**
 * 获取xlsx合规日期时间
 * @param {number} value xlsx日期时间值
 * @returns {Date | undefined} Date实例对象
 */
function getDateOfExcel(value) {
  let utc_days = Math.floor(value - 25569);
  let utc_value = utc_days * 86400;
  let date_info = new Date(utc_value * 1000);
  let fractional_day = value - Math.floor(value) + 0.0000001;
  let total_seconds = Math.floor(86400 * fractional_day);
  let seconds = total_seconds % 60;
  total_seconds -= seconds;
  let hours = Math.floor(total_seconds / (60 * 60));
  let minutes = Math.floor(total_seconds / 60) % 60;
  let date = new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate(), hours, minutes, seconds);
  return !Number.isNaN(date.getTime()) ? date : undefined;
}

/**
 * 给定日期时间增加/减去时间
 *
 * 依赖getRegularDate方法
 * @param {Date | string | number} value 日期时间值
 * @param {string} str 增加或减少的日期时间，如：'10h,20M,30s'
 * @returns {Date | undefined} Date实例对象
 */
function calcDate(value, str) {
  let myDate = getRegularDate(value);
  if (!myDate) {
    return undefined;
  }
  let o = {
    '(\\d+)(y)': myDate.getFullYear(), // 年
    '(\\d+)(M)': myDate.getMonth(), // 月
    '(\\d+)(d)': myDate.getDate(), // 日
    '(\\d+)(h)': myDate.getHours(), // 时
    '(\\d+)(m\\b)': myDate.getMinutes(), // 分
    '(\\d+)(s)': myDate.getSeconds(), // 秒
    '(\\d+)(ms)': myDate.getMilliseconds(), // 毫秒
    '(\\d+)(w)': myDate.getDay(), // 星期
  };
  outer: for (let k in o) {
    let match = str.match(new RegExp(k));
    if (match) {
      let value = Number(match[1]),
        type = match[2],
        setFn = '';
      switch (type) {
        case 'y':
          setFn = 'setFullYear';
          value += o[k];
          break;
        case 'M':
          setFn = 'setMonth';
          value += o[k];
          break;
        case 'd':
          setFn = 'setDate';
          value += o[k];
          break;
        case 'h':
          setFn = 'setHours';
          value += o[k];
          break;
        case 'm':
          setFn = 'setMinutes';
          value += o[k];
          break;
        case 's':
          setFn = 'setSeconds';
          value += o[k];
          break;
        case 'ms':
          setFn = 'setMilliseconds';
          value += o[k];
          break;
        case 'w':
          setFn = 'setDay';
          value += o[k];
          break;

        default:
          continue outer;
      }
      myDate[setFn](value);
    }
  }
  return myDate;
}

/**
 * 判断是否为闰年
 * @param {number} [val] 年份 默认今年
 * @returns {Boolean} true 是闰年
 */
function isLeapYear(val) {
  let year = val ? val : new Date().getYear();
  // 普通闰年 4的倍数不是100的倍数 世纪闰年 400的倍数
  return (0 == year % 4 && year % 100 != 0) || year % 400 == 0;
}

/**
 * 获取月份天数
 *
 * 依赖isLeapYear，getRegularDate方法
 * @param {Date | string | number} [value = new Date()] 日期时间值
 * @returns {number | undefined} 当月天数
 */
function getDays(value = new Date()) {
  let myDate = getRegularDate(value);
  if (!myDate) {
    return undefined;
  }
  let year = myDate.getFullYear(),
    mouth = myDate.getMonth() + 1,
    days;
  if (mouth == 2) {
    //当月份为二月时，根据闰年还是非闰年判断天数
    days = isLeapYear(year) ? 29 : 28;
  } else if ([1, 3, 5, 7, 8, 10, 12].includes(mouth)) {
    //一三五七八十腊,三十一天永不差
    days = 31;
  } else {
    //其他月份三十天
    days = 30;
  }
  return days;
}

/**
 * 时间数值转换为字符串时间长度
 * @param {string} val 时间数值，如：ms毫秒 s秒 m分 h时，示例：1200ms，24h，61m
 * @returns {string} 字符串时间长度，为空返回空字符串
 */
function getLengthOfTime(val) {
  if (val == null || val === '') {
    return '';
  }
  let array = [
    ['([0-9]+.[0-9]*|[0-9]+)(ms)', 1000, '毫秒'],
    ['([0-9]+.[0-9]*|[0-9]+)(s)', 60, '秒'],
    ['([0-9]+.[0-9]*|[0-9]+)(m\\b)', 60, '分钟'],
    ['([0-9]+.[0-9]*|[0-9]+)(h)', 24, '小时'],
    ['([0-9]+.[0-9]*|[0-9]+)(d)', 7, '天'],
    ['([0-9]+.[0-9]*|[0-9]+)(d)', Number.MAX_SAFE_INTEGER, '周'],
  ];
  let value = 0;
  let index;
  for (index = 0; index < array.length; index++) {
    const element = array[index];
    let match = val.match(new RegExp(element[0]));
    if (match) {
      value = Number(match[1]);
      break;
    }
  }

  let value2 = value % array[index][1];
  let value1 = Math.floor(value / array[index][1]);
  while (value1 > array[index + 1][1]) {
    if (index > array.length - 2) {
      break;
    }
    index++;
    value2 = value1 % array[index][1];
    value1 = Math.floor(value1 / array[index][1]);
  }
  return `${value1 == 0 ? value1 + array[index][2] : value1 + array[index + 1][2]}${
    value2 == 0 ? '' : value2 + array[index][2]
  }`;
}

/**
 * 按日期时间顺序排序数组
 *
 * 依赖方法 getRegularDate
 * @param {Array} array 日期时间数组
 * @param {Boolean} [isAsc = false] 是否升序，默认false；true升序，新日期在前；false降序，旧日期在前
 * @returns {Array} 排序后的数组
 */
function sortDate(array, isAsc = false) {
  if (!(array instanceof Array) || array.length === 0) {
    return [];
  }
  array.sort((a, b) => {
    let left = getRegularDate(a),
      right = getRegularDate(b);
    return !isAsc ? (left > right ? 1 : -1) : right > left ? 1 : -1;
  });
  return array;
}

/**
 * 按日期时间顺序排序对象数组
 *
 * 依赖方法 getRegularDate
 * @param {Array} array 日期时间对象数组
 * @param {string} key 对象的key
 * @param {Boolean} [isAsc = false] 是否升序，默认false；true升序，新日期在前；false降序，旧日期在前
 * @returns {Array} 排序后的数组
 */
function sortDateByKey(array, key, isAsc = false) {
  if (!(array instanceof Array) || array.length === 0) {
    return [];
  }
  array.sort((a, b) => {
    let left = getRegularDate(a[key]),
      right = getRegularDate(b[key]);
    return !isAsc ? (left > right ? 1 : -1) : right > left ? 1 : -1;
  });
  return array;
}

module.exports = {
  getRegularDate,
  format,
  getDateOfExcel,
  calcDate,
  isLeapYear,
  getDays,
  getLengthOfTime,
  sortDate,
  sortDateByKey,
};
