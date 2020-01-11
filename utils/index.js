/**
 * 打印日志
 * @param {*} val 打印内容
 * @param {String} msg 分割线标题
 * @param {Function} callback 回调函数 
 */
function log(val, msg, callback) {
  if (val instanceof Array) {
    console.log(`------------------${!!msg? msg : '分割线'}------------------`)
    val.forEach(element => {
      console.log(element)
      if (typeof callback !== 'undefined') {
        callback(element)
      }
    });
  } else {
    console.log(`------------------${!!msg? msg : '分割线'}------------------`)
    console.log(val)
    if (typeof callback !== 'undefined') {
      callback(val)
    }
  }
}
module.exports = {
  log
}