; (function (undefined) {
  "use strict"

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
    return (/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/.test(val));
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
  function number(val) {
    if (val == null || val === "") {
      return false;
    }
    return (/^[0-9]+\.[0-9]*$|^[0-9]+$/.test(val));
  }

  //整数
  function integer(val) {
    if (val == null || val === "") {
      return false;
    }
    return (/^[-+]?(\d+)$|^[-+]?(\d+)(\.?[0]*)$/.test(val));
  }

  //正数
  function positiveNum(val) {
    if (val == null || val === "" || val == 0) {
      return false;
    }
    return (/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(val));
  }

  //正整数
  function positiveInteger(val) {
    if (val == null || val === "" || val == 0) {
      return false;
    }
    return (/^[+]?(\d+)$|^[+]?(\d+)(\.?[0]*)$/.test(val));
  }

  // ip
  function checkIP(val) {
    if (val == null || val === "") {
      return false;
    }
    return (/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/.test(val));
  }

  // 日期时间格式 2019/12/02 12:32:02 2019-12-02 12:32
  function dateTime(val) {
    if (val == null || val === "") {
      return false;
    }
    return (/^[1-9]\d{3}[-\/](0[1-9]|1[0-2])[-\/](0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):[0-5]\d(:[0-5]\d)?$/.test(val));
  }

  //日期格式 2019-12-02 2019/12/02
  function date(val) {
    if (val == null || val === "") {
      return false;
    }
    return (/^[1-9]\d{3}[-\/](0[1-9]|1[0-2])[-\/](0[1-9]|[1-2][0-9]|3[0-1])$/.test(val));
  }

  //时间格式 08:22 08:22:13
  function time(val) {
    if (val == null || val === "") {
      return false;
    }
    return (/^(20|21|22|23|[0-1]\d):[0-5]\d(:[0-5]\d)?$/.test(val));
  }

  /**
   * 替换非法字符
   * 
   * @param {String} val 字符串
   * @param {Array} exceptionsArray 数组中去除的字符 
   * 
   * @returns {String}
   */
  function illegalReplace(val, exceptionsArray) {
    if (val == null || val === "") {
      return "";
    }
    let array = [
      // 英文
      "`",
      "~",
      "!",
      "@",
      "#",
      "$",
      "%",
      "^",
      "&",
      "*",
      "(",
      ")",
      "-",
      "_",
      "=",
      "+",
      "[",
      "{",
      "]",
      "}",
      "\\",
      "|",
      ";",
      ":",
      "'",
      '"',
      ",",
      "<",
      ".",
      ">",
      "/",
      "?",
      // 中文
      "·",
      "！",
      "￥",
      "…",
      "（",
      "）",
      "—",
      "【",
      "】",
      "、",
      "；",
      "：",
      "‘",
      "’",
      "“",
      "”",
      "，",
      "《",
      "。",
      "》",
      "？"
    ];
    if (exceptionsArray) {
      array = array.filter(item => exceptionsArray.indexOf(item) == -1);
    }
    val = val.replace(/\s+/img, "");
    val = val.replace(new RegExp(`[${array.join("\\")}]`, "img"), "");
    return val;
  }

  /**
   * 是否存在非法字符
   * 
   * @param {String} val 字符串
   * @param {Array} exceptionsArray 数组中去除的字符 
   * 
   * @returns {Boolean}
   */
  function illegalStr(val, exceptionsArray) {
    if (val == null || val === "") {
      return false;
    }
    let array = [
      // 英文
      "`",
      "~",
      "!",
      "@",
      "#",
      "$",
      "%",
      "^",
      "&",
      "*",
      "(",
      ")",
      "-",
      "_",
      "=",
      "+",
      "[",
      "{",
      "]",
      "}",
      "\\",
      "|",
      ";",
      ":",
      "'",
      '"',
      ",",
      "<",
      ".",
      ">",
      "/",
      "?",
      // 中文
      "·",
      "！",
      "￥",
      "…",
      "（",
      "）",
      "—",
      "【",
      "】",
      "、",
      "；",
      "：",
      "‘",
      "’",
      "“",
      "”",
      "，",
      "《",
      "。",
      "》",
      "？"
    ];
    if (exceptionsArray) {
      array = array.filter(item => exceptionsArray.indexOf(item) == -1);
    }
    if (/\s+/g.test(val)) {
      return true;
    } else if (new RegExp(`[${array.join("\\")}]`, "im").test(val)) {
      return true;
    } else {
      return false;
    }
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

  let global = (function () { return this || (0, eval)('this'); }());
  let JAFORegexpMethod = {
    phone,
    identityCard,
    plate,
    chWord,
    number,
    integer,
    positiveNum,
    positiveInteger,
    checkIP,
    dateTime,
    date,
    time,
    illegalStr,
    illegalReplace,
    image,
    getFileName
  }

  // 最后将插件对象暴露给全局对象
  if (typeof module !== "undefined" && module.exports) {
    module.exports = JAFORegexpMethod;
  } else if (typeof define === "function" && define.amd) {
    define(function () { return JAFORegexpMethod; });
  } else {
    !('JAFORegexpMethod' in global) && (global.JAFORegexpMethod = JAFORegexpMethod);
  }
}());