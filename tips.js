function f1(a) { }
let f2 = function (a, b) { }
let obj = { many: function (a, b, ...more) { } }

// 函数name
console.log(f1.name); // f1
console.log(f2.name); // f2
console.log(obj.many.name); // many

// 函数length
console.log(f1.length); // 1
console.log(f2.length); // 2
console.log(obj.many.length); // 2 没有计算rest参数

// 函数自定义属性
function makeCounter() {
  function counter() {
    return ++counter.count;
  };
  counter.count = 0;
  return counter;
}

let counter = makeCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
console.log(counter.count = 10); // 10

// 命名函数表达式 允许在函数内部调用func 在函数外部不可见
let sayHi = function func(who) {
  if (who) {
    console.log(`Hi ${who}`);
  } else {
    func("Anyone")
  }
};
sayHi() // Hi Anyone
try {
  func() // error: func is not defined
} catch (error) {
  console.log(error)
}

// 定时器可传参
setTimeout((a, b, c) => {
  console.log(a + b + c) // 当前文件js执行完成后 6
}, 1000, 1, 2, 3);

// apply call
var worker = {
  someMethod() {
    return 1;
  },
  slow(x) {
    return x * this.someMethod();
  }
};
var func = worker.slow;
try {
  console.log(func(1)); // error: this.someMethod is not a function
} catch (error) {
  console.log(error)
}
// 设定上下文 传入参数
console.log(func.call(worker, 1)); // 1
console.log(func.apply(worker, [1])); // 1

// 方法借用
(function () {
  try {
    // arguments是类数组结构
    console.log(arguments.join()) // error: arguments.join is not a function
  } catch (error) {
    console.log(error)
  }
  console.log([].join.call(arguments,"-")) // 1-2-3
})(1, 2, 3)

// bind
// 设定上下文 bind是硬绑定 没办法修改 不能被重新绑定
var worker1 = {
  someMethod() {
    return 2;
  },
  slow(x) {
    return x * this.someMethod();
  }
};
var bindWorker1 = worker.slow.bind(worker1);
console.log(bindWorker1(1)); // 2
console.log(bindWorker1.bind(worker)(1)); // 2

// 这是个通用函数
function mul(a, b) {
  return a * b;
}
// 偏函数 这是个通用性较低的通用函数变体
let triple = mul.bind(null, 3);

console.log(triple(3)); // 9
console.log(triple(4)); // 12
console.log(triple(5)); // 15

// Generator函数 函数调用时候返回Object Generator
function* generateSequence() {
  yield 1;
  yield 2;
  return 3; // 这个值在 for of 循环、spread语法中不会返回(因为done为true) 要返回请用 yield
}
let generator = generateSequence();
console.log(generator); // Object [Generator] {}
console.log(generator.next()); // { value: 1, done: false }
console.log(generator.next().value); // 2
console.log(generator.next().value); // 3 { value: 3, done: true }
console.log(generator.next().value); // undefined { done: true }
let generator1 = generateSequence();
for (const iterator of generator1) {
  console.log(iterator);
}
let generator2 = generateSequence();
console.log([...generator2]);