const fs = require('fs');
const path = require('path');

/**
 * 同步写入文件
 * @description 如果传入的是一个文件夹目录，则会创建这个文件夹路径
 *
 * @param {String} filePath 文件路径
 * @param {String | Buffer} content 文件内容
 *
 * @returns {Boolean}
 */
function writeSync(filePath, content) {
  if (!path.isAbsolute(filePath)) {
    filePath = path.resolve(__dirname, filePath);
  }
  mkdirSync(filePath);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content || '');
  } else {
    fs.appendFileSync(filePath, content || '');
  }
  return true;
}

/**
 * 同步删除文件夹或文件
 *
 * @param {String} dirPath 文件路径/文件夹路径
 *
 * @returns {Boolean}
 */
function delSync(dirPath) {
  if (!path.isAbsolute(dirPath)) {
    dirPath = path.resolve(__dirname, dirPath);
  }
  if (fs.existsSync(dirPath)) {
    if (!fs.statSync(dirPath).isDirectory()) {
      // 删除文件
      fs.unlinkSync(dirPath);
    } else {
      let dirs = fs.readdirSync(dirPath);
      dirs.forEach((dirName) => {
        let curPath = path.resolve(dirPath, dirName);
        // 递归删除文件夹
        delSync(curPath);
      });
      /* 
        这里遇见过同步删除文件却存在延迟
        导致删除文件夹出现not empty报错
        如果出现加上1-2秒的定时器即可
      */
      fs.rmdirSync(dirPath);
    }
  }
  return true;
}

/**
 * 同步读取目录列表或文件内容
 *
 * @param {String} dirPath 文件路径/文件夹路径
 * @param {String} [fileEncoding] 文件编码
 *
 * @returns {String | Array}
 */
function readSync(dirPath, fileEncoding) {
  if (!path.isAbsolute(dirPath)) {
    dirPath = path.resolve(__dirname, dirPath);
  }
  if (fs.existsSync(dirPath)) {
    if (!fs.statSync(dirPath).isDirectory()) {
      // 返回文件内容
      return fs.readFileSync(dirPath, fileEncoding);
    }
    // 返回目录列表
    return fs.readdirSync(dirPath);
  } else {
    throw new Error(`路径不存在: ${dirPath}`);
  }
}

/**
 * 同步拷贝文件夹或文件
 * @description 源路径和复制路径需要保持一致性，都是文件或是都是文件夹
 *
 * @param {String} sourcePath 源路径
 * @param {String} copyPath 复制路径
 *
 * @returns {Boolean}
 */
function copySync(sourcePath, copyPath) {
  if (!path.isAbsolute(sourcePath)) {
    sourcePath = path.resolve(__dirname, sourcePath);
  }
  if (!path.isAbsolute(copyPath)) {
    copyPath = path.resolve(__dirname, copyPath);
  }
  if (fs.existsSync(sourcePath)) {
    mkdirSync(copyPath);
    if (!fs.statSync(sourcePath).isDirectory()) {
      fs.copyFileSync(sourcePath, copyPath);
    } else {
      let dirs = fs.readdirSync(sourcePath);
      dirs.forEach((dirName) => {
        let sPath = path.resolve(sourcePath, dirName);
        let cPath = path.resolve(copyPath, dirName);
        // 递归复制
        copySync(sPath, cPath);
      });
    }
    return true;
  } else {
    throw new Error(`路径不存在: ${sourcePath}`);
  }
}

/**
 * 同步移动文件夹或文件
 * @description 源路径和移动路径需要保持一致性，都是文件或是都是文件夹
 *
 * @param {String} sourcePath 源路径
 * @param {String} movePath 移动路径
 *
 * @returns {Boolean}
 */
function moveSync(sourcePath, movePath) {
  if (!path.isAbsolute(sourcePath)) {
    sourcePath = path.resolve(__dirname, sourcePath);
  }
  if (!path.isAbsolute(movePath)) {
    movePath = path.resolve(__dirname, movePath);
  }
  if (fs.existsSync(sourcePath)) {
    mkdirSync(movePath);
    if (!fs.statSync(sourcePath).isDirectory()) {
      fs.renameSync(sourcePath, movePath);
    } else {
      let dirs = fs.readdirSync(sourcePath);
      dirs.forEach((dirName) => {
        let sPath = path.resolve(sourcePath, dirName);
        let mPath = path.resolve(movePath, dirName);
        // 递归复制
        moveSync(sPath, mPath);
      });
    }
    return true;
  } else {
    throw new Error(`路径不存在: ${sourcePath}`);
  }
}

/**
 * 同步流式拷贝文件夹或大文件
 * @description 源路径和复制路径需要保持一致性，都是文件或是都是文件夹
 *
 * @param {String} sourcePath 源路径
 * @param {String} copyPath 复制路径
 *
 * @returns {Boolean}
 */
function copyByStreamSync(sourcePath, copyPath) {
  if (!path.isAbsolute(sourcePath)) {
    sourcePath = path.resolve(__dirname, sourcePath);
  }
  if (!path.isAbsolute(copyPath)) {
    copyPath = path.resolve(__dirname, copyPath);
  }
  if (fs.existsSync(sourcePath)) {
    mkdirSync(copyPath);
    if (!fs.statSync(sourcePath).isDirectory()) {
      const readStream = fs.createReadStream(sourcePath);
      const writeStream = fs.createWriteStream(copyPath);
      readStream.pipe(writeStream);
    } else {
      let dirs = fs.readdirSync(sourcePath);
      dirs.forEach((dirName) => {
        let sPath = path.resolve(sourcePath, dirName);
        let cPath = path.resolve(copyPath, dirName);
        // 递归复制
        copyByStreamSync(sPath, cPath);
      });
    }
    return true;
  } else {
    throw new Error(`路径不存在: ${sourcePath}`);
  }
}

/**
 * 递归创建文件夹
 *
 * @param {String} dirPath 文件路径/文件夹路径
 *
 * @returns {Boolean}
 */
function mkdirSync(dirPath) {
  if (!path.isAbsolute(dirPath)) {
    dirPath = path.resolve(__dirname, dirPath);
  }
  let match = dirPath.match(/^.+[\\/]([^\\/]+)$/);
  // 清除文件名
  match && match[1].includes('.') && match[1].includes('.', 1) && (dirPath = dirPath.replace(match[1], ''));
  if (fs.existsSync(dirPath)) {
    return true;
  } else {
    if (mkdirSync(path.dirname(dirPath))) {
      fs.mkdirSync(dirPath);
      return true;
    }
  }
}

module.exports = {
  writeSync,
  delSync,
  readSync,
  copySync,
  moveSync,
  copyByStreamSync,
  mkdirSync,
};
