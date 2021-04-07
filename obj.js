// 判断是否全等 除了 0和-0是false NaN和NaN是true 其他全和===相同
console.log(Object.is(Number.NaN, Number.NaN)) // true
console.log(Object.is(0, -1)) // false
// defineProperty 定义属性
var obj = {};
var b = "";
// configurable writable enumerable value set get 
// 是否修改删除 是否赋值 是否可枚举 值 设置函数setter 获取函数getter 
Object.defineProperty(obj, "globalConfig", {
  configurable: false, writable: false, enumerable: false, value: {}
})
Object.defineProperties(obj.globalConfig, {
  "a": {
    configurable: false, writable: false, enumerable: false, value: "a"
  },
  "b": {
    configurable: false,
    enumerable: false,
    set: function (value) {
      console.log(value)
      b = value;
    },
    get: function () {
      return b;
    }
  }
})
obj.globalConfig.a = "a1";
obj.globalConfig.b = "b2";
console.log(obj)
console.log(obj.globalConfig.a)
console.log(obj.globalConfig.b)

// 将一个或多个源对象可枚举属性浅拷贝到目标对象
var obj = { a: 1 }
var obj1 = Object.assign(obj, { b: 1 }, { c: 1 }, { d: {test: 1} });
obj1.a = 2;
obj1.b = 3;
console.log(obj) // { a: 2, b: 3, c: 1 }
console.log(obj1) // { a: 2, b: 3, c: 1 }
// 如果是原始值 除了字符串 其他都没有效果
var obj2 = Object.assign(1);
var obj3 = Object.assign(true);
var obj4 = Object.assign("abc");
console.log(obj2) // [Number: 1]
console.log(obj3) // [Boolean: true]
console.log(Object.keys(obj4)) // [0,1,2]
console.log(Object.values(obj4)) // [a,b,c]
// create新建对象 可以用来深克隆没有复制类型值得对象 以obj的原型为原型 获取obj1的所有属性
var cloneObj = Object.create({}, Object.getOwnPropertyDescriptors(obj1));
console.log(cloneObj === obj1); // false
cloneObj.a = 666; // false
console.log(cloneObj);// { a: 666, b: 3, c: 1, d: {test: 1} }
console.log(obj1);// { a: 2, b: 3, c: 1, d: {test: 1} }
cloneObj.d.test = 666; // false
console.log(cloneObj);// { a: 666, b: 3, c: 1, d: {test: 666} }
console.log(obj1);// { a: 2, b: 3, c: 1, d: {test: 666} }
// 注意点
// 1浅拷贝 2同名属性替换 3数组处理将会看成对象 4值复制 取值函数将转换为值
console.log(obj === obj1) // true
console.log(Object.assign({ a: 1 }, { a: 2 })) // {a: 2}
console.log(Object.assign([1, 2, 3], [4, 5])) // [4, 5, 3]
console.log(Object.assign({}, {
  get foo() { return 1 }
})) // {foo: 1}

// keys键数组 values值数组 entries键值数组
console.log(Object.keys(obj))
console.log(Object.values(obj))
console.log(Object.entries(obj))
console.log(Object.fromEntries(Object.entries(obj)))

const target = {
  field1: 1,
  field2: undefined,
  field3: {
    child: 'child'
  },
  field4: [2, 4, 8],
};
const target1 = {
  field1: 1,
  field2: undefined,
  field3: {
    child: 'child'
  },
  field4: [2, 4, 8],
};

/**
 * 判断对象是否相等
 * 
 * @param {Object} x 对象1
 * @param {Object} y 对象2
 * 
 * @return {Boolean} true 为相等，false 为不等
 */
function compareObject(x, y) {
  // 指向同一内存时
  if (x === y) {
    return true;
  } else if ((typeof x == "object" && x != null) && (typeof y == "object" && y != null)) {
    if (Object.keys(x).length != Object.keys(y).length) {
      return false;
    }
    for (var prop in x) {
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
}
console.log(
  compareObject(target, target1)
)

/**
 * 深拷贝对象(JSON.parse(JSON.stringify(target)) 可深拷贝一个对象.但有一定局限)
 * 
 * @param {*} target 克隆对象
 * 
 * @returns {*}
 * 
 */
function clone(target, map = new WeakMap()) {
  if (typeof target === 'object') {
    let cloneTarget = Array.isArray(target) ? [] : {};
    if (map.get(target)) {
      return map.get(target);
    }
    map.set(target, cloneTarget);
    for (const key in target) {
      cloneTarget[key] = clone(target[key], map);
    }
    return cloneTarget;
  } else {
    return target;
  }
};

target.target = target;
console.log(
  clone(target)
)

/**
 * 判断数据类型
 * 
 * @param {*} o 各种类型值
 * 
 * @returns {String} 详细类型
 */
function getType(o) {
  var s = Object.prototype.toString.call(o);
  return s.match(/\[object (.*?)\]/)[1].toLowerCase();
};
let user = {
  [Symbol.toStringTag]: "User"
};
console.log(getType(1)) //number
console.log(getType(new Date())) //date
console.log(getType(user)) //user