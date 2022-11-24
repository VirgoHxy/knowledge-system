const {
  shuffle,
  removeRepeatByObj,
  removeRepeatBySet,
  removeItem,
  isEqual,
  splitByArrayLength,
  splitByElementNum,
  splitTwoArrays,
} = require('.');

let array = [...Array(100).keys()]; // [0,1,2,3,...99]

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

function shuffleTest() {
  let count = {
    123: 0,
    132: 0,
    213: 0,
    231: 0,
    321: 0,
    312: 0,
  };
  for (let index = 0; index < 10000; index++) {
    let arr = shuffle([1, 2, 3]);
    count[arr.join('')]++;
  }
  console.log(count);
}

function removeRepeatByObjTest() {
  console.log(removeRepeatByObj([1, 2, 3, 1, 2]));
}

function removeRepeatBySetTest() {
  console.log(removeRepeatBySet([1, 2, 3, 1, 2]));
  console.log(removeRepeatBySet([1, 2, 3, 1, [1, 4]]));
  console.log(removeRepeatBySet([1, 2, 3, 1, { a: 1 }]));
}

function removeItemTest() {
  console.log(removeItem([3, 7, 11, 0, 0, 0, 3, 0, 55], [0, 55]));
  console.log(
    JSON.stringify(
      removeItem(
        [
          {
            id: '1',
          },
          {
            id: '2',
          },
          {
            id: '3',
          },
        ],
        ['1', '3'],
        'id'
      )
    )
  );
}

function isEqualTest() {
  console.log(isEqual(['3', '11', '21', '1'], ['1', '11', '21', '3'], false));
  console.log(isEqual(['3', '11', '21', '1'], ['1', '11', '21', '3']));
}

function splitByArrayLengthTest() {
  // 原本生成5位数组 元素个数为10 但这里为了达到生成5位数组 元素个数增加到20
  console.log(splitByArrayLength(array, 5, 10));
  // 生成6位数组 每组长度平均分配(16) 但会有一组长度可能会低于平均水平
  console.log(splitByArrayLength(array, 6));
  // 生成101位数组，可元素最多只有100位，所以只会返回100位的二维数组
  console.log(splitByArrayLength(array, 101));
}

function splitByElementNumTest() {
  // 这里生成7位数组 分割长度为16
  console.log(splitByElementNum(array, 16));
}

function splitTwoArraysTest() {
  // 第一项为偶数数组 第二项为奇数数组
  console.log(splitTwoArrays([1, 12, 1, 2, 3, 4, 77, 5, 24, 33], ele => ele % 2 === 0));
}

shuffleTest();
removeRepeatByObjTest();
removeRepeatBySetTest();
removeItemTest();
isEqualTest();
splitByArrayLengthTest();
splitByElementNumTest();
splitTwoArraysTest();
