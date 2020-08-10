// 对象方法
Array.from("hxy", ele => { return ele + 1 }, this); // 返回["h1","x1","y1"] 对拥有length属性的对象或可迭代的对象来返回一个数组
Array.isArray([]); // true 判断一个对象是否为数组

// 实例方法
// es5
[1, 2, 3].concat([1], [2]); // 返回[1,2,3,1,2] 不改变原数组 连接多个数组
[1, 2, 3].indexOf(1, 2); // -1 从2索引ltr开始判断一个数组是否包含1 包含返回索引 不包含返回-1
[1, 2, 3].lastIndexOf(1, 2); // 0 从2索引rtl开始判断一个数组是否包含1 包含返回索引 不包含返回-1
[1, 2, 3].every(ele => { return ele > 1 }); // false 检测数组中的所有元素是否都符合条件
[1, 2, 3].some(ele => { return ele > 1 }); // true 检测数组中是否有一个或多个元素符合条件
[1, 2, 3].join("-"); // 1-2-3 把数组中的所有元素转换一个字符串
[1, 2, 3].toString(); // 1,2,3 把数组中的所有元素转换一个字符串
[1, 2, 3, 1, 2].filter(ele => { return ele > 1 }); // 返回[2,3] 不改变原数组 返回一个符合条件的数组 重复元素只返回一次
[1, 2, 3].forEach((ele, index, arr) => { }, this); // 遍历数组 ele数组元素 index索引 arr原数组 this代表回调函数的this指向
[1, 2, 3].map((ele, index, arr) => { return ele + 1 }, this); // 返回[2,3,4] 不改变原数组 遍历数组 返回新数组 ele数组元素 index索引 arr原数组 this代表回调函数的this指向
[1, 11, 3, 12].sort((a, b) => { return a - b }); // [1,3,11,12] 对数组的元素进行数字升序
[1, 11, 3, 12].sort((a, b) => { return b - a }); // [12,11,3,1] 对数组的元素进行数字降序
[1, 11, 3, 12].sort(); // [1,11,12,3] 对数组的元素进行字母排序
[1, 2, 3].reduce((start, ele, index, arr) => { return start + ele }); // 6 方法接收一个函数作为累加器 从左到右最终计算为一个值 start初始值, ele当前元素, index当前索引, arr原数组
[1, 2, 3].reduceRight((start, ele, index, arr) => { return start + ele }); // 6 方法接收一个函数作为累加器 从右到左最终计算为一个值 start初始值, ele当前元素, index当前索引, arr原数组
[1, 2, 3].push(3); // 返回4 原数组改为[1,2,3,3] 向数组的末尾添加一个或更多元素 返回数组长度
[1, 2, 3].pop(); // 返回3  原数组改为[1,2] 删除数组最后一个元素 返回删除元素
[1, 2, 3].unshift(0); // 返回4 原数组改为[0,1,2,3] 向数组的头部添加一个或更多元素 返回数组长度
[1, 2, 3].shift(); // 返回1 原数组改为[2,3] 删除数组第一个元素 返回删除元素
[1, 2, 3].slice(1, 2); // [2] 从1索引返回(2-1)个选定的元素 返回新数组 不改变原数组
[1, 2, 3].splice(0, 1, 1, 2); // 返回1 原数组改为[1,2,2,3] 从0索引开始删除1个元素并插入1,2两个元素 返回删除元素

// es6
[1, 2, 3].copyWithin(1, 0, 2); // [1,1,2] 从数组的第0位后2位获取元素(1,2)复制到第1位后
newArr = [1, 2, 3].entries(); // 返回一个新的Array Iterator对象 该对象包含数组中每个索引的键/值对
newArr.next(); // { value: [ 0, 1 ], done: false }
newArr.next(); // { value: [ 1, 1 ], done: false }
newArr.next(); // { value: [ 2, 2 ], done: false }
newArr.next(); // { value: undefined, done: true }
newArr = [1, 2, 3].keys(); // 返回一个新的Array Iterator对象 该对象包含数组中每个索引的键
newArr.next(); // { value: 0, done: false }
newArr.next(); // { value: 1, done: false }
newArr.next(); // { value: 2, done: false }
newArr.next(); // { value: undefined, done: true }
new Array(5).fill(0); // [0,0,0,0,0] 将数组元素都填充0 改变原数组
[1, 2, 3].find(ele => { return ele > 1 }); // 2 返回第一个符合条件的元素 返回元素
[1, 2, 3].findIndex(ele => { return ele > 0 }); // 0 返回第一个符合条件的元素的索引 返回索引
[1, 2, 3].includes(1, 2); // false 从2索引开始判断一个数组是否包含1 包含返回true 不包含返回false

/**
 * 操作重复数组
 * @param {Array} arr 源数组
 * @param {Number} type 返回类型 0返回去重数组(保留一个重复元素) 1返回重复数组 2返回未重复数组(依赖removeItem方法)
 * 
 * @returns {Array} 返回数组
 */
function operRepeatArray(arr,type){
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
      noRepeat = removeItem(result,repeat);
      return noRepeat;
    default:
      return result;
  }
}
console.log(operRepeatArray([1,2,3,1,2,4],2))

/**
 * 高性能数组去重(不会破坏已有排序,未重复取第一个位置)
 * 
 * @returns {Array} 返回去重数组(保留一个重复元素)
 */
function distinctOfObj(arr) {
  let array = [].concat.apply([], arr),
    result = [],
    obj = {}; //利用对象属性不重复
  for (let i of array) {
    if (!obj[i]) {
      result.push(i);
      obj[i] = 1;
    }
  }
  return result
}
console.log(distinctOfObj([1,2,3,1,2]))

/**
 * 数组去重(set数据结构 类似于数组，但是成员的值都是唯一的)
 * 
 * @returns {Array} 返回去重数组(保留一个重复元素)
 */
function distinctOfSet(arr) {
  let array = [].concat.apply([], arr);
  return Array.from(new Set(array))
}
console.log(distinctOfSet([1,2,3,1,2]))

/**
 * 去除数组指定元素
 * @param {Array} arr 源数组
 * @param {Array} removeArr 删除数组
 * @param {String} key 针对对象字段去除数组
 * 
 * @returns {Array} 返回数组
 */
function removeItem(arr, removeArr, key) {
  if (!key) {
    return arr.filter(item => removeArr.indexOf(item) == -1)
  }
  return arr.filter(item => removeArr.indexOf(item[key]) == -1)
}
console.log(removeItem([3, 7, 11, 0, 0, 0, 3, 0, 55],[0,55]))
console.log(JSON.stringify(removeItem([{
  id: "1"
},{
  id: "2"
},{
  id: "3"
}],["1","3"],"id")))