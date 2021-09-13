//// 解构赋值
// 解构数组
let [a, b, c] = [1, 2, 3];
let [head, ...tail] = [1, 2, 3, 4]; // rest 剩余参数
let [foo = true] = []; // 默认值
let [x = 1, y = x] = []; // 变量默认值
console.log(a, b, c); // 1 2 3
console.log(head, tail); // 1 [ 2, 3, 4 ]
console.log(foo); // true
console.log(x, y); // 1 1
[a, b] = [b, a]; // 交换值
console.log(a, b); // 2 1
// 解构对象
let {
  bar,
  baz
} = {
  baz: 'aaa',
  bar: 'bbb'
};
// foo的值赋给bac foo是匹配模式 bac才是值
let {
  foo: bac
} = {
  foo: 'aaa',
  bar: 'bbb'
};
// 嵌套赋值
let obj = {};
let arr = [];
({
  foo: obj.prop,
  bar: arr[0]
} = {
  foo: 123,
  bar: true
});
// 默认值
let {
  bad = 123
} = {};
console.log(bar, baz); // bbb aaa
console.log(bac); // aaa
console.log(obj.prop); // 123
console.log(arr); // [ true ]
console.log(bad); // 123
// 解构函数参数
function arrayDemo([x, y] = [0, 0]) {
  // 解构对象函数参数 并给默认值(防止无参数报错)
  console.log(x, y);
}
arrayDemo(); // 0 0
arrayDemo([1, 2]); // 1 2
function objectDemo({
  x,
  y
} = {
  x: 0,
  y: 0
}) {
  // 解构数组函数参数 并给默认值(防止无参数报错)
  console.log(x, y);
}
objectDemo(); // 0 0
objectDemo({
  x: 1,
  y: 2
}); // 1 2

//// 字符串es6方法
// 是否包含
let str = 'Hello world!';
console.log(str.includes('h')); // false
console.log(str.includes('H')); // true
// 清除空格 这里用&nbsp;代表空格
console.log('  123 123 123  '.trimStart()); // 123&nbsp;123&nbsp;123&nbsp;&nbsp;
console.log('  123 123 123  '.trimEnd()); // &nbsp;&nbsp;123&nbsp;123&nbsp;123
console.log('  123 123 123  '.trim()); //es5方法 123&nbsp;123&nbsp;123
// 替换函数 replaceAll必须携带g修饰符
// console.log('  123 123 123  '.replaceAll(' ', '')); // 123123123
// console.log('  123 123 123  '.replaceAll(/d/g, '')); // &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
console.log('  123 123 123  '.replace(/\s/g, '')); //es5方法 123123123

//// 数字es6方法
// 判断NaN
console.log(Number.isNaN(1 * 'qwe')); // true
// 判断正常的数值
console.log(Number.isFinite(Infinity)); // false
console.log(Number.isFinite(NaN)); // false
console.log(Number.isFinite("")); // false
console.log(Number.isFinite(true)); // false
// 是否为整数 判断精度要求极高不能使用这个方法
Number.isInteger(25.1); // false
// 将全局方法移植到Number对象 无差别
Number.parseInt('12.34'); // 12
Number.parseFloat('123.45#'); // 123.45

//// 函数
// 参数默认值不是传值的 而是每次都重新计算默认值表达式的值
// 就是说p不是在函数声明时就固定了 而是在调用时计算得出 也就是惰性求值
function demo(p = a + 1) {
  console.log(p);
}
a = 1;
demo(); // 2
a = 2;
demo(); // 3
// length属性 预期传入的参数的个数
console.log((function (a = 5) {}).length); // 0
// a,b参数
console.log((function (a, b, c = 5) {}).length); // 2
// b,c参数从预期传入参数去除
console.log((function (a = 5, b, c) {}).length); // 0
// rest 参数
function restDemo(first, ...other) {
  console.log(first);
  console.log(other);
}
restDemo("one", "two", "three"); // one [ 'two', 'three' ]
// 箭头函数 没有自己的this 不可以当作构造函数 不可以使用arguments对象 不可以使用yield命令
console.log([1, 2, 3].map((x) => {
  return x * x;
})); // [ 1, 4, 9 ]
console.log([1, 2, 3].map((x) => x * x)); // [ 1, 4, 9 ]
console.log([1, 2, 3].map((x) => ({
  num: x * x
}))); // [ { num: 1 }, { num: 4 }, { num: 9 } ]

//// 数组
// spread 扩展运算符
let arr1 = [1, 2, 3];
let arr2 = [];
arr2.push(...arr1); // 扩展运算
console.log(arr2); // [1, 2, 3]
// (...[1, 2, 3])
// Uncaught SyntaxError: Unexpected number 函数调用才能加圆括号()
// console.log((...[1, 2, 3]))
// Uncaught SyntaxError: Unexpected number 函数调用才能加圆括号()
console.log(...[1, 2, 3]); // 1 2 3
// 克隆
let arr3 = [...arr1]; // 深克隆
let arr4 = arr1;
let [...arr5] = arr1; // 深克隆
arr1[0] = 3;
arr1.push(4);
console.log(arr1); // [3, 2, 3, 4]
console.log(arr3); // [ 1, 2, 3 ]
console.log(arr4); // [3, 2, 3, 4]
console.log(arr5); // [ 1, 2, 3 ]
// concat
let arrObj = {
  a: 1
};
let arr6 = [arrObj];
let arr7 = arr5.concat(arr6); // es5
let arr8 = [...arr5, ...arr6];
console.log(arr7); // [ 1, 2, 3, { a: 1 } ]
console.log(arr8); // [ 1, 2, 3, { a: 1 } ]
console.log(arr7[arr7.length - 1] === arr8[arr8.length - 1]); // true
// 替代apply
function fn(x, y, z) {
  console.log(x, y, z);
}
fn.apply(null, [1, 2, 3]); // 1,2,3 -- es5 apply
fn(...[1, 2, 3]); // 1,2,3
console.log(Math.max.apply(null, [14, 3, 77])); // 77 -- es5 apply
console.log(Math.max(...[14, 3, 77])); // 77
let arr9 = [1, 2];
let arr10 = [3];
Array.prototype.push.apply(arr9, arr10); // es5 apply
arr9.push(...arr10);
console.log(arr9); // [ 1, 2, 3, 3 ]
console.log(new(Date.bind.apply(Date, [null, 1998, 8, 9]))); // 1998-09-08T16:00:00.000Z -- es5 apply
console.log(new Date(...[1998, 8, 9])); // 1998-09-08T16:00:00.000Z
// Array.from() 将类数组转换为真数组
console.log(Array.from({
  length: 2
}, () => '98')); // [ '98', '98' ]
console.log(Array.from({
  0: "00",
  1: "01",
  length: 2
})); // [ '00', '01' ]
console.log(Array.from({
  0: "00",
  1: "01",
  length: 3
})); // [ '00', '01', undefined ]
// Array.of() 将一组参数值转换成数组
console.log(Array()); // []
console.log(Array(3)); // [ <3 empty items> ]
console.log(Array(3, 11, 8)); // [3,11,8]
console.log(Array.of()); // []
console.log(Array.of(1)); // [1]
console.log(Array.of(1, 2)); // [1,2]
console.log(Array.of(undefined)); // [undefined]
// 实例.copyWithin(target, start, end) 将指定位置的元素复制/覆盖到其他位置
console.log([1, 2, 3, 4, 5].copyWithin(0, 3, 4)); // [ 4, 2, 3, 4, 5 ] -- 从index为3位置 复制1(4-3)个元素到 index为0位置
// 实例.find(fn) 找出第一个符合条件的数组元素
console.log([{
  id: 1
}, {
  id: 2
}, {
  id: 3
}, {
  id: 4
}, {
  id: 5
}].find((ele) => ele.id == 4)); // { id: 4 }
// 实例.findIndex(fn) 找出第一个符合条件的数组元素index
console.log([{
  id: 1
}, {
  id: 2
}, {
  id: 3
}, {
  id: 4
}, {
  id: 5
}].findIndex((ele) => ele.id == 4)); // 3
// 实例.fill(target, start, end) 指定位置填充数组
console.log(['a', 'b', 'c'].fill(7)); // [7, 7, 7]
console.log(new Array(3).fill(7)); // [7, 7, 7]
console.log(['a', 'b', 'c'].fill(7, 1, 2)); // ['a', 7, 'c'] -- 从index为1位置 填充1(2-1)个元素7
// 实例.includes(target) 某个数组是否包含给定的值
console.log([1, 2, 3].includes(2)); // true
console.log([1, 2, 3].includes(4)); // false
console.log([1, 2, NaN].includes(NaN)); // true
// 实例.flat(level) 将嵌套的数组"拉平"，变成一维的数组
console.log([1, 2, [3, 4]].flat()); //[1,2,3,4] -- 默认"拉平"1层
console.log([1, 2, [3, [4, 5]]].flat(2)); //[1,2,3,4,5] -- "拉平"2层
console.log([1, 2, [3, [4, 5]]].flat(Infinity)); //[1,2,3,4,5] -- "拉平"所有
console.log(Array(3)[0]);