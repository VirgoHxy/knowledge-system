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

/**
 * 返回n到m的随机数 [n,m)
 * @param {Number} n 
 * @param {Number} m 
 */
function random(n, m) {
  return parseInt(Math.random() * (m - n) + n)
}

/**
 * 生成4位16进制数字
 */
function S4() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

/**
 * 生成唯一guid 依赖S4方法
 */
function guid() {
  return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

/**
 * 生成唯一16长度id 依赖S4方法
 */
function id16() {
  return (S4() + S4() + S4() + S4());
}

/**
 * 判断数字是否为奇数
 * @param {Number} num 数字
 */
function isOdd(num) {
  return Math.abs(num % 2) === 1;
}

module.exports = {
  accuracyObj,
  random,
  S4,
  guid,
  id16,
  isOdd
}