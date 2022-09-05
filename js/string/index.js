/**
 * 字符串去重
 * @param {string} val 字符串
 * @returns {string}
 */
function removeRepeat(val) {
  let res = [],
    arr = val.split('');
  for (let i = 0; i < arr.length; i++) {
    if (res.indexOf(arr[i]) == -1) {
      res.push(arr[i]);
    }
  }
  return res.join('');
}

/**
 * 字符串中子字符串的重复次数
 * @param {string} str 字符串
 * @param {string} val 某个字符或字符串
 * @returns {number} 字符串次数
 */
function getRepeatNum(str, val) {
  return str == null || str === '' || val == null || val === '' ? 0 : str.match(new RegExp(val, 'g')).length;
}

/**
 * 字符串中的子字符重复最多/少次数
 * @param {string} str 字符串
 * @param {Boolean} minFlag 默认为false true查找最少的 false查找最多的
 * @returns {Object | Array} 字符串次数和字符串,如果有同样多的,字符串则是个数组
 * {
 *    str,
 *    num
 * }
 */
function getMinMaxRepeatNum(str, minFlag) {
  let str1 = str.split('').sort().join(''),
    arr = str1.match(/(\w)\1*/g),
    arrLen = arr.length;
  arr.sort((a, b) => {
    return b.length - a.length;
  });
  let lengthArr = arr.map((val) => {
    return val.length;
  });
  if (!minFlag) {
    let lastLen = arr[arrLen - 1].length,
      firstIndex = lengthArr.indexOf(lastLen);
    if (firstIndex == arrLen - 1) {
      return {
        str: arr[arrLen - 1][0],
        num: lastLen,
      };
    }
    return {
      str: arr.slice(firstIndex, arrLen).map((val) => {
        return val[0];
      }),
      num: lastLen,
    };
  }
  let firstLen = arr[0].length,
    lastIndex = lengthArr.lastIndexOf(firstLen);
  if (lastIndex == 0) {
    return {
      str: arr[0][0],
      num: firstLen,
    };
  }
  return {
    str: arr.slice(0, lastIndex + 1).map((val) => {
      return val[0];
    }),
    num: firstLen,
  };
}

/**
 * 返回随机字符串
 * @param {number} length 字符串长度
 * @returns {string}
 */
function randomStr(length) {
  let ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  ALPHABET += 'abcdefghijklmnopqrstuvwxyz';
  ALPHABET += '0123456789-_';
  let str = '';
  for (let i = 0; i < length; ++i) {
    let rand = Math.floor(Math.random() * ALPHABET.length);
    str += ALPHABET.substring(rand, rand + 1);
  }
  return str;
}

/**
 * 获取大写字母数组
 * @returns {Array}
 */
function upperLetter() {
  let arr = [];
  for (let i = 65; i < 91; i++) {
    arr.push(String.fromCharCode(i));
  }
  return arr;
}

/**
 * 获取小写字母数组
 * @returns {Array}
 */
function lowerLetter() {
  let arr = [];
  for (let i = 97; i < 123; i++) {
    arr.push(String.fromCharCode(i));
  }
  return arr;
}

/**
 * 超过最大长度的将用三个字符代替
 * @param {string} str 字符串
 * @param {number} [maxlength = 10] 字符串最大长度
 * @param {string} [character = .] 替换字符
 * @returns 长度-的字符串
 */
function truncate(str, maxlength = 10, character = '.') {
  return (str ? str.length : 0) > maxlength ? str.slice(0, maxlength) + Array(3).fill(character).join('') : str;
}

/**
 * 通过字符串索引删除字符串
 * @param {string} str 字符串
 * @param {number | Array} index 字符串索引或索引数组
 * @returns 字符串
 */
function deleteByIndex(str, index) {
  return str
    .split('')
    .reduce(
      (start, ele, i) =>
        index instanceof Array ? (index.indexOf(i) == -1 ? start + ele : start) : i != index ? start + ele : start,
      ''
    );
}

/**
 * 删除最后一个指定字符
 * @param {string} str 源字符串
 * @param {string} delStr 删除字符串
 * @returns 字符串
 */
function deleteLastStr(str, delStr) {
  let index = str.lastIndexOf(delStr);
  return str.substring(0, index) + str.substring(index + 1, str.length);
}

/**
 * encrypto 加密程序
 * @param {Strng} str 待加密字符串
 * @param {number} xor 异或值
 * @param {number} hex 加密后的进制数
 *
 * @return {Strng} 加密后的字符串
 */
function encrypto(str, xor = 1998, hex = 16) {
  if (typeof str !== 'string' || typeof xor !== 'number' || typeof hex !== 'number') {
    return;
  }
  let resultList = [];
  hex = hex <= 25 ? hex : hex % 25;
  for (let i = 0; i < str.length; i++) {
    // 提取字符串每个字符的ascll码
    let charCode = str.charCodeAt(i);
    // 进行异或加密
    charCode = (charCode * 1) ^ xor;
    // 异或加密后的字符转成 hex 位数的字符串
    charCode = charCode.toString(hex);
    resultList.push(charCode);
  }
  let splitStr = String.fromCharCode(hex + 97);
  let resultStr = resultList.join(splitStr);
  return resultStr;
}

/**
 * decrypto 解密程序
 * @param {Strng} str 待解密字符串
 * @param {number} xor 异或值
 * @param {number} hex 加密后的进制数
 *
 * @return {Strng} 解密后的字符串
 */
function decrypto(str, xor = 1998, hex = 16) {
  if (typeof str !== 'string' || typeof xor !== 'number' || typeof hex !== 'number') {
    return;
  }
  let strCharList = [];
  let resultList = [];
  hex = hex <= 25 ? hex : hex % 25;
  // 解析出分割字符
  let splitStr = String.fromCharCode(hex + 97);
  // 分割出加密字符串的加密后的每个字符
  strCharList = str.split(splitStr);
  for (let i = 0; i < strCharList.length; i++) {
    // 将加密后的每个字符转成加密后的ascll码
    let charCode = parseInt(strCharList[i], hex);
    // 异或解密出原字符的ascll码
    charCode = (charCode * 1) ^ xor;
    let strChar = String.fromCharCode(charCode);
    resultList.push(strChar);
  }
  let resultStr = resultList.join('');
  return resultStr;
}

module.exports = {
  removeRepeat,
  getRepeatNum,
  getMinMaxRepeatNum,
  randomStr,
  upperLetter,
  lowerLetter,
  truncate,
  deleteByIndex,
  deleteLastStr,
  encrypto,
  decrypto,
};
