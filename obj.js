/**
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
// console.log(
//   compareObject({
//     a: {
//       a: "1"
//     },
//     b: "2"
//   }, {
//     a: {
//       a: "1"
//     },
//     b: "2"
//   })
// )