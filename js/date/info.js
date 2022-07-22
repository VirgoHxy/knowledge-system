// Date extends Object;日期类继承对象类
let myDate = new Date('2022-02-18T07:23:40.405Z'); // 2022-02-18T07:23:40.405Z => 2022-02-18 15:23:40.405(为例)
new Date(24 * 3600 * 1000); // 2022-02-19T07:23:40.405Z 毫秒数增加24小时
new Date('1998/09/09 12:13:14'); // 1998-09-09T04:13:14.000Z 将字符串时间转换为Date;ios ie firefox仅支持xxxx/xx/xx日期
new Date(1998, 8, 9); // 1998-09-08T16:00:00.000Z  参数分别是year, monthIndex(注意是索引), [date = 1](不填默认为1), [hours = 0], [minutes = 0], [seconds = 0], [ms = 0]
+new Date(); // 1645169020405
new Date() - new Date('1998/09/09'); // 739899147854 日期加减 以毫秒数显示

/* es5 */

// 静态方法
Date.parse('1998/09/09'); // 905270400000 解析一个日期时间字符串,返回UTC(协调世界时)到该时间毫秒数
Date.now(); // 1645169020405 返回UTC(协调世界时)至今的毫秒数

// 原型方法
// 当地时区date日期方法 设置方法将get改为set
let arr = [
  // [ 2022, 1, 18, 5, 15, 23, 40, 405, 1645169020405 ]
  myDate.getFullYear(), // 获取完整的年份(4位,1970-????)
  myDate.getMonth(), // 获取当前月份(0-11,0代表1月)
  myDate.getDate(), // 获取当前日(1-31)
  myDate.getDay(), // 获取当前星期X(0-6,0代表星期天)
  myDate.getHours(), // 获取当前小时数(0-23)
  myDate.getMinutes(), // 获取当前分钟数(0-59)
  myDate.getSeconds(), // 获取当前秒数(0-59)
  myDate.getMilliseconds(), // 获取当前毫秒数(0-999)
  myDate.getTime(), // 获取当前时间(从1970.1.1开始的毫秒数)
];
// UTC+0时区
let utcArr = [
  // [ 2022, 1, 18, 5, 7, 23, 40, 405, 1645169020405 ]
  myDate.getUTCFullYear(), // 获取完整的年份(4位,1970-????)
  myDate.getUTCMonth(), // 获取当前月份index(0-11,0代表1月)
  myDate.getUTCDate(), // 获取当前日(1-31)
  myDate.getUTCDay(), // 获取当前星期X(0-6,0代表星期天)
  myDate.getUTCHours(), // 获取当前小时数(0-23)
  myDate.getUTCMinutes(), // 获取当前分钟数(0-59)
  myDate.getUTCSeconds(), // 获取当前秒数(0-59)
  myDate.getUTCMilliseconds(), // 获取当前毫秒数(0-999)
  myDate.getTime(), // 获取当前时间(从1970.1.1开始的毫秒数)
];

myDate.toJSON(); // 2022-02-18T07:23:40.405Z                          将Date对象转化字符串,并返回格式化为JSON数据
myDate.getTimezoneOffset(); // -480                                   返回时区偏移的分钟
myDate.valueOf(); // 1645169020405                                    返回UTC(协调世界时)到该时间毫秒数
myDate.toISOString(); // 2022-02-18T07:23:40.405Z                     返回ISO 8601时间字符串
myDate.toUTCString(); // Fri, 18 Feb 2022 07:23:40 GMT                返回UTC时区时间字符串
myDate.toString(); // Fri Feb 18 2022 15:23:40 GMT+0800 (中国标准时间) 返回日期对象的字符串
myDate.toDateString(); // Fri Feb 18 2022                             返回人类易读日期
myDate.toTimeString(); // 15:23:40 GMT+0800 (中国标准时间)             返回人类易读时间
myDate.toLocaleDateString(); // 2022/2/18                             返回当前地区日期
myDate.toLocaleTimeString(); // 下午3:23:40                           返回当前地区时间(am/pm)
myDate.toLocaleString(); // 2022/2/18 下午3:23:40                     返回当前地区日期与时间(am/pm)
