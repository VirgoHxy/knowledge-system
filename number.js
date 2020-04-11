// 常量
Number.MAX_VALUE //JS中最大的数字,约为 1.79e+308  1.79 x 10的308次幂
Number.MIN_VALUE //JS中最小的数字,约为 5e-324  5 x 10的-324次幂
Number.NaN //NaN,表示非数字值,与任意其他数字不等,也包括NaN本身。应使用Number.isNaN()来进行判断
Number.NEGATIVE_INFINITY //-Infinity,表示负无穷
Number.POSITIVE_INFINITY //Infinity,表示正无穷,进行计算的值大于Number.MAX_VALUE就返回Infinity
Number.EPSILON //表示js的最小精度,它表示1与大于1的最小浮点数之间的差,误差小于它即不存在误差

// 对象方法
/**
 * 是否是个Number类型的整数(字符串类型整数也为false)
 * @returns {Boolean}
 */
Number.isInteger(1) //true

/**
 * 是否是范围在-2^53到2^53的整数,超过这个范围,无法精确表示这个值
 * @returns {Boolean}
 */
Number.isSafeInteger(Math.pow(2, 53) + 1) //false

/**
 * 判断参数是否为NaN
 * @returns {Boolean}
 */
Number.isNaN(1 * 'qwe') //true

/**
 * 判断参数是否为正常的数值
 * @returns {Boolean}
 */
Number.isFinite(Infinity) //false

/**
 * 返回浮点数
 * @returns {Number}
 */
Number.parseFloat('1.2aaa') //1.2

/**
 * 返回整数
 * @returns {Number}
 */
Number.parseInt('1.2aaa') //1

// 实例方法

/**
 * 数字转换为指定小数位数字符串,位数超过四舍五入
 * @returns {String}
 */
console.log((1.2).toFixed(2)) //1.20
console.log((1.23).toFixed()) //1
console.log((1.237).toFixed(2)) //1.24
console.log(0.2 + 0.7); //0.8999999999999999
console.log((0.2 + 0.7).toFixed(2)); //0.90

/**
 * 使用指定的进制，将一个数字转换为字符串,默认十进制
 * @returns {String}
 */
x = 10;
console.log(x.toString()); //10
console.log(x.toString(2)); //1010
console.log(x.toString(8)); //12
console.log(x.toString(16)); //a

// 普通运算
Math.abs(-1) // 返回1的绝对值 1
Math.pow(2, 2) // 返回2的2次幂 4
Math.sqrt(9) // 返回9平方根 3
Math.cbrt(8) // 计算一个数的立方根 2
Math.hypot(3, 4) // 返回所有参数的平方和的平方根 5

// 取值
Math.ceil(1.2) // 向上取整 2
Math.floor(1.8) // 向下取整 1
Math.round(1.4) // 四舍五入 1
Math.random() // 随机返回 [0,1)
Math.trunc(-0.12) // 去除一个数的小数部分,返回整数部分,空值和无法截取整数的值返回NaN -0

// 返回最大/小值
Math.max(1, 2, 3) //返回最大值 3
Math.min(1, 2, 3) //返回最小值 1

// 判断
Math.sign(-0) //判断一个数到底是正数、负数、还是零 -0
Math.sign('aaa') //NaN
/* 
参数为正数，返回+1；
参数为负数，返回-1；
参数为 0，返回0；
参数为-0，返回-0;
其他值，返回NaN。 
*/

/**
 * 返回n到m的随机数 [n,m)
 * @param {Number} n 
 * @param {Number} m 
 */
function random(n, m) {
  return parseInt(Math.random() * (m - n) + n)
}
// console.log(random(1,100));

// 解决精度问题
var accuracyObj = {
  /**
   * 判断是否为一个整数
   * @param {Number} val 
   */
  isInteger(val) {
    return Math.floor(val) === val
  },
  /**
   * 将一个浮点数转成整数,返回整数和倍数 如3.14>>314,倍数是100
   * @param {Number} floatNum 小数
   * @return {Object}
   *   {times:100, num: 314}
   */
  toInteger(floatNum) {
    var obj = {
      times: 1,
      num: 0
    }
    if (this.isInteger(floatNum)) {
      obj.num = floatNum
      return obj
    }
    var strfi = floatNum + '',
      dotPos = strfi.indexOf('.'),
      len = strfi.substr(dotPos + 1).length,
      times = Math.pow(10, len),
      intNum = Number(floatNum.toString().replace('.', ''));
    obj.times = times
    obj.num = intNum
    return obj
  },
  /**
   * 核心方法，实现加减乘除运算，确保不丢失精度
   * 思路：把小数放大为整数（乘），进行算术运算，再缩小为小数（除）
   * @param a {number} 运算数1
   * @param b {number} 运算数2
   * @param digits {number} 精度，保留的小数点数，比如 2, 即保留为两位小数
   * @param op {string} 运算类型，有加减乘除（add/subtract/multiply/divide）
   *
   */
  operation(a, b, digits, op) {
    var o1 = this.toInteger(a),
      o2 = this.toInteger(b),
      n1 = o1.num,
      n2 = o2.num,
      t1 = o1.times,
      t2 = o2.times,
      max = t1 > t2 ? t1 : t2,
      result = null;
    switch (op) {
      case 'add':
        if (t1 === t2) { // 两个小数位数相同
          result = n1 + n2
        } else if (t1 > t2) { // o1 小数位 大于 o2
          result = n1 + n2 * (t1 / t2)
        } else { // o1 小数位 小于 o2
          result = n1 * (t2 / t1) + n2
        }
        return result / max
      case 'subtract':
        if (t1 === t2) {
          result = n1 - n2
        } else if (t1 > t2) {
          result = n1 - n2 * (t1 / t2)
        } else {
          result = n1 * (t2 / t1) - n2
        }
        return result / max
      case 'multiply':
        result = (n1 * n2) / (t1 * t2)
        return result
      case 'divide':
        result = (n1 / n2) * (t2 / t1)
        return result
    }
  },
  // 解决toFixed()精度问题,返回对象,四个方法add、subtract、multiply、divide
  add(a, b, digits) {
    return this.operation(a, b, digits, 'add')
  },
  subtract(a, b, digits) {
    return this.operation(a, b, digits, 'subtract')
  },
  multiply(a, b, digits) {
    return this.operation(a, b, digits, 'multiply')
  },
  divide(a, b, digits) {
    return this.operation(a, b, digits, 'divide')
  }
}
// console.log(accuracyObj.add(0.1,0.2))
// console.log(0.1+0.2)
// console.log(accuracyObj.multiply(35.41,100))
// console.log(35.41*100)