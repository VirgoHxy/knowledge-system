// String extends Function;String extends Object;字符串类继承方法类和对象类
new String('abc'); // String {"abc"} String基本包装类型 一般使用"abc",'abc',`abc`来表示字符串 可以调用String类原型中的方法 当我们使用字符串原型方法、属性时 其实默认会转成基本包装类型然后再销毁
let str = 'abc'; str.name = 'abc'; /* 这里生效了 */ console.log(str.name); // undefined 因为这里会创建一个新的实例 自然是没有name属性
String('abc'); // abc 返回字符串
new String('abc') instanceof String; // true
new String('abc') instanceof Object; // true
String('abc') instanceof String; // false 'abc'不是String的实例
// null undefined string number boolean 这些原始类型值是不会被改变的 `let str = 'abc';` 这个原始值'abc'和变量名称'str'就存储在内存中 在内存中的值'abc'本身是不能改变的 只能改变变量内存地址指向 存储格式: 内存地址,引用名称(变量名称)和值(原始值) 内存分为栈内存(操作系统会自动清理)和堆内存(回收机制清理) 栈内存存储局部变量(储存基础类型值,储存引用类型引用地址) 其他变量在堆内存存储
// let str = 'abc'; 'abc'这个值本身是不能改变的 其他原始类型值也是这样
/* // 例1
let str = 'abc';
str = str + 'd';
// str变成了'abcd' 这里改变变量内存地址 引用名称'str'指向新的内存地址 新的内存地址保存的值是'abcd'
*/

/* // 例2
let str = 'abc';
let str1 = 'abcd';
str = str1;
// str变成了'abcd' 这里就是引用名称'str'和'str1'都指向同一个内存地址 但是两个并不会互相影响
str = 'efg'
// str变成了'efg' 这里改变变量内存地址 引用名称'str'指向新的内存地址 新的内存地址保存的值是'efg'
*/

/* es5 */

// 静态方法
String.fromCharCode(97, 98, 99); // 'abc' 方法返回UTF-16整数编码值(0-65535)对应的字符串(可以接受多个编码值) 无效返回"—"

// 原型属性
'abc'.length; // 3 字符串的长度 使用UTF-16编码来表示字符 大部分常用字符 length和字符数表现一致 当一个字符需要用两个代码单元表示 length就会和字符数不一致 '𐀀'的length就是2
// 原型方法
'abc'.charAt(2); // 'c' 获取index位置上的字符 不存在返回空字符串 不支持负数
'abc'.charAt(3); // ''
'abc'.charAt(-1); // ''
'abc'[0]; // 'a' 一般字符串可以使用str[index]方法来获取字符 不存在返回undefined 不支持负数 length和索引都是可读 不可修改值
'abc'[3]; // undefined
'abc'[-1]; // undefined

'abc'.charCodeAt(0); // 97 方法返回字符串index位置上的UTF-16整数编码值(0-65535) 超出index返回NaN
'abc'.charCodeAt(3); // NaN
'abc'.charCodeAt(-1); // NaN

'abc'.indexOf('a'); // 0 方法返回一个给定的字符串在当前字符串中第一次出现索引index(从左往右找)(区分大小写) 不在返回-1
'abcabc'.indexOf('a', 1); // 3 第二个参数为开始索引index 默认为0 如果为负数等同于0
'abc'.indexOf('a', -1); // 0
'abc'.indexOf('a', 10); // -1
'abcabc'.indexOf('bc'); // 1
'abc'.indexOf(''); // 0 当给定一个空字符串 开始索引小于当前字符串长度 返回索引 反之返回当前字符串长度
'abc'.indexOf('', 1); // 1
'abc'.indexOf('', 10); // 3

'abcabc'.lastIndexOf('a'); // 3 方法返回一个给定的字符串在当前字符串中最后一次出现的索引lastIndex(从右往左找)(区分大小写) 不在返回-1
'abcabc'.lastIndexOf('a', 2); // 0 第二个参数为开始索引index 默认为+Infinity 如果为负数等同于0
'abcabc'.lastIndexOf('a', -1); // 0 相当于用indexOf
'abcabc'.lastIndexOf('bc'); // 4

new String('abc').valueOf(); // "abc" 返回String对象的原始值

''.concat('a', 'b', 'c'); // 'abc' 将一个或多个字符串与原字符串连接合并 返回新的字符串
''.concat(...['a', 'b', 'c']); // 'abc'
''.concat({ a: 'a' }); // '[object Object]'
''.concat(['a', 'b', 'c']); // 'a,b,c'
''.concat(123); // '123'
''.concat(true); // 'true'
''.concat(null); // 'null'
''.concat(undefined); // 'undefined'
''.concat(); // ''
'a'+'b'+'c'; // 'abc' 一般字符串连接使用+运算
'0'+'1'+'2'; // '012' 字符串数字连接 注意数字进行+运算时 要把字符串转为数字

'<demo>'.slice(1, 5); // "demo" 方法提取某个字符串的一部分 并返回一个新的字符串(支持负数)
'<demo>'.slice(-5, -1); // "demo" startIndex为-5 endIndex为-1 左闭右开[startIndex, endIndex)
'<demo>'.slice(-5); // "demo>"" 省略endIndex 则到字符串末尾 
'<demo>'.slice(); // "<demo>" 相当于返回一个副本

'<demo>'.substring(1, 5); // "demo" 方法提取某个字符串的一部分 并返回一个新的字符串(不支持负数)
'<demo>'.substring(5, 1); // "demo" 如果startIndex大于endIndex 则互换index 等同于substring(1, 5) 左闭右开[startIndex, endIndex)
'<demo>'.substring(); // "<demo>" 相当于返回一个副本

'DEMO'.toLowerCase(); // "demo" 返回字符串值的小写形式 返回一个新的字符串
'demo'.toUpperCase(); // "DEMO" 返回字符串值的大写形式 返回一个新的字符串

Object.prototype.toString.call('abc'); // "[object String]" 返回指定对象的字符串形式 可以再用正则截取 获取对象类型

'  a  b  c  '.trim(); // a__b__c 去除字符串两端的空格 制表符 换行符 回车符

'a'.localeCompare('c'); // -1/-2 比较两个字符串的排序位置 负数表示当前字符串在给定字符串前面 正数反之 0表示位置相同 浏览器只规定返回负数,正数,0 并没有要求返回-1,+1,0
'c'.localeCompare('a'); // +1/+2
'a'.localeCompare('a'); // 0
'10'.localeCompare('2'); // -1 数字字符串并不会按数字大小排序
'10'.localeCompare('2', undefined, { numeric: true }); // 1 第二个参数表示语言或区域 undefined使用默认locales 第三个参数是options对象 numeric默认为false true让其按数字排序

/* es6+ */

// 静态方法
String.fromCodePoint(97, 98, 99); // 'abc' 方法返回Unicode整数编码值对应的字符串(可以接受多个编码值) 无效返回RangeError

// 原型方法
// "abc".at(-1); // c 获取index位置上的字符 如果为负数表示为lastIndex 不存在返回undefined(目前为实验方法 不推荐使用)

'abc'.codePointAt(0); // 97 方法返回字符串index位置上的Unicode整数编码值 没找到返回undefined
'\uD800\uDC00'.codePointAt(0); // 65536 这个表示就是'𐀀'
'abc'.codePointAt(-1); // undefined

'abc'.split('b'); // ["a", "c"] 用指定的分隔符字符串将一个字符串分割成子字符串数组
'abc'.split('b', 1); // ["a"] 第一个参数是分隔符 可以是字符串 第二个参数是限制数组的长度
'abc'.split(''); // ["a", "b", "c"] 为空字符串 则将每个字符分隔
'abc'.split(); // ["abc"] 为空 则返回包含整个字符串的数组
'abc,abc,ab'.split(['c', 'a']); // ["ab","b", "b"] 为空 数组会转换成c,a 所以等同于用字符串"c,a"来分割
'abc,abc;abc|abc?abc'.split(/[,;|]/); // ["abc", "abc", "abc", "abc?abc"] 正则分割
'abc'.split('').reverse().join(''); // "cba"

'<demo>'.match(/(?:<)(.+)(?:>)/i)[1]; // demo 方法返回一个字符串匹配正则表达式的结果
let regExpStringIterator = '<demo><demo1>'.matchAll(/(?:<)(.+?)(?:>)/g); // RegExpStringIterator 方法返回一个字符串匹配正则表达式的所有结果及分组捕获组的迭代器(必须使用g)
Array.from(regExpStringIterator); // [["<demo>", "demo"],["<demo1>", "demo1"]]

'abcabc'.replace('abcabc'[0], 'abcabc'[0].toUpperCase()); // Abcabc 用新的字符串(第二个参数)替换当前字符串的某段字符串(第一个参数) 返回新字符串
'abcabc'.replace(/a/, 'A'); // Abcabc 用新的字符串(第二个参数)替换当前字符串的正则(第一个参数)匹配到的第一个字符串 返回新字符串
'borderTop'.replace(/[A-Z]/, (match) => '-' + match.toLowerCase()); // "border-top" 第二个参数也可以使用函数 返回新字符串
'  s  t  r  '.replace(/^\s+|\s+$/g, ''); // s__t__r 类似于trim()
'  s  t  r  '.replace(/\s+/g, ''); // str
'  s  t  r  '.replace(/^(\s*)/g, ''); // s__t__r__ 类似于trimStart()
'  s  t  r  '.replace(/(\s*)$/g, ''); // __s__t__r 类似于trimEnd()
'  s  t  r  '.replace(/\b(\s*)\b/g, ''); // __str__

'abcabc'.replaceAll('a', 'A'); // "AbcAbc" 用新的字符串(第二个参数)替换当前字符串的所有某段字符串(第一个参数) 返回新字符串
'abcabc'.replaceAll(/a/g, 'A'); // "AbcAbc" 用新的字符串(第二个参数)替换当前字符串的正则(第一个参数)匹配到的所有字符串 返回新字符串(必须使用g)
'borderTopColor'.replaceAll(/[A-Z]/g, (match) => '-' + match.toLowerCase()); // "border-top-color" 第二个参数也可以使用函数 返回新字符串
'Abcabc'.search(/a/i); // 0 使用正则表达式在字符串执行搜索匹配 返回字符串所在位置索引
'Abcabc'.search('a'); // 3 如果参数不是正则 则会隐式转为正则

'abc'.padStart(10, 'foo'); // "foofoofabc" 使用指定字符串在左侧填充到指定长度 没有指定字符串 默认为" "
'100'.padStart(10); // "       100" 默认用空格
'abc'.padEnd(10, 'foo'); // "abcfoofoof" 使用指定字符串在右侧填充到指定长度 没有指定字符串 默认为" "
'abc'.padEnd(10); // "abc       " 默认用空格

'abc'.repeat(2); // "abcabc" 返回指定字符串连接在一起n次的新字符串
'abc'.repeat(0); // ""

'  a  b  c  '.trimStart(); // a__b__c__ 去除字符串左端的空格 制表符 换行符 回车符
'  a  b  c  '.trimEnd(); // __a__b__c 去除字符串右端的空格 制表符 换行符 回车符

'abcabc'.startsWith('b'); // false 判断当前字符串是否以另外一个给定的子字符串结尾(区分大小写) 是返回true
'abcabc'.startsWith('b', 1); // true 第二个参数为开始索引index 默认为0
'abcabc'.endsWith('a'); // false 判断当前字符串是否以另外一个给定的子字符串结尾(区分大小写) 是返回true
'abcabc'.endsWith('a', 1); // true 第二个参数为结束索引index 默认为当前字符串的长度

'abc'.includes('a'); // true 判断一个给定的字符串是否包含在当前字符串中(区分大小写) 是返回true
'abc'.includes('a', 1); // false 第二个参数为开始索引index 默认为0

/**
 * 字符串去重
 *
 * @param {String} val 字符串
 *
 * @returns {String}
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
 *
 * @param {String} str 字符串
 * @param {String} val 某个字符或字符串
 *
 * @returns {Number} 字符串次数
 */
function getRepeatNum(str, val) {
  return str == null || str === '' || val == null || val === ''
    ? 0
    : str.match(new RegExp(val, 'g')).length;
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
    return b.length - a.length;
  });
  let lengthArr = arr.map(val => {
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
      str: arr.slice(firstIndex, arrLen).map(val => {
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
    str: arr.slice(0, lastIndex + 1).map(val => {
      return val[0];
    }),
    num: firstLen,
  };
}

/**
 * 返回随机字符串
 *
 * @param {Number} length 字符串长度
 *
 * @returns {String}
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
 *
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
 *
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
 *
 * @param {String} str 字符串
 * @param {Number} [maxlength = 10] 字符串最大长度
 * @param {String} [character = .] 替换字符
 *
 * @returns 长度-的字符串
 */
function truncate(str, maxlength = 10, character = '.') {
  return (str ? str.length : 0) > maxlength
    ? str.slice(0, maxlength) + Array(3).fill(character).join('')
    : str;
}

/**
 * 通过字符串索引删除字符串
 *
 * @param {String} str 字符串
 * @param {Number|Array} index 字符串索引或索引数组
 *
 * @returns 字符串
 */
function deleteByIndex(str, index) {
  return str
    .split('')
    .reduce(
      (start, ele, i) =>
        index instanceof Array
          ? index.indexOf(i) == -1
            ? start + ele
            : start
          : i != index
          ? start + ele
          : start,
      ''
    );
}

/**
 * 删除最后一个指定字符
 *
 * @param {String} str 源字符串
 * @param {String} delStr 删除字符串
 *
 * @returns 字符串
 */
function deleteLastStr(str, delStr) {
  let index = str.lastIndexOf(delStr);
  return str.substring(0, index) + str.substring(index + 1, str.length);
}

/**
 * encrypto 加密程序
 *
 * @param {Strng} str 待加密字符串
 * @param {Number} xor 异或值
 * @param {Number} hex 加密后的进制数
 *
 * @return {Strng} 加密后的字符串
 */
function encrypto(str, xor = 1998, hex = 16) {
  if (
    typeof str !== 'string' ||
    typeof xor !== 'number' ||
    typeof hex !== 'number'
  ) {
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
 *
 * @param {Strng} str 待解密字符串
 * @param {Number} xor 异或值
 * @param {Number} hex 加密后的进制数
 *
 * @return {Strng} 解密后的字符串
 */
function decrypto(str, xor = 1998, hex = 16) {
  if (
    typeof str !== 'string' ||
    typeof xor !== 'number' ||
    typeof hex !== 'number'
  ) {
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


console.log(removeRepeat('askdhg1231asdkjh123')); //askdhg123j

console.log(getRepeatNum('askdhg1231asdkjh123', 'as')); //2

console.log(getMmRepeatNum('aaabbbccdd')); //{str:["c","d"],num:2}
console.log(getMmRepeatNum('aaabbbccdd', true)); //{str:["aaa","bbb"],num:3}
console.log(getMmRepeatNum('aaaabbbccd')); //{str:d,num:1}
console.log(getMmRepeatNum('aaaabbbccd', true)); //{str:a,num:4}

console.log(randomStr(10));

console.log(upperLetter());

console.log(lowerLetter());

console.log(truncate('abcdefghijklmnopqrstuvwxyz')); //abcdefghij...

console.log(deleteByIndex('12345', [1, 3])); //135

console.log(deleteLastStr('1231415', '1')); //123145

console.log(encrypto('123', 123, 25)); //2oz2nz2m

console.log(decrypto(encrypto('123', 123, 25), 123, 25)); //123