// 常量
Number.MAX_VALUE; //JS中最大的数字,约为 1.79e+308  1.79 x 10的308次幂
Number.MIN_VALUE; //JS中最小的数字,约为 5e-324  5 x 10的-324次幂
Number.NaN; //NaN,表示非数字值,与任意其他数字不等,也包括NaN本身。应使用Number.isNaN()来进行判断
Number.NEGATIVE_INFINITY; //-Infinity,表示负无穷
Number.POSITIVE_INFINITY; //Infinity,表示正无穷,进行计算的值大于Number.MAX_VALUE就返回Infinity
Number.EPSILON; //表示js的最小精度,它表示1与大于1的最小浮点数之间的差,误差小于它即不存在误差

// 对象方法
/**
 * 是否是个Number类型的整数(字符串类型整数也为false)
 * @returns {Boolean}
 */
console.log(Number.isInteger(1)); //true

/**
 * 是否是范围在-2^53到2^53的整数,超过这个范围,无法精确表示这个值
 * @returns {Boolean}
 */
console.log(Number.isSafeInteger(Math.pow(2, 53) + 1)); //false

/**
 * 判断参数是否为NaN
 * @returns {Boolean}
 */
console.log(Number.isNaN(1 * 'qwe')); //true

/**
 * 判断参数是否为正常的数值
 * @returns {Boolean}
 */
console.log(Number.isFinite(Infinity)); //false

/**
 * 返回浮点数
 * @returns {Number}
 */
console.log(Number.parseFloat('1.2aaa')); //1.2

/**
 * 返回整数
 * @returns {Number}
 */
console.log(Number.parseInt('1.2aaa')); //1

// 实例方法

/**
 * 数字转换为指定小数位数字符串,位数超过四舍五入
 * @returns {String}
 */
console.log((1.2).toFixed(2)); //1.20
console.log((1.23).toFixed()); //1
console.log((1.237).toFixed(2)); //1.24
console.log(0.2 + 0.7); //0.8999999999999999
console.log((0.2 + 0.7).toFixed(2)); //0.90

/**
 * 数字转换为指定位数
 * @returns {String}
 */
console.log((13.23).toPrecision(2)); //13

/**
 * 使用指定的进制2-36，将一个数字转换为字符串,默认十进制
 * @returns {String}
 */
let x = 10;
console.log(x.toString()); //10
console.log(x.toString(2)); //1010
console.log(x.toString(8)); //12
console.log(x.toString(16)); //a
console.log(x.toString(16)); //a
console.log(123456..toString(36)); //将长的数字标识转为短的 用于二维码

// 普通运算
console.log(Math.abs(-1)); // 返回1的绝对值 1
console.log(Math.pow(2, 4)); // 返回2的4次幂 16
console.log(Math.sqrt(9)); // 返回9平方根 3
console.log(Math.cbrt(8)); // 计算一个数的立方根 2
console.log(Math.hypot(3, 4)); // 返回所有参数的平方和的平方根 5

// 取值
console.log(Math.ceil(1.2)); // 向上(大)取整 2
console.log(Math.ceil(-1.2)); // 向上(大)取整 -1
console.log(Math.floor(1.8)); // 向下(小)取整 1
console.log(Math.floor(-1.8)); // 向下(小)取整 -2
console.log(Math.round(1.4)); // 四舍五入 1
console.log(Math.round(-1.4)); // 四舍五入 -1
console.log(Math.round(-1.7)); // 四舍五入 -2
console.log(Math.random()); // 随机返回 [0,1)
console.log(Math.trunc(-0.12)); // 去除一个数的小数部分,返回整数部分,空值和无法截取整数的值返回NaN -0

// 返回最大/小值
console.log(Math.max.apply(null, [1, 2, 3])); //返回数组最大值 3
console.log(Math.min.apply(null, [1, 2, 3])); //返回数组最小值 1
console.log(Math.max(1, 2, 3)); //返回最大值 3
console.log(Math.min(1, 2, 3)); //返回最小值 1

// 判断
console.log(Math.sign(-0)); //判断一个数到底是正数、负数、还是零 -0
console.log(Math.sign('aaa')); //NaN
/* 
参数为正数，返回+1；
参数为负数，返回-1；
参数为 0，返回0；
参数为-0，返回-0;
其他值，返回NaN。 
*/

// 最快交换数值
let a = 10;
let b = 20;
a ^= b, b ^= a, a ^= b;
console.log("a: " + a);
console.log("b: " + b);

// 位运算

console.log(parseInt(11).toString(2));// 十进制转二进制 1011
console.log(parseInt(1011, 2));// 二进制转十进制 11
// 从左到右 从低到高 从0开始 获取二进制某位的值0,1
console.log((11 >> 0) & 1);// 1
console.log((11 >> 1) & 1);// 1
console.log((11 >> 2) & 1);// 0
console.log((11 >> 3) & 1);// 1
// 设置二进制某位的值0,1 设置第三位(2)为1
console.log(11 ^ (11 & (1 << 2)) ^ (1 << 2));// 15

/**
 * 解决精度问题
 * 
 * @param {Number} x 第一个数字
 * @param {Number} y 第二个数字
 * @param {String} type 类型
 * @param {String} fixedLength fixed位数
 * 
 * @returns {Number}
 */
function fixed(x, y, type, fixedLength) {
  switch (type) {
    case "+":
      return parseFloat((x + y).toFixed(fixedLength || 10));
    case "-":
      return parseFloat((x - y).toFixed(fixedLength || 10));
    case "*":
      return parseFloat((x * y).toFixed(fixedLength || 10));
    case "/":
      return parseFloat((x / y).toFixed(fixedLength || 10));
    default:
      return "类型错误";
  }
}
console.log(0.1 + 0.2);
console.log(0.3540 - 0.0003);
console.log(fixed(0.1, 0.2, "+"));
console.log(fixed(0.3540, 0.0003, "-"));
console.log(35.41 * 100);
console.log(35.41 / 10);
console.log(fixed(35.41, 100, "*"));
console.log(fixed(35.41, 10, "/"));

/**
 * 返回n到m的随机数 [n,m)
 * 
 * @param {Number} n 
 * @param {Number} m 
 * 
 * @returns {Number}
 */
function random(n, m) {
  return parseInt(Math.random() * (m - n) + n);
}
console.log(random(1, 100));

/**
 * 返回几位随机数
 * 
 * @param {Number} n
 * 
 * @returns {String}
 */
function randomOfDigit(n) {
  return Math.random().toString().slice(-n);
}
console.log(randomOfDigit(0)); // 随机小数
console.log(randomOfDigit(6)); // 6位随机数

/**
 * 生成4位16进制数字
 * 
 * @returns {String}
 */
function S4() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}
/**
 * 生成唯一guid
 * 
 * @returns {String}
 */
function guid() {
  return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}
console.log(guid());

/**
 * 生成唯一16长度id
 * 
 * @returns {String}
 */
function id16() {
  return (S4() + S4() + S4() + S4());
}
console.log(id16());

/**
 * 判断数字是否为奇数
 * 
 * @param {Number} num 数字
 * 
 * @returns {Boolean}
 */
function isOdd(num) {
  return Math.abs(num % 2) === 1;
}
console.log(isOdd(1)); // true

/**
 * 数字左补零
 * 
 * @param {Number} num 数字
 * @param {Number} fill 补零后总长度
 * 
 * @returns {String}
 */
function padNumber(num, fill) {
  let len = ('' + num).length;
  return (Array(
    fill > len ? fill - len + 1 || 0 : 0
  ).join(0) + num);
}
console.log(padNumber(1234, 4));
console.log(padNumber(1, 4));
// 也可以使用string.prototype.padStart
console.log('1234'.padStart(4, '0'));
console.log('1'.padStart(4, '0'));
// 数字右补零
console.log('1234'.padEnd(4, '0'));
console.log('1'.padEnd(4, '0'));