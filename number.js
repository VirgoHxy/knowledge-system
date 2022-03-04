// Number extends Function;Number extends Object;数字类继承方法类和对象类  Math extends Object; Math不是构造函数 直接调用静态方法即可
new Number('123'); // Number {123} Number基本包装类型 可以调用Number类原型中的方法 当我们使用数字的原型方法、属性时 其实默认会转成基本包装类型然后再销毁
Number('123'); // 123 将参数返回数字 不是一个数字的返回NaN
new Number('123') instanceof Number; // true
new Number('123') instanceof Object; // true
Number('123') instanceof Number; // false

/* js中的四舍五入

四舍五入并不是我们所认为的四舍五入,而是银行家舍入法(四舍六入),以toFixed为例

舍去位 <  5时,直接舍去   1.254.toFixed(2) => 1.25
舍去位 >= 6时,舍去且进位 1.256.toFixed(2) => 1.26
舍去位 =  5时:
  舍去位后面非空且不为0时,舍去且进位
  舍去位后面空或者全为0时:
    舍去位的前一位 <  5,舍去且进位 1.205.toFixed(2) => 1.21
    舍去位的前一位 >= 5,直接舍去 1.265.toFixed(2) => 1.26

*/

/* es5 */

// 常量
Number.MAX_VALUE; // 1.79*10**308 约为1.79e+308  1.79 x 10的308次幂 JS中最大的数字
Number.MIN_VALUE; // 5*10**-324 约为5e-324  5 x 10的-324次幂 JS中最小的数字
Number.NaN; // NaN 表示非数字值,与任意其他数字不等,也包括NaN本身。应使用Number.isNaN()来进行判断
Number.NEGATIVE_INFINITY; // -Infinity 表示负无穷
Number.POSITIVE_INFINITY; // Infinity 表示正无穷,进行计算的值大于Number.MAX_VALUE就返回Infinity

Math.E; // 约等于2.718 表示自然对数的底数(或称为基数)
Math.PI; // π约等于3.14159 表示一个圆的周长与直径的比例

// 原型方法

(1.2).toFixed(2); // '1.20' 将一个数字转换为指定小数位(0-20默认为0)的数字字符串(注意最后返回字符串)(会进行四舍五入)
(2).toFixed(2); // '2.00' 整数需要用括号括起来 因为2.被识别为小数 后面跟着方法 否则会判断语法错误
(2).toFixed(); // '2.00'
(1.23).toFixed(); // '1'
(1.237).toFixed(2); // '1.24'
(0.2 + 0.7).toFixed(2); // '0.90' 0.2 + 0.7因为精度缺失为0.8999999999999999
(-2.34).toFixed(1); // '-2.3' 返回字符串
-(2.34).toFixed(1); // -2.3 返回数字

(13.236).toPrecision(); // '13.236' 将一个数字转换为指定有效位数的数字字符串(注意最后返回字符串)(会进行四舍五入)
(13.236).toPrecision(2); // '13'
(13.236).toPrecision(3); // '13.2'
(13.236).toPrecision(4); // '13.24'
(2).toPrecision(5); // 2.0000

(10).toString(); // '10' 将一个数字转换为指定进制(2-36默认为10)的数字字符串(注意最后返回字符串)
-(10.2).toString(); // -10.2 返回数字
(10).toString(2); // 1010
(-10).toString(2); // -1010
(10).toString(8); // 12
(10).toString(16); // a
(-10).toString(16); // -a
(123456).toString(36); // 2n9c 将长的整数数字标识转为短的 用于二维码

new Number('123').valueOf(); // 123 返回Number对象包装的原始值

// Math静态方法
// 计算
Math.abs(-1); // 1 返回绝对值
Math.abs('-1'); // 1
Math.abs('-1abc'); // NaN
Math.abs(null); // 0
Math.abs(undefined); // NaN
Math.abs(); // NaN

Math.sqrt(9); // 3 计算一个数的平方根
Math.sqrt('-8'); // -2
Math.sqrt('-1abc'); // NaN
Math.sqrt(null); // 0
Math.sqrt(undefined); // NaN

Math.pow(2, 4); // 16 返回基数(base)的指数(exponent)次幂 即base^exponent 返回2的4次幂 也可以使用2**4

// 取值
Math.ceil(1.2); // 2 返回大于或等于一个给定数字的最小整数
Math.ceil(-1.2); // -1
Math.ceil(0.9); // 1
Math.ceil(0.00000000000001); // 1

Math.floor(0.6); // 0 返回小于或等于一个给定数字的最大整数
Math.floor(-0.9999999999999); // -1
Math.floor(-0.0000000000001); // -1
Math.floor(0.9999999999999); // 0

Math.round(1.4); // 1 函数返回一个数字四舍五入后最接近的整数
Math.round(1.49); // 1
Math.round(1.5); // 2
Math.round(-1.51); // -2
Math.round(-1.5); // -1

Math.random(); // 随机返回[0,1) 包括0 不包括1

Math.max.apply(null, [1, 2, 3]); // 3 返回数组最大值 es5写法
Math.min.apply(null, [1, 2, 3]); // 1 返回数组最小值 es5写法
Math.max(1, 2, 3); // 3 返回最大值
Math.min(1, 2, 3); // 1 返回最小值
Math.max(...[1, 2, 3]); // 3 返回最大值 es6写法
Math.min(...[1, 2, 3]); // 1 返回最小值 es6写法

/* es6+ */

// 常量
Number.MAX_SAFE_INTEGER; // (2**53 - 1) JS中最大的安全整数 双精度浮点数64位中有8位表示浮点数 1位表示正负号 53表示有效数字
Number.MIN_SAFE_INTEGER; // -(2**53 - 1) JS中最小的安全整数 双精度浮点数64位中有8位表示浮点数 1位表示正负号 53表示有效数字
Number.EPSILON; // 2^-52 表示js的最小精度,它表示1与大于1的最小浮点数之间的差,误差小于它即不存在误差

// 静态方法
Number.isFinite(Infinity); // false 判断是否为有穷数(首先要typeof value === 'number'再判断) polyfill用的是全局的isFinite方法
Number.isFinite(NaN); // false
Number.isFinite('10'); // false
Number.isFinite(true); // false
Number.isFinite(1); // true
Number.isFinite(1 / 3); // true

Number.isInteger(Infinity); // false 是否为整数(首先要typeof value === 'number'再判断) polyfill用的是全局的isInteger方法以及Math.floor方法
Number.isInteger(NaN); // false
Number.isInteger('10'); // false
Number.isInteger(true); // false
Number.isInteger(25.1); // false
Number.isInteger(-10); // true

Number.isSafeInteger(Math.pow(2, 53) - 1); // true 是否为安全整数 polyfill用的是Number.isInteger方法以及绝对值小于Number.MAX_SAFE_INTEGER
Number.isSafeInteger(-(Math.pow(2, 53) - 1)); // true 是否为安全整数

Number.isNaN(Infinity); // false 是否为NaN(首先要typeof value === 'number'再判断) polyfill用的是全局的isNaN方法
Number.isNaN('10'); // false
Number.isNaN(true); // false
Number.isNaN(NaN); // true
Number.isNaN(1 * 'qwe'); // true

Number.parseInt(12.34); // 12 将字符串转化为整数 将全局方法移植到Number对象 与全局方法无差别 第二个参数为进制基数(必须能够转换) 范围是2-36
Number.parseInt('12.34'); // 12
Number.parseInt('1100', '2'); // 12
Number.parseInt('1100', '2#'); // 1100

Number.parseFloat(123.45); // 123.45 将字符串转化为浮点数 将全局方法移植到Number对象 与全局方法无差别
Number.parseFloat(123); // 123
Number.parseFloat('123.45#'); // 123.45

// Math静态方法
// 计算
Math.cbrt(8); // 2 计算一个数的立方根 polyfill用的是Math.pow(Math.abs(x), 1/3) 正负号最后在加上去
Math.cbrt('-8'); // -2
Math.cbrt('-1abc'); // NaN
Math.cbrt(null); // 0
Math.cbrt(undefined); // NaN

Math.hypot(3, 4); // 5 返回所有参数的平方和的平方根 直角三角形勾股定理1

// 取值
Math.trunc(-0.12); // -0 去除一个数的小数部分包括点,返回整数部分,空值和无法截取整数的值返回NaN
Math.trunc(0.9999999999); // 0

// 二进制
Math.clz32(1); // 31 返回一个数字在转换成32位无符号整形数字的二进制形式后 开头的0的个数
Math.clz32(8); // 28 00000000000000000000000000001000
Math.clz32(~8); // 0 可以计算开头1的个数
Math.clz32(~-9); // 28 11111111111111111111111111110111

// 判断
Math.sign(-0); // -0 判断一个数到底是正数、负数、还是零
Math.sign(0); // 0
Math.sign(123); // 1
Math.sign(-23); // -1
Math.sign('aaa'); // NaN
/* 
参数为正数，返回+1；
参数为负数，返回-1；
参数为 0，返回0；
参数为-0，返回-0;
其他值，返回NaN。 
*/

/* 进制运算 */
// 十进制转二进制
parseInt(13).toString(2); // 1011 十进制正整数转二进制
/*
2 13
2 6 1
2 3 0
2 1 1
2 0 1
从下往上 => 1101
*/
(0.25).toString('2'); // 0.01 十进制小数转二进制
/*
小数部分乘2 取整数作为二进制位 舍弃掉整数继续循环直到没有小数位
(0.25).toString('2') = "0.01"
0.25 * 2 = 0.5 => 0.0
0.5 * 2 = 1.0 => 0.01
结束循环
*/
(-4).toString(2); // -100 十进制负整数转二进制 与正整数相同 最后把负号加上(但是这是js的处理方法 实际负数二进制是在其绝对值后的二进制取反再加1)
(13.25).toString(2); // 1011.01 十进制正整数以及小数转二进制 把正整数结果加上小数结果
(-13.25).toString(2); // -1011.01 十进制负整数以及小数转二进制 把负整数结果加上小数结果

// 二进制转十进制
parseInt(1011, 2); // 11 二进制转十进制
getDecimal2FloatValue(0.01); // 0.25 二进制转十进制
getDecimal2FloatValue(0.111); // 0.875 二进制转十进制
parseInt(-100, 2); // -4 二进制转十进制
getDecimal2FloatValue(1011.01); // 11.25 二进制转十进制
getDecimal2FloatValue(-1011.01); // -11.25 二进制转十进制

// 最快交换数值
let a = 10;
let b = 20;
(a ^= b), (b ^= a), (a ^= b); // a为20 b为10

// 位运算
isEquals(
  15 ^ 9,
  parseInt('1111', 2) ^ parseInt('1001', 2),
  parseInt('0110', 2),
  6
); // true都相等 ^运算 相同位返回0 不同为返回1
isEquals(
  15 & 9,
  parseInt('1111', 2) & parseInt('1001', 2),
  parseInt('1001', 2),
  9
); // true都相等 &运算 相同位都为1返回1 反之返回0
isEquals(
  15 | 9,
  parseInt('1111', 2) | parseInt('1001', 2),
  parseInt('1111', 2),
  15
); // true都相等 &运算 对应位有为1返回1 反之返回0
9 << 2 == 36; // true 向左移两位再在右位补0 1001(9)移位2比特向左变为100100(36)
-9 << 2 == -36; // true 向左移两位再在右位补0 -1001(9)移位2比特向左变为-100100(-36)
9 >> 2 == 2; // true 向右移两位 1001(9)移位2比特向左变为10(2)
-9 >> 2 == -3;
/* true 带符号向右移两位 -1001(9)移位2比特向左变为-11(-3)
9 二进制 1001 补满 32位 -9的二进制是在9的二进制取反再加1
00000000000000000000000000001001
取反
11111111111111111111111111110110
加1 得到了-9的二进制
11111111111111111111111111110111
右移2位 执行 >> 2
11111111111111111111111111111101
取反 将负数转换为十进制先取反
00000000000000000000000000000010
加1
00000000000000000000000000000011
转换为十进制 再加上负号
2**0*1 + 2**1*1 = 3 => -3
*/
9 >>> 2 == 2; // true 向右移两位多出的再在左位补0 -1001(9)移位2比特向左变为10(2)
9 >>> 4 == 0; // true 向右移两位多出的再在左位补0 -1001(9)移位4比特向左变为0(0)
~5 == -6; // true ~结果公式 ~x = -(x + 1)
/*
5 二进制 101 补满 32位
00000000000000000000000000000101
按位取反
11111111111111111111111111111010
由于32位开头第一个是1 所以这是一个负数 将二进制转换成负数 需要先反码
00000000000000000000000000000101
之后 再+1
00000000000000000000000000000110
转换成十进制为6 加上符号变成负数 -6
*/

// --START-- 测试所用方法
// 多个值是否相等
function isEquals() {
  let i, j;
  if (arguments.length < 2) {
    return '至少需要两个参数!';
  }
  for (i = 0; i < arguments.length; i++) {
    for (j = i + 1; j < arguments.length; j++) {
      let a = arguments[i];
      let b = arguments[j];
      //如果类型不同，返回false
      if (typeof a !== typeof b) {
        return false;
      } else {
        if (a !== b) {
          return false;
        }
      }
    }
  }
  return true;
}

// 二进制小数转十进制
function getDecimal2FloatValue(val) {
  let arr = val.toString().split('.');
  let number =
    Math.abs(Number.parseInt(arr[0], 2)) +
    arr[1]
      .split('')
      .map((ele, index) => {
        return Number(ele) * Math.pow(2, -(index + 1));
      })
      .reduce((start, ele) => start + ele);
  switch (Math.sign(Number(arr[0]))) {
    case 1:
      return number;
    case -1:
      return Number('-' + number);
    case 0:
      return number;
    case -0:
      return Number('-' + number);
    default:
      return '';
  }
}
// --END-- 测试所用方法

/**
 * 加减乘除运算(解决精度问题)
 *
 * @param {number} x 第一个数字
 * @param {number} y 第二个数字
 * @param {String} type 类型
 * @param {String} fixedLength fixed位数
 *
 * @returns {number}
 */
function fixed(x, y, type, fixedLength) {
  switch (type) {
    case '+':
      return parseFloat((x + y).toFixed(fixedLength || 10));
    case '-':
      return parseFloat((x - y).toFixed(fixedLength || 10));
    case '*':
      return parseFloat((x * y).toFixed(fixedLength || 10));
    case '/':
      return parseFloat((x / y).toFixed(fixedLength || 10));
    default:
      return '类型错误';
  }
}
console.log(0.1 + 0.2);
console.log(0.354 - 0.0003);
console.log(fixed(0.1, 0.2, '+'));
console.log(fixed(0.354, 0.0003, '-'));
console.log(35.41 * 100);
console.log(35.41 / 10);
console.log(fixed(35.41, 100, '*'));
console.log(fixed(35.41, 10, '/'));

/**
 * 是否相等(解决精度问题)
 *
 * @param {number} left 数字
 * @param {number} right 数字
 *
 * @returns {string}
 */
function isEqual(left, right) {
  return Math.abs(left - right) < Number.EPSILON;
}
console.log(0.1 + 0.2);
console.log(0.354 - 0.0003);
console.log(isEqual(0.1 + 0.2, 0.3));
console.log(isEqual(0.354 - 0.0003, 0.3537));
console.log(35.41 * 100);
console.log(35.41 / 10);
console.log(isEqual(35.41 * 100, 3541));
console.log(isEqual(35.41, 10, 3.541));

/**
 * 返回n到m的随机小数 [n,m)
 *
 * @param {number} n
 * @param {number} m
 *
 * @returns {number}
 */
function random(n, m) {
  return (Math.random() * (m - n) + n).toFixed(2);
}
console.log(random(0.9, 2.1));

/**
 * 返回n到m的随机整数 [n,m)
 *
 * @param {number} n
 * @param {number} m
 *
 * @returns {number}
 */
function randomInt(n, m) {
  return parseInt(Math.random() * (m - n) + n);
}
console.log(randomInt(1, 100));

/**
 * 返回n位随机整数
 *
 * @param {number} n
 *
 * @returns {String}
 */
function randomOfDigit(n) {
  if (n <= 0 || n > 16) {
    return null;
  }
  return Math.random().toString().slice(-n);
}
console.log(randomOfDigit(0)); // 随机小数
console.log(randomOfDigit(6)); // 6位随机数
console.log(randomOfDigit(16)); // 16位随机数
console.log(randomOfDigit(20)); // 20位随机数 因为超过最大安全整数 所以为null

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
  return (
    S4() +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    S4() +
    S4()
  );
}
console.log(guid());

/**
 * 生成唯一16长度id
 *
 * @returns {String}
 */
function id16() {
  return S4() + S4() + S4() + S4();
}
console.log(id16());

/**
 * 判断数字是否为奇数
 *
 * @param {number} num 数字
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
 * @param {number} num 数字
 * @param {number} fill 补零后总长度
 *
 * @returns {String}
 */
function padNumber(num, fill) {
  let len = ('' + num).length;
  return Array(fill > len ? fill - len + 1 || 0 : 0).join(0) + num;
}
console.log(padNumber(1234, 4));
console.log(padNumber(1, 4));
// 也可以使用string.prototype.padStart
console.log('1234'.padStart(4, '0'));
console.log('1'.padStart(4, '0'));
// 数字右补零
console.log('1234'.padEnd(4, '0'));
console.log('1'.padEnd(4, '0'));
