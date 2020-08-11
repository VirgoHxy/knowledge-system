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
 * @param {Object} x 对象1
 * @param {Object} y 对象2
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
      if (y.hasOwnProperty(prop)) {
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
 * 深拷贝对象
 * @param {*} target 克隆对象
 * @param {WeakMap} map map对象 防止循环引用
 * 
 * JSON.parse(JSON.stringify(target)) 可深拷贝一个对象.但有一定局限
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
 * @param {*} o 各种类型值
 * 
 */
function getType(o) {
  var s = Object.prototype.toString.call(o);
  return s.match(/\[object (.*?)\]/)[1].toLowerCase();
};
console.log(getType(1)) //number