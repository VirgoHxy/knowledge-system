//// 解构赋值
// 解构数组
let [a, b, c] = [1, 2, 3];
let [head, ...tail] = [1, 2, 3, 4];
let [foo = true] = [];// 默认值
let [x = 1, y = x] = [];// 变量默认值
console.log(a, b, c); // 1 2 3
console.log(head, tail); // 1 [ 2, 3, 4 ]
console.log(foo); // true
console.log(x, y); // 1 1
[a, b] = [b, a]; // 交换值
console.log(a, b); // 2 1
// 解构对象
let { bar, baz } = { baz: 'aaa', bar: 'bbb' };
// foo的值赋给bac foo是匹配模式 bac才是值
let { foo: bac } = { foo: 'aaa', bar: 'bbb' };
// 嵌套赋值
let obj = {};
let arr = [];
({ foo: obj.prop, bar: arr[0] } = { foo: 123, bar: true });
// 默认值
let { bad = 123 } = {};
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
function objectDemo({ x, y } = { x: 0, y: 0 }) {
  // 解构数组函数参数 并给默认值(防止无参数报错)
  console.log(x, y);
}
objectDemo(); // 0 0
objectDemo({ x: 1, y: 2 }); // 1 2

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
//length属性 预期传入的参数的个数
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
console.log([1,2,3].map((x) => { return x * x;})); // [ 1, 4, 9 ]
console.log([1,2,3].map((x) => x * x)); // [ 1, 4, 9 ]
console.log([1,2,3].map((x) => ({num: x * x}))); // [ { num: 1 }, { num: 4 }, { num: 9 } ]