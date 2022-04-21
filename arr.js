// Array extends Function;Array extends Object;数组类继承方法类和对象类
Array(); // [] Array是数组构造函数
new Array(); // [] 空数组
Array('3'); // [ '3' ]
Array(...'abc'); // [ 'a', 'b', 'c' ] 等同于 [..."abc"]
Array(3); // [ <3 empty items> ] Array只有一个参数可以设置带长度的空值数组
Array(1000); // [ <1000 empty items> ] Array(1000)[0]为undefined 不能说明是元素为undefined的长度为1000的数组 这种数组为稀疏数组(包含empty值)
Array(3, 11, 8); // [3,11,8] 多个参数会作为元素作为一个数组
Array(3, 3, 3); // [3,3,3] 可以使用Array(3).fill(3), Array.from({length: 3}, ele => 3)
Array() instanceof Array; // true
Array() instanceof Object; // true

// Set extends Function;Set extends Object;值集合类继承方法类和对象类 weakSet的值只能是对象引用 如果引用被垃圾回收 weakSet的值也会被清除 而且weakSet不能被枚举
let set = new Set(),
  tempSetObj = { a: 1 },
  tempSetArr = [2];
set.add(1); // 返回set集合
set.add('2');
set.add(true);
set.add({ a: 1 });
set.add([2]);
set.add(tempSetObj);
set.add(tempSetArr);

set.has(1); // true
set.has('2'); // true
set.has(true); // true
set.has({ a: 1 }); // false 地址不同
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
let map = new Map(),
  tempMapObj = { a: 1 },
  tempMapArr = [2];
map.set(1, '值'); // 返回map集合
map.set('2', '值');
map.set(true, '值');
map.set({ a: 1 }, '值');
map.set([2], '值');
map.set(tempMapObj, '值');
map.set(tempMapArr, '值');

map.has(1); // true
map.has('2'); // true
map.has(true); // true
map.has({ a: 1 }); // false 地址不同
map.has([2]); // false 地址不同
set.has(tempMapObj); // true
set.has(tempMapObj); // true

map.get(1); // '值'
map.get('2'); // '值'
map.get(true); // '值'
map.get({ a: 1 }); // '值'
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

// 原型属性
[1, 2, 3].length; // 3 数组长度 可以手动设置数组的长度(意味着writable为true) 如果设置的长度大于实际长度 将会用empty填充 反之将会只保存设置长度的元素 其他元素会被删除
// 原型方法
[1, 2, 3].concat(1, [2]); // [1,2,3,1,2] 连接多个数组(不改变原数组) 如果元素不是数组也会合并 数组元素是基本类型则为深克隆 反之为浅克隆
Array.prototype.concat.apply([], { 0: 'a', 1: 'b', 2: 'c', length: 3 }); // ['a','b','c'] 类数组concat

[1, 2, 3].join('-'); // 1-2-3 把数组中的所有元素转换一个字符串 反之字符串转数组str.split("-")
Array.prototype.join.call({ 0: 'a', 1: 'b', 2: 'c', length: 3 }, '-'); // a-b-c 也可以转换类数组
[1, 2, 3].toString(); // 1,2,3 把数组中的所有元素转换一个字符串 默认用逗号

[1, 2, 3].indexOf(1); // 0 方法返回在数组中可以找到一个给定元素的第一个索引
[1, 2, 3].indexOf(1, 2); // -1 从2索引ltr开始判断一个数组是否包含1 包含返回第一个符合的索引 不包含返回-1
['1', 2, 3].indexOf(1, -1); // -1 index为负数表示是lastIndex 但字符串1 !== 数字1 所以还是返回-1
[1, 2, 3].lastIndexOf(1, 2); // 0 从2索引rtl开始判断一个数组是否包含1 包含返回第一个符合的索引(ltr的索引) 不包含返回-1

[1, 2, 3].push(3); // 返回4 原数组改为[1,2,3,3] 向数组的末尾添加一个或更多元素 返回数组长度
[1, 2, 3].pop(); // 返回3  原数组改为[1,2] 删除数组最后一个元素 返回删除元素
[1, 2, 3].unshift(0); // 返回4 原数组改为[0,1,2,3] 向数组的头部添加一个或更多元素 返回数组长度
[1, 2, 3].shift(); // 返回1 原数组改为[2,3] 删除数组第一个元素 返回删除元素
[1, 2, 3].splice(0, 1, 4, 5); // [1] 从0索引开始删除1个元素并插入4,5两个元素 返回删除元素数组(不删除返回空数组) 改变原数组 原数组改为[4,5,2,3]

[1, 2, 3].slice(1, 2); // [2] 从1索引到2索引[start, end) 截取返回(2-1)个选定的元素 返回新数组 不改变原数组
[1, 2, 3].slice(); // [1,2,3] start默认为0 end默认为length-1 数组元素为简单类型元素 则为深克隆 复杂类型元素则为浅克隆
Array.prototype.slice.call({ 0: 'a', 1: 'b', 2: 'c', length: 3 }); // ['a','b','c'] 类数组slice

// 下列原型中的循环方法 callback方法的参数 ele数组元素 index索引 arr原数组 循环方法还有一个参数this代表回调函数的this指向 如果callback为匿名函数(指定也无效)或者没有手动指定this(在非严格模式下为全局对象 在严格模式下为undefined)
[1, 2, 3].every((ele, index, arr) => {
  return ele > 1;
}); // false 检测数组中的所有元素是否都符合条件
Array(3).every((ele) => false); // true 数组中的empty元素不执行function内容 所以返回true 类似于商品购物没人买就是100%好评
// eslint-disable-next-line no-sparse-arrays
[, , 3].every((ele) => false); // false 有一个非empty元素 所以会执行一次function 返回false

[1, 2, 3].some((ele, index, arr) => {
  return ele > 1;
}); // true 检测数组中是否有一个或多个元素符合条件
Array(3).some((ele) => true); // false 数组中的empty元素不执行function内容 但some要求必须一次返回true 所以返回false
// eslint-disable-next-line no-sparse-arrays
[, , 3].some((ele) => true); // true 有一个非empty元素 所以会执行一次function 返回true

[1, 2, 3, 1, 2].filter((ele, index, arr) => {
  return ele > 1;
}); // [2,3] 不改变原数组 返回一个符合条件的数组 重复元素只返回一次
Array(3).filter(() => true); // [] 数组中的empty元素不执行function内容 所以返回空数组 数组的empty元素被过滤掉 数组长度也从3变成0
// eslint-disable-next-line no-sparse-arrays
[, , 3].filter((ele) => true); // true 有一个非empty元素 所以会执行一次function 返回[3]

[1, 11, 3, 12].sort((a, b) => {
  return a - b;
}); // [1,3,11,12] 对数组的元素进行数字升序 callback函数返回小于0(a小于b) a在b之前 反之(a大于b) b在a之前 相等 位置不变
[1, 11, 3, 12].sort((a, b) => {
  return b - a;
}); // [12,11,3,1] 对数组的元素进行数字降序
[1, 11, 3, 12].sort(); // [1,11,12,3] 对ASCII字母升序排序 1的ASCII是49 3的ASCII是51
['cliché', 'communiqué', 'café'].sort((a, b) => a.localeCompare(b)); // [ 'café', 'cliché', 'communiqué' ] 对非ASCII字母升序排序

[1, 2, 4].reduce((start, ele, index, arr) => {
  console.log(ele, index, arr);
  return start / ele;
}); // 0.125 方法接收一个函数作为累计运算 从左到右最终计算返回一个值
// reduce方法第一个参数callback函数有四个参数 start为设定的初始值或者上一个计算后的值, ele当前元素, index当前索引, arr原数组 第二个参数可以设置初始值
[1, 2, 4].reduceRight((start, ele, index, arr) => {
  console.log(ele, index, arr);
  return start / ele;
}); // 2 方法接收一个函数作为累计运算 从右到左最终计算为一个值
// reduce方法第一个参数callback函数有四个参数 start为设定的初始值或者上一个计算后的值, ele当前元素, index当前索引, arr原数组 第二个参数可以设置初始值

[1, 2, 3].forEach((ele, index, arr) => {
  console.log(ele, index, arr);
}); // 遍历数组 如果遍历需要删除元素或者终止循环 则不要使用forEach方法 使用filter方法或者for循环
[1, 2, 3].map((ele, index, arr) => {
  return ele + 1;
}); // [2,3,4] 不改变原数组 遍历数组并返回新数组 如果遍历需要删除元素 可以先filter再map 数组元素为简单类型元素 则为深克隆 复杂类型元素则为浅克隆

let person = [
  { name: 'lilei', age: '45' },
  { name: 'hanmeimei', age: '16' },
  { name: 'rose', age: '18' },
  { name: 'jack', age: '22' },
  { name: 'david', age: '25' },
  { name: 'bruce', age: '30' },
  { name: 'roby', age: '26' },
  { name: 'TMC', age: '11' },
  { name: 'lee', age: '40' },
];
let person1 = person.concat([]);
let person2 = person.concat([]);

// 两个for循环的思路 都是防止split影响length然后影响了index
for (let index = person1.length - 1; index >= 0; index--) {
  if (person1[index] && person1[index].age > 18) {
    person1.splice(index, 1);
  }
}

for (let index = 0; index < person2.length; index++) {
  if (person2[index] && person2[index].age > 18) {
    // index-- 先赋值 后计算
    person2.splice(index--, 1);
  }
}

let person3 = person.filter((ele) => ele.age <= 18);
/* person1, person2, person3 三个结果都是一样的
[
  { name: 'hanmeimei', age: '16' },
  { name: 'rose', age: '18' },
  { name: 'TMC', age: '11' }
]
*/

/* es6+ */

// 解构,...用例
let [a, b, c] = [1, 2, 3]; // a = 1;b = 2;c = 3; 解构数组
let [head, ...tail] = [1, 2, 3, 4]; // head = 1;tail = [2,3,4] rest剩余参数
let [foo = true] = []; // foo = true; 数组元素值为空的默认值
let [x = 1, y = x] = []; // x = 1;y = 1; 变量默认值
[a = 3, b = 4] = [b, a]; //a = 4;b = 3; 交换值

function arrayDemo([x = 0, y = 0] = []) {
  console.log(x, y);
} // 解构函数数组参数 并给数组元素默认值(防止无参数报错)
arrayDemo(); // x为0 y为0
arrayDemo([1, 2]); // x为1 y为2
arrayDemo([1]); // x为1 y为0

function arrayDemo1([x, y] = [0, 0]) {
  console.log(x, y);
} // 解构函数数组参数 并给数组默认值(防止无参数报错)
arrayDemo1(); // x为0 y为0
arrayDemo1([1, 2]); // x为1 y为2
arrayDemo1([1]); // x为1 y为undefined

function restDemo(first, ...other) {
  console.log(first);
  console.log(other);
} // rest参数
restDemo('one', 'two', 'three'); // one [ 'two', 'three' ]

let newArr = [],
  newArr1 = [];
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

Array.from('hxy', (ele) => {
  return ele + 1;
}); // ["h1","x1","y1"] 将类数组转换为真数组 对拥有length属性的对象或可迭代的对象来返回一个数组 如果对应索引key没有值value 会默认赋值undefined不是empty 数组元素为简单类型元素 则为深克隆 复杂类型元素则为浅克隆
Array.from({ length: 2 }, () => '98', this); // ["98","98"]; 第二个参数是map函数 第三个参数是map函数的this指向
Array.from({ 0: '00', 1: '01', length: 3 }); // [ '00', '01', undefined ];
// es6方法转换类数组
[...'abc']; // ['a', 'b', 'c'] 这个方法只适用可迭代的类数组
Object.setPrototypeOf({ 0: '00', 1: '01', length: 3 }, Array.prototype); // [ '00', '01', empty ] 这个区别与其他方法是没有值的元素是empty 而不是undefined
// es5方法转换类数组 利用apply将类数组当作arguments传入构造函数 利用源码中this.length进行for循环
Array.apply(null, { 0: '00', 1: '01', length: 3 }); // [ '00', '01', undefined ]
Array.prototype.concat.apply([], { 0: '00', 1: '01', length: 3 }); // [ '00', '01', undefined ]
Array.prototype.slice.apply({ 0: '00', 1: '01', length: 3 }); // [ '00', '01', undefined ]

// 原型方法
// [1,2,3].at(-1); // 3 获取index位置上的字符 如果为负数表示为lastIndex 不存在返回undefined(目前为实验方法 不推荐使用)

newArr = [1, 2, 3].entries(); // 返回一个新的Array Iterator对象 该对象包含数组中每个索引的键/值对
newArr.next(); // { value: [ 0, 1 ], done: false }
newArr.next(); // { value: [ 1, 2 ], done: false }
newArr.next(); // { value: [ 2, 3 ], done: false }
newArr.next(); // { value: undefined, done: true }
newArr = [1, 2, 3].keys(); // 返回一个新的Array Iterator对象 该对象包含数组中每个键(索引)
newArr.next(); // { value: 0, done: false }
newArr.next(); // { value: 1, done: false }
newArr.next(); // { value: 2, done: false }
newArr.next(); // { value: undefined, done: true }
newArr = [1, 2, 3].values(); // 返回一个新的Array Iterator对象 该对象包含数组中每个键对应的值 也可以使用[1, 2, 3][Symbol.iterator]()
newArr.next(); // { value: 1, done: false }
newArr.next(); // { value: 2, done: false }
newArr.next(); // { value: 3, done: false }
newArr.next(); // { value: undefined, done: true }
for (let e of [1, 2, 3].entries()) {
  console.log(e);
  /* 依次打印
    [ 0, 1 ]
    [ 1, 2 ]
    [ 2, 3 ]
  */
}

[1, 2, 3, 4, 5].copyWithin(0, 3, 4); // [ 4, 2, 3, 4, 5 ] 将指定位置的元素复制/覆盖到其他位置 从index为3位置到index为4位置[start,end) 复制元素到index为0位置
[].copyWithin.call({ length: 7, 3: 1 }, 0, 3); // {0: 1, length: 7} end默认为length 从[3,7)复制元素到index为0位置 index为3的值被index为6的值(empty)覆盖了
[1, 2, 3, 4, 5].copyWithin(-2, -3, -1); // [1, 2, 3, 3, 4] index都可以为负数 负数为lastindex

new Array(5).fill(0); // [0,0,0,0,0] 将数组元素都填充0 改变原数组 start默认为0 end默认为length
[1, 2, 3].fill(0); // [0,0,0] 将数组元素都覆盖为0 改变原数组
['a', 'b', 'c'].fill(7, 1, 2); // ['a', 7, 'c'] 填充元素 从index为1位置到index为2位置[start,end) 填充元素7 改变原数组
// es6填充数组
Array.from(Array(5), (x) => 0); // [0,0,0,0,0]
Array.from({ length: 5 }, (x) => 0); // [0,0,0,0,0]
// es5填充数组 循环方法需要注意将empty数组转换为undefined数组
Array.apply(null, Array(5)).map((x) => 0); // [0,0,0,0,0] 注意不能直接使用 new Array(5).map((x) => 0) 因为值为empty不会执行callback

[1, 2, 3].includes(1, 2); // false 从2索引开始判断一个数组是否包含1 包含返回true 不包含返回false
[1, 2, NaN].includes('', 10); // index大于数组长度 直接返回false
[1, 2, NaN].includes(NaN, -1); // true 可以进行判断NaN index小于0 默认为0
[-0, +0].includes(0); // true 符号0不区分

['a', 'b', 'c'].reverse(); // ["c","b","a"] 将数组中元素的位置颠倒 并返回原数组引用 改变原数组
Array.prototype.reverse.call({ length: 2, 0: 1, 1: 2 }); // { '0': 2, '1': 1, length: 2 } 类数组也可反转

[1, 2, [3, 4]].flat(); // [1,2,3,4] 默认"拉平"1层
[1, 2, [3, [4, 5]]].flat(2); // [1,2,3,4,5] "拉平"2层
[1, 2, [3, [4, 5]]].flat(Infinity); // [1,2,3,4,5] "拉平"所有
Array.prototype.concat.apply([], [1, 2, [3, 4]]); // "拉平"1层
let myFlat = (array) => {
  return array.reduce(
    (start, ele) =>
      Array.isArray(ele) ? start.concat(myFlat(ele)) : start.concat(ele),
    []
  );
};
myFlat([1, 2, [3, [4, [5, [6, 7]]]]]); // [1,2,3,4,5,6,7] 递归"拉平"所有层

// 下列原型中的循环方法 callback方法的参数 ele数组元素 index索引 arr原数组 循环方法还有一个参数this代表回调函数的this指向 如果callback为匿名函数(指定也无效)或者没有手动指定this(在非严格模式下为全局对象 在严格模式下为undefined)
[1, 2, 3].find((ele, index, array) => {
  return ele > 1;
}); // 2 返回第一个符合条件的元素 返回元素 否则返回undefined
[1, 2, 3].findIndex((ele, index, array) => {
  return ele > 0;
}); // 0 返回第一个符合条件的元素的索引 返回索引 否则返回-1

["it's Sunny in", '', 'California'].flatMap((ele, index, array) =>
  ele.split(' ')
); // ["it's","Sunny","in", "", "California"] 使用映射函数映射每个元素 然后将结果压缩成一个新数组
["it's Sunny in", '', 'California']
  .map((ele, index, array) => ele.split(' '))
  .flat(); // ["it's","Sunny","in", "", "California"]

/* 数组对象互转 */

// 对象转数组
Object.values({ one: 1, two: 2, three: 3 }); // 对象值转数组 [ 1, 2, 3 ]
Object.entries({ one: 1, two: 2, three: 3 }); // 对象键/值转二维数组 [ [ 'one', 1 ], [ 'two', 2 ], [ 'three', 3 ] ]

// 数组转对象
Object.fromEntries(
  [
    { id: '1998090901', text: '一' },
    { id: '1998090902', text: '二' },
    { id: '1998090903', text: '三' },
  ].map((item) => [item.id, item])
);
/* 先使用map返回key/value二维数组 再将数组转为对象
{ '1998090901': { id: '1998090901', text: '一' }, '1998090902': { id: '1998090902', text: '二' }, '1998090903': { id: '1998090903', text: '三' } }
 */
({
  ...[
    { id: '1998090901', text: '一' },
    { id: '1998090902', text: '二' },
    { id: '1998090903', text: '三' },
  ],
});
/* spread扩展运算
{ '0': { id: '1998090901', text: '一' }, '1': { id: '1998090902', text: '二' }, '2': { id: '1998090903', text: '三' } } 
*/

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
    return arr.filter((item) => removeArr.indexOf(item) == -1);
  }
  return arr.filter((item) => removeArr.indexOf(item[key]) == -1);
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
