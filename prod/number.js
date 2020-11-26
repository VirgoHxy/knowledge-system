; (function (undefined) {
  "use strict"

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
        return "类型错误"
    }
  }

  /**
   * 返回n到m的随机数 [n,m)
   * 
   * @param {Number} n 
   * @param {Number} m 
   * 
   * @returns {Number}
   */
  function random(n, m) {
    return parseInt(Math.random() * (m - n) + n)
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
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
  }

  /**
   * 生成唯一16长度id
   * 
   * @returns {String}
   */
  function id16() {
    return (S4() + S4() + S4() + S4());
  }

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

  /**
   * 数字补零
   * 
   * @param {Number} num 数字
   * @param {Number} fill 补零后总长度
   * 
   * @returns {String}
   */
  function padNumber(num, fill) {
    var len = ('' + num).length;
    return (Array(
      fill > len ? fill - len + 1 || 0 : 0
    ).join(0) + num);
  }

  let global = (function () { return this || (0, eval)('this'); }());
  let JAFONumberMethod = {
    fixed,
    random,
    S4,
    guid,
    id16,
    isOdd,
    padNumber
  }

  // 最后将插件对象暴露给全局对象
  if (typeof module !== "undefined" && module.exports) {
    module.exports = JAFONumberMethod;
  } else if (typeof define === "function" && define.amd) {
    define(function () { return JAFONumberMethod; });
  } else {
    !('JAFONumberMethod' in global) && (global.JAFONumberMethod = JAFONumberMethod);
  }
}());