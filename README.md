# js容易忘记的操作

## arr.js 操作数组
* #### refrain 获取数组重复/未重复/去重复的元素
* #### removeItem 去除数组指定元素

## date.js 操作时间
* #### format 格式化时间
* #### convertJson json时间转换成时间(格式化依赖format)
* #### convertToStamp 时间转换成时间戳
* #### convertStamp 时间戳转换成时间(格式化依赖format)
* #### sortForDate 按时间顺序排序数组
* #### getCalcDate 当前时间/给定时间增加/减去多长时间(格式化依赖format)
* #### getTimeBetween 求两个时间的差(日、时、分、秒)或者(年、月)
* #### isLeapYear 判断是否为闰年
* #### getDays 当前月份天数(依赖isLeapYear)

## fs.js 操作node的fs
* #### delPath 同步删除文件夹或文件
* #### readDir 同步读取文件夹

## str.js 操作字符串，不抛出方法
* #### removeRepeat 字符串去重
* #### getRepeatNum 字符串中的子字符串重复次数
* #### getMmRepeatNum 字符串中的子字符重复最多/少次数

## number.js 操作数字，不抛出方法
* #### random 随机数方法
* #### accuracyObj 解决运算精度对象
  * ##### add 加
  * ##### subtract 减
  * ##### multiply 乘
  * ##### divide 除

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
