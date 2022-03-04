//电话
function phone(val) {
  if (val == null || val === '') {
    return false;
  }
  return (/^((13[0-9])|(14[5-9])|(15([0-3]|[5-9]))|(16[6-7])|(17[1-8])|(18[0-9])|(19[1|3])|(19[5|6])|(19[8|9]))\d{8}$/.test(val));
}
console.log(phone('17790462501'));// true
console.log(phone('1779046251'));// fasle
console.log(phone('177904625011'));// false

//身份证
function identityCard(val) {
  if (val == null || val === '') {
    return false;
  }
  return (/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/.test(val));
}
console.log(identityCard('420621199809192433'));// true
console.log(identityCard('4206211998091924332'));// fasle
console.log(identityCard('4206211998091924334'));// false

//车牌
function plate(val) {
  if (val == null || val === '') {
    return false;
  }
  return (/^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))$/.test(val));
}
console.log(plate('鄂J40199'));// true
console.log(plate('鄂J401992'));// true
console.log(plate('鄂J4019922'));// fasle
console.log(plate('鄂bJ40199'));// false

//汉字
function chWord(val) {
  if (val == null || val === '') {
    return false;
  }
  return (/[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/.test(val));
}
console.log(chWord('bJ40鄂199'));// true
console.log(chWord('bJ40199'));// false

//数字
function number(val) {
  if (val == null || val === '') {
    return false;
  }
  return (/^[0-9]+\.[0-9]*$|^[0-9]+$/.test(val));
}
console.log(number('40199'));// true
console.log(number('40199.023'));// true
console.log(number('40199.'));// true
console.log(number('40199..23'));// false

//整数
function integer(val) {
  if (val == null || val === '') {
    return false;
  }
  return (/^[-+]?(\d+)$|^[-+]?(\d+)(\.?[0]*)$/.test(val));
}
console.log(integer('+40199'));// true
console.log(integer('-40199.0'));// true
console.log(integer('40199.2'));// false

//正数
function positiveNum(val) {
  if (val == null || val === '' || val == 0) {
    return false;
  }
  return (/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(val));
}
console.log(positiveNum('+40199'));// true
console.log(positiveNum('-40199'));// false
console.log(positiveNum('0'));// false
console.log(positiveNum('0.2'));// true

//正整数
function positiveInteger(val) {
  if (val == null || val === '' || val == 0) {
    return false;
  }
  return (/^[+]?(\d+)$|^[+]?(\d+)(\.?[0]*)$/.test(val));
}
console.log(positiveInteger('40199'));// true
console.log(positiveInteger('1.0'));// true
console.log(positiveInteger('0'));// false
console.log(positiveInteger('0.2'));// false

// ip
function checkIP(val) {
  if (val == null || val === '') {
    return false;
  }
  return (/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/.test(val));
}
console.log(checkIP('192.168.1.253'));// true
console.log(checkIP('192.168.1.256'));// false
console.log(checkIP('192.168.256.253'));// false

// 日期时间格式 2019/12/02 12:32:02 2019-12-02 12:32
function dateTime(val) {
  if (val == null || val === '') {
    return false;
  }
  return (/^[1-9]\d{3}[-/](0[1-9]|1[0-2])[-/](0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):[0-5]\d(:[0-5]\d)?$/.test(val));
}
console.log(dateTime('2019/12/02 12:32:02'));// true
console.log(dateTime('2019-12-02 12:32'));// true
console.log(dateTime('19-12-02 12:32'));// false

//日期格式 2019-12-02 2019/12/02
function date(val) {
  if (val == null || val === '') {
    return false;
  }
  return (/^[1-9]\d{3}[-/](0[1-9]|1[0-2])[-/](0[1-9]|[1-2][0-9]|3[0-1])$/.test(val));
}
console.log(date('2019/12/02'));// true
console.log(date('2019-12-02 '));// false
console.log(date('19-12-02'));// false

//时间格式 08:22 08:22:13
function time(val) {
  if (val == null || val === '') {
    return false;
  }
  return (/^(20|21|22|23|[0-1]\d):[0-5]\d(:[0-5]\d)?$/.test(val));
}
console.log(time('08:22:13'));// true
console.log(time('08:22'));// true
console.log(time('8:22'));// false

/**
 * 替换非法字符
 * 
 * @param {String} val 字符串
 * @param {Array} exceptionsArray 数组中去除的字符 
 * 
 * @returns {String}
 */
function illegalReplace(val, exceptionsArray) {
  if (val == null || val === '') {
    return '';
  }
  let array = [
    // 英文
    '`',
    '~',
    '!',
    '@',
    '#',
    '$',
    '%',
    '^',
    '&',
    '*',
    '(',
    ')',
    '-',
    '_',
    '=',
    '+',
    '[',
    '{',
    ']',
    '}',
    '\\',
    '|',
    ';',
    ':',
    '\'',
    '"',
    ',',
    '<',
    '.',
    '>',
    '/',
    '?',
    // 中文
    '·',
    '！',
    '￥',
    '…',
    '（',
    '）',
    '—',
    '【',
    '】',
    '、',
    '；',
    '：',
    '‘',
    '’',
    '“',
    '”',
    '，',
    '《',
    '。',
    '》',
    '？'
  ];
  if (exceptionsArray) {
    array = array.filter(item => exceptionsArray.indexOf(item) == -1);
  }
  val = val.replace(/\s+/img, '');
  val = val.replace(new RegExp(`[${array.join('\\')}]`, 'img'), '');
  return val;
}
console.log(illegalReplace('abc 123 '));// abc123
console.log(illegalReplace('abc;123 '));// abc123
console.log(illegalReplace('abc；123 '));// abc123

/**
 * 是否存在非法字符
 * 
 * @param {String} val 字符串
 * @param {Array} exceptionsArray 数组中去除的字符 
 * 
 * @returns {Boolean}
 */
function illegalStr(val, exceptionsArray) {
  if (val == null || val === '') {
    return false;
  }
  let array = [
    // 英文
    '`',
    '~',
    '!',
    '@',
    '#',
    '$',
    '%',
    '^',
    '&',
    '*',
    '(',
    ')',
    '-',
    '_',
    '=',
    '+',
    '[',
    '{',
    ']',
    '}',
    '\\',
    '|',
    ';',
    ':',
    '\'',
    '"',
    ',',
    '<',
    '.',
    '>',
    '/',
    '?',
    // 中文
    '·',
    '！',
    '￥',
    '…',
    '（',
    '）',
    '—',
    '【',
    '】',
    '、',
    '；',
    '：',
    '‘',
    '’',
    '“',
    '”',
    '，',
    '《',
    '。',
    '》',
    '？'
  ];
  if (exceptionsArray) {
    array = array.filter(item => exceptionsArray.indexOf(item) == -1);
  }
  if (/\s+/g.test(val)) {
    return true;
  } else if (new RegExp(`[${array.join('\\')}]`, 'im').test(val)) {
    return true;
  } else {
    return false;
  }
}
console.log(illegalStr('abc 123 '));// true
console.log(illegalStr('abc;123 '));// true
console.log(illegalStr('abc；123 '));// true

//图片
function image(val) {
  if (val == null || val === '') {
    return false;
  }
  return (/(gif|jpg|jpeg|png|gif|jpg|png)$/.test(val));
}
console.log(image('213.png'));// true
console.log(image('213.txt'));// false

//取出一个路径的文件名
function getFileName(val) {
  if (val == null || val === '') {
    return null;
  }
  return val.match(/[^\\/]*$/)[0];
}
console.log(getFileName('D:/123.txt'));// 123.txt