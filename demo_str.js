// xx转换字符串实demo
// number
log([String(0),String(1),String(-1),String(0.100),String(0.001)],'数字转换字符串')//0 1 -1 0.1 0.001

// boolean
log([String(true),String(false)],'布尔转换字符串',(val)=>{// true false
  console.log(val[0])// t f
  console.log(val[1])// r a
  console.log(val[2])// u l
})

// undefined null
log([String(undefined),String(null)],'undefined和null转换字符串',(val)=>{// undefined null
  console.log(val[0])// u n
  console.log(val[1])// n u
  console.log(val[2])// d l
})

// object
log(String({status: false,data: {}}),'对象转换字符串',(val)=>{// [object Object]
  console.log(val[0])// [
  console.log(val[1])// o
  console.log(val[2])// b
})

// array
log(String([false,true,{status: false,data: {}}]),'数组转换字符串',(val)=>{// false,true,[object Object]
  console.log(val[0])// f
  console.log(val[1])// a
  console.log(val[2])// l
  console.log(val[5])// ,
})

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