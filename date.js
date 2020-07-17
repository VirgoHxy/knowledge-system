let myDate = new Date();
let arr = [
  myDate.getFullYear(),         // 获取完整的年份(4位,1970-????)
  myDate.getMonth(),            // 获取当前月份(0-11,0代表1月)
  myDate.getDate(),             // 获取当前日(1-31)
  myDate.getDay(),              // 获取当前星期X(0-6,0代表星期天)
  myDate.getHours(),            // 获取当前小时数(0-23)
  myDate.getMinutes(),          // 获取当前分钟数(0-59)
  myDate.getSeconds(),          // 获取当前秒数(0-59)
  myDate.getMilliseconds(),     // 获取当前毫秒数(0-999)
  myDate.getTime(),             // 获取当前时间(从1970.1.1开始的毫秒数)
  myDate.toLocaleDateString(),  // 获取当前日期
  myDate.toLocaleTimeString(),  // 获取当前时间(am/pm)
  myDate.toLocaleString()       // 获取日期与时间(am/pm)
]

// 对象方法
Date.parse() // 解析一个日期时间字符串,返回UTC(协调世界时)到该时间毫秒数
Date.now()   // 返回UTC(协调世界时)至今的毫秒数

// 实例方法
myDate.toJSON()   // 将Date对象转化字符串,并格式化为JSON数据
myDate.valueOf()  // 返回UTC(协调世界时)到该时间毫秒数

/**
 * 格式化时间
 * @param {Date} date 时间对象
 * @param {String} formatStr 格式化字符串 YYYY-MM-DD hh:mm:ss
 * @returns {String} 返回字符串时间
 */
function format(date, formatStr) {
  var str = formatStr || "YYYY-MM-DD hh:mm:ss";
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
 * @param {String} formatStr 格式化字符串 例如:YYYY-MM-DD hh:mm:ss(依赖format方法)
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
 * @param {String} formatStr 格式化字符串 例如:YYYY-MM-DD hh:mm:ss(依赖format方法)
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
function sortForDate({
  arr = [],
  key = 'time',
  IsAsc = false
} = {}) {
  if (arr.length == 0) {
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
// console.log(sortForDate({arr: ['2019-10-02T12:00:00.000Z','2019-10-03T12:00:00.000Z','2019-10-21T12:00:00.000Z']}))

/**
 * 当前时间/给定时间增加/减去多长时间
 * @param {String|Date} date 时间
 * @param {Array|Number} value 增加的数值或者是对象数组
 * @param {String} type 时间类型 毫秒ms | 秒s | 分m | 时h | 天d | 月mm | 年y
 * @param {Boolean} calcType 计算类型 true 增加 false 减去 默认为增加
 * @param {String} formatStr 格式化字符串 例如:YYYY-MM-DD hh:mm:ss(依赖format方法)
 * @returns {Date|String} 当date为空返回当前时间,当formatStr为空返回date,不为空返回字符串时间 
 */
function getCalcDate({
  date,
  value,
  type = 'ms',
  calcType = true,
  formatStr
} = {}) {
  let length = 1;
  if (date == null || date == '') {
    date = new Date();
  } else if (typeof date == 'string') {
    date = new Date(Date.parse(date));
  }
  if (value == null || value == "") {
    date = new Date();
    if (!!formatStr) {
      return format(date, formatStr);
    }
    return date;
  }
  if (value instanceof Array) {
    length = value.length;
  }
  let year = date.getFullYear(),
    month = date.getMonth(),
    day = date.getDate(),
    hour = date.getHours(),
    minute = date.getMinutes(),
    second = date.getSeconds(),
    ms = date.getTime();
  for (let index = 0; index < length; index++) {
    let element;
    let dateType;
    if (length == 1) {
      element = value;
      dateType = type;
    } else {
      element = value[index].value;
      dateType = value[index].type;
    }
    switch (dateType) {
      case "ms":
        date.setTime(calcType ? ms + element : ms - element);
        break;
      case "s":
        date.setSeconds(calcType ? second + element : second - element);
        break;
      case "m":
        date.setMinutes(calcType ? minute + element : minute - element);
        break;
      case "h":
        date.setHours(calcType ? hour + element : hour - element);
        break;
      case "d":
        date.setDate(calcType ? day + element : day - element);
        break;
      case "mm":
        date.setMonth(calcType ? month + element : month - element);
        break;
      case "y":
        date.setFullYear(calcType ? year + element : year - element);
        break;
      default:
        console.log('时间类型错误')
        break;
    }
  }
  if (!!formatStr) {
    return format(date, formatStr);
  }
  return date;
};

/* console.log(getCalcDate({
  date: "2019-04-23 12:23:20",
  value: [
    {
      value: 24,
      type: 'h'
    },
    {
      value: 12,
      type: 'm'
    },
    {
      value: 80,
      type: 's'
    },
  ],
  calcType: false,
  formatStr: 'YYYY-MM-DD hh:mm:ss'
}))
console.log(getCalcDate({
  value: 8,
  type: 'mm',
  formatStr: 'YYYY-MM-DD hh:mm'
})) */


/**
 * 求两个时间的差(日、时、分、秒)或者(年、月)
 * @param {Array} arr 时间数组
 * @returns {Array} 返回时间差数组 返回(日、时、分、秒)或者(年、月)
 */
function getTimeBetween(arr) {
  let sortArr = sortForDate({
    arr
  });
  let ms = Date.parse(sortArr[0]) - Date.parse(sortArr[sortArr.length - 1]),
    year = Math.floor(ms / (1000 * 60 * 60 * 24 * 365)), //一年按365
    difference = [0, 0, 0, 0],
    remainder = [
      1000 * 60 * 60 * 24,
      1000 * 60 * 60,
      1000 * 60,
      1000
    ];
  if (year >= 1) {
    let date1 = new Date(sortArr[0]),
      date2 = new Date(sortArr[sortArr.length - 1]),
      month1 = date1.getMonth(),
      month2 = date2.getMonth();
    if (month1 >= month2) {
      return [year, month1 - month2]
    }
    return [year - 1, 12 + month1 - month2]
  }
  for (let index = 0; index < remainder.length; index++) {
    const n = remainder[index],
      r = ms % n;
    if (!r) {
      difference[index] = ms / n;
      break;
    }
    difference[index] = Math.floor(ms / n);
    ms = r;
  }
  return difference;
}

// console.log(getTimeBetween(['2004-04-02 14:24:23.000Z','2020-10-08 15:23:24.000Z']))

/**
 * 判断是否为闰年
 * @param {Number} val 年份
 * @returns {Boolean} 返回今年或者指定年份是否为闰年 
 */
function isLeapYear(val) {
  let year = !!val ? val : new Date().getYear();
  // 普通闰年 4的倍数不是100的倍数 世纪闰年 400的倍数
  return (0 == year % 4 && year % 100 != 0) || year % 400 == 0;
}
// console.log(isLeapYear(2000));

/**
 * 获取当前月份天数(依赖isLeapYear方法)
 * @param {String} date 指定日期
 * @returns {Number} 返回当月天数
 */
function getDays(date) {
  let myDate = !!date ? new Date(date) : new Date(),
    year = myDate.getFullYear(),
    mouth = myDate.getMonth() + 1,
    days;
  if (mouth == 2) { //当月份为二月时，根据闰年还是非闰年判断天数
    days = isLeapYear(year) ? 29 : 28;
  } else if (mouth == 1 || mouth == 3 || mouth == 5 || mouth == 7 || mouth == 8 || mouth == 10 || mouth == 12) {
    //一三五七八十腊,三十一天永不差
    days = 31;
  } else {
    //其他月份三十天
    days = 30;
  }
  return days;
}
// console.log(getDays("2020-4"))

/**
 * 获取指定日期 格式化依赖format方法
 * @param {Number} index 天数
 * @param {Number} formatStr 格式化字符串 依赖format方法
 * @returns {String} 指定日期
 */
function getDate(index,formatStr){
  var date = new Date(); //当前日期
  var newDate = new Date();
  newDate.setDate(date.getDate() + index);//官方文档上虽然说setDate参数是1-31,其实是可以设置负数的
  return format(newDate,formatStr || "YYYY-MM-DD hh:mm:ss")
}

/**
 * 分钟转换字符串时间长度
 * @param {Number} val 分钟
 * @param {String} type 类型
 */
function getTimeStr(val,type) {
  if(!val){
    return "";
  }
  let str = "",
    hourNumber = 60 * 60,
    dayNumber = hourNumber * 24,
    monthNumber = dayNumber * 30,
    time = 0;
  switch (type) {
    case "ms":
      time = val / 1000;
      break;
    case "s":
      time = val;
      break;
    case "m":
      time = val * 60;
      break;
    default:
      console.log('时间类型错误');
      return "";
  }
  let month = time / monthNumber,
    day = time / dayNumber,
    hour = time / hourNumber,
    minute = time / 60,
    second = time;
  if (time > 0) {
    if (month >= 1) {
      month = Math.floor(month);
      day = Math.floor((time - month * monthNumber) / dayNumber);
      str = !!day ? `${month}个月${day}天` : `${month}个月` ;
    } else if (day >= 1) {
      day = Math.floor(day);
      hour = Math.floor((time - day * dayNumber) / hourNumber);
      str = !!hour ? `${day}天${hour}小时` : `${day}天` ;
    } else if (hour >= 1) {
      hour = Math.floor(hour);
      minute = Math.floor((time - hour * hourNumber) / 60);
      str = !!minute ? `${hour}小时${minute}分钟` : `${hour}小时` ;
    } else if (minute >= 1) {
      minute = Math.floor(minute);
      second = Math.floor(time - minute * 60);
      str = !!second ? `${minute}分钟${second}秒` : `${minute}分钟` ;
    } else {
      str = `${Math.floor(second)}秒`;
    }
    return str;
  }
  return "";
}

console.log(getTimeStr(12,"m"))

module.exports = {
  format,
  convertJson,
  convertToStamp,
  convertStamp,
  sortForDate,
  getCalcDate,
  getTimeBetween,
  isLeapYear,
  getDays,
  getDate,
  getTimeStr,
};