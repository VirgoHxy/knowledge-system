const utils = require('./utils')

// xx表示any str表示字符串
var xx, str;

// xx转换字符串
str = String(xx) //undefined

// 所在位字符
str.charAt(2) //d

// ltr第一个字符所在位 没有为-1
str.indexOf('d') //2

// 判断是否存在某字符 没有为-1
str.search("unde");
0

// rtl第一个字符所在位 没有为-1
str.lastIndexOf('d') //8

// 是否包含子字符串 返回boolean
str.includes('un') //true

// 截取字符串[1,4) 左闭右开
str.substring(1, 4) //nde

// 字符串检索指定的值,返回数组
str.match(/d/g); //['d','d']

// 重复字符串多少次
str.repeat(2); //undefinedundefined

// 字符串分割成数组
str.split('') //['u','n','d'...]
str.split('d') //['un','efine','']

// 字符串拼接
str.concat("123" + "456" + "789"); //undefined123456789

// 大小写操作 全小写 全大写 首字母小写 首字母大写
str.toLowerCase() //undefined
str.toUpperCase() //UNDEFINED
'HelloWorld'.replace('HelloWorld' [0], 'HelloWorld' [0].toLowerCase()) //helloWorld
'helloWorld'.replace('helloWorld' [0], 'helloWorld' [0].toUpperCase()) //HelloWorld

// 空格去除操作 左右空格 左右空格 全部空格 左空格 右空格
' s t r '.trim() //s_t_r
' s t r '.replace(/^\s+|\s+$/g, '') //s_t_r
' s t r '.replace(/\s+/g, '') //str
' s t r '.replace(/^\s/, '') //s_t_r_
' s t r '.replace(/(\s$)/g, '') //_s_t_r

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
removeRepeat("askdhg1231asdkjh123") //askdhg123j

/**
 * 字符串中的重复次数
 * @param {String} str 字符串
 * @param {String} val 某个字符或字符串
 * @returns {Number} 字符串次数
 */
function getRepeatNum(str, val) {
  return str.match(new RegExp(val, 'g')).length;
}
getRepeatNum("askdhg1231asdkjh123", "as") //2

/**
 * 字符串中的字符重复最多/少次数
 * @param {String} str 字符串
 * @param {Boolean} minFlag 默认为false true查找最少的 false查找最多的
 * @returns {Object} 字符串次数和字符串,如果有同样多的,字符串则是个数组
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
      str: arr.slice(firstIndex, arrLen).map((val)=>{
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
    str: arr.slice(0, lastIndex+1).map((val)=>{
      return val[0]
    }),
    num: firstLen
  }
}
getMmRepeatNum("aaabbbccdd")  //{str:["c","d"],num:2}
getMmRepeatNum("aaabbbccdd",true)  //{str:["aaa","bbb"],num:3}
getMmRepeatNum("aaaabbbccd")  //{str:d,num:1}
getMmRepeatNum("aaaabbbccd",true)  //{str:a,num:4}