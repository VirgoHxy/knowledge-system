//电话
function phone(val) {
  if (val == null || val === "") {
    return false;
  }
  return (/^1[3|4|5|6|7|8|9][0-9]{9}$/.test(val));
}

//身份证
function identityCard(val) {
  if (val == null || val === "") {
    return false;
  }
  return (/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/.test(val));
}

//车牌
function plate(val) {
  if (val == null || val === "") {
    return false;
  }
  return (/^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))$/.test(val));
}

//汉字
function chWord(val) {
  if (val == null || val === "") {
    return false;
  }
  return (/[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/.test(val));
}

//数字
function isNumber(val) {
  if (val == null || val === "") {
    return false;
  }
  return typeof (val) === "number";
}

//整数
function integer(val) {
  if (val == null || val === "") {
    return false;
  }
  return (/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(val));
}

//正数
function positiveNum(val) {
  if (val == null || val === "") {
    return false;
  }
  return (/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(val));
}

//正整数
function positiveInteger(val) {
  if (val == null || val === "") {
    return false;
  }
  return (/^[+]{0,1}(\d+)$/.test(val));
}

//ip
function checkIP(val) {
  if (val == null || val === "") {
    return false;
  }
  return (/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/.test(val));
}

/**
 * 检测日期时间
 * @param {*} val 检测值
 * @param {Boolean} secondFlag 要不要检测秒 默认不检测秒
 */
function dateTime(val, secondFlag) {
  if (val == null || val === "") {
    return false;
  }
  if (!secondFlag) {
    return (/^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):[0-5]\d$/.test(val));
  }
  return (/^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/.test(val));
}

//日期
function date(val) {
  if (val == null || val === "") {
    return false;
  }
  return (/^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/.test(val));
}

//时间
function time(val) {
  if (val == null || val === "") {
    return false;
  }
  return (/^(20|21|22|23|[0-1]\d):[0-5]\d$/.test(val));
}

//非法字符替换
function illegalReplace(val) {
  if (val == null || val === "") {
    return false;
  }
  return val.replace(/[`~!@#$%^&*()_+<>?:"{},.\/;"[\]]/im, "");
}

//非法字符
function illegalStr(val) {
  if (val == null || val === "") {
    return false;
  }
  return (/[`~!@#$%^&*()_+<>?:"{},.\/;"[\]]/im.test(val));
}

//图片
function image(val) {
  if (val == null || val === "") {
    return false;
  }
  return (/(gif|jpg|jpeg|png|gif|jpg|png)$/.test(val));
}

//取出一个路径的文件名
function getFileName(val) {
  if (val == null || val === "") {
    return null
  }
  return val.match(/[^\\/]*$/)[0]
}

module.exports = {
  phone,
  identityCard,
  plate,
  chWord,
  positiveNum,
  positiveInteger,
  isNumber,
  integer,
  checkIP,
  dateTime,
  date,
  time,
  illegalStr,
  illegalReplace,
  image,
  getFileName
}