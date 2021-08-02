# 前端js错误监控

该md文件讲述如何监控前端的错误

## 错误监控流程

* 错误捕获
* 错误分析
    > What,发⽣了什么错误,逻辑错误、数据错误、⽹络错误、语法错误等<br>
    > When,出现的时间,如时间戳或者时间段<br>
    > Who,影响了多少用户,包括报错事件数、IP、设备信息<br>
    > Where,出现在哪儿,出现的文件名称或者出现的接口名称<br>
    > Why,错误的原因是什么,包括错误堆栈、⾏列<br>
    > How,怎么解决问题,版本回退或者热修复<br>

* 错误上报
    > 错误标识<br>
    > 错误过滤<br>
    > 错误接收<br>
    > 错误储存<br>
    > 错误清理<br>

* 可视分析
* 监控告警

错误上报示例

```json
内置固定示例
device 设备信息;
file 出现位置;格式为文件地址 + 行号 + 列号;
id 唯一标识;时间+随机字符,可在日志文件快速查到详细信息;
key 错误类型标识;用于标记同一位置同一错误;
message 错误提示;

// 文件内报错
{
  "device": {
    "osName": "Windows10",
    "type": "desktop"
  },
  "file": "https://192.168.1.253:3000/demo.html_706行_19列",
  "id": "20210731111727pOLjEe",
  "key": 63420,
  "message": "Uncaught TypeError: startDate is not a function"
}

自行上报示例
device 设备信息(window)(内置);
id 唯一标识(内置);时间+随机字符,可在日志文件快速查到详细信息;
key 错误类型标识(内置);用于标记同一位置同一错误;
location 出现的路由路径(window)(内置);
message 错误提示(必填);
url 接口地址(必填);
param 接口参数;
useTime 请求耗时;

// 自行上报请求内报错
{
  "device": {
    "osName": "Windows10",
    "type": "desktop"
  },
  "id": "20210731111727pkVyYQ",
  "key": 3769,
  "location": "/demo.html",
  "message": "404:error",
  "param": {
    "RoomId": "2021-07-23 16:27:32"
  },
  "url": "https://192.168.1.253:3000/Room/GetRoomId",
  "useTime": "17ms"
}
```

### 错误捕获

```
trycatch 语法错误不能捕获❌ Promise错误不能捕获❌ 异步错误不能捕获❌ Promise + reject,Promise + await和window.addEventListener('unhandledrejection',fn)能捕获✅

window.onerror = fn(message, source, lineno, colno, error) 语法错误不能捕获❌ Promise错误不能捕获❌ 异步错误能捕获✅

window.addEventListener('error', fn(errorEvent)) 语法错误不能捕获❌ Promise错误不能捕获❌ 异步错误能捕获✅ 资源错误能捕获✅
```

### 错误类型

| 错误对象 | 类型 | 一般原因 | errStr | 内置错误 |
| - | - | - | - | - |
| SyntaxError | 语法错误 | js引擎解析js时不符合语法 | - | 编译期间可在编辑器中提示 | 是 |
| ReferenceError | 引用错误 | 使用未声明的变量 | xxx is not defined | 是 |
| TypeError | 类型错误 | 值的类型或参数不是预期类型 | Cannot read property xxx of null<br>Cannot read property xxx of undefined<br>xxx is not a function | 是 |
| RangeError | 范围错误 | 传递一个number参数给一个范围内不包含该number的函数 | Invalid array length<br>Maximum call stack size exceeded | 是 |
| URIError | URL错误 | 编码或转码的参数无效 | URI malformed | 是 |
| UncaughtError | 未捕获错误 | 在Promise中未捕获的错误<br>在async函数中未捕获的错误 | Uncaught XXXError | 否 |
| ScriptError | 脚本错误 | 在CDN中出现了错误, 违背了同源策略, 错误详细信息不会显示 | Script error | 否 |
| NetworkError | 网络错误 | 后端逻辑错误<br>请求接口未找到<br>请求超时<br>跨域拦截 | Request failed with status code 500<br>Request failed with status code 404<br>timeout of 20000ms exceeded<br>No 'Access-Control-Allow-Origin' header is present on the requested resource | 否 |
