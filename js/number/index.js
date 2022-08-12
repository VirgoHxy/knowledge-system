/**
 * 加减乘除运算(解决精度问题)
 * @param {number} x 第一个数字
 * @param {number} y 第二个数字
 * @param {String} type 类型
 * @param {String} fixedLength fixed位数
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
 * @param {number} left 数字
 * @param {number} right 数字
 * @returns {string}
 */
function isEqual(left, right) {
  return Math.abs(left - right) < Number.EPSILON;
}

/**
 * 返回n到m的随机小数 [n,m)
 * @param {number} n
 * @param {number} m
 * @returns {number}
 */
function randomOfBetween(n, m) {
  return (Math.random() * (m - n) + n).toFixed(2);
}

/**
 * 返回n到m的随机整数 [n,m)
 * @param {number} n
 * @param {number} m
 * @returns {number}
 */
function randomIntOfBetween(n, m) {
  return parseInt(Math.random() * (m - n) + n);
}

/**
 * 返回n位随机整数
 * @param {number} n
 * @returns {String}
 */
function randomInt(n) {
  if (n <= 0 || n > 16) {
    return null;
  }
  return Math.random().toString().slice(-n);
}

/**
 * 生成4位随机16进制数字
 * @returns {String}
 */
function random4OfHex() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

/**
 * 生成唯一guid
 * @returns {String}
 */
function guid() {
  return (
    random4OfHex() +
    random4OfHex() +
    '-' +
    random4OfHex() +
    '-' +
    random4OfHex() +
    '-' +
    random4OfHex() +
    '-' +
    random4OfHex() +
    random4OfHex() +
    random4OfHex()
  );
}

/**
 * 生成唯一16长度id
 * @returns {String}
 */
function id16() {
  return random4OfHex() + random4OfHex() + random4OfHex() + random4OfHex();
}

/**
 * 判断数字是否为奇数
 * @param {number} num 数字
 * @returns {Boolean}
 */
function isOdd(num) {
  return Math.abs(num % 2) === 1;
}

/**
 * 数字左补零
 * @param {number} num 数字
 * @param {number} fill 补零后总长度
 * @returns {String}
 */
function padNumber(num, fill) {
  let len = ('' + num).length;
  return Array(fill > len ? fill - len + 1 || 0 : 0).join(0) + num;
}

/**
 * 带小数的二进制转十进制
 * @param {Number} val
 * @returns
 */
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

module.exports = {
  fixed,
  isEqual,
  randomOfBetween,
  randomIntOfBetween,
  randomInt,
  random4OfHex,
  guid,
  id16,
  isOdd,
  padNumber,
  getDecimal2FloatValue,
};
