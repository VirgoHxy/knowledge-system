// 空值合并(es2020 需要babel转换) a ?? b; 如果a不是null或undefined 则为a 其他情况 则为b
var x = 1 ?? 2; // 1
console.log(x);
var x = null ?? 2; // 2
console.log(x);
var x = undefined ?? 2; // 2
console.log(x);
var x = undefined ?? null; // null
console.log(x);
// 可选链(es2020 需要babel转换) 访问嵌套对象属性的防错误方法
var x = {};
y?.a // 报错 可选链左侧必须声明
x.a?.b // 不报错 undefined
x.admin?.() // 不报错 调用可能不存在的admin
x.a?.["x-y"] // 不报错 undefined 