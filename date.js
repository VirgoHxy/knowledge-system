let myDate = new Date();
// milliseconds 现在增加24小时
console.log(new Date(24 * 3600 * 1000))
// str 将字符串时间转换为Date ios ie firefox仅支持xxxx/xx/xx日期
console.log(new Date("1998/09/09 12:13:14"))
// year, month, date, hours, minutes, seconds, ms 
console.log(new Date(1998, 8, 9))
// 日期差值 以毫秒数显示
console.log(+new Date())
console.log(new Date() - new Date("1998/09/09"))
// date日期方法 设置方法将get改为set
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
Date.now()   // 1596619591585 返回UTC(协调世界时)至今的毫秒数

// 实例方法
myDate.toJSON()   // 2020-08-05T09:25:38.559Z 将Date对象转化字符串,并格式化为JSON数据 
myDate.valueOf()  // 1596619591585 返回UTC(协调世界时)到该时间毫秒数


/**
 * 获取合规时间字符串
 * 
 * @param {Date | String | Number} value 时间字符串
 * 
 * @returns {Date} 返回时间对象
 */
function getRegularTime(value) {
  if(typeof value == "string"){
    var ms = value.match(/\.([\d]{1,})[Z]*/) ? value.match(/\.([\d]{1,})[Z]*/)[1] : 0;
    if (/T/g.test(value)) { // 去T
      value = value.replace(/T/g, " ");
    }
    if (/\./g.test(value)) { // 去毫秒 兼容ios ie firefox
      value = value.replace(/\.[\d]{1,}[Z]*/, "");
    }
    if (/-/g.test(value)) { // new Date兼容ios ie firefox
      value = value.replace(/-/g, "/");
    }
    var date = new Date(value);
    date.setMilliseconds(ms);
    return date;
  }
  return value;
}

/**
 * 格式化时间(依赖getRegularTime方法)
 * 
 * @param {Date | String | Number} value 时间值
 * @param {String} [formatStr = "YYYY-MM-DD hh:mm:ss"] 格式化规则
 * 
 * @returns {String} 返回字符串时间
 */
function format(value, formatStr) {
  let myDate = getRegularTime(value);
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
console.log(format(new Date(), "YYYY-MM-DD hh:mm:ss.MS W"))
console.log(format("2012/12/25 20:17:11.111", "YYYY-MM-DD hh:mm:ss.MS W"))

/**
 * json时间转换成时间 格式化时间调用format方法
 * 
 * @param {String} value json时间值
 * @param {String} [formatStr] 格式化规则 依赖format方法
 * 
 * @returns {Date | String} 当value为空返回字符串提示 当formatStr为空返回date 不为空返回字符串时间
 */
function convertJson(value, formatStr) {
  if (!value) { return "请输入json日期"; }
  let myDate = new Date();
  myDate.setTime(String(value).replace(/\/Date\((\d+)\)\//gi, "$1")); //value通过截取字符串只取数字。
  if (isNaN(myDate.getTime())) { return "请输入正确的json日期"; }
  if (formatStr) { return format(myDate, formatStr); }
  return myDate
};
console.log(convertJson(/Date(1278930470649)/))

/**
 * 时间转换成时间戳(依赖getRegularTime方法)
 * 
 * @param {Date | String} value 时间值
 * @param {Boolean} [sFlag = false] 类型 默认毫秒 false毫秒  true秒
 * 
 * @returns {Number} 返回毫秒/秒类型时间戳
 */
function convertToStamp(value, sFlag = false) {
  let myDate = getRegularTime(value),
    time = myDate.getTime();
  if (isNaN(time)) { return "请输入正确的日期"; }
  if (sFlag) { return Math.round(time / 1000); }
  return time;
};
console.log(convertToStamp(new Date()))

/**
 * 时间戳转换成时间
 * 
 * @param {Number} value 时间戳
 * @param {Boolean} [sFlag = false] 类型 默认毫秒 false毫秒  true秒
 * @param {String} [formatStr] 格式化规则 依赖format方法
 * 
 * @returns {Date | String} 当value为空返回字符串提示 当formatStr为空返回date 不为空返回字符串时间 
 */
function convertStamp(value, sFlag = false, formatStr) {
  let myDate = new Date(!sFlag ? value : value * 1000);
  if (isNaN(myDate.getTime())) { return "请输入正确的时间戳"; }
  if (formatStr) { return format(myDate, formatStr); }
  return myDate;
};
console.log(convertStamp(Date.now()))

/**
 * 按时间顺序排序数组
 * 
 * @param {Array} array 时间数组 支持字符串时间 时间戳 json时间
 * @param {Boolean} [isAsc = false] 是否升序 默认false true升序 新日期在前 false降序 旧日期在前
 * @param {String} [key] 排序数组元素为对象时的key值
 * 
 * @returns {Array} 排序后的数组
 */
function sortDate(array, isAsc = false, key) {
  if (!(array instanceof Array) || array.length === 0) {
    return [];
  }
  let arr = array.concat(),
    ele = key == null ? arr[0] : arr[0][key],
    // flag为二进制数据
    flag = parseInt((
      Number(String(ele).indexOf("Date") !== -1).toString() + // 是否为json格式
      Number(key != null).toString() + // 是否有key
      Number(String(ele).indexOf("Date") === -1).toString()) // 是否为普通 new Date()可转换
      , 2);
  arr.sort((a, b) => {
    let left = a,
      right = b;
    switch (flag) {
      case 1:// 无key普通 001
        left = new Date(/-/.test(a) ? a.replace(/-/g, "/") : a).getTime();
        right = new Date(/-/.test(b) ? b.replace(/-/g, "/") : b).getTime();
        break;
      case 3:// 有key普通 011
        left = new Date(/-/.test(a[key]) ? a[key].replace(/-/g, "/") : a[key]).getTime();
        right = new Date(/-/.test(b[key]) ? b[key].replace(/-/g, "/") : b[key]).getTime();
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
  return arr
}
console.log(sortDate([
  /Date(1594361486000)/,
  /Date(1594363486000)/,
  /Date(1594362486000)/
]))
console.log(sortDate([
  1594361486000,
  1594363486000,
  1594362486000
]))
console.log(sortDate([
  "3999-01-01 00:00:00",
  "3020-08-04 14:56:46",
  "3970-01-19 19:28:43"
]))

/**
 * 给定时间增加/减去多长时间(依赖getRegularTime方法)
 * 
 * @param {Date | String | Number} value 时间值
 * @param {Array | Object} opt 增加的对象或者是对象数组
 * @param {Number} opt.value 计算数值 正值表示加 负值表示减
 * @param {String} opt.type 时间类型 毫秒ms | 秒s | 分m | 时h | 天d | 月mm | 年y
 * @param {String} [formatStr] 格式化规则 依赖format方法
 * 
 * @returns {Date | String} 当value为空返回字符串提示 当formatStr为空返回date 不为空返回字符串时间 
 */
function getCalcDate(value, opt, formatStr) {
  let myDate = getRegularTime(value);
  if (isNaN(myDate.getTime())) { return "请输入正确的日期"; }
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
        console.log("opt.type类型错误")
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
console.log(getCalcDate(new Date(), {
  type: "ms",
  value: 10000
}))
console.log(getCalcDate(new Date(), [{
  type: "ms",
  value: 10000
}, {
  type: "h",
  value: 24
}]))

/**
 * 求两个/多个时间的最大最小之间的差(多个时间依赖sortDate排序方法)
 * 
 * @param {Array} array 时间数组
 * @param {String} type 类型(向上取整) date,hour,minute,second
 *
 * @returns {Array} 返回时间差数组 返回[日,时,分,秒] 年月误差较严重无返回 type为特定字符串返回单独数值
 */
function getDateDiff(array, type) {
  if (!(array instanceof Array) || array.length === 0) {
    return [];
  }
  let sortArr = array.length === 2 ? array.concat() : sortDate(array.concat()),
    time = Math.abs(Date.parse(sortArr[0]) - Date.parse(sortArr[sortArr.length - 1])) / 1000,
    difference = new Array(4).fill(0),
    numberArray = [
      60 * 60 * 24,
      60 * 60,
      60,
      1
    ];
  for (let index = 0; index < numberArray.length; index++) {
    if (index === numberArray.length - 1) {
      difference[index] = Math.floor(time / numberArray[index]);
      break
    }
    const element = numberArray[index],
      value = Math.floor(time / element);
    if (value >= 1) {
      difference[index] = value;
      time = (time - value * element);
    }
  }
  switch (type) {
    case "date":
      return difference[0] + ((difference[1] + ((difference[2] + difference[3] > 0 ? 1 : 0) > 0 ? 1 : 0)) > 0 ? 1 : 0);
    case "hour":
      return difference[1] + ((difference[2] + difference[3] > 0 ? 1 : 0) > 0 ? 1 : 0);
    case "minute":
      return difference[2] + (difference[3] > 0 ? 1 : 0);
    case "second":
      return difference[3];
    default:
      return difference;
  }
}
console.log(getDateDiff(["2020-06-02 14:24:23.000Z", "2020-08-08 15:23:24.000Z"]))
console.log(getDateDiff(["2020-06-02 14:24:23", "2020-06-04 15:25:24"]))
console.log(getDateDiff(["2020-06-02 14:24:23", "2020-06-04 15:25:24"],"date"))
console.log(getDateDiff(["2020-06-02 14:24:23", "2020-06-04 15:25:24"],"hour"))
console.log(getDateDiff(["2020-06-02 14:24:23", "2020-06-04 15:25:24"],"minute"))
console.log(getDateDiff(["2020-06-02 14:24:23", "2020-06-04 15:25:24"],"minute"))

/**
 * 判断是否为闰年
 * 
 * @param {Number} [val] 年份 默认今年
 * 
 * @returns {Boolean} 返回年份是否为闰年 
 */
function isLeapYear(val) {
  let year = !!val ? val : new Date().getYear();
  // 普通闰年 4的倍数不是100的倍数 世纪闰年 400的倍数
  return (0 == year % 4 && year % 100 != 0) || year % 400 == 0;
}
console.log(isLeapYear(2000));

/**
 * 获取当前月份天数(依赖isLeapYear,getRegularTime方法)
 * 
 * @param {Date | String | Number} value 时间值
 * 
 * @returns {Number} 当value为空返回字符串提示 不为空返回当月天数 
 */
function getDays(value) {
  let myDate = getRegularTime(value);
  if (isNaN(myDate.getTime())) { return "请输入正确的日期"; }
  let year = myDate.getFullYear(),
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
console.log(getDays("2020-4"))

/**
 * 获取从当前日期指定天数的字符串日期 也可以使用getCalcDate方法
 * 
 * @param {Number} index 天数 
 * @param {String} [formatStr] 格式化规则 依赖format方法
 * 
 * @returns {String} 指定日期字符串
 */
function getDesignDate(index, formatStr) {
  let date = new Date(); //当前日期
  let newDate = new Date();
  //官方文档上虽然说setDate参数是1-31,其实是可以设置负数的
  newDate.setDate(date.getDate() + (index != null ? index : 0));
  return formatStr!==undefined ? format(newDate, formatStr) : newDate;
}
console.log(getDesignDate(1,false))

/**
 * 获取从当前日期指定月数的字符串日期 也可以使用getCalcDate方法
 * 
 * @param {Number} index 月数 
 * @param {String} [formatStr] 格式化规则 依赖format方法
 * 
 * @returns {String} 指定日期字符串
 */
function getDesignMonth(index, formatStr) {
  let date = new Date(); //当前日期
  let newDate = new Date();
  newDate.setMonth(date.getMonth() + (index != null ? index : 0));
  return formatStr!==undefined ? format(newDate, formatStr) : newDate;
}
console.log(getDesignMonth(-1,false))

/**
 * 时间数值转换字符串时间长度
 * 
 * @param {Number} val 时间数值
 * @param {String} [type = "s"] 数值类型 默认s ms毫秒 s秒 m分 h时
 * 
 * @returns {String} 字符串时间长度 val为空返回空字符串
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
      time = val;
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
console.log(getDateStr(124, "m"))