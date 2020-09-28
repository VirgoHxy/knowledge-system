// xx表示any str表示字符串
var xx, str;

// xx转换字符串
str = String(xx) //undefined

// 所在位字符
console.log(str.charAt(2)) //d

// ltr第一个字符所在位 没有为-1
console.log(str.indexOf('d')) //2

// 判断是否存在某字符 没有为-1
console.log(str.search("unde")) //0

// rtl第一个字符所在位 没有为-1
console.log(str.lastIndexOf('d')) //8

// 考虑底层自然语言的排序情况 0 两者相等 1 第一个大于第二个 -1 第一个小于第二个
console.log("undefined".localeCompare('undefined')) //0

// 是否包含子字符串 返回boolean
console.log(str.includes('un')) //true

// 截取字符串[1,4) 左闭右开
console.log(str.slice(1, 4)) //nde

// 字符串检索指定的值,返回数组
console.log(str.match(/d/g)) //['d',)'d']

// 重复字符串多少次
console.log(str.repeat(2)) //undefinedundefined

// 字符串分割成数组
console.log(str.split('')) //['u','n',)'d'...]
console.log(str.split('d')) //['un',)'efine','']
console.log(str.split('d', 1)) //)['un']

// 字符串拼接
console.log(str.concat("123", "456", "789")); //undefined123456789

// 大小写操作 全小写 全大写 首字母小写 首字母大写
console.log(str.toLowerCase()) //undefined
console.log(str.toUpperCase()) //UNDEFINED
console.log('HelloWorld'.replace('HelloWorld'[0], 'HelloWorld'[0].toLowerCase())) //helloWorld
console.log('helloWorld'.replace('helloWorld'[0], 'helloWorld'[0].toUpperCase())) //HelloWorld

// 空格去除操作 左右空格 左右空格 全部空格 左空格 右空格
console.log('  s  t  r  '.trim()) //s__t__r trim方法去除空格 制表符 换行符 回车符
console.log('  s  t  r  '.replace(/^\s+|\s+$/g, '')) //s__t__r
console.log('  s  t  r  '.replace(/\s+/g, '')) //str
console.log('  s  t  r  '.replace(/^(\s*)/g, '')) //s__t__r__
console.log('  s  t  r  '.replace(/(\s*)$/g, '')) //__s__t__r
console.log('  s  t  r  '.replace(/\b(\s*)\b/g, '')) //__str__

/**
 * 字符串去重
 * @param {String} val 字符串
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
console.log(removeRepeat("askdhg1231asdkjh123")) //askdhg123j

/**
 * 字符串中子字符串的重复次数
 * @param {String} str 字符串
 * @param {String} val 某个字符或字符串
 * @returns {Number} 字符串次数
 */
function getRepeatNum(str, val) {
  return str.match(new RegExp(val, 'g')).length;
}
console.log(getRepeatNum("askdhg1231asdkjh123", "as")) //2


/**
 * 字符串中的子字符重复最多/少次数
 * @param {String} str 字符串
 * @param {Boolean} minFlag 默认为false true查找最少的 false查找最多的
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
console.log(getMmRepeatNum("aaabbbccdd")) //{str:["c","d"],num:2}
console.log(getMmRepeatNum("aaabbbccdd", true)) //{str:["aaa","bbb"],num:3}
console.log(getMmRepeatNum("aaaabbbccd")) //{str:d,num:1}
console.log(getMmRepeatNum("aaaabbbccd", true)) //{str:a,num:4}

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
console.log(upperLetter())

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
console.log(lowerLetter())

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
    str.slice(0, maxlength) + Array(3).fill(typeof character === "string" ? character : ".").join("") : str;
}
console.log(truncate("abcdefghijklmnopqrstuvwxyz"))

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
console.log(deleteByIndex("12345", [1, 3]))

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
console.log(deleteLastStr("1231415", "1"))