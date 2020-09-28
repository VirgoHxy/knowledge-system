/**
 * 字符串去重
 * 
 * @param {String} val 字符串
 * 
 * @returns {String}
 */
function removeRepeat(val) {
  let res = [],
    arr = val.split("");
  for (var i = 0; i < arr.length; i++) {
    if (res.indexOf(arr[i]) == -1) {
      res.push(arr[i]);
    }
  }
  return res.join("");
}

/**
 * 字符串中子字符串的重复次数
 * 
 * @param {String} str 字符串
 * @param {String} val 某个字符或字符串
 * 
 * @returns {Number} 字符串次数
 */
function getRepeatNum(str, val) {
  return str.match(new RegExp(val, 'g')).length;
}

/**
 * 字符串中的子字符重复最多/少次数
 * 
 * @param {String} str 字符串
 * @param {Boolean} minFlag 默认为false true查找最少的 false查找最多的
 * 
 * @returns {Object | Array} 字符串次数和字符串,如果有同样多的,字符串则是个数组
 * {
 *    str,
 *    num
 * }
 */
function getMmRepeatNum(str, minFlag) {
  let str1 = str.split('').sort().join(''),
    arr = str1.match(/(\w)\1*/g),
    arrLen = arr.length;
  arr.sort((a, b) => {
    return b.length - a.length
  })
  let lengthArr = arr.map((val) => {
    return val.length;
  })
  if (!minFlag) {
    let lastLen = arr[arrLen - 1].length,
      firstIndex = lengthArr.indexOf(lastLen);
    if (firstIndex == arrLen - 1) {
      return {
        str: arr[arrLen - 1][0],
        num: lastLen
      }
    }
    return {
      str: arr.slice(firstIndex, arrLen).map((val) => {
        return val[0]
      }),
      num: lastLen
    }
  }
  let firstLen = arr[0].length,
    lastIndex = lengthArr.lastIndexOf(firstLen);
  if (lastIndex == 0) {
    return {
      str: arr[0][0],
      num: firstLen
    }
  }
  return {
    str: arr.slice(0, lastIndex + 1).map((val) => {
      return val[0]
    }),
    num: firstLen
  }
}

/**
 * 返回随机字符串
 * @param {Number} length 字符串长度
 * 
 */
function randomStr(length) {
  var ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  ALPHABET += 'abcdefghijklmnopqrstuvwxyz';
  ALPHABET += '0123456789-_';
  var str = '';
  for (var i = 0; i < length; ++i) {
    var rand = Math.floor(Math.random() * ALPHABET.length);
    str += ALPHABET.substring(rand, rand + 1);
  }
  return str;
}

/**
 * 获取大写字母数组
 * 
 */
function upperLetter() {
  var arr = [];
  for (var i = 65; i < 91; i++) {
    arr.push(String.fromCharCode(i));
  }
  return arr;
}

/**
 * 获取小写字母数组
 * 
 */
function lowerLetter() {
  var arr = [];
  for (var i = 97; i < 123; i++) {
    arr.push(String.fromCharCode(i));
  }
  return arr;
}

/**
 * 超过最大长度的将用三个字符代替
 * @param {String} str 字符串
 * @param {Number} [maxlength = 10] 字符串最大长度
 * @param {String} [character = .] 替换字符
 * 
 * @returns 长度13的字符串
 */
function truncate(str, maxlength = 10, character) {
  return (str.length > maxlength) ?
    str.slice(0, maxlength) + Array(3).fill(typeof character === "string" ? character : "." ).join("") : str;
}

/**
 * 通过字符串索引删除字符串
 * @param {String} str 字符串
 * @param {Number|Array} index 字符串索引或索引数组
 * 
 * @returns 字符串
 */
function deleteByIndex(str, index) {
  return str.split("").reduce((start, ele, i) => (index instanceof Array ? index.indexOf(i) == -1 ? start + ele : start : i != index ? start + ele : start), "")
}

/**
 * 删除最后一个指定字符
 * @param {String} str 源字符串
 * @param {String} delStr 删除字符串
 * 
 * @returns 字符串
 */
function deleteLastStr(str, delStr) {
  let index = str.lastIndexOf(delStr);
  return str.substring(0, index) + str.substring(index + 1, str.length);
}

module.exports = {
  removeRepeat,
  getRepeatNum,
  getMmRepeatNum,
  randomStr,
  upperLetter,
  lowerLetter,
  truncate,
  deleteByIndex,
  deleteLastStr
}