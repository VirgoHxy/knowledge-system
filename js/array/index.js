/**
 * 数组随机排序
 * @param {Array} array 源数组
 * @returns {Array} 排序后的数组
 */
function shuffle(array) {
  array = [].concat.apply([], array);
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // 从 0 到 i 的随机索引
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/**
 * 数组去重
 *
 * 不会破坏已有排序，利用对象属性不重复原理；
 * 重复元素保留一个，取的是第一次出现的元素，这样保持排序不被破坏；
 * @param {Array} array 源数组
 * @returns {Array} 去重后的数组
 */
function removeRepeatByObj(array) {
  let result = [],
    obj = {};
  for (let i of array) {
    if (!obj[i]) {
      result.push(i);
      obj[i] = 1;
    }
  }
  return result;
}

/**
 * 数组去重
 *
 * 不会破坏已有排序，利用set唯一值特性；
 * 重复元素保留一个，取的是第一次出现的元素，这样保持排序不被破坏；
 * @param {Array} array 源数组
 * @returns {Array} 去重后的数组
 */
function removeRepeatBySet(array) {
  return Array.from(new Set(array));
}

/**
 * 去除数组指定元素
 * @param {Array} array 源数组
 * @param {Array} removeArr 需要删除的元素数组
 * @param {string} [key] 对象字段名称，针对数组元素为对象的数组
 * @returns {Array} 去除后的数组
 */
function removeItem(array, removeArr, key) {
  return array.filter((item) => !removeArr.includes(!key ? item : item[key]));
}

/**
 * 判断简单数组是否相等
 *
 * 元素类型必须完全相同，可选元素位置是否必须相同
 * @param {Array} x 数组1
 * @param {Array} y 数组2
 * @param {Array} [positionFlag = true] 数组元素所在位置是否必须相同；默认为 true，false 位置可不相同
 * @returns {Boolean} true 表示相等
 */
function isEqual(x, y, positionFlag = true) {
  if (x.length !== y.length) {
    return false;
  } else {
    if (!positionFlag) {
      x = x.sort();
      y = y.sort();
    }
    for (let i = 0; i < x.length; i++) {
      if (x[i] !== y[i]) {
        return false;
      }
    }
    return true;
  }
}

/**
 * 按二维数组的长度分割数组成二维数组
 *
 * 数组长度不足够存放元素会增加元素存放的个数
 * 数组长度过长会让元素个数为1的来达到最大长度
 * @param {Array} array 源数组
 * @param {number} length 数组长度
 * @param {number} [number = 0] 数组元素个数，0表示按平均分
 * @returns {Array} 二维数组
 */
function splitByArrayLength(array, length, number = 0) {
  if (array.length == 0) {
    return [[]];
  }
  let newArray = [];
  let index = 0;
  let average = Math.ceil(array.length / length);
  number = average <= number ? number : average;
  // 分割数组
  while (index < array.length) {
    newArray.push(array.slice(index, (index += number)));
  }
  return newArray;
}

/**
 * 按元素个数分割数组成二维数组
 * @param {Array} array 源数组
 * @param {number} number 数组元素个数
 * @returns {Array} 二维数组
 */
function splitByElementNum(array, number) {
  if (array.length == 0) {
    return [[]];
  }
  let newArray = [];
  let index = 0;
  while (index < array.length) {
    newArray.push(array.slice(index, (index += number)));
  }
  return newArray;
}

module.exports = {
  shuffle,
  removeRepeatByObj,
  removeRepeatBySet,
  removeItem,
  isEqual,
  splitByArrayLength,
  splitByElementNum,
};
