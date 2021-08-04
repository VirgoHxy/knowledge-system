/**
 * event捕获错误示例(window)(不接收其他参数)
 * 
 * @var {Object} device 设备信息
 * @var {String} file 出现位置
 * @var {String} id 唯一标识 时间+随机字符
 * @var {String} key 错误类型标识 用于标记同一位置同一错误
 * @var {String} message 错误提示
 * @var {String} detailKey 错误类型标识 用于标记同一错误
 * @var {String} detailMessage 详细错误提示
 * @var {String} location 出现的路由路径
 */
let eventError = {
  "device": {
    "osName": "Windows10",
    "type": "desktop"
  },
  "file": "https://192.168.1.253:3000/demo.html_706行_19列",
  "id": "20210731111727pOLjEe",
  "key": 3790,
  "detailKey": 5086,
  "message": "Cannot read property 'data' of undefined;",
  "detailMessage": "Cannot read property 'data' of undefined;Citys/GetData;",
  "location": "/demo.html"
};
/**
 * 自行上报http错误示例(window+node)(可接收其他参数)
 * 
 * @var {Object} httpError.device 设备信息(window)(内置)
 * @var {String} httpError.id 唯一标识 时间+随机字符(内置)
 * @var {Number} httpError.key 错误类型标识 用于标记同一位置同一错误(内置)
 * @var {Number} httpError.detailKey 错误类型标识 用于标记同一错误(内置)
 * @var {String} httpError.location 出现的路由路径(window)(内置)
 * @var {String} httpError.message 错误提示(必填)
 * @var {String} httpError.detailMessage 详细错误提示(内置)
 * @var {*} httpError.param 接口参数
 * @var {String} httpError.url 接口地址(必填)
 * @var {String} httpError.useTime 请求耗时
 */
let httpError = {
  "device": {
    "osName": "Windows10",
    "type": "desktop"
  },
  "id": "20210731111727pkVyYQ",
  "key": 3790,
  "detailKey": 5086,
  "location": "/demo.html",
  "message": "Cannot read property 'data' of undefined;",
  "detailMessage": "Cannot read property 'data' of undefined;Citys/GetData;",
  "param": {
    "RoomId": "2021-07-23 16:27:32"
  },
  "url": "Citys/GetData",
  "useTime": "17ms"
};

/* 
自行上报错误示例代码
let startDate = (new Date()).getTime();
let param = {
  url: window.location.origin + "/" + "Room/GetRoomId",
  type: "post",
  data: {
    "RoomId": "2021-07-23 16:27:32"
  },
  timeout: 6000,
  dataType: "text",
  success(result, status, xhr) {
    console.log(result);
    let endDate = (new Date()).getTime();
    if (xhr.status != 200 || (result === "" || result == null)) {
      errorHandler.reportError({
        message: xhr.status + ":" + (xhr.status != 200 ? status : "返回为空"),
        param: param.data,
        url: param.url,
        useTime: (endDate - startDate) + "ms"
      });
    }
  },
  error(xhr, status) {
    console.log(xhr);
    let endDate = (new Date()).getTime();
    errorHandler.reportError({
      message: xhr.status + ":" + status,
      param: param.data,
      url: param.url,
      useTime: (endDate - startDate) + "ms"
    });
  }
};
$.ajax(param);
*/

// SyntaxError 语法错误 一般在编译或者本地运行期间就会发现
// let = 10; // 一个声明语法错误

// ReferenceError 引用错误 使用未声明的变量
try {
  // eslint-disable-next-line no-undef
  console.log(y);
} catch (error) {
  // ReferenceError: y is not defined
  console.log("error:", error);
}

// TypeError 类型错误 值的类型或参数不是预期类型
try {
  let data = null;
  console.log(data.number);
} catch (error) {
  // TypeError: Cannot read property number of null
  console.log("error:", error);
}
try {
  let data = undefined;
  console.log(data.number);
} catch (error) {
  // TypeError: Cannot read property number of undefined
  console.log("error:", error);
}
try {
  let data = 1;
  console.log(data());
} catch (error) {
  // TypeError: data is not a function
  console.log("error:", error);
}

// RangeError number超出规定的范围
try {
  new Array(1.2);
} catch (error) {
  // RangeError: Invalid array length
  console.log("error:", error);
}
try {
  const foo = () => foo();
  foo();
} catch (error) {
  // RangeError: Maximum call stack size exceeded
  console.log(error);
}

// URIError 编码/解码错误
// 高-低位完整字符
console.log('\uD800\uDFFF'); // 𐏿 一个方块
console.log(encodeURIComponent('\uD800\uDFFF'));
try {
  // 单独高位字符
  console.log(encodeURIComponent('\uD800'));
  // 单独低位字符
  console.log(encodeURIComponent('\uDFFF'));
} catch (error) {
  // URIError: URI malformed
  console.log("error:", error);
}
try {
  console.log(decodeURIComponent("%"));
} catch (error) {
  // URIError: URI malformed
  console.log("error:", error);
}