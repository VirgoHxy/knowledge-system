/* 操作符 */
// 空值合并(es2020 需要babel转换) a ?? b; 如果a不是null或undefined 则为a 其他情况 则为b
let x = 1 ?? 2; // 1
let x1 = null ?? 2; // 2
let x2 = undefined ?? 2; // 2
let x3 = undefined ?? null; // null

// 可选链(es2020 需要babel转换) 访问嵌套对象属性的防错误方法
let x4 = {};
// y?.a; // 报错 可选链左侧必须声明
x4.a?.b; // 不报错 undefined
x4.admin?.(); // 不报错 调用可能不存在的admin
x4.a?.['x-y']; // 不报错 undefined

// 指数幂
4 ** 3 == Math.pow(4, 3); // 64

// 取整 只对 32 位整数有效
~~6.8 == Math.trunc(6.8); // 6
~~-6.8 == Math.trunc(6.8); // -6

// spread展开语法 rest其余参数
let obj = { a: 1 };
let arr = [0, 1, 2];
let newObj, newArr;

// spread深克隆 如果对象或者数组只有一层就是深克隆
newObj = { ...obj }; // { a: 1 }
newArr = [...arr]; // [ 0, 1, 2 ]

// spread可迭代对象
[...'hcy']; // ["h","c","y"]
({ ...'hcy' }); // { '0': 'h', '1': 'c', '2': 'y' }
console.log(...'hcy'); // h空格c空格y
Math.max(...[1, 2, 3], ...[4, 5, 6]); // 6

/* 函数方法 */
// 定时器可传参
setTimeout((a, b, c) => {
  console.log(a + b + c); // 当前文件js执行完成后 6
}, 1000, 1, 2, 3);

// rest搜集剩余参数到数组
// 反面示例
function sumAllx(num1, num2, num3, num4, num5, num6) {
  return num1 + num2 + num3 + num4 + num5 + num6;
}
// 推荐使用
function sumAll(...args) {
  // 数组名为 args
  let sum = 0;
  for (let arg of args) sum += arg;
  return sum;
}
sumAllx(1, 2, 3, 4, 5, 6); // 21
sumAll(1, 2, 3, 4, 5, 6); // 21

// 命名函数表达式 允许在函数内部调用func 在函数外部不可见
let sayHi = function func(who) {
  if (who) {
    console.log(`Hi ${who}`);
  } else {
    func('Anyone');
  }
};
sayHi(); // Hi Anyone
// eslint-disable-next-line no-undef
try { func(); } catch (error) { /* func is not defined */ }

// 这是个通用函数
function mul(a, b) {
  return a * b;
}
// 偏函数 这是个通用性较低的通用函数变体
let triple = mul.bind(null, 3);
console.log(triple(3)); // 9
console.log(triple(4)); // 12
console.log(triple(5)); // 15

// 柯里化(只允许柯里化确定参数长度的函数) 目的:参数复用/延迟执行
function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function (...args1) {
        return curried.apply(this, args.concat(args1));
      };
    }
  };
}
function sum(a, b, c) {
  return a + b + c;
}
let currySum = curry(sum);
currySum(2); // [Function (anonymous)]
currySum(2)(4); // [Function (anonymous)]
currySum(2)(4)(8); // 14
currySum(2,4)(8); // 14
try { currySum(2)(4)(8)(16); /* 报错 */} catch (error) { /* currySum(...)(...)(...) is not a function */ }

// 不限制参数 但是对柯里化的方法有要求(能够处理不同参数长度的逻辑)
function flexCurry(func) {
  return function curried(...args) {
    return function (...args2) {
      if (args2.length != 0) {
        return curried.apply(this, args.concat(args2));  
      } else {
        return func.apply(undefined, args);
      }
    };
  };
}
function flexSum() {
  return [...arguments].reduce((start, ele) => start + ele);
}
let flexCurrySum = flexCurry(flexSum);
flexCurrySum(2)(4)(8)(16)(32)(); // 62
let sumFn1 = flexCurrySum(2)(4)(8)(16)(32);
let sumFn2 = flexCurrySum(1)(3)(7)(15)(31);
let sumFn3 = flexCurrySum(3,5,6)(14,30);
let sumFn2_3 = sumFn2(3,5,6)(14,30);
sumFn1() + sumFn2() + sumFn3(); // 177
sumFn1() + sumFn2_3(); // 177