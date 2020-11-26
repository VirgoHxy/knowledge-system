; (function (undefined) {
  "use strict"

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

  let global = (function () { return this || (0, eval)('this'); }());
  let JAFOObjMethod = {
    compareObject,
    clone,
    getType
  }

  // 最后将插件对象暴露给全局对象
  if (typeof module !== "undefined" && module.exports) {
    module.exports = JAFOObjMethod;
  } else if (typeof define === "function" && define.amd) {
    define(function () { return JAFOObjMethod; });
  } else {
    !('JAFOObjMethod' in global) && (global.JAFOObjMethod = JAFOObjMethod);
  }
}());