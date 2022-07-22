const {
  removeRepeat,
  getRepeatNum,
  getMinMaxRepeatNum,
  randomStr,
  upperLetter,
  lowerLetter,
  truncate,
  deleteByIndex,
  deleteLastStr,
  encrypto,
  decrypto,
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

function removeRepeatTest() {
  console.log(removeRepeat('askdhg1231asdkjh123')); //askdhg123j
}
function getRepeatNumTest() {
  console.log(getRepeatNum('askdhg1231asdkjh123', 'as')); //2
}
function getMinMaxRepeatNumTest() {
  console.log(getMinMaxRepeatNum('aaabbbccdd')); //{str:["c","d"],num:2}
  console.log(getMinMaxRepeatNum('aaabbbccdd', true)); //{str:["aaa","bbb"],num:3}
  console.log(getMinMaxRepeatNum('aaaabbbccd')); //{str:d,num:1}
  console.log(getMinMaxRepeatNum('aaaabbbccd', true)); //{str:a,num:4}
}
function randomStrTest() {
  console.log(randomStr(10));
}
function upperLetterTest() {
  console.log(upperLetter());
}
function lowerLetterTest() {
  console.log(lowerLetter());
}
function truncateTest() {
  console.log(truncate('abcdefghijklmnopqrstuvwxyz')); //abcdefghij...
}
function deleteByIndexTest() {
  console.log(deleteByIndex('12345', [1, 3])); //135
}
function deleteLastStrTest() {
  console.log(deleteLastStr('1231415', '1')); //123145
}
function encryptoTest() {
  console.log(encrypto('123', 123, 25)); //2oz2nz2m
}
function decryptoTest() {
  console.log(decrypto(encrypto('123', 123, 25), 123, 25)); //123
}

removeRepeatTest();
getRepeatNumTest();
getMinMaxRepeatNumTest();
randomStrTest();
upperLetterTest();
lowerLetterTest();
truncateTest();
deleteByIndexTest();
deleteLastStrTest();
encryptoTest();
decryptoTest();
