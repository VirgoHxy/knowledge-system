/**
 * 是否为正确的电话号码
 * @param {String} val 字符串
 * @returns {Boolean} true 表示为正确
 */
function isPhone(val) {
  if (val == null || val === '') {
    return false;
  }
  return /^((13[0-9])|(14[5-9])|(15([0-3]|[5-9]))|(16[6-7])|(17[1-8])|(18[0-9])|(19[1|3])|(19[5|6])|(19[8|9]))\d{8}$/.test(
    val
  );
}

/**
 * 是否为正确的身份证
 * @param {String} val 字符串
 * @returns {Boolean} true 表示为正确
 */
function isIDCard(val) {
  if (val == null || val === '') {
    return false;
  }
  return /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/.test(
    val
  );
}

/**
 * 是否为正确的车牌
 * @param {String} val 字符串
 * @returns {Boolean} true 表示为正确
 */
function isPlate(val) {
  if (val == null || val === '') {
    return false;
  }
  return /^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))$/.test(
    val
  );
}

/**
 * 是否有汉字
 * @param {String} val 字符串
 * @returns {Boolean} true 表示为是
 */
function hasChinese(val) {
  if (val == null || val === '') {
    return false;
  }
  return /\p{sc=Han}/gu.test(val);
}

/**
 * 是否为数字
 * @param {String} val 字符串
 * @returns {Boolean} true 表示为是
 */
function isNumber(val) {
  if (val == null || val === '') {
    return false;
  }
  return /^[0-9]+\.[0-9]*$|^[0-9]+$/.test(val);
}

/**
 * 是否为整数
 * @param {String} val 字符串
 * @returns {Boolean} true 表示为是
 */
function isInt(val) {
  if (val == null || val === '') {
    return false;
  }
  return /^[-+]?(\d+)$|^[-+]?(\d+)(\.?[0]*)$/.test(val);
}

/**
 * 是否为正数
 * @param {String} val 字符串
 * @returns {Boolean} true 表示为是
 */
function isPositiveNum(val) {
  if (val == null || val === '' || val == 0) {
    return false;
  }
  return /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(val);
}

/**
 * 是否为正整数
 * @param {String} val 字符串
 * @returns {Boolean} true 表示为是
 */
function isPositiveInt(val) {
  if (val == null || val === '' || val == 0) {
    return false;
  }
  return /^[+]?(\d+)$|^[+]?(\d+)(\.?[0]*)$/.test(val);
}

/**
 * 是否为正确的ip
 * @param {String} val 字符串
 * @returns {Boolean} true 表示为正确
 */
function isIP(val) {
  if (val == null || val === '') {
    return false;
  }
  return /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/.test(
    val
  );
}

/**
 * 是否为正确的日期时间格式
 * @param {String} val 字符串
 * @returns {Boolean} true 表示为正确
 */
function isDateTime(val) {
  if (val == null || val === '') {
    return false;
  }
  return /^[1-9]\d{3}[-/](0[1-9]|1[0-2])[-/](0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):[0-5]\d(:[0-5]\d)?$/.test(
    val
  );
}

/**
 * 是否为正确的日期格式
 * @param {String} val 字符串
 * @returns {Boolean} true 表示为正确
 */
function isDate(val) {
  if (val == null || val === '') {
    return false;
  }
  return /^[1-9]\d{3}[-/](0[1-9]|1[0-2])[-/](0[1-9]|[1-2][0-9]|3[0-1])$/.test(val);
}

/**
 * 是否为正确的时间格式
 * @param {String} val 字符串
 * @returns {Boolean} true 表示为正确
 */
function isTime(val) {
  if (val == null || val === '') {
    return false;
  }
  return /^(20|21|22|23|[0-1]\d):[0-5]\d(:[0-5]\d)?$/.test(val);
}

/**
 * 替换非法字符
 * @param {String} val 字符串
 * @param {Array} [filterArray] 在非法数组中去除的字符
 * @returns {String} 替换后的字符串
 */
function replaceIllegalStr(val, filterArray) {
  if (val == null || val === '') {
    return '';
  }
  // prettier-ignore
  // eslint-disable-next-line
  let array = [
    // 英文
    '`','~','!','@','#','$','%','^','&','*','(',')','-','_','=','+','[','{',']','}','\\','|',';',':',"'",'"',',','<','.','>','/','?',
    // 中文
    '·','！','￥','…','（','）','—','【','】','、','；','：','‘','’','“','”','，','《','。','》','？',
  ];
  filterArray && (array = array.filter((item) => filterArray.indexOf(item) == -1));
  val = val.trim();
  val = val.replace(new RegExp(`[${array.join('\\')}]`, 'gim'), '');
  return val;
}

/**
 * 是否存在非法字符
 * @param {String} val 字符串
 * @param {Array} [filterArray] 在非法数组中去除的字符
 * @returns {Boolean} true 表示存在
 */
function isIllegal(val, filterArray) {
  if (val == null || val === '') {
    return false;
  }
  // prettier-ignore
  // eslint-disable-next-line
  let array = [
    // 英文
    '`','~','!','@','#','$','%','^','&','*','(',')','-','_','=','+','[','{',']','}','\\','|',';',':',"'",'"',',','<','.','>','/','?',
    // 中文
    '·','！','￥','…','（','）','—','【','】','、','；','：','‘','’','“','”','，','《','。','》','？',
  ];
  filterArray && (array = array.filter((item) => filterArray.indexOf(item) == -1));
  if (/\s+/g.test(val)) {
    return true;
  } else if (new RegExp(`[${array.join('\\')}]`, 'gim').test(val)) {
    return true;
  } else {
    return false;
  }
}

/**
 * 判断后缀是否为图片
 * @param {String} val 字符串
 * @returns {Boolean} true 表示为图片
 */
function isImage(val) {
  if (val == null || val === '') {
    return false;
  }
  return /(gif|jpg|jpeg|png|gif|jpg|png)$/.test(val);
}

/**
 * 取出一个路径的文件名
 * @param {String} val 字符串
 * @returns {String | null} 文件名
 */
function getFileName(val) {
  if (val == null || val === '') {
    return null;
  }
  return val.match(/[^\\/]*$/)[0];
}

/**
 * 取出一个路径的目录和文件名
 * @param {String} val 字符串
 * @returns {Array | null} 返回一个数组，数组第一位是目录，第二位是文件名
 */
function getFolderAndFileName(val) {
  if (val == null || val === '') {
    return null;
  }
  let match = val.match(/^(.+[\\/])([^\\/]+)$/);
  if (!match) {
    return null;
  }
  let dir = match[1],
    fileName = match[2];
  if (match[2].includes('.') && match[2].includes('.', 1)) {
    return [dir, fileName];
  }
  let slash = dir.indexOf('\\') != -1 ? '\\' : '/';
  return [`${dir}${fileName}${slash}`, ''];
}

module.exports = {
  isPhone,
  isIDCard,
  isPlate,
  hasChinese,
  isNumber,
  isInt,
  isPositiveNum,
  isPositiveInt,
  isIP,
  isDateTime,
  isDate,
  isTime,
  replaceIllegalStr,
  isIllegal,
  isImage,
  getFileName,
  getFolderAndFileName,
};
