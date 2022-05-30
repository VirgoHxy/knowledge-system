// Number extends Function;Number extends Object;数字类继承方法类和对象类  Math extends Object; Math不是构造函数 直接调用静态方法即可
new Number('123'); // Number {123} Number基本包装类型 可以调用Number类原型中的方法 当我们使用数字的原型方法、属性时 其实默认会转成基本包装类型然后再销毁
Number('123'); // 123 将参数返回数字 不是一个数字的返回NaN
Number('123a'); // NaN 与parseInt逻辑不同 parseInt返回123
new Number('123') instanceof Number; // true
new Number('123') instanceof Object; // true
Number('123') instanceof Number; // false 123不是Number的实例
// null undefined string number boolean 这些原始类型值是不会被改变的 `let str = 'abc';` 这个原始值'abc'和变量名称'str'就存储在内存中 在内存中的值'abc'本身是不能改变的 只能改变变量内存地址指向 存储格式: 内存地址,引用名称(变量名称)和值(原始值) 内存分为栈内存(操作系统会自动清理)和堆内存(回收机制清理) 栈内存存储局部变量(储存基础类型值,储存引用类型引用地址) 其他变量在堆内存存储
// let str = 'abc'; 'abc'这个值本身是不能改变的 其他原始类型值也是这样
/* // 例1
let str = 'abc';
str = str + 'd';
// str变成了'abcd' 这里改变变量内存地址指向 引用名称'str'指向新的内存地址 新的内存地址保存的值是'abcd'
*/

/* // 例2
let str = 'abc';
let str1 = 'abcd';
str = str1;
// str变成了'abcd' 这里就是引用名称'str'和'str1'都指向同一个内存地址 但是两个并不会互相影响
str = 'efg'
// str变成了'efg' 这里改变变量内存地址指向 引用名称'str'指向新的内存地址 新的内存地址保存的值是'efg'
*/

/* js中的四舍五入

四舍五入并不是我们所认为的四舍五入,而是银行家舍入法(四舍六入),以toFixed为例

舍去位 <  5时,直接舍去   1.254.toFixed(2) => 1.25
舍去位 >= 6时,舍去且进位 1.256.toFixed(2) => 1.26
舍去位 =  5时:
  舍去位后面非空且不为0时,舍去且进位 1.255001.toFixed(2) => 1.26
  舍去位后面空或者全为0时:
    舍去位的前一位 <  5,舍去且进位 1.205.toFixed(2) => 1.21
    舍去位的前一位 >= 5,直接舍去 1.255.toFixed(2) => 1.25

*/

/* es5 */

// 全局属性
Infinity; // 无穷大
NaN; // not a number

// 常量
Number.MAX_VALUE; // 1.79*10**308 约为1.79e+308  1.79 x 10的308次幂 JS中最大的数字
Number.MIN_VALUE; // 5*10**-324 约为5e-324  5 x 10的-324次幂 JS中最小的数字
Number.NaN; // NaN 表示非数字值,与任意其他数字不等,也包括NaN本身。应使用Number.isNaN()来进行判断
Number.NEGATIVE_INFINITY; // -Infinity 表示负无穷
Number.POSITIVE_INFINITY; // Infinity 表示正无穷,进行计算的值大于Number.MAX_VALUE就返回Infinity

// 全局对象Math的静态属性
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

// 全局对象Math的静态方法
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
/* 
在2**53以内双精度数和整数是一对一的 一对一表示安全不会精度缺失 所以-1就是在范围内最安全的整数 
53是因为二进制在存储时的第一位总是1所以不用储存 52+1
双精度浮点数64位 1位表示正负(0是正数) 11位表示阶数 52位表示尾数
单精度浮点数32位 1位表示正负 8位表示阶数 23位表示尾数
对于单精度型数据其规定偏置量为127(2**7-1) 而对于双精度来说 其规定的偏置量为1023(2**10-1) 偏置量中有一位表示正负
2**53 == 2**53 + 1 它们在存储时都是1.0000...0000(52个0) 所以超过2**53就不安全
*/

/*
为什么会存在精度误差,是因为大部分小数转换为2进制都是无限循环小数,只有0.5,0.25,0.0625等等
双精度数规定52位有效数字,所以有些位数就需要舍入,最后转换为十进制就会变成0.1+0.2 == 0.30000000000000004

转为二进制后相加
0.1 => '0.0001100110011001100110011001100110011001100110011001101'
0.2 => '0.001100110011001100110011001100110011001100110011001101'
0.3 => '0.010011001100110011001100110011001100110011001100110011'

 0.00011001100110011001100110011001100110011001100110011010
+0.00110011001100110011001100110011001100110011001100110100
-----------------------------------------------------------
=0.01001100110011001100110011001100110011001100110011001110

0.3转换为科学计数法
1.0011001100110011001100110011001100110011001100110011 * 2**-2
0.1+0.2转换为科学计数法
1.001100110011001100110011001100110011001100110011001110 * 2**-2
尾数保留52位有效数字 0就舍去,1就进位
1.0011001100110011001100110011001100110011001100110100 * 2**-2
数符(0),阶数(1023-2再转为2进制为1111111101,正数再在前面补个0),尾数(小数部分直接拿过来)就得到了0.1+0.2的规格化双精度数
0011111111010011001100110011001100110011001100110011001100110100

反规格化
1.0011001100110011001100110011001100110011001100110100 * 2**(1021-1023)
得到二进制
0.010011001100110011001100110011001100110011001100110100
二进制再转换为十进制数字
0.30000000000000004
*/
Number.MAX_SAFE_INTEGER; // (2**53 - 1) JS中最大的安全整数
Number.MIN_SAFE_INTEGER; // -(2**53 - 1) JS中最小的安全整数
Number.EPSILON; // 2**-52 表示js的最小精度,它表示1与大于1的最小浮点数之间的差,误差小于它即不存在误差

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

Number.parseInt(12.34); // 12 将字符串转化为整数 将全局方法移植到Number对象 与全局方法无差别 第二个参数为进制基数(必须能够使用Number转换为数字) 范围是2-36
Number.parseInt('1100', '2#'); // 1100 2#就无法转换成数字 就是默认的10进制
Number.parseInt('12.34'); // 12
Number.parseInt('1100', '2'); // 12

Number.parseFloat(123.45); // 123.45 将字符串转化为浮点数 将全局方法移植到Number对象 与全局方法无差别
Number.parseFloat(123); // 123
Number.parseFloat('123.45#'); // 123.45

// Math静态方法
Math.cbrt(8); // 2 计算一个数的立方根 polyfill用的是Math.pow(Math.abs(x), 1/3) 正负号最后在加上去
Math.cbrt('-8'); // -2
Math.cbrt('-1abc'); // NaN
Math.cbrt(null); // 0
Math.cbrt(''); // 0
Math.cbrt(undefined); // NaN

Math.hypot(3, 4); // 5 返回所有参数的平方和的平方根 直角三角形勾股定理

Math.trunc(-0.12); // -0 去除一个数的小数部分包括点,返回整数部分,undefined和无法使用Number转换为数字的值返回NaN
Math.trunc(0.9999999999); // 0
Math.trunc('12a'); // NaN
Math.trunc(null); // 0
Math.trunc(''); // 0
Math.trunc(undefined); // NaN

Math.clz32(1); // 31 返回一个数字在转换成32位无符号整形数字的二进制形式后 开头的0的个数
Math.clz32(8); // 28 00000000000000000000000000001000
Math.clz32(~8); // 0 数字取反就可以计算该数字开头1的个数
Math.clz32(~-9); // 28 11111111111111111111111111110111
Math.clz32('12a'); // 32
Math.clz32(null); // 32
Math.clz32(''); // 32
Math.clz32(undefined); // 32

Math.sign(-0); // -0 判断一个数到底是正数、负数、还是零,undefined和无法使用Number转换为数字的值返回NaN
Math.sign(0); // 0
Math.sign(123); // 1
Math.sign(-23); // -1
Math.sign('12a'); // NaN
Math.sign(null); // 0
Math.sign(''); // 0
Math.sign(undefined); // NaN
/* 
参数为正数，返回+1；
参数为负数，返回-1；
参数为 0，返回0；
参数为-0，返回-0;
其他值，返回NaN。 
*/

/* 进制运算 */
// 十进制转二进制
(13).toString(2); // 1011 十进制正整数转二进制
/* 被除数除以2 取余数作为二进制位 拿底数继续循环直到底数为0
2 13
2 6 1
2 3 0
2 1 1
2 0 1
结束循环 从下往上 => 1101
*/
(0.25).toString('2'); // 0.01 十进制小数转二进制
/* 小数部分乘2 取整数作为二进制位 舍弃掉整数继续循环直到小数为0
0.25 * 2 => 0.5 => 把0放到尾部 0
0.5 * 2 => 1.0 => 把1放到尾部 01
结束循环 把整数部分加上 => 0.01
*/
(-4).toString(2); // -100 十进制负整数转二进制 与正整数相同 最后把负号加上(但是这是js的处理方法 实际负数二进制是在其绝对值后的二进制取反再加1)
(13.25).toString(2); // 1011.01 十进制正整数以及小数转二进制 把正整数结果加上小数结果
(-13.25).toString(2); // -1011.01 十进制负整数以及小数转二进制 把负整数结果加上小数结果

// 二进制转十进制
parseInt(1011, 2); // 11 二进制转十进制
/* 从右往左,从2**0位开始直到所有位数完成计算
1 * 2**0 => 1
1 * 2**1 => 2
0 * 2**3 => 0
1 * 2**3 => 8
结束循环 把结果累加 => 11
*/
getDecimal2FloatValue(0.01); // 0.25 二进制小数转十进制
/* 小数部分取出 从左往右 从2**-1位开始直到所有位数完成计算
0 * 2**-1 => 0
1 * 2**-2 => 0.25
结束循环 把结果累加 => 0.25
*/
getDecimal2FloatValue(0.111); // 0.875 二进制转十进制
parseInt(-100, 2); // -4 二进制转十进制
getDecimal2FloatValue(1011.01); // 11.25 二进制转十进制
getDecimal2FloatValue(-1011.01); // -11.25 二进制转十进制
getDecimal2FloatValue(
  '0.010011001100110011001100110011001100110011001100110100'
); // 0.30000000000000004 二进制转十进制

// 位运算

/*
位运算都是操作的整数 小数会被忽略
位运算会将64位转为32位再运算 存储时再存储64位
*/

let a = 10;
let b = 21;
let c = 10.2;
let d = 21.1;
(a ^= b), (b ^= a), (a ^= b); // a为21 b为10 最快交换整数值 注意只能交换整数
(c = c + d), (d = c - d), (c = c - d); // c为21.1 b为10.2 普通交换数值

let e = 10;
let f = 21;
!!(e & 1); // false 判断是否为奇数 这个只能判断整数 按位与运算1 只会返回1或0 利用二进制的最后一位是1还是0来判断
!!(f & 1); // true 21是奇数

!!(e % 2); // false 判断是否为奇数 这个只能判断整数
!!(f % 2); // true

e = ~e + 1; // -10 转换数字符号 利用取反公式 但是0不会转换为-0
f = -f; // -21 0会转换为-0

isEquals(
  15 ^ 9,
  parseInt('1111', 2) ^ parseInt('1001', 2),
  parseInt('0110', 2),
  6
); // true都相等 按位异^运算 相同位返回0 不同为返回1
isEquals(
  15 & 9,
  parseInt('1111', 2) & parseInt('1001', 2),
  parseInt('1001', 2),
  9
); // true都相等 按位与&运算 相同位都为1返回1 反之返回0
isEquals(
  15 | 9,
  parseInt('1111', 2) | parseInt('1001', 2),
  parseInt('1111', 2),
  15
); // true都相等 按位或|运算 对应位有为1返回1 反之返回0

~-6 == 5; // true 取反 按位非~取反结果公式 ~x = -(x + 1) 将目标值转换符号再减1
~5 == -6; // true
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

9 << 2 == 36; // true 带符号向左移 左移两位 右空位补0 1001(9)向左移位2比特变为100100(36)
-9 << 2 == -36; // true -1001(9)向左移位2比特变为-100100(-36)

9 >> 2 == 2; // true 带符号向右移 左空位补0 1001(9)向右移位2比特变为10(2)
9 >> 4 == 0; // true 1001(9)向右移位4比特变为0(0)
9 >> 6 == 0; // true 1001(9)向右移位6比特变为0(0)
-9 >> 2 == -3;
/* true 负数二进制是正数二进制取反加1 负数二进制转换为十进制需要取反加1 再把负号加上
9 二进制 1001 补满 32位 -9的二进制是在9的二进制取反再加1
00000000000000000000000000001001
取反
11111111111111111111111111110110
加1 得到了-9的二进制
11111111111111111111111111110111
右移2位 执行 >> 2 左空位补1
11111111111111111111111111111101
取反 将负数转换为十进制先取反
00000000000000000000000000000010
加1
00000000000000000000000000000011
转换为十进制 再加上负号
1 * 2**0 + 1 * 2**1 = 3 => -3
*/

9 >>> 2 == 2; // true 无符号向右移 左空位补0 这样结果总是非负的 1001(9)向右移位2比特变为10(2)
9 >>> 4 == 0; // true 1001(9)向右移位4比特变为0(0)
9 >>> 6 == 0; // true 1001(9)向右移位4比特变为0(0)
-9 >>> 2 == 1073741821;
/* true
省略...
-9的二进制
11111111111111111111111111110111
右移2位 执行 >>> 2 左空位补0
00111111111111111111111111111101
转换为十进制
1 * 2**0 + 0 * 2**1 + 1 * 2**2 + ... + 1 * 2**28 + 1 * 2**29 = 1073741821
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

/**
 * 生成唯一16长度id
 *
 * @returns {String}
 */
function id16() {
  return S4() + S4() + S4() + S4();
}

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

console.log(0.1 + 0.2);
console.log(0.354 - 0.0003);
console.log(fixed(0.1, 0.2, '+'));
console.log(fixed(0.354, 0.0003, '-'));
console.log(35.41 * 100);
console.log(35.41 / 10);
console.log(fixed(35.41, 100, '*'));
console.log(fixed(35.41, 10, '/'));

console.log(0.1 + 0.2);
console.log(0.354 - 0.0003);
console.log(isEqual(0.1 + 0.2, 0.3));
console.log(isEqual(0.354 - 0.0003, 0.3537));
console.log(35.41 * 100);
console.log(35.41 / 10);
console.log(isEqual(35.41 * 100, 3541));
console.log(isEqual(35.41, 10, 3.541));

console.log(random(0.9, 2.1));

console.log(randomInt(1, 100));

console.log(randomOfDigit(0)); // 随机小数
console.log(randomOfDigit(6)); // 6位随机数
console.log(randomOfDigit(16)); // 16位随机数
console.log(randomOfDigit(20)); // 20位随机数 因为超过最大安全整数 所以为null

console.log(guid());

console.log(id16());

console.log(isOdd(1)); // true

console.log(padNumber(1234, 4));
console.log(padNumber(1, 4));
// 也可以使用string.prototype.padStart
console.log('1234'.padStart(4, '0'));
console.log('1'.padStart(4, '0'));
// 数字右补零
console.log('1234'.padEnd(4, '0'));
console.log('1'.padEnd(4, '0'));
