// Object对象类 其他定义好的复杂类型类都会继承对象类
Object(); // {} 对象构造函数 只接受一个参数
new Object(); // {} 空对象
Object(3); // Number {3} 数字基本包装类型
Object('3'); // String {"3"} 字符串基本包装类型
Object(true); // Boolean {true} 布尔基本包装类型
Object(3) instanceof Number; // true
Object('3') instanceof String; // true
Object(true) instanceof Boolean; // true
// object以及其他引用类型 let obj = {a: 1}; 存储格式: 引用类型就是内存地址,引用名称(变量名称)和值(堆内存区域的引用地址) 这个`{a: 1}`堆内存区域的存储格式内存地址,引用名称(key)和值(value) 如果value还是引用类型就按上述继续存储 内存分为栈内存(操作系统会自动清理)和堆内存(回收机制清理) 栈内存存储局部变量(储存基础类型值,储存引用类型引用地址) 其他变量在堆内存存储
/* // 例1
let object = {a: 1, b: 'a', c: true};
object.a = 2;
// object.a变成了2 这里改变`{a: 1, b: 'a', c: true}`堆内存区域的引用名称'a'的内存地址 新的内存地址保存的值是2 但是引用名称'object'的引用地址不会改变
*/

/* // 例2
let object = {a: 1, b: 'a', c: true};
object = {c: 1};
// object变成了{c: 1} 这里创建了一个新的堆内存区域`{c: 1}` 引用名称'object'的指向新的内存地址 新的内存地址保存的值是对堆内存区域`{c: 1}`的引用地址
// `{a: 1, b: 'a', c: true}` 这个在堆内存中的存储会被回收机制回收
*/

/* // 例3
let object = {a: 1, b: 'a', c: true, d: {}};
object.a = object.b;
// object.a变成了'a' 这里就是引用名称'a'和'b'都指向同一个内存地址 就是引用名称'b'的内存地址 
object.a = 2;
// object.a变成了2 但是object.b不会改变 因为引用名称'a'指向了新的内存地址 新的内存地址保存的值是2
object.e = object.d;
// object.d和object.e都是`{}` 引用名称'd'和'e'都指向同一个内存地址 这个内存地址的值就是object.d创建的堆内存区域`{}`的引用地址
object.d.f = 3;
// object.d和object.e都会有f这个属性 因为增加的是堆内存区域`{}`的key和value 引用名称'd'和'e'的内存地址值又是一个引用地址 所以都会有这个属性
object.d = {};object.e.g = 4;
// object.d为`{}`,object.e为{f: 3, g: 4} 两个变成了互不影响状态 因为引用名称'd'和'e'内存地址值变成了不同的引用地址 详情看例2
*/

/* es5 */
// 静态方法
function Father() {
  this.advantage = 1;
  this.shortcoming = 1;
  this.do = () => {
    console.log('do it');
  };
}
function Mother() {
  this.love = () => {
    console.log('love you');
  };
}
function Child() {
  this.my = () => {
    console.log(this.advantage, this.shortcoming);
  };
  Father.call(this); // call super constructor.
  Mother.call(this); // call super constructor.
}
// 继承父类
Child.prototype = Object.create(Father.prototype); // 使用指定的原型对象和属性创建一个新对象。
Child.prototype.constructor = Child; // 完成了类式继承
// 继承多个类
Child.prototype = Object.create(Father.prototype);
Object.assign(Father.prototype, Mother.prototype); // 混合
Child.prototype.constructor = Child;

let child = new Child();
child.do(); // do it
child.my(); // 1 1
child.love(); // love you

let sourceObj = {a: 1, b: {}};
let cloneObj = Object.create({}, Object.getOwnPropertyDescriptors(sourceObj)); // 第二个参数为属性描述符
cloneObj.b.c = 2; // sourceObj,cloneObj都会改变

// configurable writable enumerable value set           get
// 是否修改删除  是否赋值  是否可枚举  值    设置函数setter 获取函数getter
// 给对象添加一个属性并指定该属性的配置 不指定默认都为false
let defineObj = {};
Object.defineProperty(defineObj, 'globalConfig', {
  configurable: false,
  writable: false,
  enumerable: true,
  value: {},
});
// 给对象添加多个属性并指定该属性的配置
Object.defineProperties(defineObj.globalConfig, {
  a: {
    configurable: false,
    writable: false,
    enumerable: false,
    value: 'a',
  },
  b: {
    configurable: false,
    enumerable: false,
    set: (value) => {
      console.log(value);
      // eslint-disable-next-line no-undef
      b = value;
    },
    get: function () {
      // eslint-disable-next-line no-undef
      return b;
    },
  },
});
Object.getOwnPropertyDescriptor(defineObj.globalConfig, 'a'); // { value: 'a', writable: false, enumerable: false, configurable: false } 返回指定对象上一个自有属性(直接赋予该对象的属性 不查原型链)的描述符
Object.getOwnPropertyDescriptors(defineObj.globalConfig); // { value: 'a', writable: false, enumerable: false, configurable: false } 返回指定对象的所有自身属性(直接赋予该对象的属性 不查原型链)的描述符
/*
{
  a: {
    value: 'a',
    writable: false,
    enumerable: false,
    configurable: false
  },
  b: {
    get: [Function: get],
    set: [Function: set],
    enumerable: false,
    configurable: false
  }
}
*/

Object.keys({a: 1, b: 2}); // ['a', 'b'] 返回自身的可枚举属性数组 forin会遍历原型链上可枚举的属性
Object.keys(['10', '2']); // ['0', '1']
Object.keys({100: 1, 2: 2, 7: 3}); // ['2', '7', '100'] 数字key会按照数字的顺序排列
Object.getOwnPropertyNames([1, 2]); // [ '0', '1', 'length' ] 返回自身属性(包括不可枚举但不包括Symbol)数组
Object.getOwnPropertySymbols({a: 1, b: 2, [Symbol('c')]: 3}); // [ Symbol(c) ] 返回自身属性(只包括Symbol)数组
Object.getPrototypeOf({}) === Object.prototype; // true 返回指定对象的原型对象
Object.getPrototypeOf(Object) === Function.prototype; // true Object是构造函数 所以为true
Object.setPrototypeOf({0: 1, 1: 2, length: 2}, Array.prototype).map(ele => ele * 2); // [2, 4] 设置一个对象的原型为指定的原型

let freezeObj = {a: 1, b: {}, c: 2};
Object.freeze(freezeObj); // {a: 1, b: {}, c: 2} 冻结对象 其他代码不能删除、更改、添加任何属性 冻结 == 只能读取
freezeObj.a = 2; // 不生效 严格模式还会报错
freezeObj.b.c = 3; // 生效 因为冻结也是浅冻结
delete freezeObj.c; // 不生效
freezeObj.d = 4; // 不生效
console.log(freezeObj); // { a: 1, b: { c: 3 }, c: 2 }
let freezeArr = [];
Object.freeze(freezeArr);
freezeArr[0] = 4; // 不生效 push pop等方法也不生效
Object.isFrozen(freezeObj); // true 判断对象是否冻结

let extenseObj = {a: 1, b: {}, c: 2};
Object.preventExtensions(extenseObj); // {a: 1, b: {}, c: 2} 阻止对象的任何扩展 扩展 == 不能添加任何属性
extenseObj.a = 2; // 生效
extenseObj.b.c = 3; // 生效 因为阻止扩展也是浅阻止扩展
delete extenseObj.c; // 生效
extenseObj.d = 4; // 不生效
console.log(extenseObj); // { a: 2, b: { c: 3 } }
Object.isExtensible(extenseObj); // false 判断对象是否可扩展 新对象都是默认可扩展的

let sealObj = {a: 1, b: {}, c: 2};
Object.seal(sealObj); // {a: 1, b: {}, c: 2} 密封对象 其他代码不能删除、添加任何属性 密封 == 只能读取和更改
sealObj.a = 2; // 生效
sealObj.b.c = 3; // 生效 因密封也是浅密封
delete sealObj.c; // 不生效
sealObj.d = 4; // 不生效
console.log(sealObj); // { a: 2, b: { c: 3 }, c: 2 }
Object.isSealed(sealObj); // true 判断对象是否密封

// 原型方法
Object.prototype.hasOwnProperty.call({a: 1}, 'a'); // true 返回对象自身属性中是否具有指定的属性
Object.prototype.hasOwnProperty.call({a: 1}, 'toString'); // false 原型链上的方法 并不是自身属性

Object.prototype.propertyIsEnumerable.call([1], 'length'); // false 返回对象自身属性中指定的属性是否可枚举
Object.prototype.propertyIsEnumerable.call([1], '0'); // true

Object.prototype.isPrototypeOf.call(Father.prototype, child); // true 检查Father对象是否存在于child对象的原型链上 判断child是否继承Father
Object.prototype.isPrototypeOf.call(Father.prototype, []); // false

Object.prototype.toString.call({}); // [object Object] 返回一个表示该对象的字符串
Object.prototype.toString.call([]); // [object Array]
Object.prototype.toString.call(new Date()); // [object Date]
Object.prototype.toString.call(() => {}); // [object Function]
Object.prototype.toString.call(/.*/); // [object RegExp]
Object.prototype.toString.call(Math); // [object Math]
Object.prototype.toString.call(1); // [object Number]
Object.prototype.toString.call('1'); // [object String]
Object.prototype.toString.call(true); // [object Boolean]
Object.prototype.toString.call(new Number(1)); // [object Number]
Object.prototype.toString.call(new String('1')); // [object String]
Object.prototype.toString.call(new Boolean(true)); // [object Boolean]
Object.prototype.toString.call(null); // [object Null]
Object.prototype.toString.call(undefined); // [object Undefined]
Object.prototype.toString.call(Symbol('1')); // [object Symbol]
Object.prototype.toString.call(10n); // [object BigInt]

Object.prototype.valueOf.call({a: 1}); // {a: 1} 返回一个该对象的原始值
Object.prototype.valueOf.call([1]); // [1]
Object.prototype.valueOf.call(new Date()); // 2022-03-29T08:14:44.845Z
Object.prototype.valueOf.call(() => {}); // () => {}
Object.prototype.valueOf.call(/.*/); // /.*/
Object.prototype.valueOf.call(Math); // Math {}
Object.prototype.valueOf.call(1); // Number {1}
Object.prototype.valueOf.call('1'); // String {'1'}
Object.prototype.valueOf.call(true); // object Boolean {true}
Object.prototype.valueOf.call(new Number(1)); // Number {1}
Object.prototype.valueOf.call(new String('1')); // String {'1'}
Object.prototype.valueOf.call(new Boolean(true)); // object Boolean {true}
// Object.prototype.valueOf.call(null); // 语法报错 无法转换为object
// Object.prototype.valueOf.call(undefined); // 语法报错 无法转换为object
Object.prototype.valueOf.call(Symbol('1')); // Symbol {Symbol(1), description: '1'}
Object.prototype.valueOf.call(10n); // BigInt {10n}

/* es6+ */
// 解构
let { bar, baz } = { baz: 'aaa', bar: 'bbb' }; // bar = 'bbb';baz = 'aaa'; 解构对象
let { 前面的为旧变量名: 后面的为新变量名 } = { 前面的为旧变量名: 'aaa', bar: 'bbb' }; // {后面的为新变量名}为'aaa'; 匹配{前面的}值赋给{后面的}变量名达到重命名解构
let { bad = 123 } = {}; // bad = 123; 对象属性值为空的默认值
let {foo: { num }} = { foo: { num: 123 } }; // num = 123; 解构嵌套
let { foo: { num: num1 = 1 } = {} } = {}; // num1 = 1; 解构嵌套+重命名+默认值
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 }; // x = 1;y = 2;z={a: 3, b: 4} rest剩余参数
let obj5 = { a: { b: 1 } };
let { ...c } = obj5; // c.a.b = 1; spread扩展运算 可枚举属性的浅克隆 如果值都为原始类型 则为深克隆 与Object.assign一致
let obj11 = { ...{ 0: '零' }, ...{ 1: '一' } }; // { '0': '零', '1': '一' } 合并对象 可替代Object.assgin({},a,b)
function objectDemo({ x = 0, y = 0 } = {}) { console.log(x, y); } // 解构函数对象参数 并给参数属性默认值(防止无参数报错)
objectDemo(); // x为0 y为0
objectDemo({ x: 1, y: 2 }); // x为1 y为2
objectDemo({ x: 1 }); // x为1 y为0
function objectDemo1({ x, y } = { x: 0, y: 0 }) { console.log(x, y); } // 解构函数对象参数 并给参数对象默认值(防止无参数报错)
objectDemo1(); // x为0 y为0
objectDemo1({ x: 1, y: 2 }); // x为1 y为2
objectDemo1({ x: 1 }); // x为1 y为undefined

// 静态方法
let source = {a: 1};
let complexSource = {a: {b: 1}, c: undefined, d: () => {}, e: Symbol('e')};
Object.assign({}, source); // {a: 1} 将一个或多个源对象可枚举属性分配到目标对象并返回这个目标对象 如果目标对象已声明为变量则会改变这个变量(源对象会覆盖目标对象属性) 
Object.assign({}, complexSource); // { a: { b: 1 }, c: undefined, d: [Function: d], e: Symbol(e) } 这里改变complexSource中b的属性也会改变目标对象中b的属性 浅克隆
Object.assign({}, JSON.parse(JSON.stringify(complexSource))); // {a: {b: 1}} 如果对象值为复杂类型 并且不需要值为undefined、任意的函数、symbol值 那可以使用JSON.parse(JSON.stringify(soure))来达到深克隆
Object.assign([], [1,2,3]); // [1,2,3] 元素为基本类型的数组 就是深克隆
Object.assign({}, 'abc'); // {0: 'a', 1: 'b', 2: 'c'} 只有字符串的包装对象才会有可枚举属性 其他基本类型没有

Object.entries({a: 1, b: 2}); // [["a", 1], ["b", 2]] 返回给定对象自身可枚举属性的[key, value]数组
Object.fromEntries([['a', 1], ['b', 2]]); // {a: 1, b: 2} 方法把[key, value]数组转换为一个对象
Object.fromEntries(Object.entries({a: 1, b: 2}).map(([ key, val ]) => [ key, val * 2 ])); // {a: 2, b: 4} 可以做对象转换

Object.values({a: 1, b: 2}); // [1, 2] 返回对象自身可枚举属性的值数组
Object.values(['10', '2']); // ["10", "2"]
Object.values({100: 1, 2: 2, 7: 3}); // [2, 3, 1] 数字key会按照key的顺序排列然后取值

Object.is(); // 比较两个值是否相同 基本类型比较值是否相同 复杂类型引用地址需要相同 除了下方两个结果不同 结果都于===相同
Object.is(0, -0); // false 数字需要注意+0,-0
Object.is(Number.NaN, Number.NaN); // true 数字需要注意NaN
// eslint-disable-next-line
(+0) === (-0) && +0 === 0; // true
// eslint-disable-next-line
Number.NaN === Number.NaN; // false

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
  } else if (
    typeof x == 'object' &&
    x != null &&
    typeof y == 'object' &&
    y != null
  ) {
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
}

/**
 * 深克隆对象(JSON.parse(JSON.stringify(target)) 可深克隆一个对象 但有一定局限)
 *
 * @param {*} target 克隆对象 不支持日期对象,正则对象,map,set,promise等克隆
 *
 * @returns {*}
 *
 */
function clone(target, map = new WeakMap()) {
  if (typeof target === 'object' && target !== null) {
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
}

/**
 * 判断数据类型
 *
 * @param {*} o 各种类型值
 *
 * @returns {String} 详细类型
 */
function getType(o) {
  let s = Object.prototype.toString.call(o);
  return s.match(/\[object (.*?)\]/)[1].toLowerCase();
}

let user = {
  [Symbol.toStringTag]: 'User',
};
console.log(getType(1)); //number
console.log(getType(new Date())); //date
console.log(getType(user)); //user

let sourceObj1 = {
  a: 1,
  c: null,
  date: new Date(),
  func: () => {
    console.log(1);
  },
  regexp: new RegExp('1'),
  map: new Map([[1, 1]]),
};
sourceObj1.b = sourceObj1;
let cloneObj1 = clone(sourceObj1);
sourceObj1.a = 2;
sourceObj1.c = 3;
sourceObj1.date.setFullYear(1998);
sourceObj1.func.name = '1998';
sourceObj1.regexp.lastIndex = 5;
sourceObj1.map.set(1, 5);
console.log(sourceObj1);
console.log(cloneObj1);
