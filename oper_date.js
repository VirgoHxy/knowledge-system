const utils = require('./utils')

/**
 * 格式化时间
 * @param {Date} date 时间对象
 * @param {String} formatStr 格式化字符串 YYYY-MM-DD hh:mm:ss
 * @returns {String} 返回字符串时间
 */
function format(date, formatStr) {
  var str = formatStr;
  var Week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  //获取当前毫秒，小于9或99补零
  str = str.replace(/MS/, date.getMilliseconds() > 9 ? date.getMilliseconds() > 99 ? date.getMilliseconds().toString() : '0' + date.getMilliseconds() : '00' + date.getMilliseconds());
  //获取当前毫秒，不补零
  str = str.replace(/ms/, date.getMilliseconds());
  //获取完整年份
  str = str.replace(/yyyy|YYYY/, date.getFullYear());
  //获取后两位年份，小于10补零
  str = str.replace(/yy|YY/, (date.getYear() % 100) > 9 ? (date.getYear() % 100).toString() : '0' + (date.getYear() % 100));
  //获取月份，小于10补零
  str = str.replace(/MM/, (date.getMonth() + 1) > 9 ? (date.getMonth() + 1).toString() : '0' + (date.getMonth() + 1));
  //获取月份，小于10不补零
  str = str.replace(/M/, date.getMonth() + 1);
  //获取星期几
  str = str.replace(/w|W/g, Week[date.getDay()]);
  //获取日期，小于10补零
  str = str.replace(/dd|DD/, date.getDate() > 9 ? date.getDate().toString() : '0' + date.getDate());
  //获取日期，小于10不补零
  str = str.replace(/d|D/, date.getDate());
  //获取小时，小于10补零
  str = str.replace(/hh|HH/, date.getHours() > 9 ? date.getHours().toString() : '0' + date.getHours());
  //获取小时，小于10不补零
  str = str.replace(/h|H/, date.getHours());
  //获取分钟，小于10补零
  str = str.replace(/mm/, date.getMinutes() > 9 ? date.getMinutes().toString() : '0' + date.getMinutes());
  //获取分钟，小于10不补零
  str = str.replace(/m/, date.getMinutes());
  //获取秒钟，小于10补零
  str = str.replace(/ss|SS/, date.getSeconds() > 9 ? date.getSeconds().toString() : '0' + date.getSeconds());
  //获取秒钟，小于10不补零
  str = str.replace(/s|S/, date.getSeconds());
  return str;
}
/**
 * json时间转换成时间 格式化时间调用format方法
 * @param {String} value json时间值
 * @param {String} formatStr 格式化字符串 YYYY-MM-DD hh:mm:ss
 * @returns 当value为空返回null,当formatStr为空返回date,不为空返回字符串时间
 */
function convertJson(value, formatStr) {
  let date;
  if (value == null || value == "") {
    return null;
  }
  if (typeof value == 'object') {
    date = value;
  } else {
    date = new Date();
    date.setTime(value.replace(/\/Date\((\d+)\)\//gi, '$1')); //value通过截取字符串只取数字。
  }
  if (!!formatStr) {
    return format(date, formatStr);
  }
  return date
};
/**
 * 时间转换成时间戳 
 * @param {string|date} value 时间值
 * @param {string} type 类型 毫秒ms | 秒s
 * @returns {Number} 返回毫秒/秒类型时间戳
 */
function convertToStamp(value, type) {
  let date;
  if (value == null || value == "") {
    return 0;
  }
  if (typeof value == 'date') {
    date = value;
  } else {
    date = new Date(value);
  }
  if (type == 's') {
    return Math.round(date / 1000);
  }
  return Math.round(date);
};
/**
 * 时间戳转换成时间
 * @param {Number} value 时间戳
 * @param {string} type 类型 毫秒ms | 秒s
 * @param {String} formatStr 格式化字符串 YYYY-MM-DD hh:mm:ss
 * @returns {String} 当value为空返回'1970-01-01 00:00',当formatStr为空返回date,不为空返回字符串时间 
 */
function convertStamp(value, type, formatStr) {
  let date;
  if (value == null || value == "") {
    return '1970-01-01 00:00';
  }
  if (type == 'ms') {
    date = new Date(value / 1000);
  } else {
    date = new Date(value);
  }
  if (!!formatStr) {
    return format(date, formatStr);
  }
  return date;
};

/**
 * 按时间顺序排序数组
 * @param {Object} param 参数对象
 * 
 * arr 包含时间字段数组
 * 
 * key 排序的对象key值
 * 
 * IsAsc 是否升序 true升序 false降序 默认false
 * @param {Array} param.arr 包含时间字段数组
 * @param {String} param.key 排序的对象key值
 * @param {Boolean} param.IsAsc 是否升序 true升序 false降序 默认false
 * @returns {Array} 排序后的数组
 */
function sortForDate({arr = [], key = 'time', IsAsc = false} = {}) {
  if (arr.length==0) {
    return arr
  }
  arr.sort((a, b) => {
    if (typeof a == 'object') {      
      if (!IsAsc) {
        return new Date(Date.parse(String(b[key]))) > new Date(Date.parse(String(a[key]))) ? 1 : -1; //大的在前
      }
      return new Date(Date.parse(String(a[key]))) > new Date(Date.parse(String(b[key]))) ? 1 : -1; //小的在前
    }
    if (!IsAsc) {
      return new Date(Date.parse(String(b))) > new Date(Date.parse(String(a))) ? 1 : -1; //大的在前
    }
    return new Date(Date.parse(String(a))) > new Date(Date.parse(String(b))) ? 1 : -1; //小的在前
  });
  return arr
}
// utils.log(sortForDate({arr: ['2019-10-02T12:00:00.000Z','2019-10-03T12:00:00.000Z','2019-10-21T12:00:00.000Z']}))

module.exports = { format, convertJson, convertToStamp, convertStamp, sortForDate };