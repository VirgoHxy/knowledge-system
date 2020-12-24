# js容易忘记的操作,prod文件夹为生产使用(兼容写法,支持导出,非导出挂载在global对象上),也可直接复制某个所需方法,但是注意是否有依赖方法

## 测试文件概括
| 文件名称 | 说明 |
| - | - |
| operators.js | 操作符示例 |
| regexpTest.js | 正则操作示例 |
| tips.js | 不常用基础提示 |

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

### arr.js
| 方法 | 说明 | 依赖方法 | 参数:参数类型 | 返回类型 |
| - | - | - | - | - |
| shuffle | 返回随机数组 | - | arr: Array | Array |
| distinctOfObj | 通过对象数组去重 | - | arr: Array | Array |
| distinctOfSet | 通过Set数组去重 | - | arr: Array | Array |
| removeItem | 去除数组指定元素 | - | arr: Array, removeArr: Array, [key: String] | Array |
| compareComplexArray | 判断复杂数组是否相等 | - | x: Array, y: Array | Boolean |
| compareArray | 判断简单数组是否相等 | - | x: Array, y: Array, [positionFlag = Boolean]: true | Boolean |
| splitOfArrayLength | 按数组长度分割数组成二维数组 | - | array: Array, length: Number, number: Number | Array |
| splitOfElementLength | 按元素长度分割数组成二维数组 | - | array: Array, number: Number | Array |

### date.js
| 方法 | 说明 | 依赖方法 | 参数:参数类型 | 返回类型 |
| - | - | - | - | - |
| getRegularTime | 获取合规时间 | - | value: Date/String/Number | Date |
| format | 格式化时间 | getRegularTime | value: Date/String/Number, [formatStr = "YYYY-MM-DD hh:mm:ss"]: String | String |
| convertJson | json时间(/Date(*)/)转换成时间 | [format] | value: String, [formatStr: String] | Date/String |
| convertToStamp | 时间转换成时间戳 | getRegularTime | value: String, [sFlag = false]: Boolean | Number |
| convertStamp | 时间戳转换成时间 | [format] | value: Number, [sFlag = false]: Boolean, [formatStr: String] | Date/String |
| sortDate | 按时间顺序排序数组 | - | array: Array, [isAsc = false]: Boolean, [key: String] | Array |
| getCalcDate | 给定时间增加/减去多长时间 | getRegularTime,[format] | value: Date/String/Number, opt: {value: Number,type: String}, [formatStr: String] | Date/String |
| getDateDiff | 求两个/多个时间的最大最小之间的差 | [sortDate] | array: Array, [type: String] | Array/Number |
| isLeapYear | 判断是否为闰年 | - | val: Number | Boolean |
| getDays | 获取当前月份天数 | isLeapYear,getRegularTime | value: Date/String/Number | Number |
| getDesignDate | 获取从当前日期指定数字时间的日期 | [format] | index: Number, [type = "d"]: String, [formatStr: *] | Date/String |
| getDateStr | 时间数值转换字符串时间长度 | - | val: Number, [type = "s"]: String | String |

## fs.js(需要node环境)
| 方法 | 说明 | 依赖方法 | 参数:参数类型 | 返回类型 |
| - | - | - | - | - |
| delPath | 同步删除文件夹或文件 | - | path: String | - |
| readDir | 同步读取文件夹 | - | path: String, callback: Function | - |

## number.js
| 方法 | 说明 | 依赖方法 | 参数:参数类型 | 返回类型 |
| - | - | - | - | - |
| fixed | 解决运算精度 | - | x: Number, y: Number, type: String, fixedLength: Number | Number |
| random | 返回n到m的随机数[n,m) | - | n: Number, m: Number | Number |
| S4 | 生成4位16进制数字 | - | - | String |
| guid | 生成唯一guid | S4 | - | String |
| id16 | 生成唯一16长度id | S4 | - | String |
| isOdd | 判断数字是否为奇数 | - | num: Number | Boolean |
| padNumber | 数字补零 | - | num: Number,fill: Number | String |

### obj.js
| 方法 | 说明 | 依赖方法 | 参数:参数类型 | 返回类型 |
| - | - | - | - | - |
| compareObject | 判断对象是否相等 | - | x: Object, y: Object | Boolean |
| clone | 深拷贝对象 | - | target: * | * |
| getType | 判断数据详细类型 | - | o: * | String |

### regexp.js
| 方法 | 说明 | 依赖方法 | 参数:参数类型 | 返回类型 |
| - | - | - | - | - |
| phone | 电话 | - | val: String | Boolean |
| identityCard | 身份证 | - | val: String | Boolean |
| plate | 车牌 | - | val: String | Boolean |
| chWord | 汉字 | - | val: String | Boolean |
| number | 数字 | - | val: String | Boolean |
| integer | 整数 | - | val: String | Boolean |
| positiveNum | 正数 | - | val: String | Boolean |
| positiveInteger | 正整数 | - | val: String | Boolean |
| checkIP | ip | - | val: String | Boolean |
| dateTime | 日期时间格式 | - | val: String | Boolean |
| date | 日期格式 | - | val: String | Boolean |
| time | 时间格式 | - | val: String | Boolean |
| illegalReplace | 非法字符替换 | - | val: String, [exceptionsArray: Array] | String |
| illegalStr | 非法字符 | - | val: String, [exceptionsArray: Array] | Boolean |
| image | 图片 | - | val: String | Boolean |
| getFileName | 获取路径的文件名 | - | val: String | String |

## str.js
| 方法 | 说明 | 依赖方法 | 参数:参数类型 | 返回类型 |
| - | - | - | - | - |
| removeRepeat | 字符串去重 | - | val: String | String |
| getRepeatNum | 字符串中子字符串的重复次数 | - | str: String, val: String | Number |
| getMmRepeatNum | 字符串中的子字符重复最多/少次数 | - | str: String, minFlag: Boolean | Object/Array |
| randomStr | 返回随机字符串 | - | length: Number | String |
| upperLetter | 获取大写字母数组 | - | - | Array |
| lowerLetter | 获取小写字母数组 | - | - | Array |
| truncate | 超过最大长度的将用三个替换字符代替 |  | str: String, [maxlength = 10]: String, [character = "."]: String | String |
| deleteByIndex | 通过字符串索引删除字符串 | - | str: String, index: Number/Array | String |
| deleteLastStr | 删除最后一个指定字符 | - | str: String, delStr: String | String |
| encrypto | 加密程序 | - | str: String, xor: Number, hex: Number | String |
| decrypto | 解密程序 | - | str: String, xor: Number, hex: Number | String |

## utils.js
| 方法 | 说明 | 依赖方法 | 参数:参数类型 | 返回类型 |
| - | - | - | - | - |
| isNull | 判断null/undefined/空字符串 | - | val: * | Boolean |
| getUrlParam | 获取url参数的值 | - | key: String, [url = window.location.href]: String | * |
| changeURLArg | 修改url参数的值 | - | key: String, value: *, [url = window.location.href]: String | String |
| setExpire | 设置期限Storage | - | storage: Storage, key: String, value: *,expire: Number | - |
| getExpire | 获取Storage(已自动json) | - | storage: Storage, key: String | * |
| os | 获取终端类型 | - | - | Object |
| getBrowser | 获取浏览器类型 | - | - | Object |
| getPayBrowser | 获取支付浏览器类型 | - | - | String/Boolean |
| closeWindow | 关闭浏览器 | - | - | - |
| download | 下载文件 | getBrowser, getDownloadUri | data: String, type: String | - |
| debounce | 去抖装饰器 | - | func: Function, ms: Number | Function |
| throttle | 节流装饰器 | - | func: Function, ms: Number | Function |