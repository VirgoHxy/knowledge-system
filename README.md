# js容易忘记的操作,prod文件夹为生产使用(兼容写法,支持导出,非导出挂载在global对象上),也可直接复制某个所需方法,但是注意是否有依赖方法

## 测试文件概括
| 文件名称 | 说明 |
| - | - |
| operators.js | 操作符示例 |
| regexpTest.js | 正则操作示例 |
| tips.js | 不常用基础提示 |
| es6.js | es6总结 |
| error.js error.md | 错误上报总结 |

## prod文件概括
| 文件名称 | 类型 | 非导出的抛出对象 |
| - | - | - |
| arr.js | Array | JAFOArrMethod |
| date.js | Date | JAFODateMethod |
| fs.js | File | - |
| number.js | Number | JAFONumberMethod |
| obj.js | Object | JAFOObjMethod |
| regexp.js | RegExp | JAFORegexpMethod |
| str.js | String | JAFOStrMethod |
| utils.js | * | JAFOUtilsMethod |
| error.js | Error | JAFOErrorHandler |

### arr.js
| 方法 | 说明 | 依赖方法 | 参数:参数类型 | 返回类型 | 执行环境 |
| - | - | - | - | - | - |
| shuffle | 返回随机数组 | - | arr: Array | Array | window + node |
| distinctOfObj | 通过对象数组去重 | - | arr: Array | Array | window + node |
| distinctOfSet | 通过Set数组去重 | - | arr: Array | Array | window + node |
| removeItem | 去除数组指定元素 | - | arr: Array, removeArr: Array, [key: String] | Array | window + node |
| compareComplexArray | 判断复杂数组是否相等 | - | x: Array, y: Array | Boolean | window + node |
| compareArray | 判断简单数组是否相等 | - | x: Array, y: Array, [positionFlag = Boolean]: true | Boolean | window + node |
| splitOfArrayLength | 按数组长度分割数组成二维数组 | - | array: Array, length: Number, number: Number | Array | window + node |
| splitOfElementLength | 按元素长度分割数组成二维数组 | - | array: Array, number: Number | Array | window + node |

### date.js
| 方法 | 说明 | 依赖方法 | 参数:参数类型 | 返回类型 | 执行环境 |
| - | - | - | - | - | - |
| getRegularTime | 获取合规时间 | - | value: Date/String/Number | Date | window + node |
| getDate2XLSX | 获取xlsx合规时间 | - | value: Number | Date | window + node |
| format | 格式化时间 | getRegularTime | value: Date/String/Number, [formatStr = "YYYY-MM-DD hh:mm:ss"]: String | String | window + node |
| convertJson | json时间(/Date(*)/)转换成时间 | [format] | value: String, [formatStr: String] | Date/String | window + node |
| convertToStamp | 时间转换成时间戳 | getRegularTime | value: String, [sFlag = false]: Boolean | Number | window + node |
| convertStamp | 时间戳转换成时间 | [format] | value: Number, [sFlag = false]: Boolean, [formatStr: String] | Date/String | window + node |
| sortDate | 按时间顺序排序数组 | - | array: Array, [isAsc = false]: Boolean, [key: String] | Array | window + node |
| getCalcDate | 给定时间增加/减去多长时间 | getRegularTime,[format] | value: Date/String/Number, opt: {value: Number,type: String}, [formatStr: String] | Date/String | window + node |
| getDateDiff | 求两个/多个时间的最大最小之间的差 | [sortDate] | array: Array, [type: String] | Array/Number | window + node |
| isLeapYear | 判断是否为闰年 | - | val: Number | Boolean | window + node |
| getDays | 获取当前月份天数 | isLeapYear,getRegularTime | value: Date/String/Number | Number | window + node |
| getDesignDate | 获取从当前日期指定数字时间的日期 | [format] | index: Number, [type = "d"]: String, [formatStr: *] | Date/String | window + node |
| getDateStr | 时间数值转换字符串时间长度 | - | val: Number, [type = "s"]: String | String | window + node |

## fs.js(需要node环境)
| 方法 | 说明 | 依赖方法 | 参数:参数类型 | 返回类型 | 执行环境 |
| - | - | - | - | - | - |
| writeByPathSync | 同步写入文件夹或文件 | - | paramPath: String, contentStr: String | - | node |
| delByPathSync | 同步删除文件夹或文件 | - | paramPath: String | - | node |
| readByPathSync | 同步读取文件夹或文件 | - | paramPath: String | String | node |
| copyByPathSync | 同步拷贝文件夹或文件 | - | sourcePath: String, copyPath: String | - | node |

## number.js
| 方法 | 说明 | 依赖方法 | 参数:参数类型 | 返回类型 | 执行环境 |
| - | - | - | - | - | - |
| fixed | 解决运算精度 | - | x: Number, y: Number, type: String, fixedLength: Number | Number | window + node |
| random | 返回n到m的随机数[n,m) | - | n: Number, m: Number | Number | window + node |
| randomOfDigit | 返回n位随机数 | - | n: Number | String | window + node |
| S4 | 生成4位16进制数字 | - | - | String | window + node |
| guid | 生成唯一guid | S4 | - | String | window + node |
| id16 | 生成唯一16长度id | S4 | - | String | window + node |
| isOdd | 判断数字是否为奇数 | - | num: Number | Boolean | window + node |
| padNumber | 数字左补零 | - | num: Number,fill: Number | String | window + node |

### obj.js
| 方法 | 说明 | 依赖方法 | 参数:参数类型 | 返回类型 | 执行环境 |
| - | - | - | - | - | - |
| compareObject | 判断对象是否相等 | - | x: Object, y: Object | Boolean | window + node |
| clone | 深拷贝对象 | - | target: * | * | window + node |
| getType | 判断数据详细类型 | - | o: * | String | window + node |

### regexp.js
| 方法 | 说明 | 依赖方法 | 参数:参数类型 | 返回类型 | 执行环境 |
| - | - | - | - | - | - |
| phone | 电话 | - | val: String | Boolean | window + node |
| identityCard | 身份证 | - | val: String | Boolean | window + node |
| plate | 车牌 | - | val: String | Boolean | window + node |
| chWord | 汉字 | - | val: String | Boolean | window + node |
| number | 数字 | - | val: String | Boolean | window + node |
| integer | 整数 | - | val: String | Boolean | window + node |
| positiveNum | 正数 | - | val: String | Boolean | window + node |
| positiveInteger | 正整数 | - | val: String | Boolean | window + node |
| checkIP | ip | - | val: String | Boolean | window + node |
| dateTime | 日期时间格式 | - | val: String | Boolean | window + node |
| date | 日期格式 | - | val: String | Boolean | window + node |
| time | 时间格式 | - | val: String | Boolean | window + node |
| illegalReplace | 非法字符替换 | - | val: String, [exceptionsArray: Array] | String | window + node |
| illegalStr | 非法字符 | - | val: String, [exceptionsArray: Array] | Boolean | window + node |
| image | 图片 | - | val: String | Boolean | window + node |
| getFileName | 获取路径的文件名 | - | val: String | String | window + node |

## str.js
| 方法 | 说明 | 依赖方法 | 参数:参数类型 | 返回类型 | 执行环境 |
| - | - | - | - | - | - |
| removeRepeat | 字符串去重 | - | val: String | String | window + node |
| getRepeatNum | 字符串中子字符串的重复次数 | - | str: String, val: String | Number | window + node |
| getMmRepeatNum | 字符串中的子字符重复最多/少次数 | - | str: String, minFlag: Boolean | Object/Array | window + node |
| randomStr | 返回随机字符串 | - | length: Number | String | window + node |
| upperLetter | 获取大写字母数组 | - | - | Array | window + node |
| lowerLetter | 获取小写字母数组 | - | - | Array | window + node |
| truncate | 超过最大长度的将用三个替换字符代替 |  | str: String, [maxlength = 10]: String, [character = "."]: String | String | window + node |
| deleteByIndex | 通过字符串索引删除字符串 | - | str: String, index: Number/Array | String | window + node |
| deleteLastStr | 删除最后一个指定字符 | - | str: String, delStr: String | String | window + node |
| encrypto | 加密程序 | - | str: String, [xor = 1998]: Number, [hex = 16]: Number | String | window + node |
| decrypto | 解密程序 | - | str: String, [xor = 1998]: Number, [hex = 16]: Number | String | window + node |

## utils.js
| 方法 | 说明 | 依赖方法 | 参数:参数类型 | 返回类型 | 执行环境 |
| - | - | - | - | - | - |
| isNull | 判断null/undefined/空字符串 | - | val: * | Boolean | window + node |
| getUrlParam | 获取url参数的值 | - | key: String, [url = window.location.href]: String | * | window + node |
| changeURLArg | 修改url参数的值 | - | key: String, value: *, [url = window.location.href]: String, hrefFlag: Boolean | String | window + node |
| urlMethod | 操作url的方法 | - | {[url = window.location.href]: String, type: String, key: String, value: *, hrefFlag: Boolean} | * | window + node |
| setExpire | 设置期限Storage | - | storage: Storage, key: String, value: *,expire: Number | - | window + node |
| getExpire | 获取Storage(已json化) | - | storage: Storage, key: String | * | window + node |
| getCookie | 获取cookie | - | name: String | String,Undefined | window |
| setCookie | 设置cookie | - | name: String, value: String, options: Object | - | window |
| deleteCookie | 删除cookie | setCookie | name: String | - | window |
| os | 获取终端类型 | - | - | Object | window |
| getBrowser | 获取浏览器类型 | - | - | Object | window |
| getPayBrowser | 获取支付浏览器类型 | - | - | String/Boolean | window |
| closeWindow | 关闭浏览器 | - | - | - | window |
| download | 下载文件 | getBrowser, getDownloadUri | data: String, type: String | - | window |
| downloadByAElement | 通过元素下载文件 | - | url: String, fileName: String | - | window |
| debounce | 去抖装饰器 | - | func: Function, ms: Number | Function | window + node |
| throttle | 节流装饰器 | - | func: Function, ms: Number | Function | window + node |