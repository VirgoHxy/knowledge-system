/* 操作符 */
// 空值合并(es2020 需要babel转换) a ?? b; 如果a不是null或undefined 则为a 其他情况 则为b
let x = 1 ?? 2; // 1
let x1 = null ?? 2; // 2
let x2 = undefined ?? 2; // 2
let x3 = '' ?? undefined; // ''
let x4 = false ?? undefined; // false

// 可选链(es2020 需要babel转换) 访问嵌套对象属性的防错误方法
let y1 = {};
try {
  // eslint-disable-next-line no-undef
  y?.a; // 报错 可选链左侧必须声明
} catch (error) {
  console.log(error); // y is not defined
}
y1.a?.b; // 不报错 undefined
y1.admin?.(); // 不报错 调用可能不存在的admin
y1.a?.['x-y']; // 不报错 undefined

// 指数幂
4 ** 3 == Math.pow(4, 3); // 64

// 取整 只对 32 位整数有效
~~6.8 == Math.trunc(6.8); // 6
~~-6.8 == Math.trunc(6.8); // -6

// ...的两种应用 spread展开语法 rest其余参数
let obj = { a: 1 };
let arr = [0, 1, 2];
let newObj, newArr;

// spread深克隆 数组/对象元素是基本类型则为深克隆 反之为浅克隆
newObj = {...obj}; // { a: 1 }
newArr = [...arr]; // [ 0, 1, 2 ]

// spread可迭代对象
[...'hcy']; // ["h","c","y"]
({ ...'hcy' }); // { '0': 'h', '1': 'c', '2': 'y' }

// rest搜集剩余参数到数组
console.log(...'hcy'); // h空格c空格y
Math.max(...[1, 2, 3], ...[4, 5, 6]); // 6
function sumAllx(num1, num2, num3, num4, num5, num6) {
  // 反面示例
  return num1 + num2 + num3 + num4 + num5 + num6;
}
function sumAll(...args) {
  // 推荐使用
  // 数组名为 args
  let sum = 0;
  for (let arg of args) sum += arg;
  return sum;
}
sumAllx(1, 2, 3, 4, 5, 6); // 21
sumAll(1, 2, 3, 4, 5, 6); // 21

/* 函数方法 */
// 箭头函数 箭头函数没有自己的arguments和this 箭头函数的this在创建时候绑定的 有非箭头函数包裹箭头函数 箭头函数的this"继承"了那个非箭头函数的this 如果没有非箭头函数包裹箭头函数 浏览器中this指向window对象 node环境中module.exports
// node文件运行的this指向的是module.exports(模块化) 在全局作用域中声明的函数this指向的是global
let arrowFunc = {
  log: function () {
    console.log(this === module.exports); // false this是arrowFunc对象
  },
  arrowLog: () => {
    console.log(this === module.exports); // true
  },
  arrowLog1: () => {
    let demo = () => {
      console.log(this === module.exports); // true
    };
    demo();
  },
};
console.log(this === module.exports); // true
(function globalDemo() {
  console.log(this === global); // true
  (() => {
    console.log(this === module.exports); // false this是global对象
  })();
})();
(() => {
  console.log(this === module.exports); // true
})();
arrowFunc.log();
arrowFunc.arrowLog();
arrowFunc.arrowLog1();

// 定时器可传参
setTimeout(
  (a, b, c) => {
    console.log(a + b + c); // 当前文件js执行完成后 6
  },
  1000,
  1,
  2,
  3
);

// 命名函数表达式 允许在函数内部调用func 在函数外部不可见
let sayHi = function func(who) {
  if (who) {
    console.log(`Hi ${who}`);
  } else {
    func('Anyone');
  }
};
sayHi(); // Hi Anyone
try {
  // eslint-disable-next-line no-undef
  func();
} catch (error) {
  /* func is not defined */
}

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
currySum(2, 4)(8); // 14
try {
  currySum(2)(4)(8)(16); /* 报错 */
} catch (error) {
  /* currySum(...)(...)(...) is not a function */
}

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
let sumFn3 = flexCurrySum(3, 5, 6)(14, 30);
let sumFn2_3 = sumFn2(3, 5, 6)(14, 30);
sumFn1() + sumFn2() + sumFn3(); // 177
sumFn1() + sumFn2_3(); // 177

// async函数
async function asyncDemo() {
  console.log(1);
  // throw 2;
  return 2;
}
(async () => {
  try {
    let result = await asyncDemo();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
})();

// 等价于上面的async函数
function demo() {
  console.log(1);
  // return Promise.reject(2);
  return Promise.resolve(2);
}
demo()
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.log(error);
  });

// 粗略实现promise
class Prom {
  static resolve(value) {
    if (value && value.then) {
      return value;
    }
    return new Prom(resolve => resolve(value));
  }

  constructor(fn) {
    this.value = undefined;
    this.reason = undefined;
    this.status = 'PENDING';

    // 维护一个 resolve/pending 的函数队列
    this.resolveFns = [];
    this.rejectFns = [];

    const resolve = value => {
      // 注意此处的 setTimeout
      setTimeout(() => {
        this.status = 'RESOLVED';
        this.value = value;
        this.resolveFns.forEach(({ fn, resolve: res, reject: rej }) =>
          res(fn(value))
        );
      });
    };

    const reject = e => {
      setTimeout(() => {
        this.status = 'REJECTED';
        this.reason = e;
        this.rejectFns.forEach(({ fn, resolve: res, reject: rej }) =>
          rej(fn(e))
        );
      });
    };

    fn(resolve, reject);
  }

  then(fn) {
    if (this.status === 'RESOLVED') {
      const result = fn(this.value);
      // 需要返回一个 Promise
      // 如果状态为 resolved，直接执行
      return Prom.resolve(result);
    }
    if (this.status === 'PENDING') {
      // 也是返回一个 Promise
      return new Prom((resolve, reject) => {
        // 推进队列中，resolved 后统一执行
        this.resolveFns.push({ fn, resolve, reject });
      });
    }
  }

  catch(fn) {
    if (this.status === 'REJECTED') {
      const result = fn(this.value);
      return Prom.resolve(result);
    }
    if (this.status === 'PENDING') {
      return new Prom((resolve, reject) => {
        this.rejectFns.push({ fn, resolve, reject });
      });
    }
  }
}

Prom.resolve(10)
  .then(o => o * 10)
  .then(o => o + 10)
  .then(o => {
    console.log(o);
  });

new Prom((resolve, reject) => reject('Error错误')).catch(e => {
  console.log('Error', e);
});

// 实现promise.map 限制并发
function pMap(list, mapper, concurrency = Infinity) {
  // list 为 Iterator，先转化为 Array
  list = Array.from(list);
  return new Promise((resolve, reject) => {
    let currentIndex = 0;
    let result = [];
    let resolveCount = 0;
    let len = list.length;
    function next() {
      const index = currentIndex;
      currentIndex++;
      Promise.resolve(list[index])
        .then(o => mapper(o, index))
        .then(o => {
          result[index] = o;
          resolveCount++;
          if (resolveCount === len) {
            resolve(result);
          }
          if (currentIndex < len) {
            next();
          }
        });
    }
    for (let i = 0; i < concurrency && i < len; i++) {
      next();
    }
  });
}

// 实现bind
Function.prototype.fakeBind = function (obj, ...args) {
  return (...rest) => this.call(obj, ...args, ...rest);
};

// 实现softBind
Function.prototype.softBind = function (obj, ...args) {
  let that = this;
  return function (...rest) {
    that.call(!this || this === globalThis ? obj : this, ...args, ...rest);
  };
};
