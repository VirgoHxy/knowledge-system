const utils = require('./utils') 

// 数组按时间字符串大小排序
let arr = [{
    time: '2019-10-21T12:00:00.000Z'
  },
  {
    time: '2019-10-02T12:00:00.000Z'
  },
  {
    time: '2019-10-31T12:00:00.000Z'
  }
]
arr.sort((a, b) => {
  return new Date(Date.parse(String(b.time))) > new Date(Date.parse(String(a.time))) ? 1 : -1; //大的在前
  // return new Date(Date.parse(String(a.time)))>new Date(Date.parse(String(b.time))) ? 1 : -1; //小的在前
});

/**
 * date转换字符串时间
 * @param {String|Date} date date对象或者字符串时间
 * @param {String} formatStr 正则字符串 YYYY-DD-MM hh:mm:ss 默认为YYYY-MM-DD hh:mm
 * @return {String} 返回string类型时间
 */
function format(date, formatStr) { //格式化时间
  if (typeof date=='string') {
    date = new Date(Date.parse(date));
  }
  var str = !!formatStr ? formatStr : 'YYYY-MM-DD hh:mm';
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
};

/**
 * 将jsondate转换为字符串date或者date
 * @param {String} value jsondate
 * @param {String} formatStr 正则字符串(依赖format方法) YYYY-DD-MM hh:mm:scopedSlots
 * @return {null|String|Date} 当value为空返回null,当formatStr为空返回date,不为空返回string 
 */
function JsonToDate(value, formatStr) { //转换json时间
  let date =  new Date();
  if (value == null || value == "") {
    return null;
  }
  date.setTime(value.replace(/\/Date\((\d+)\)\//gi, '$1')); //value通过截取字符串只取数字。
  if (!!formatStr) {
    return format(date, formatStr);
  }
  return date
};