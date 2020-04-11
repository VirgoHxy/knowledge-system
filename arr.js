/**
 * 获取数组重复的元素
 * @param {Array} array 源数组 
 * @param {Objecy} object 针对数组中对象重复判断 
 * {
 * 
 *    key: "num", //字段key
 * 
 *    flag: false //默认false 返回对象 true 返回对应key的value 
 * 
 * }
 * @returns {Array} 返回重复的数组
 */
function refrain(array, object) {
  let arr = [];
  if (object != null) {
    var key = object.key,
      flag = object.flag;
  }
  if (Array.isArray(array)) {
    if (object == null || key == null) {
      array.concat().sort().sort(function (a, b) {
        if (a == b && arr.indexOf(a) === -1) {
          arr.push(a);
        }
      });
    } else {
      array.concat().sort(function (a, b) {
        if (typeof a[key] == "number") {
          return a[key] - b[key]
        } else {
          return a[key].localeCompare(b[key])
        }
      }).sort(function (a, b) {
        if (a[key] == b[key] && arr.indexOf(a[key]) === -1) {
          if (!flag) {
            arr.push(a[key]);
          } else {
            arr.push(a);
            arr.push(b);
          }
        }
      });
    }
  }
  return arr;
}
// console.log(refrain([1,4,1,2,5,5]))
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
// ],{
//   key: "num"
// })))

module.exports =  {
  refrain
}