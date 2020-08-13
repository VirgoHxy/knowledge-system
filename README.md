# js容易忘记的操作 prod文件夹为生产使用(CommonJS 未压缩)

## arr.js 操作数组
* #### operRepeatArray 获取数组重复/未重复/去重复的元素
* #### distinctOfObj 数组去重
* #### distinctOfSet 数组去重
* #### removeItem 去除数组指定元素
* #### compareComplexArray 判断复杂数组(数组元素可包含对象,数组等等)是否相等(数组元素所在位置必须相同,元素类型必须完全相同)
* #### compareArray 判断简单数组是否相等(元素类型必须完全相同)

## obj.js 操作对象
* #### compareObject 判断对象是否相等
* #### clone 深拷贝对象
* #### getType 判断数据类型

## date.js 操作时间
* #### format 格式化时间
* #### convertJson json时间转换成时间(格式化依赖format)
* #### convertToStamp 时间转换成时间戳
* #### convertStamp 时间戳转换成时间(格式化依赖format)
* #### sortDate 按时间顺序排序数组
* #### getCalcDate 当前时间/给定时间增加/减去多长时间(格式化依赖format)
* #### getDateDiff 求两个时间的差[日,时,分,秒]
* #### isLeapYear 判断是否为闰年
* #### getDays 当前月份天数(依赖isLeapYear)
* #### getMyDate 获取从当前日期指定天数的日期(格式化依赖format)
* #### getDateStr 时间数值转换字符串时间长度

## fs.js 操作node的fs
* #### delPath 同步删除文件夹或文件
* #### readDir 同步读取文件夹

## str.js 操作字符串
* #### removeRepeat 字符串去重
* #### getRepeatNum 字符串中子字符串的重复次数
* #### getMmRepeatNum 字符串中的子字符重复最多/少次数
* #### randomStr 返回随机字符串

## number.js 操作数字
* #### accuracyObj 解决运算精度对象
  * ##### add 加
  * ##### subtract 减
  * ##### multiply 乘
  * ##### divide 除
* #### random 随机数方法
* #### S4 生成4位16进制数字
* #### guid 生成唯一guid
* #### id16 生成唯一16长度id
* #### isOdd 是否为奇数

## regex.js 操作正则
* #### phone 电话
* #### identityCard 身份证
* #### plate 车牌
* #### chWord 汉字
* #### isNumber 数字
* #### integer 整数
* #### positiveNum 正数
* #### positiveInteger 正整数
* #### checkIP ip
* #### dateTime 检测日期时间
* #### date 日期
* #### time 时间
* #### illegalReplace 非法字符替换
* #### illegalStr 非法字符
* #### image 图片
* #### getFileName 取出一个路径的文件名

## utils.js 工具
* #### isNull 判断null | undefined | 空字符串
* #### getUrlParam 获取url参数的值
* #### changeURLArg 修改url参数的值
* #### os 获取浏览器类型 终端类型
* #### closeWindow 闭浏览器
  