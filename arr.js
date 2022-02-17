
// es5
// 对象方法
Array.from("hxy", ele => { return ele + 1; }, this); // 返回["h1","x1","y1"] 将类数组转换为真数组 对拥有length属性的对象或可迭代的对象来返回一个数组 浅拷贝
Array.from({length: 2}, () => '98'); // 返回["98","98"];
Array.from({0: "00",1: "01",length: 3}); // 返回[ '00', '01', undefined ];
Array.isArray([]); // true 判断一个对象是否为数组

// 实例方法
[1, 2, 3].concat([1], [2]); // [1,2,3,1,2] 不改变原数组 连接多个数组 浅拷贝 数组元素是对象则会指向同一对象
[1, 2, 3].indexOf(1, 2); // -1 从2索引ltr开始判断一个数组是否包含1 包含返回索引 不包含返回-1
[1, 2, 3].lastIndexOf(1, 2); // 0 从2索引rtl开始判断一个数组是否包含1 包含返回索引 不包含返回-1
[1, 2, 3].every(ele => { return ele > 1; }); // false 检测数组中的所有元素是否都符合条件
[1, 2, 3].some(ele => { return ele > 1; }); // true 检测数组中是否有一个或多个元素符合条件
[1, 2, 3].join("-"); // 1-2-3 把数组中的所有元素转换一个字符串 反之字符串转数组str.split()
[1, 2, 3].toString(); // 1,2,3 把数组中的所有元素转换一个字符串
[1, 2, 3, 1, 2].filter(ele => { return ele > 1; }); // [2,3] 不改变原数组 返回一个符合条件的数组 重复元素只返回一次
[1, 2, 3].forEach((ele, index, arr) => { console.log(ele,index,arr); }, this); // 遍历数组 ele数组元素 index索引 arr原数组 this代表回调函数的this指向
[1, 2, 3].map((ele, index, arr) => { console.log(ele,index,arr);return ele + 1; }, this); // [2,3,4] 不改变原数组 遍历数组 返回新数组 浅拷贝 ele数组元素 index索引 arr原数组 this代表回调函数的this指向
[1, 11, 3, 12].sort((a, b) => { return a - b; }); // [1,3,11,12] 对数组的元素进行数字升序
[1, 11, 3, 12].sort((a, b) => { return b - a; }); // [12,11,3,1] 对数组的元素进行数字降序
[1, 11, 3, 12].sort(); // [1,11,12,3] 对数组的元素进行字母排序
[1, 2, 3].reduce((start, ele, index, arr) => { console.log(ele,index,arr);return start + ele; }); // 6 方法接收一个函数作为累加器 从左到右最终计算为一个值 start初始值, ele当前元素, index当前索引, arr原数组
[1, 2, 3].reduceRight((start, ele, index, arr) => { console.log(ele,index,arr);return start + ele; }); // 6 方法接收一个函数作为累加器 从右到左最终计算为一个值 start初始值, ele当前元素, index当前索引, arr原数组
[1, 2, 3].push(3); // 返回4 原数组改为[1,2,3,3] 向数组的末尾添加一个或更多元素 返回数组长度
[1, 2, 3].pop(); // 返回3  原数组改为[1,2] 删除数组最后一个元素 返回删除元素
[1, 2, 3].unshift(0); // 返回4 原数组改为[0,1,2,3] 向数组的头部添加一个或更多元素 返回数组长度
[1, 2, 3].shift(); // 返回1 原数组改为[2,3] 删除数组第一个元素 返回删除元素
[1, 2, 3].slice(1, 2); // [2] 从1索引返回(2-1)个选定的元素 返回新数组 不改变原数组 浅拷贝
[1, 2, 3].splice(0, 1, 1, 2); // 返回1 原数组改为[1,2,2,3] 从0索引开始删除1个元素并插入1,2两个元素 返回删除元素

// es6
// 解构,...用例
let [a, b, c] = [1, 2, 3]; // a = 1;b = 2;c = 3; 解构数组
let [head, ...tail] = [1, 2, 3, 4]; // head = 1;tail = [2,3,4] rest剩余参数
let [foo = true] = []; // foo = true; 数组元素值为空的默认值
let [x = 1, y = x] = []; // x = 1;y = 1; 变量默认值
[a = 3, b = 4] = [b, a]; //a = 4;b = 3; 交换值
function arrayDemo([x = 0, y = 0] = []) { console.log(x, y); } // 解构函数数组参数 并给数组元素默认值(防止无参数报错)
arrayDemo(); // x为0 y为0
arrayDemo([1, 2]); // x为1 y为2
arrayDemo([1]); // x为1 y为0
function arrayDemo1([x, y] = [0, 0]) { console.log(x, y); } // 解构函数数组参数 并给数组默认值(防止无参数报错)
arrayDemo1(); // x为0 y为0
arrayDemo1([1, 2]); // x为1 y为2
arrayDemo1([1]); // x为1 y为undefined
function restDemo(first, ...other) { console.log(first);console.log(other); } // rest参数
restDemo("one", "two", "three"); // one [ 'two', 'three' ]
console.log(...[1, 2, 3]); // 1 2 3 等同于console.log(1, 2, 3)
let newArr = [], newArr1 = [];
newArr1 = newArr.concat([4,5,6]); // newArr1为[4,5,6] concat方法
newArr1 = [...newArr, ...[4,5,6]]; // newArr1为[4,5,6] rest剩余参数 可以替换concat方法
Math.max.apply(null, [14, 3, 77]); // 77 apply方法取最大数
Math.max(...[14, 3, 77]); // 77 rest剩余参数模拟一个一个的传参 可替代apply
newArr = [];Array.prototype.push.apply(newArr, [1,{a: 1},3]); // newArr为[1,{a: 1},3] apply方法push
newArr = [];newArr.push(...[1,{a: 1},3]); // newArr为[1,{a: 1},3] spread扩展运算 可以替换for循环push以及apply方法push
newArr1 = [...newArr];newArr[0] = 3;newArr[1].a = 2; // newArr[3,{a: 2},3] newArr1为[1,{a: 2},3] 数组元素为简单类型元素 则为深克隆 复杂类型元素则为地址复制
Object.values({one: 1,two: 2,three: 3}); // 对象值转数组 [ 1, 2, 3 ]
Object.entries({one: 1,two: 2,three: 3}); // 对象参数和值转数组 [ [ 'one', 1 ], [ 'two', 2 ], [ 'three', 3 ] ]
Object.fromEntries([{id: '1998090901', text: '一'},{id: '1998090902', text: '二'},{id: '1998090903', text: '三'}].map(item => [item.id, item]));
let newArr2 = {...[4,5,6]}; // { '0': 4, '1': 5, '2': 6 } spread扩展运算
console.log('newArr2', newArr2);
/* 数组转对象
{
  '1998090901': { id: '1998090901', text: '一' },
  '1998090902': { id: '1998090902', text: '二' },
  '1998090903': { id: '1998090903', text: '三' }
}
*/
//对象方法
Array(); // []
Array(3); // Array第一个参数可以设置带长度的空值数组 [ <3 empty items> ]
Array(3, 11, 8); // [3,11,8]
Array.of(); // Array.of() 将一组参数值转换成数组 []
Array.of(1); // [1]
Array.of(1, 2); // [1,2]
Array.of(undefined); // [undefined]
// 实例方法
[1, 2, 3, 4, 5].copyWithin(0, 3, 4); // [ 4, 2, 3, 4, 5 ] -- 将指定位置的元素复制/覆盖到其他位置 从index为3位置 复制1(4-3)个元素到 index为0位置
newArr = [1, 2, 3].entries(); // 返回一个新的Array Iterator对象 该对象包含数组中每个索引的键/值对
newArr.next(); // { value: [ 0, 1 ], done: false }
newArr.next(); // { value: [ 1, 1 ], done: false }
newArr.next(); // { value: [ 2, 2 ], done: false }
newArr.next(); // { value: undefined, done: true }
newArr = [1, 2, 3].keys(); // 返回一个新的Array Iterator对象 该对象包含数组中每个索引的键
newArr.next(); // { value: 0, done: false }
newArr.next(); // { value: 1, done: false }
newArr.next(); // { value: 2, done: false }
newArr.next(); // { value: undefined, done: true }
new Array(5).fill(0); // [0,0,0,0,0] 将数组元素都填充0 改变原数组
[1,2,3].fill(0); // [0,0,0] 将数组元素都填充0 改变原数组
['a', 'b', 'c'].fill(7, 1, 2); // ['a', 7, 'c'] -- 从index为1位置 填充1(2-1)个元素7 改变原数组
[1, 2, 3].find(ele => { return ele > 1; }); // 2 返回第一个符合条件的元素 返回元素
[1, 2, 3].findIndex(ele => { return ele > 0; }); // 0 返回第一个符合条件的元素的索引 返回索引
[1, 2, 3].includes(1, 2); // false 从2索引开始判断一个数组是否包含1 包含返回true 不包含返回false
[1, 2, NaN].includes(NaN); // true
[1, 2, [3, 4]].flat(); // [1,2,3,4] -- 默认"拉平"1层
[1, 2, [3, [4, 5]]].flat(2); // [1,2,3,4,5] -- "拉平"2层
[1, 2, [3, [4, 5]]].flat(Infinity); // [1,2,3,4,5] -- "拉平"所有

/**
 * 数组随机排序
 * 
 * @param {Array} arr 源数组
 * 
 * @returns {Array} 返回数组
 */
function shuffle(arr) {
  let array = [].concat.apply([], arr);
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // 从 0 到 i 的随机索引
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

let count = {
  '123': 0,
  '132': 0,
  '213': 0,
  '231': 0,
  '321': 0,
  '312': 0
};
for (let index = 0; index < 10000; index++) {
  let arr = shuffle([1, 2, 3]);
  count[arr.join('')]++;
}
console.log(count);

/**
 * 数组去重(不会破坏已有排序 利用对象属性不重复)
 * 
 * @param {Array} arr 源数组
 * 
 * @returns {Array} 返回去重数组(保留一个重复元素 取第一个位置)
 */
function distinctOfObj(arr) {
  let array = [].concat.apply([], arr),
    result = [],
    obj = {};
  for (let i of array) {
    if (!obj[i]) {
      result.push(i);
      obj[i] = 1;
    }
  }
  return result;
}
console.log(distinctOfObj([1, 2, 3, 1, 2]));

/**
 * 数组去重(不会破坏已有排序 set数据结构 类似于数组但是成员的值都是唯一的)
 * 
 * @param {Array} arr 源数组
 * 
 * @returns {Array} 返回去重数组(保留一个重复元素 重复取第一个位置)
 */
function distinctOfSet(arr) {
  let array = [].concat.apply([], arr);
  return Array.from(new Set(array));
}
console.log(distinctOfSet([1, 2, 3, 1, 2]));

/**
 * 去除数组指定元素
 * 
 * @param {Array} arr 源数组
 * @param {Array} removeArr 删除数组
 * @param {String} [key] 针对对象字段去除数组
 * 
 * @returns {Array} 返回数组
 */
function removeItem(arr, removeArr, key) {
  let array = [].concat.apply([], arr);
  if (!key) {
    return array.filter(item => removeArr.indexOf(item) == -1);
  }
  return array.filter(item => removeArr.indexOf(item[key]) == -1);
}
console.log(removeItem([3, 7, 11, 0, 0, 0, 3, 0, 55], [0, 55]));
console.log(JSON.stringify(removeItem([{
  id: "1"
}, {
  id: "2"
}, {
  id: "3"
}], ["1", "3"], "id")));

/**
 * 判断复杂数组(数组元素可包含对象,数组等等)是否相等(数组元素所在位置必须相同,元素类型必须完全相同)
 * 
 * @param {Array} x 数组1
 * @param {Array} y 数组2
 * 
 * @returns {Boolean}
 */
function compareComplexArray(x, y) {
  if (!(x instanceof Array) || !(y instanceof Array) || x.length !== y.length) {
    return false;
  }
  // 判断对象是否相等
  let compareObject = function (x, y) {
    // 指向同一内存时
    if (x === y) {
      return true;
    } else if ((typeof x == "object" && x != null) && (typeof y == "object" && y != null)) {
      if (Object.keys(x).length != Object.keys(y).length) {
        return false;
      }
      for (let prop in x) {
        if (Object.prototype.hasOwnProperty.call(y, prop)) {
          if (!compareObject(x[prop], y[prop])) {
            return false;
          }
        } else {
          return false;
        }
      }
      return true;
    } else {
      return false;
    }
  };
  // 获取类型
  let getType = function (o) {
    let s = Object.prototype.toString.call(o);
    return s.match(/\[object (.*?)\]/)[1].toLowerCase();
  };
  let compare = function (m, n, type) {
    if (type === "object") {
      if (!compareObject(m, n)) {
        return true;
      }
    } else if (type === "array") {
      if (!compareComplexArray(m, n)) {
        return true;
      }
    } else {
      if (m !== n) {
        return true;
      }
    }
    return false;
  };
  const xLen = x.length,
    yLen = y.length,
    evenFlag = xLen % 2 === 0;
  for (let i = 0; i < xLen; i++) {
    const xElement = x[i],
      xType = getType(xElement);
    for (let j = yLen - 1; j >= 0; j--) {
      const yElement = y[j],
        yType = getType(yElement);
      if (xType !== getType(y[i]) || yType !== getType(x[j])) {
        return false;
      }
      let xFlag = compare(xElement, y[i], xType),
        yFlag = compare(yElement, x[j], yType);
      if (xFlag || yFlag) {
        return false;
      }
      if (evenFlag) {
        if (i >= (xLen / 2) - 1) {
          return true;
        }
      } else {
        if (i >= Math.floor(xLen / 2)) {
          return true;
        }
      }
    }
  }
}
console.log(compareComplexArray([
  {
    "ID": "31e175d0-aa01-11ea-b6dd-55eb193e1f02",
    "Account": "xm",
    "ProjectID": "1b1ec490-a9fe-11ea-b6dd-55eb193e1f02",
    "BussinessID": null,
    "OperatorType": 1,
    "Tel": "",
    "RoleID": "1f763070-aa01-11ea-b6dd-55eb193e1f02",
    "CreateTime": "2020-06-09T03:27:32.000Z",
    "Name": "项目管理员",
    "Password": "202CB962AC59075B964B07152D234B70",
    "RoleName": "项目权限"
  }, 2, [2, 1], 2
], [
  {
    "Account": "xm",
    "ID": "31e175d0-aa01-11ea-b6dd-55eb193e1f02",
    "ProjectID": "1b1ec490-a9fe-11ea-b6dd-55eb193e1f02",
    "OperatorType": 1,
    "BussinessID": null,
    "RoleID": "1f763070-aa01-11ea-b6dd-55eb193e1f02",
    "Tel": "",
    "CreateTime": "2020-06-09T03:27:32.000Z",
    "Password": "202CB962AC59075B964B07152D234B70",
    "Name": "项目管理员",
    "RoleName": "项目权限"
  }, 2, [2, 1], 2
]));

/**
 * 判断简单数组是否相等(元素类型必须完全相同)
 * 
 * @param {Array} x 数组1
 * @param {Array} y 数组2
 * @param {Array} [positionFlag = true] 数组元素所在位置是否必须相同 默认true false可不相同
 * 
 * @returns {Boolean}
 */
function compareArray(x, y, positionFlag = true) {
  if (x.length !== y.length) {
    return false;
  } else {
    if (!positionFlag) {
      x = x.sort();
      y = y.sort();
    }
    for (let i = 0; i < x.length; i++) {
      if (x[i] !== y[i]) {
        return false;
      }
    }
    return true;
  }
}

console.log(compareArray(["3", "11", "21", "1"], ["1", "11", "21", "3"], false));
console.log(compareArray(["3", "11", "21", "1"], ["1", "11", "21", "3"]));

// Anagrams是具有相同数量相同字母但是顺序不同的单词
function aclean(arr) {
  let obj = {};
  for (let i = 0; i < arr.length; i++) {
    let sorted = arr[i].toLowerCase().split("").sort().join("");
    obj[sorted] = arr[i];
  }
  return Object.values(obj);
}
console.log(aclean(["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"]));

/**
 * 按数组长度分割数组成二维数组(分割长度不足够则会增加)
 * 
 * @param {Array} array 原数组 
 * @param {Number} length 数组最大位数
 * @param {Number} number 数组元素最小长度
 * 
 * @returns 返回二维数组
 */
function splitOfArrayLength(array, length, number) {
  if (array.length == 0) {
    return [[]];
  }
  let num = Math.ceil(array.length / length);
  let index = 0;
  let newArray = [];
  num = num <= number ? number : num;
  // 分割数组
  while (index < array.length) {
    newArray.push(array.slice(index, index += num));
  }
  return newArray;
}
let array = [];
for (let index = 0; index < 100; index++) {
  array.push(index);
}
// 原本生成5位数组 分割长度为10
// 这里为了达到生成5位数组 分割长度增加到20
console.log(splitOfArrayLength(array, 5, 10));
let array1 = [];
for (let index = 0; index < 95; index++) {
  array1.push(index);
}
// 生成5位数组 每组长度(接近)平均分配(15)
console.log(splitOfArrayLength(array1, 5));

/**
 * 按元素长度分割数组成二维数组
 * 
 * @param {Array} array 原数组 
 * @param {Number} number 数组元素长度
 * 
 * @returns 返回二维数组
 */
function splitOfElementLength(array, number) {
  if (array.length == 0) {
    return [[]];
  }
  let index = 0;
  let newArray = [];
  while (index < array.length) {
    newArray.push(array.slice(index, index += number));
  }
  return newArray;
}
// 这里生成7位数组 分割长度为16
console.log(splitOfElementLength(array, 16));