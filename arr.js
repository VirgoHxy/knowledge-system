/**
 * 获取数组重复/未重复/去重复的元素
 * @param {Array} array 源数组 
 * @param {Number} type 0返回重复数组 1返回未重复数组 2返回去重复数组
 * @param {Objecy} object 针对数组中对象重复判断 
 * {
 * 
 *    key: "num", //字段key
 * 
 *    flag: false //默认false 返回对象 true 返回对应key的value 
 * 
 * }
 * @returns {Array} 返回数组
 */
function refrain(array, type, object) {
  let arr = [],//重复
    arr1 = [],//未重复
    len = array.length,
    num = 0;
  if (object != null) {
    var key = object.key,
      flag = object.flag;
  }
  if (Array.isArray(array)) {
    if (object == null || key == null) {
      array.concat().sort().sort(function (a, b) {
        num++;
        if (a == b && arr.indexOf(a) === -1) {
          arr.push(a);
        }
        if (arr.indexOf(a) === -1) {
          arr1.push(a);
        }
        if (num==len-1) {
          if (arr.indexOf(b) === -1) {
            arr1.push(b);
          }
        }
      });
    } else {
      var tArr = [];
      array.concat().sort(function (a, b) {
        if (typeof a[key] == "number") {
          return a[key] - b[key]
        } else {
          return a[key].localeCompare(b[key])
        }
      }).sort(function (a, b) {
        num++;
        if (a[key] == b[key] && arr.indexOf(a[key]) === -1) {
          if (!flag) {
            arr.push(a[key]);
          } else {
            arr.push(a);
            arr.push(b);
            tArr = arr.map(function (ele){
              return ele[key]
            })
          }
        }
        if (!flag) {
          if (arr.indexOf(a[key]) === -1) {
            arr1.push(a[key]);
          }
          if (num==len-1) {
            if (arr.indexOf(b[key]) === -1) {
              arr1.push(b[key]);
            }
          }
        } else {
          if (tArr.indexOf(a[key]) === -1) {
            arr1.push(a);
          }
          if (num==len-1) {
            if (tArr.indexOf(b[key]) === -1) {
              arr1.push(b);
            }
          }
        }
      });
    }
  }
  switch (type) {
    case 0:
      return arr;
    case 1:
      return arr1;
    case 2:
      return arr.concat(arr1);
    default:
      break;
  }
}
// console.log(refrain([1,2,3,5,2,3],false))
// console.log(refrain([1,2,3,5,2,3],true))
// console.log(JSON.stringify(refrain([
//   {
//     num: "bbbccb6d-2a03-4085-b71c-3ae54a0f7b7a",
//     state: false
//   },
//   {
//     num: "9cde25d3-f9ce-49e2-8452-7230cd4dbe30",
//     state: true
//   },
//   {
//     num: "9cde25d3-f9ce-49e2-845e-7ee0cd4dbe30",
//     state: true
//   },
//   {
//     num: "60136470-f88b-47ed-b7f1-bce06404c7a3",
//     state: true
//   },
//   {
//     num: "9cde25d3-f9ce-49e2-8452-7230cd4dbe30",
//     state: false
//   },
//   {
//     num: "9cde25d3-f9ce-49e2-845e-7ee0cd4dbe30",
//     state: true
//   }
// ],true,{
//   key: "num",
//   flag: true
// })))

/**
 * 去除数组指定元素
 * @param {Array} arr 源数组
 * @param {Array} removeArr 删除数组
 * 
 * @returns {Array} 返回数组
 */
function removeItem(arr,removeArr) {
  for (var i = 0; i < arr.length; i++) {
    if (removeArr.indexOf(arr[i]) != -1) {
      arr.splice(i, 1);
      i--;
    }
  }
  return arr
}
console.log(removeItem([3, 7, 11, 0, 0, 0, 3, 0, 55],[11,55]))
module.exports =  {
  refrain,
  removeItem
}