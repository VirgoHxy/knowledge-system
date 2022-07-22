const {
  fixed,
  isEqual,
  randomOfBetween,
  randomIntOfBetween,
  randomInt,
  random4OfHex,
  guid,
  id16,
  isOdd,
  padNumber,
  getDecimal2FloatValue,
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

function fixedTest() {
  console.log(0.1 + 0.2);
  console.log(0.354 - 0.0003);
  console.log(fixed(0.1, 0.2, '+'));
  console.log(fixed(0.354, 0.0003, '-'));
  console.log(35.41 * 100);
  console.log(35.41 / 10);
  console.log(fixed(35.41, 100, '*'));
  console.log(fixed(35.41, 10, '/'));
}
function isEqualTest() {
  console.log(0.1 + 0.2);
  console.log(0.354 - 0.0003);
  console.log(isEqual(0.1 + 0.2, 0.3));
  console.log(isEqual(0.354 - 0.0003, 0.3537));
  console.log(35.41 * 100);
  console.log(35.41 / 10);
  console.log(isEqual(35.41 * 100, 3541));
  console.log(isEqual(35.41, 10, 3.541));
}
function randomOfBetweenTest() {
  console.log(randomOfBetween(0.9, 2.1));
}
function randomIntOfBetweenTest() {
  console.log(randomIntOfBetween(1, 100));
}
function randomIntTest() {
  console.log(randomInt(0)); // 随机小数
  console.log(randomInt(6)); // 6位随机数
  console.log(randomInt(16)); // 16位随机数
  console.log(randomInt(20)); // 20位随机数 因为超过最大安全整数 所以为null
}
function random4OfHexTest() {
  console.log(random4OfHex());
  console.log(random4OfHex());
}
function guidTest() {
  console.log(guid());
  console.log(guid());
}
function id16Test() {
  console.log(id16());
  console.log(id16());
}
function isOddTest() {
  console.log(isOdd(1)); // true
  console.log(isOdd(2)); // false
}
function padNumberTest() {
  console.log(padNumber(1234, 4));
  console.log(padNumber(1, 4));
  // 也可以使用string.prototype.padStart
  console.log('1234'.padStart(4, '0'));
  console.log('1'.padStart(4, '0'));
  // 数字右补零
  console.log('1234'.padEnd(4, '0'));
  console.log('1'.padEnd(4, '0'));
}
function getDecimal2FloatValueTest() {
  console.log(getDecimal2FloatValue(1011.01)); // 11.25 二进制转十进制
}

fixedTest();
isEqualTest();
randomOfBetweenTest();
randomIntOfBetweenTest();
randomIntTest();
random4OfHexTest();
guidTest();
id16Test();
isOddTest();
padNumberTest();
getDecimal2FloatValueTest();
