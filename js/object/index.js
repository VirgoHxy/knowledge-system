/**
 * 判断对象内容是否相等
 * @param {Object} x 对象1
 * @param {Object} y 对象2
 *
 * @return {Boolean} true 为相等，false 为不等
 */
function compareObject(x, y) {
  // 指向同一内存时
  if (x === y) {
    return true;
  } else if (typeof x == 'object' && x != null && typeof y == 'object' && y != null) {
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
 * @param {*} target 克隆对象 不支持日期对象,正则对象,map,set,promise等克隆
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
 * @param {*} o 各种类型值
 * @returns {string} 详细类型
 */
function getType(o) {
  let s = Object.prototype.toString.call(o);
  return s.match(/\[object (.*?)\]/)[1].toLowerCase();
}

module.exports = {
  compareObject,
  clone,
  getType,
};
