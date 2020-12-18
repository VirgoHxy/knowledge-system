// // 空值合并(es2020 需要babel转换) a ?? b; 如果a不是null或undefined 则为a 其他情况 则为b
// var x = 1 ?? 2; // 1
// console.log(x);
// var x = null ?? 2; // 2
// console.log(x);
// var x = undefined ?? 2; // 2
// console.log(x);
// var x = undefined ?? null; // null
// console.log(x);
// // 可选链(es2020 需要babel转换) 访问嵌套对象属性的防错误方法
// var x = {};
// y?.a // 报错 可选链左侧必须声明
// x.a?.b // 不报错 undefined
// x.admin?.() // 不报错 调用可能不存在的admin
// x.a?.["x-y"] // 不报错 undefined
// 指数幂
console.log(Math.pow(4, 3)); // 64
console.log(4 ** 3); // 64
// 取整 只对 32 位整数有效
console.log(Math.floor(6.8)); // 6
console.log(Math.ceil(6.8)); // 7
console.log(~~6.8); // 6
console.log(Math.floor(-6.8)); // -7
console.log(Math.ceil(-6.8)); // -6
console.log(~~-6.8); // -6
// spread展开语法 rest其余参数
var obj = { a: 1 };
var arr = [0, 1, 2];
// spread深克隆
console.log((newObj = { ...obj })); // { a: 1 }
console.log((newArr = [...arr])); // [ 0, 1, 2 ]
newObj.a = 2;
newArr.push(3);
console.log(newObj); // { a: 2 }
console.log(newArr); // [ 0, 1, 2, 3 ]
// spread可迭代对象
console.log([..."hcy"]); // ["h","c","y"]
console.log({ ..."hcy" }); // { '0': 'h', '1': 'c', '2': 'y' }
console.log(..."hcy"); // h空格c空格y
console.log(Math.max(...[1, 2, 3], ...[4, 5, 6])); // 6
// 反面示例
function sumAll(num1, num2, num3, num4, num5, num6) {
  return num1 + num2 + num3 + num4 + num5 + num6;
}
// rest搜集剩余参数到数组
function sumAll(...args) {
  // 数组名为 args
  let sum = 0;
  for (let arg of args) sum += arg;
  return sum;
}
console.log(sumAll(1, 2, 3, 4, 5, 6)); // 21
