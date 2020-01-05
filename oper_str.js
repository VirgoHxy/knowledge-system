// xx表示any str表示字符串
var xx,str;
// xx转换字符串
str = String(xx)//undefined
// 所在位字符
str.charAt(2)//d
// ltr第一个字符所在位 没有为-1
str.indexOf('d')//2
// rtl第一个字符所在位 没有为-1
str.lastIndexOf('d')//8
// 截取字符串[1,4) 左闭右开
str.substring(1,4)//nde
// 字符串分割成数组
str.split('')//['u','n','d'...]
str.split('d')//['un','efine','']
// 大小写操作 全小写 全大写 首字母小写 首字母大写
str.toLowerCase()//undefined
str.toUpperCase()//UNDEFINED
'HelloWorld'.replace('HelloWorld'[0],'HelloWorld'[0].toLowerCase())//helloWorld
'helloWorld'.replace('helloWorld'[0],'helloWorld'[0].toUpperCase())//HelloWorld
// 空格操作 左右空格 左右空格 全部空格 左空格 右空格
' s t r '.trim()//s_t_r
' s t r '.replace(/^\s+|\s+$/g, '')//s_t_r
' s t r '.replace(/\s+/g, '')//str
' s t r '.replace( /^\s/, '')//s_t_r_
' s t r '.replace(/(\s$)/g, '')//_s_t_r

function log(val,msg,callback){
  if (val instanceof Array) {
    console.log(`------------------${msg}------------------`)
    val.forEach(element => {
      console.log(element)
      if (typeof callback !== 'undefined') {
        callback(element)
      }
    });
  } else {
    console.log(`------------------${msg}------------------`)
    console.log(val)
    if (typeof callback !== 'undefined') {
      callback(val)
    }
  }
}