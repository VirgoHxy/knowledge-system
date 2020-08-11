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