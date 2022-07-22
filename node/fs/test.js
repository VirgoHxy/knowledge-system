const fs = require('fs');
const path = require('path');

const { writeSync, delSync, readSync, copySync, moveSync, copyByStreamSync, mkdirSync } = require('.');

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

function writeSyncTest() {
  console.log(writeSync('./test/test1.txt')); // 创建空文件(将被删除)
  console.log(writeSync('./test/test.txt')); // 创建空文件
  console.log(writeSync('./test/test.txt', '123')); // 追加123
  console.log(writeSync('./test/test.txt', '456')); // 追加456
}
function delSyncTest() {
  // 4s后删除
  setTimeout(() => {
    console.log(delSync('./temp'));
    console.log(delSync('./test/test1.txt'));
  }, 4000);
}
function readSyncTest() {
  console.log(readSync('../../.eslintrc.json')); // 读取文件
  console.log(readSync('../../js')); // 读取文件夹
  try {
    console.log(readSync('../common')); // 路径不存在，报错
    // eslint-disable-next-line
  } catch (error) {}
}
function copySyncTest() {
  // 复制文件
  console.log(copySync('../../.eslintrc.json', './temp/.eslintrc.json'));
  // 复制文件 复制路径更换文件名
  console.log(copySync('../../.eslintrc.json', './temp/.123.json'));
  // 复制文件夹
  console.log(copySync('../../js', './temp'));
}
function moveSyncTest() {
  // 移动文件
  console.log(moveSync('./test/test.txt', './test/test1/test2/test3/test.txt'));
  // 移动文件 移动路径更换文件名
  console.log(moveSync('./test/test1/test2/test3/test.txt', './test/test1/test2/test3/test-move.txt'));
  // 移动文件夹
  console.log(moveSync('./test/test1/test2', './test/test2'));
}
function copyByStreamSyncTest() {
  console.log(copyByStreamSync('./test/test1.txt', './test/test2.txt'));
}
function mkdirSyncTest() {
  // 递归创建文件夹;
  console.log(mkdirSync('./test/test1/test2/test3'));
}

writeSyncTest();
delSyncTest();
readSyncTest();
copySyncTest();
moveSyncTest();
copyByStreamSyncTest();
mkdirSyncTest();
