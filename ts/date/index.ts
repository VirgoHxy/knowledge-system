/**
 * 获取合规日期时间
 * @param {Date | string | number} value 日期时间值
 * @returns {Date | undefined} Date实例对象
 */
export function getRegularDate(value: Date | string | number): Date | undefined {
  const match = Object.prototype.toString.call(value).match(/\[object (.*?)\]/);
  let type;
  if (match) type = match[1].toLowerCase();

  switch (type) {
    case 'string': {
      if (!Number.isNaN(Number(value))) value = Number(value);
      if (typeof value == 'string') {
        if (/\/Date\(\d+\)\//.test(value)) {
          value = Number(String(value).replace(/\/Date\((\d+)\)\//gi, '$1'));
        } else if (!value.includes('T')) {
          value = /-/.test(value) ? value.replace(/-/g, '/') : value;
        }
      }
      const date = new Date(value);
      return !Number.isNaN(date.getTime()) ? date : undefined;
    }
    case 'date':
    case 'number':
      return new Date(value);
    default:
      return;
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
export function format(value: Date | string | number, formatStr = 'YYYY-MM-DD hh:mm:ss'): string | undefined {
  const myDate = getRegularDate(value);
  if (!myDate) {
    return;
  }
  const fullYear = myDate.getFullYear(),
    year = String(fullYear).substring(2),
    month = myDate.getMonth(),
    date = myDate.getDate(),
    day = myDate.getDay(),
    hour = myDate.getHours(),
    minute = myDate.getMinutes(),
    second = myDate.getSeconds(),
    mSecond = myDate.getMilliseconds(),
    week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    regexp: [RegExp, string | number][] = [
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
  for (const iterator of regexp) {
    formatStr = formatStr.replace(iterator[0], String(iterator[1]));
  }
  return formatStr;
}
