const {
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
  urlParse,
} = require('.');

console.log_ = console.log;
console.log = function () {
  let name = arguments.callee.caller.name;
  !console.log.obj && (console.log.obj = {});
  if (!name) {
    name = 'noName';
  }
  !console.log.obj[name] && console.log_(`\r\n————${name}————: `);
  console.log.obj[name] = 1;
  console.log_(...arguments);
};

function isPhoneTest() {
  console.log(isPhone('17790462501')); // true
  console.log(isPhone('1779046251')); // fasle
  console.log(isPhone('177904625011')); // false
}
function isIDCardTest() {
  console.log(isIDCard('420621199809192433')); // true
  console.log(isIDCard('4206211998091924332')); // fasle
  console.log(isIDCard('4206211998091924334')); // false
}
function isPlateTest() {
  console.log(isPlate('鄂J40199')); // true
  console.log(isPlate('鄂J401992')); // true
  console.log(isPlate('鄂J4019922')); // fasle
  console.log(isPlate('鄂bJ40199')); // false
}
function hasChineseTest() {
  console.log(hasChinese('bJ40鄂199')); // true
  console.log(hasChinese('bJ40199')); // false
}
function isNumberTest() {
  console.log(isNumber('40199')); // true
  console.log(isNumber('40199.023')); // true
  console.log(isNumber('40199.')); // true
  console.log(isNumber('40199..23')); // false
}
function isIntTest() {
  console.log(isInt('+40199')); // true
  console.log(isInt('-40199.0')); // true
  console.log(isInt('40199.2')); // false
}
function isPositiveNumTest() {
  console.log(isPositiveNum('+40199')); // true
  console.log(isPositiveNum('-40199')); // false
  console.log(isPositiveNum('0')); // false
  console.log(isPositiveNum('0.2')); // true
}
function isPositiveIntTest() {
  console.log(isPositiveInt('40199')); // true
  console.log(isPositiveInt('1.0')); // true
  console.log(isPositiveInt('0')); // false
  console.log(isPositiveInt('0.2')); // false
}
function isIPTest() {
  console.log(isIP('192.168.1.253')); // true
  console.log(isIP('192.168.1.256')); // false
  console.log(isIP('192.168.256.253')); // false
}
function isDateTimeTest() {
  console.log(isDateTime('2019/12/02 12:32:02')); // true
  console.log(isDateTime('2019-12-02 12:32')); // true
  console.log(isDateTime('19-12-02 12:32')); // false
}
function isDateTest() {
  console.log(isDate('2019/12/02')); // true
  console.log(isDate('2019-12-02 ')); // false
  console.log(isDate('19-12-02')); // false
}
function isTimeTest() {
  console.log(isTime('08:22:13')); // true
  console.log(isTime('08:22')); // true
  console.log(isTime('8:22')); // false
  console.log(isTime('25:22')); // false
  console.log(isTime('21:60')); // false
}
function replaceIllegalStrTest() {
  console.log(replaceIllegalStr('abc 123 ')); // abc123
  console.log(replaceIllegalStr('abc;123 ')); // abc123
  console.log(replaceIllegalStr('abc；123 ')); // abc123
}
function isIllegalTest() {
  console.log(isIllegal('abc 123 ')); // true
  console.log(isIllegal('abc;123 ')); // true
  console.log(isIllegal('abc；123 ')); // true
}
function isImageTest() {
  console.log(isImage('213.png')); // true
  console.log(isImage('213.txt')); // false
}
function getFileNameTest() {
  console.log(getFileName('D:/123.txt')); // 123.txt
  console.log(getFileName('D:\\123.txt')); // 123.txt
}
function getFolderAndFileNameTest() {
  console.log(getFolderAndFileName('D:/test/123.txt')); // [ 'D:/test', '123.txt' ]
  console.log(getFolderAndFileName('D:/test/.vscode')); // [ 'D:\\test\\.vscode', '' ]
  console.log(getFolderAndFileName('D:\\test\\123.txt')); // [ 'D:\\test', '123.txt' ]
  console.log(getFolderAndFileName('D:\\test\\.vscode')); // [ 'D:\\test\\.vscode', '' ]
  console.log(getFolderAndFileName('D:\\test\\.vscode\\setting.json')); // [ 'D:\\test\\.vscode', 'setting.json' ]
}
function urlParseTest() {
  console.log(urlParse('https://translate.google.cn/?sl=en&tl=zh-CN&text=netloc&op=translate')); //
  console.log(urlParse('https://translate.google.cn:443/demo/test?sl=en&tl=zh-CN&text=netloc&op=translate#test')); //
}

isPhoneTest();
isIDCardTest();
isPlateTest();
hasChineseTest();
isNumberTest();
isIntTest();
isPositiveNumTest();
isPositiveIntTest();
isIPTest();
isDateTimeTest();
isDateTest();
isTimeTest();
replaceIllegalStrTest();
isIllegalTest();
isImageTest();
getFileNameTest();
getFolderAndFileNameTest();
urlParseTest();
