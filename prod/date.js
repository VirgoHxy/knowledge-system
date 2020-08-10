/**
 * 格式化时间
 * @param {Date | String | Number} value 时间值
 * @param {String} formatStr 格式化字符串 YYYY-MM-DD hh:mm:ss
 * @returns {String} 返回字符串时间
 */
function format(value, formatStr) {
  let myDate = typeof value === "object" ? value : new Date(value);
  if (isNaN(myDate.getTime())) { return "请输入正确的日期"; }
  let str = formatStr || "YYYY-MM-DD hh:mm:ss",
    week = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
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
  str = str.replace(/yy|YY/, year > 9 ? year : "0" + year);
  //月份，小于10补零
  str = str.replace(/MM/, (month + 1) > 9 ? month + 1 : "0" + (month + 1));
  //月份，不补零
  str = str.replace(/M/, month + 1);
  //日期，小于10补零
  str = str.replace(/dd|DD/, date > 9 ? date : "0" + date);
  //日期，不补零
  str = str.replace(/d|D/, date);
  //小时，小于10补零
  str = str.replace(/hh|HH/, hour > 9 ? hour : "0" + hour);
  //小时，不补零
  str = str.replace(/h|H/, hour);
  //分钟，小于10补零
  str = str.replace(/mm/, minute > 9 ? minute : "0" + minute);
  //分钟，不补零
  str = str.replace(/m/, minute);
  //秒钟，小于10补零
  str = str.replace(/ss|SS/, second > 9 ? second : "0" + second);
  //秒钟，不补零
  str = str.replace(/s|S/, second);
  //星期几
  str = str.replace(/w|W/g, week[day]);
  //毫秒，小于9或99补零
  str = str.replace(/MS/, mSecond > 9 ? mSecond > 99 ? mSecond : "0" + mSecond : "00" + mSecond);
  //毫秒，不补零
  str = str.replace(/ms/, mSecond);
  return str;
}

/**
 * json时间转换成时间 格式化时间调用format方法
 * @param {String} value json时间值 /Date(1335205592410-0500)/
 * @param {String} formatStr 格式化字符串 例如:YYYY-MM-DD hh:mm:ss(依赖format方法)
 * @returns 当value为空返回字符串提醒,当formatStr为空返回date,不为空返回字符串时间
 */
function convertJson(value, formatStr) {
  let myDate = new Date();
  myDate.setTime(String(value).replace(/\/Date\((\d+)\)\//gi, "$1")); //value通过截取字符串只取数字。
  if (isNaN(myDate.getTime())) { return "请输入正确的json日期"; }
  if (formatStr) { return format(myDate, formatStr); }
  return myDate
};

/**
 * 时间转换成时间戳 
 * @param {Date | String | Number} value 时间值
 * @param {string} type 类型 默认ms 毫秒ms | 秒s
 * @returns {Number} 返回毫秒/秒类型时间戳
 */
function convertToStamp(value, type) {
  let myDate = typeof value === "object" ? value : new Date(value),
    time = myDate.getTime();
  if (isNaN(time)) { return "请输入正确的日期"; }
  if (type === "s") { return Math.round(time / 1000); }
  return time;
};

/**
 * 时间戳转换成时间
 * @param {Number} value 时间戳
 * @param {String} type 类型 默认ms 毫秒ms | 秒s
 * @param {String} formatStr 格式化字符串 例如:YYYY-MM-DD hh:mm:ss(依赖format方法)
 * @returns {String} 当value为空返回字符串提示,当formatStr为空返回date,不为空返回字符串时间 
 */
function convertStamp(value, type, formatStr) {
  let myDate = new Date(type == null || type === "ms" ? value : value * 1000),
    time = myDate.getTime();
  if (isNaN(time)) { return "请输入正确的时间戳"; }
  if (formatStr) { return format(myDate, formatStr); }
  return myDate;
};

/**
 * 按时间顺序排序数组
 * @param {Array} array 时间数组
 * @param {Boolean} isAsc 是否升序 true升序 新日期在前 false降序 旧日期在前 默认false
 * @param {String} key 排序数组元素为对象时的key值
 * @returns {Array} 排序后的数组
 */
function sortDate(array, isAsc, key) {
  if (!(array instanceof Array) || array.length === 0) {
    return [];
  }
  let ele = key == null ? array[0] : array[0][key];
  let flag = 1;// flag为二进制数据 第一位表示是否为普通 第二位表示是否有key 第三位表示是否为json格式
  flag = parseInt((
    Number(String(ele).indexOf("Date") !== -1).toString() +
    Number(key != null).toString() +
    Number(String(ele).indexOf("Date") === -1).toString()), 2);
  array.sort((a, b) => {
    let left = a,
      right = b;
    switch (flag) {
      case 1:// 无key普通 001
        left = new Date(a).getTime();
        right = new Date(b).getTime();
        break;
      case 3:// 有key普通 011
        left = new Date(a[key]).getTime();
        right = new Date(b[key]).getTime();
        break;
      case 4:// 无keyjson 100
        left = Number(String(a).replace(/\/Date\((\d+)\)\//gi, "$1"));
        right = Number(String(b).replace(/\/Date\((\d+)\)\//gi, "$1"));
        break;
      case 6:// 有keyjson 110
        left = Number(String(a[key]).replace(/\/Date\((\d+)\)\//gi, "$1"));
        right = Number(String(b[key]).replace(/\/Date\((\d+)\)\//gi, "$1"));
        break;
      default:
        console.log("flag类型错误")
        break;
    }
    if (!isAsc) {
      return left > right ? 1 : -1; // 新日期在前
    }
    return right > left ? 1 : -1; // 旧日期在前
  });
  return array
}

/**
 * 当前时间/给定时间增加/减去多长时间
 * @param {Date | String | Number} value 时间值
 * @param {Array | Object} opt 增加的对象或者是对象数组
 * @param {Number} opt.value 计算数值 正值表示加 负值表示减
 * @param {String} opt.type 时间类型 毫秒ms | 秒s | 分m | 时h | 天d | 月mm | 年y
 * @param {String} formatStr 格式化字符串 例如:YYYY-MM-DD hh:mm:ss(依赖format方法)
 * @returns {Date | String} 当date为空返回字符串提示,当formatStr为空返回date,不为空返回字符串时间 
 */
function getCalcDate(value, opt, formatStr) {
  let myDate = typeof value === "object" ? value : new Date(value),
    time = myDate.getTime();
  if (isNaN(time)) { return "请输入正确的日期"; }
  if (opt == null || typeof opt !== "object") { return "参数错误"; }
  let set = function (data) {
    let { value, type } = data;
    switch (type) {
      case "ms":
        myDate.setMilliseconds(myDate.getMilliseconds() + value);
        break;
      case "s":
        myDate.setSeconds(myDate.getSeconds() + value);
        break;
      case "m":
        myDate.setMinutes(myDate.getMinutes() + value);
        break;
      case "h":
        myDate.setHours(myDate.getHours() + value);
        break;
      case "d":
        myDate.setDate(myDate.getDate() + value);
        break;
      case "mm":
        myDate.setMonth(myDate.getMonth() + value);
        break;
      case "y":
        myDate.setFullYear(myDate.getFullYear() + value);
        break;
      default:
        console.log("参数类型错误")
        break;
    }
  }
  if (!(opt instanceof Array)) {
    set(opt);
  } else {
    opt.forEach(element => {
      set(element);
    });
  }
  if (!!formatStr) { return format(myDate, formatStr); }
  return myDate;
};

/**
 * 求两个时间的差
 * @param {Array} arr 时间数组
 * @returns {Array} 返回时间差数组 返回[日,时,分,秒] 年月误差较严重无返回
 */
function getDateDiff(arr) {
  let sortArr = sortDate(arr),
    minuteNumber = 60,
    hourNumber = 60 * 60,
    dayNumber = hourNumber * 24,
    time = Math.abs(Date.parse(sortArr[0]) - Date.parse(sortArr[sortArr.length - 1])) / 1000,
    difference = new Array(4).fill(0);
  let array = [
    dayNumber,
    hourNumber,
    minuteNumber,
    1
  ];
  for (let index = 0; index < array.length; index++) {
    if (index === array.length - 1) {
      difference[index] = Math.floor(time / array[index]);
      break
    }
    const element = array[index],
      value = Math.floor(time / element);
    if (value >= 1) {
      difference[index] = value;
      time = (time - value * element);
    }
  }
  return difference;
}

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

/**
 * 获取当前月份天数(依赖isLeapYear方法)
 * @param {Date | String | Number} value 时间值
 * @returns {Number} 返回当月天数
 */
function getDays(value) {
  let myDate = typeof value === "object" ? value : new Date(value),
    year = myDate.getFullYear(),
    mouth = myDate.getMonth() + 1,
    days;
  if (mouth == 2) {
    //当月份为二月时，根据闰年还是非闰年判断天数
    days = isLeapYear(year) ? 29 : 28;
  } else if ([1, 3, 5, 7, 8, 10, 12].indexOf(mouth) !== -1) {
    //一三五七八十腊,三十一天永不差
    days = 31;
  } else {
    //其他月份三十天
    days = 30;
  }
  return days;
}

/**
 * 获取从当前日期指定天数的日期 也可以使用getCalcDate方法 格式化依赖format方法
 * @param {Number} index 天数
 * @param {String} formatStr 格式化字符串 依赖format方法
 * @returns {String} 指定日期
 */
function getMyDate(index, formatStr) {
  let date = new Date(); //当前日期
  let newDate = new Date();
  newDate.setDate(date.getDate() + index);//官方文档上虽然说setDate参数是1-31,其实是可以设置负数的
  return format(newDate, formatStr || "YYYY-MM-DD hh:mm:ss")
}

/**
 * 时间数值转换字符串时间长度
 * @param {Number} val 时间数值
 * @param {String} type 类型 ms毫秒 s秒 m分 h时
 */
function getDateStr(val, type) {
  if (!val) { return ""; }
  let str = "",
    minuteNumber = 60,
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
      time = val * minuteNumber;
      break;
    case "h":
      time = val * hourNumber;
      break;
    default:
      console.log("时间类型错误");
      return "";
  }
  if (time <= 0) { return ""; }
  let array = [
    {
      text: "个月",
      value: time / monthNumber,
      number: monthNumber
    },
    {
      text: "天",
      value: time / dayNumber,
      number: dayNumber
    },
    {
      text: "小时",
      value: time / hourNumber,
      number: hourNumber
    },
    {
      text: "分钟",
      value: time / minuteNumber,
      number: minuteNumber
    },
    {
      text: "秒",
      value: time,
      number: 1
    }
  ];
  for (let index = 0; index < array.length; index++) {
    if (index === array.length - 1) {
      str = `${Math.floor(time)}${array[index].text}`;
      break;
    }
    const element = array[index],
      nextElement = array[index + 1]
    if (element.value >= 1) {
      let value1 = Math.floor(element.value),
        value2 = Math.floor((time - value1 * element.number) / nextElement.number);
      str = `${value1}${element.text}${!!value2 ? value2 + nextElement.text : ""}`;
      break;
    }
  }
  return str;
}

module.exports = {
  format,
  convertJson,
  convertToStamp,
  convertStamp,
  sortDate,
  getCalcDate,
  getDateDiff,
  isLeapYear,
  getDays,
  getMyDate,
  getDateStr,
};