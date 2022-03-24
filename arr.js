// Array extends Function;Array extends Object;数组类继承方法类和对象类
Array(); // [] Array是数组构造函数 
new Array(); // [] 空数组
Array('3'); // [ '3' ]
Array(...'abc'); // [ 'a', 'b', 'c' ] 等同于 [..."abc"]
Array(3); // [ <3 empty items> ] Array只有一个参数可以设置带长度的空值数组
Array(1000); // [ <1000 empty items> ] Array(1000)[0]为undefined 不能说明是元素为undefined的长度为1000的数组 这种数组为稀疏数组(包含empty值)
Array(3, 11, 8); // [3,11,8] 多个参数会作为元素作为一个数组
Array(3, 3, 3); // [3,3,3] 可以使用Array(3).fill(3), Array.from({length: 3}, ele => 3)

// Set extends Function;Set extends Object;值集合类继承方法类和对象类 weakSet的值只能是对象引用 如果引用被垃圾回收 weakSet的值也会被清除 而且weakSet不能被枚举
let set = new Set(), tempSetObj = {a: 1}, tempSetArr = [2];
set.add(1); // 返回set集合
set.add('2');
set.add(true);
set.add({a: 1});
set.add([2]);
set.add(tempSetObj);
set.add(tempSetArr);

set.has(1); // true
set.has('2'); // true
set.has(true); // true
set.has({a: 1}); // false 地址不同
set.has([2]); // false 地址不同
set.has(tempSetObj); // true
set.has(tempSetArr); // true

set.delete(1); // 可以使用clear 删除所有
set.delete([2]); // 这里删不掉 因为不是同一个array 引用不同
set.delete(tempSetObj); // 这里成功删除

set.size; // 5
set.keys(); // [Set Iterator] { '2', true, { a: 1 }, [ 2 ], [ 2 ] } set允许存储任何类型的唯一值(基本类型判断值 复杂类型判断地址)
set.values(); // [Set Iterator] { '2', true, { a: 1 }, [ 2 ], [ 2 ] } 所以keys和values一致
Array.from(set); // [ '2', true, { a: 1 }, [ 2 ], [ 2 ] ] set 可以做数组去重 仅使用基本类型

// Map extends Function;Map extends Object;键值对集合类继承方法类和对象类 weakMap的键只能是对象引用 如果引用被垃圾回收 weakMap的值也会被清除 而且weakMap不能被枚举
let map = new Map(), tempMapObj = {a: 1}, tempMapArr = [2];
map.set(1, '值'); // 返回map集合
map.set('2', '值');
map.set(true, '值');
map.set({a: 1}, '值');
map.set([2], '值');
map.set(tempMapObj, '值');
map.set(tempMapArr, '值');

map.has(1); // true
map.has('2'); // true
map.has(true); // true
map.has({a: 1}); // false 地址不同
map.has([2]); // false 地址不同
set.has(tempMapObj); // true
set.has(tempMapObj); // true

map.get(1); // '值'
map.get('2'); // '值'
map.get(true); // '值'
map.get({a: 1}); // '值'
map.get([2]); // '值'

map.delete(1); // 可以使用clear 删除所有
map.delete([2]); // 这里删不掉 因为不是同一个array 引用不同
map.delete(tempMapObj); // 这里成功删除

map.length; // 5
map.keys(); // [Map Iterator] { '2', true, { a: 1 }, [ 2 ], [ 2 ] } map允许存储任何类型的唯一key(基本类型判断值 复杂类型判断地址)和值 元素为[key, value]格式
map.values(); // [Map Iterator] { '值', '值', '值', '值', '值' }
for (const iterator of map) {
  let [key, value] = iterator;
  if (key === '2') {
    console.log('iterator', iterator); // [ '2', '值' ]
  }
}
Array.from(map); // [[ '2', '值' ],[ true, '值' ],[ { a: 1 }, '值' ],[ [ 2 ], '值' ],[ [ 2 ], '值' ]]

/* es5 */
// 静态方法
Array.isArray([]); // true 判断一个对象是否为数组 也可以使用Object.prototype.toString.call([])正则截取字符串

// 原型方法
[1, 2, 3].concat(1, [2]); // [1,2,3,1,2] 连接多个数组(不改变原数组) 如果元素不是数组也会合并 数组元素是基本类型则为深克隆 反之为浅克隆
[1, 2, 3].join('-'); // 1-2-3 把数组中的所有元素转换一个字符串 反之字符串转数组str.split("-")
[1, 2, 3].toString(); // 1,2,3 把数组中的所有元素转换一个字符串 默认用逗号
[1, 2, 3].indexOf(1, 2); // -1 从2索引ltr开始判断一个数组是否包含1 包含返回索引 不包含返回-1
[1, 2, 3].lastIndexOf(1, 2); // 0 从2索引rtl开始判断一个数组是否包含1 包含返回索引 不包含返回-1
[1, 2, 3].every(ele => { return ele > 1; }); // false 检测数组中的所有元素是否都符合条件
[1, 2, 3].some(ele => { return ele > 1; }); // true 检测数组中是否有一个或多个元素符合条件
[1, 2, 3, 1, 2].filter(ele => { return ele > 1; }); // [2,3] 不改变原数组 返回一个符合条件的数组 重复元素只返回一次
[1, 2, 3].forEach((ele, index, arr) => { console.log(ele, index, arr); }, this); // 遍历数组 ele数组元素 index索引 arr原数组 this代表回调函数的this指向
[1, 2, 3].map((ele, index, arr) => { return ele + 1; }, this); // [2,3,4] 不改变原数组 遍历数组 返回新数组 浅拷贝 ele数组元素 index索引 arr原数组 this代表回调函数的this指向
[1, 11, 3, 12].sort((a, b) => { return a - b; }); // [1,3,11,12] 对数组的元素进行数字升序
[1, 11, 3, 12].sort((a, b) => { return b - a; }); // [12,11,3,1] 对数组的元素进行数字降序
[1, 11, 3, 12].sort(); // [1,11,12,3] 对数组的元素进行字母排序
[1, 2, 3].reduce((start, ele, index, arr) => { console.log(ele, index, arr); return start + ele; }); // 6 方法接收一个函数作为累加器 从左到右最终计算为一个值 start初始值, ele当前元素, index当前索引, arr原数组 第二个参数为初始值
[1, 2, 3].reduceRight((start, ele, index, arr) => { console.log(ele, index, arr); return start + ele; }); // 6 方法接收一个函数作为累加器 从右到左最终计算为一个值 start初始值, ele当前元素, index当前索引, arr原数组 第二个参数为初始值
[1, 2, 3].push(3); // 返回4 原数组改为[1,2,3,3] 向数组的末尾添加一个或更多元素 返回数组长度
[1, 2, 3].pop(); // 返回3  原数组改为[1,2] 删除数组最后一个元素 返回删除元素
[1, 2, 3].unshift(0); // 返回4 原数组改为[0,1,2,3] 向数组的头部添加一个或更多元素 返回数组长度
[1, 2, 3].shift(); // 返回1 原数组改为[2,3] 删除数组第一个元素 返回删除元素
[1, 2, 3].slice(1, 2); // [2] 从1索引返回(2-1)个选定的元素 返回新数组 不改变原数组 浅拷贝
[1, 2, 3].splice(0, 1, 1, 2); // 返回1 原数组改为[1,2,2,3] 从0索引开始删除1个元素并插入1,2两个元素 返回删除元素

/* es6+ */

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

function restDemo(first, ...other) { console.log(first); console.log(other); } // rest参数
restDemo('one', 'two', 'three'); // one [ 'two', 'three' ]

let newArr = [], newArr1 = [];
newArr1 = newArr.concat([4, 5, 6]); // newArr1为[4,5,6] concat方法
newArr1 = [...newArr, ...[4, 5, 6]]; // newArr1为[4,5,6] rest剩余参数 可以替换concat方法

Math.max.apply(null, [14, 3, 77]); // 77 apply方法取最大数
Math.max(...[14, 3, 77]); // 77 rest剩余参数模拟一个一个的传参 可替代apply

newArr = [];
Array.prototype.push.apply(newArr, [1, { a: 1 }, 3]); // newArr为[1,{a: 1},3] apply方法push

newArr = [];
newArr.push(...[1, { a: 1 }, 3]); // newArr为[1,{a: 1},3] spread扩展运算 可以替换for循环push以及apply方法push

newArr1 = [...newArr];
newArr[0] = 3;
newArr[1].a = 2; // newArr[3,{a: 2},3] newArr1为[1,{a: 2},3] 数组元素为简单类型元素 则为深克隆 复杂类型元素则为浅克隆

// 静态方法
Array.of(); // Array.of() 将一组参数值转换成数组 []
Array.of(1); // [1]
Array.of(1, 2); // [1,2]
Array.of(undefined); // [undefined]
Array.from( 'hxy', ele => { return ele + 1; }, this ); // ["h1","x1","y1"] 将类数组转换为真数组 对拥有length属性的对象或可迭代的对象来返回一个数组 浅拷贝
Array.from({ length: 2 }, () => '98'); // ["98","98"];
Array.from({ 0: '00', 1: '01', length: 3 }); // [ '00', '01', undefined ];
Array.apply(null, { 0: '00', 1: '01', length: 3 }); // [ '00', '01', undefined ] es5方法转换类数组 利用arguments
Array.prototype.concat.apply([], { 0: '00', 1: '01', length: 3 }); // [ '00', '01', undefined ] es5方法转换类数组 利用this

// 原型方法
newArr = [1, 2, 3].entries(); // 返回一个新的Array Iterator对象 该对象包含数组中每个索引的键/值对
newArr.next(); // { value: [ 0, 1 ], done: false }
newArr.next(); // { value: [ 1, 1 ], done: false }
newArr.next(); // { value: [ 2, 2 ], done: false }
newArr.next(); // { value: undefined, done: true }
newArr = [1, 2, 3].keys(); // 返回一个新的Array Iterator对象 该对象包含数组中每个键(索引)
newArr.next(); // { value: 0, done: false }
newArr.next(); // { value: 1, done: false }
newArr.next(); // { value: 2, done: false }
newArr.next(); // { value: undefined, done: true }
newArr = [1, 2, 3].values(); // 返回一个新的Array Iterator对象 该对象包含数组中每个键对应的值
newArr.next(); // { value: 1, done: false }
newArr.next(); // { value: 2, done: false }
newArr.next(); // { value: 3, done: false }
newArr.next(); // { value: undefined, done: true }

[1, 2, 3, 4, 5].copyWithin(0, 3, 4); // [ 4, 2, 3, 4, 5 ] 将指定位置的元素复制/覆盖到其他位置 从index为3位置 复制1(4-3)个元素到 index为0位置

new Array(5).fill(0); // [0,0,0,0,0] 将数组元素都填充0 改变原数组
[1, 2, 3].fill(0); // [0,0,0] 将数组元素都填充0 改变原数组
['a', 'b', 'c'].fill(7, 1, 2); // ['a', 7, 'c'] 从index为1位置 填充1(2-1)个元素7 改变原数组
Array.apply(null, Array(5)).map((x) => 0); // [0,0,0,0,0] es5填充数组 注意不能直接使用 Array(5).map((x) => 0) 因为值为empty会被忽略掉
Array.from(Array(5), (x) => 0); // [0,0,0,0,0] es5填充数组

['a', 'b', 'c'].reverse(); // ["c","b","a"] 将数组中元素的位置颠倒 并返回该数组 改变原数组

[1, 2, 3].find(ele => { return ele > 1; }); // 2 返回第一个符合条件的元素 返回元素
[1, 2, 3].findIndex(ele => { return ele > 0; }); // 0 返回第一个符合条件的元素的索引 返回索引

[1, 2, 3].includes(1, 2); // false 从2索引开始判断一个数组是否包含1 包含返回true 不包含返回false
[1, 2, NaN].includes(NaN); // true

[1, 2, [3, 4]].flat(); // [1,2,3,4] 默认"拉平"1层 也可以使用 Array.prototype.concat.apply([],[1, 2, [3, 4]])
[1, 2, [3, [4, 5]]].flat(2); // [1,2,3,4,5] "拉平"2层
[1, 2, [3, [4, 5]]].flat(Infinity); // [1,2,3,4,5] "拉平"所有
['it\'s Sunny in', '', 'California'].flatMap(x => x.split(' ')); // ["it's","Sunny","in", "", "California"] 使用映射函数映射每个元素 然后将结果压缩成一个新数组

/* 数组对象互转 */

// 对象转数组
Object.values({ one: 1, two: 2, three: 3 }); // 对象值转数组 [ 1, 2, 3 ]
Object.entries({ one: 1, two: 2, three: 3 }); // 对象参数和值转数组 [ [ 'one', 1 ], [ 'two', 2 ], [ 'three', 3 ] ]

// 数组转对象
Object.fromEntries( [ { id: '1998090901', text: '一' }, { id: '1998090902', text: '二' }, { id: '1998090903', text: '三' } ].map(item => [item.id, item]) );
/* { '1998090901': { id: '1998090901', text: '一' }, '1998090902': { id: '1998090902', text: '二' }, '1998090903': { id: '1998090903', text: '三' } } */
({ ...[ { id: '1998090901', text: '一' }, { id: '1998090902', text: '二' }, { id: '1998090903', text: '三' } ] });
/* { '0': { id: '1998090901', text: '一' }, '1': { id: '1998090902', text: '二' }, '2': { id: '1998090903', text: '三' } } spread扩展运算 */

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

/**
 * 数组去重(不会破坏已有排序 利用对象属性不重复)
 *
 * @param {Array} arr 源数组
 *
 * @returns {Array} 返回去重数组(保留一个重复元素 取第一个位置)
 */
function distinctOfObj(arr) {
  let result = [],
    obj = {};
  for (let i of arr) {
    if (!obj[i]) {
      result.push(i);
      obj[i] = 1;
    }
  }
  return result;
}

/**
 * 数组去重(不会破坏已有排序 set数据结构 类似于数组但是成员的值都是唯一的)
 *
 * @param {Array} arr 源数组
 *
 * @returns {Array} 返回去重数组(保留一个重复元素 重复取第一个位置)
 */
function distinctOfSet(arr) {
  return Array.from(new Set(arr));
}

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
  if (!key) {
    return arr.filter(item => removeArr.indexOf(item) == -1);
  }
  return arr.filter(item => removeArr.indexOf(item[key]) == -1);
}

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
    newArray.push(array.slice(index, (index += num)));
  }
  return newArray;
}

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
    newArray.push(array.slice(index, (index += number)));
  }
  return newArray;
}

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

console.log(distinctOfObj([1, 2, 3, 1, 2]));

console.log(distinctOfSet([1, 2, 3, 1, 2]));
console.log(distinctOfSet([1, 2, 3, 1, [1, 4]]));
console.log(distinctOfSet([1, 2, 3, 1, { a: 1 }]));

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

console.log(
  compareArray(['3', '11', '21', '1'], ['1', '11', '21', '3'], false)
);
console.log(compareArray(['3', '11', '21', '1'], ['1', '11', '21', '3']));

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

// 这里生成7位数组 分割长度为16
console.log(splitOfElementLength(array, 16));