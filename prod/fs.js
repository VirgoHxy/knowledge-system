const fs = require('fs');

/**
 * 同步删除文件夹或文件
 * @param {String} path 路径
 */
function delPath(path) {
  let files = [];
  if (fs.existsSync(path)) {
    if (fs.statSync(path).isDirectory()) {
      files = fs.readdirSync(path);
      files.forEach((file, index) => {
        let curPath = path + "/" + file;
        if (fs.statSync(curPath).isDirectory()) {
          delDir(curPath); //递归删除文件夹
        } else {
          fs.unlinkSync(curPath); //删除文件
        }
      });
      fs.rmdirSync(path);
    } else {
      fs.unlinkSync(path); //删除文件
    }
  }
}

/**
 * 同步读取文件夹
 * @param {String} path 路径
 * @param {Function} callback 回调方法 参数为file文件 index序号
 */
function readDir(path, callback) {
  let files = [];
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach((file, index) => {
      callback && callback(file, index)
    });
  }
}

module.exports = { delPath, readDir };