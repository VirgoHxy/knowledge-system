const fs = require("fs");

/**
 * 同步写入文件夹或文件
 * 
 * @param {String} paramPath 路径
 * @param {String} contentStr 写入内容
 */
function writeByPathSync(paramPath, contentStr) {
  try {
    let write = function (str, appendFlag) {
      if (str.match(/[^\\/]*$/)[0].indexOf(".") != -1) {
        !contentStr && (console.log("写入内容为空"));
        if (!appendFlag) {
          fs.writeFileSync(str, contentStr || "");
        } else {
          fs.appendFileSync(str, contentStr || "");
        }
      } else {
        if (!appendFlag) {
          fs.mkdirSync(str);
        } else {
          return "路径已存在";
        }
      }
    };
    if (!fs.existsSync(paramPath)) {
      paramPath = paramPath.replace(/\\\\|\\/g, "/");
      let pathArr = paramPath.split("/");
      let pathStr = pathArr[0];
      pathArr.splice(0, 1);
      while (pathArr.length > 0) {
        pathStr += "/" + pathArr[0];
        if (!fs.existsSync(pathStr)) {
          write(pathStr);
        }
        pathArr.splice(0, 1);
      }
    } else {
      write(paramPath, true);
    }
  } catch (error) {
    console.log(error);
  }
}

/**
 * 同步删除文件夹或文件
 * 
 * @param {String} paramPath 路径
 */
function delByPathSync(paramPath) {
  try {
    if (fs.existsSync(paramPath)) {
      if (fs.statSync(paramPath).isDirectory()) {
        let files = fs.readdirSync(paramPath);
        files.forEach((file) => {
          let curPath = paramPath + "/" + file;
          if (fs.statSync(curPath).isDirectory()) {
            delByPathSync(curPath); //递归删除文件夹
          } else {
            fs.unlinkSync(curPath); //删除文件
          }
        });
        fs.rmdirSync(paramPath);
      } else {
        fs.unlinkSync(paramPath); //删除文件
      }
    } else {
      return "路径不存在";
    }
  } catch (error) {
    console.log(error);
  }
}

/**
 * 同步读取文件夹或文件
 * 
 * @param {String} paramPath 路径
 * 
 * @returns {String | Array}
 */
function readByPathSync(paramPath) {
  try {
    if (fs.existsSync(paramPath)) {
      if (!fs.statSync(paramPath).isDirectory()) {
        return fs.readFileSync(paramPath, "utf8");
      }
      return fs.readdirSync(paramPath);
    } else {
      return "路径不存在";
    }
  } catch (error) {
    console.log(error);
  }
}

/**
 * 同步拷贝文件夹或文件
 * 
 * @param {String} sourcePath 源路径
 * @param {String} copyPath 复制路径
 */
function copyByPathSync(sourcePath, copyPath) {
  try {
    let copy = function (sourcePath, copyPath) {
      copyPath = copyPath.replace(/\\\\|\\/g, "/");
      let copyFn = function (str, lastFlag) {
        if (str.match(/[^\\/]*$/)[0].indexOf(".") != -1) {
          fs.copyFileSync(sourcePath, copyPath);
        } else {
          let fileName = sourcePath.match(/[^\\/]*$/)[0];
          fs.mkdirSync(str);
          if (lastFlag) {
            fs.copyFileSync(sourcePath, str+"/"+fileName);
          }
        }
      };
      let pathArr = copyPath.split("/");
      let pathStr = pathArr[0];
      pathArr.splice(0, 1);
      while (pathArr.length > 0) {
        pathStr += "/" + pathArr[0];
        if (!fs.existsSync(pathStr)) {
          copyFn(pathStr, pathArr.length == 1);
        }
        pathArr.splice(0, 1);
      }
    };
    if (fs.existsSync(sourcePath)) {
      if (!fs.statSync(sourcePath).isDirectory()) {
        copy(sourcePath,copyPath);
      } else {
        let files = fs.readdirSync(sourcePath);
        files.forEach((file) => {
          let sPath = sourcePath + "/" + file;
          let cPath = copyPath + "/" + file;
          if (fs.statSync(sPath).isDirectory()) {
            copyByPathSync(sPath,cPath); //递归复制文件夹
          } else {
            copy(sPath, cPath);
          }
        });
      }
    } else {
      return "路径不存在";
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  writeByPathSync,
  delByPathSync,
  readByPathSync,
  copyByPathSync
};