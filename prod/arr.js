/**
 * 判断对象是否相等 compareComplexArray依赖js
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

/**
 * 判断数据类型 compareComplexArray依赖js
 * @param {*} o 各种类型值
 * 
 */
function getType(o) {
  var s = Object.prototype.toString.call(o);
  return s.match(/\[object (.*?)\]/)[1].toLowerCase();
};


/**
 * 操作重复数组
 * 
 * @param {Array} arr 源数组
 * @param {Number} [type = 0] 返回类型
 * @param type 0 返回去重数组(保留一个重复元素)
 * @param type 1 返回重复数组
 * @param type 2 返回未重复数组(依赖removeItem方法)
 * 
 * @returns {Array} 返回数组
 */
function operRepeatArray(arr, type) {
  let array = [].concat.apply([], arr),
    repeat = [],
    noRepeat = [],
    result = [],
    obj = {}; //利用对象属性不重复
  for (let i of array) {
    if (!obj[i]) {
      result.push(i);
      obj[i] = 1;
    } else {
      repeat.push(i)
    }
  }
  switch (type) {
    case 0:
      return result;
    case 1:
      return repeat;
    case 2:
      noRepeat = removeItem(result, repeat);
      return noRepeat;
    default:
      return result;
  }
}

/**
 * 数组去重(不会破坏已有排序 利用对象属性不重复)
 * 
 * @param {Array} arr 源数组
 * 
 * @returns {Array} 返回去重数组(保留一个重复元素 取第一个位置)
 */
function distinctOfObj(arr) {
  let array = [].concat.apply([], arr),
    result = [],
    obj = {};
  for (let i of array) {
    if (!obj[i]) {
      result.push(i);
      obj[i] = 1;
    }
  }
  return result
}

/**
 * 数组去重(不会破坏已有排序 set数据结构 类似于数组但是成员的值都是唯一的)
 * 
 * @param {Array} arr 源数组
 * 
 * @returns {Array} 返回去重数组(保留一个重复元素 重复取第一个位置)
 */
function distinctOfSet(arr) {
  let array = [].concat.apply([], arr);
  return Array.from(new Set(array))
}

/**
 * 去除数组指定元素
 * 
 * @param {Array} arr 源数组
 * @param {Array} removeArr 删除数组
 * @param {String} [key] 针对对象字段去除数组
 * 
 * @returns {Array} 返回数组
 */
function removeItem(arr, removeArr, key) {
  if (!key) {
    return arr.filter(item => removeArr.indexOf(item) == -1)
  }
  return arr.filter(item => removeArr.indexOf(item[key]) == -1)
}

/**
 * 判断复杂数组(数组元素可包含对象,数组等等)是否相等(数组元素所在位置必须相同,元素类型必须完全相同)
 * @param {Array} x 数组1
 * @param {Array} y 数组2
 * 
 * @returns {Boolean}
 */
function compareComplexArray(x, y) {
  if (!(x instanceof Array) || !(y instanceof Array) || x.length !== y.length) {
    return false;
  }
  let compare = function (m, n, type) {
    if (type === "object") {
      if (!compareObject(m, n)) {
        return true;
      }
    } else if (type === "array") {
      if (!compareComplexArray(m, n)) {
        return true;
      }
    } else {
      if (m !== n) {
        return true;
      }
    }
    return false;
  };
  const xLen = x.length,
    yLen = y.length,
    evenFlag = xLen % 2 === 0;
  for (let i = 0; i < xLen; i++) {
    const xElement = x[i],
      xType = getType(xElement);
    for (let j = yLen - 1; j >= 0; j--) {
      const yElement = y[j],
        yType = getType(yElement);
      if (xType !== getType(y[i]) || yType !== getType(x[j])) {
        return false;
      }
      let xFlag = compare(xElement, y[i], xType),
        yFlag = compare(yElement, x[j], yType);
      if (xFlag || yFlag) {
        return false;
      }
      if (evenFlag) {
        if(i >= (xLen / 2) - 1){
          return true;
        }
      } else {
        if(i >= Math.floor(xLen / 2)) {
          return true;
        }
      }
    }
  }
}

/**
 * 判断简单数组是否相等(元素类型必须完全相同)
 * @param {Array} x 数组1
 * @param {Array} y 数组2
 * @param {Array} [positionFlag = true] 数组元素所在位置是否必须相同 默认true false可不相同
 * 
 * @returns {Boolean}
 */
function compareArray(x, y, positionFlag = true) {
  if (x.length !== y.length) {
    return false
  } else {
    if (!positionFlag) {
      x = x.sort();
      y = y.sort();
    }
    for (let i = 0; i < x.length; i++) {
      if (x[i] !== y[i]) {
        return false
      }
    }
    return true;
  }
}

module.exports = {
  operRepeatArray,
  distinctOfObj,
  distinctOfSet,
  removeItem,
  compareComplexArray,
  compareArray
}