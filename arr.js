let arr = [1, 2, 3];

// 对象方法
newArr = Array.from("hxy",ele => {return ele + 1} , this); // ["h1","x1","y1"] 对拥有length属性的对象或可迭代的对象来返回一个数组 返回新数组
flag = Array.isArray(arr) // true 判断一个对象是否为数组
console.log(flag)

// 实例方法
// es5
newArr = arr.concat([1], [2]) // [1,2,3,1,2] 连接多个数组 返回新数组 不改变原数组
flag = arr.every(ele => { // false 检测数组中的所有元素是否都符合条件
  return ele > 1
})
flag = arr.some(ele => { // true 检测数组中是否有一个或多个元素符合条件
  return ele > 1
})
newArr = arr.filter(ele => { // [2,3] 返回一个符合条件的数组 重复元素只返回一次 返回新数组 不改变原数组
  return ele > 1
})
arr.forEach((ele, index, arr) => {}, this) // 遍历数组 ele 数组元素 index 索引 arr 原数组 this代表回调函数的this指向
newArr = arr.map((ele, index, arr) => {return ele+1}, this) // [2,3,4] 遍历数组 返回新数组 ele 数组元素 index 索引 arr 原数组 this代表回调函数的this指向
index = arr.indexOf(1,2) // -1 从2索引ltr开始判断一个数组是否包含1 包含返回索引 不包含返回-1
index = arr.lastIndexOf(1,2) // 0 从2索引rtl开始判断一个数组是否包含1 包含返回索引 不包含返回-1
str = arr.join("-") // 1-2-3 把数组中的所有元素转换一个字符串
arr.push(4) // 4 向数组的末尾添加一个或更多元素 返回数组长度 改变原数组
arr.pop() // 4 删除数组最后一个元素 返回删除元素 改变原数组
arr.unshift(0) // 4 向数组的头部添加一个或更多元素 返回数组长度 改变原数组
arr.shift() // 0 删除数组第一个元素 返回删除元素 改变原数组
newArr = arr.slice(1,2) // [2] 从1索引返回(2-1)个选定的元素 返回新数组 不改变原数组
arr.reverse() // [3,2,1] 颠倒数组中元素顺序 改变原数组
arr.sort((a,b) => { return a - b }); // [1,2,3] 数组的元素进行排序 改变原数组
console.log(newArr)

// es6
arr.copyWithin(1, 0, 2) // [1,1,2] 从数组的第0位后2位获取元素(1,2)复制到第1位后 改变原数组
newArr = arr.entries() // 返回一个新的Array Iterator对象 该对象包含数组中每个索引的键/值对 返回新数组 不改变原数组
newArr.next() // { value: [ 0, 1 ], done: false }
newArr.next() // { value: [ 1, 1 ], done: false }
newArr.next() // { value: [ 2, 2 ], done: false }
newArr.next() // { value: undefined, done: true }
newArr = arr.keys() // 返回一个新的Array Iterator对象 该对象包含数组中每个索引的键 返回新数组 不改变原数组
newArr.next() // { value: 0, done: false }
newArr.next() // { value: 1, done: false }
newArr.next() // { value: 2, done: false }
newArr.next() // { value: undefined, done: true }
new Array(5).fill(0) // [0,0,0,0,0] 将数组元素都填充0 改变原数组
ele = arr.find(ele => { // 2 返回第一个符合条件的元素 返回元素 不改变原数组
  return ele > 1
})
index = arr.findIndex(ele => { // 0 返回第一个符合条件的元素的索引 返回索引 不改变原数组
  return ele > 0
})
flag = arr.includes(1,2) // false 从2索引开始判断一个数组是否包含1 包含返回true 不包含返回false

console.log(flag)

/**
 * 操作重复数组,获取数组重复/未重复/去重复的元素(会破坏已有排序)
 * @param {Array} array 源数组 
 * @param {Number} type 默认为0 0返回去重复数组 1返回重复数组 2返回未重复数组
 * @param {Objecy} object 针对数组中对象重复判断
 - {
 -   key: "num", //字段key
 -   flag: false //默认false true返回对象  false返回对应key的value 
 - }
 * @returns {Array} 返回数组
 */
function operRepeatArray(array, type, object) {
  let repeat = [], //重复
    noRepeat = [], //未重复
    len = array.length,
    key = !!object ? object.key : null,
    flag = !!object ? object.flag : null;
  type = type != null ? type : 0;
  if (!Array.isArray(array)) {
    return [];
  }
  if (array.length <= 1) {
    return array;
  }
  if (key == null) {
    // 排序后数组才能左右做比较
    let tempArr = array.concat().sort();
    tempArr.forEach(function (ele, index, arr) {
      let a = arr[index],
        b = arr[index >= len - 1 ? index : index + 1];
      if (a == b && repeat.indexOf(a) === -1) {
        repeat.push(a);
      }
      if (repeat.indexOf(a) === -1) {
        noRepeat.push(a);
      }
      if (index == len - 1) {
        if (repeat.indexOf(b) === -1) {
          noRepeat.push(b);
        }
      }
    })
  } else {
    let tempArr = array.concat().sort(function (a, b) {
      if (typeof a[key] == "number") {
        return a[key] - b[key]
      } else {
        return a[key].localeCompare(b[key])
      }
    });
    tempArr.forEach(function (ele, index, arr) {
      let a = arr[index],
        b = arr[index >= len - 1 ? index : index + 1];
      if (!flag) {
        if (a[key] == b[key] && repeat.indexOf(a[key]) === -1) {
          repeat.push(a[key]);
        }
        if (repeat.indexOf(a[key]) === -1) {
          noRepeat.push(a[key]);
        }
        if (index == len - 1) {
          if (repeat.indexOf(b[key]) === -1) {
            noRepeat.push(b[key]);
          }
        }
      } else {
        let keyArr = []; //key值数组
        if (a[key] == b[key] && repeat.indexOf(a[key]) === -1) {
          repeat.push(a);
          repeat.push(b);
          keyArr = repeat.map(function (ele) {
            return ele[key]
          })
        }
        if (keyArr.indexOf(a[key]) === -1) {
          noRepeat.push(a);
        }
        if (index == len - 1) {
          if (keyArr.indexOf(b[key]) === -1) {
            noRepeat.push(b);
          }
        }
      }
    });
  }
  switch (type) {
    case 0:
      return JSON.stringify(repeat.concat(noRepeat));
    case 1:
      return repeat;
    case 2:
      return noRepeat;
    default:
      return []
  }
}
// console.log(operRepeatArray(["ab","ad","ab","ad","ab","ad","ac","ae","ac","ae","ac","ae"],0))
// console.log(operRepeatArray([1,2,3,2,3,2,3,4,5,4,5,4,5],0))
// console.log(operRepeatArray(["ab","ad","ab","ad","ab","ad","ac","ae","ac","ae","ac","ae",1,2,3,2,3,2,3,4,5,4,5,4,5],0))
// console.log(JSON.stringify(operRepeatArray([
//   {
//     num: "bbbccb6d-2a03-4085-b71c-3ae54a0f7b7a",
//     state: false
//   },
//   {
//     num: "9cde25d3-f9ce-49e2-8452-7230cd4dbe30",
//     state: true
//   },
//   {
//     num: "9cde25d3-f9ce-49e2-845e-7ee0cd4dbe30",
//     state: true
//   },
//   {
//     num: "60136470-f88b-47ed-b7f1-bce06404c7a3",
//     state: true
//   },
//   {
//     num: "9cde25d3-f9ce-49e2-8452-7230cd4dbe30",
//     state: false
//   },
//   {
//     num: "9cde25d3-f9ce-49e2-845e-7ee0cd4dbe30",
//     state: true
//   }
// ],0,{
//   key: "num",
//   flag: false
// })))

/**
 * 高性能数组去重(不会破坏已有排序,未重复取第一个位置)
 * 
 * @returns {Array} 返回数组
 */
function distinct() {
  let array = [].concat.apply([], arguments),
    result = [],
    obj = {}; //利用对象属性不重复
  for (let i of array) {
    if (!obj[i]) {
      result.push(i);
      obj[i] = 1;
    }
  }
  return result
}

/**
 * 数组去重(set数据结构 类似于数组，但是成员的值都是唯一的)
 * 
 * @returns {Array} 返回数组
 */
function distinct1() {
  let array = [].concat.apply([], arguments);
  return Array.from(new Set(array))
}

/**
 * 去除数组指定元素
 * @param {Array} arr 源数组
 * @param {Array} removeArr 删除数组
 * @param {String} key 针对对象字段去除数组
 * 
 * @returns {Array} 返回数组
 */
function removeItem(arr, removeArr, key) {
  if (!key) {
    return arr.filter(item => removeArr.indexOf(item) == -1)
  }
  return arr.filter(item => removeArr.indexOf(item[key]) == -1)
}
// console.log(removeItem([3, 7, 11, 0, 0, 0, 3, 0, 55],[0,55]))
// console.log(JSON.stringify(removeItem([{
//   id: "1"
// },{
//   id: "2"
// },{
//   id: "3"
// }],["1","3"],"id")))
module.exports = {
  operRepeatArray,
  distinct,
  distinct1,
  removeItem
}