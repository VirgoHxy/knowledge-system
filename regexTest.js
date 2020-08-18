// unicode修饰符 u
// 16进制数字
var regexp = /x\p{Hex_Digit}\p{Hex_Digit}/u;
console.log("number: xAF".match(regexp)); // xAF
// 中文
var regexp = /\p{sc=Han}/gu;
console.log("Hello Привет 你好 123_456".match(regexp)); // 你,好
// 货币
var regexp = /\p{Sc}\d/gu;
console.log("Prices: $2, €1, ¥9".match(regexp)); // $2,€1,¥9

// 多行修饰符 m
var str = `1st place: Winnie
2nd place: Piglet
33rd place: Eeyore
`;
// 每行以数字开头
console.log(str.match(/^\d+/gm)); // 1,2,33
// 每行最后一个单词
console.log(str.match(/\w+$/gm)); // Winnie,Piglet,Eeyore

// 完全匹配 ^以开头 $以结尾
// 时间
var regexp = /^\d\d:\d\d$/;
console.log(regexp.test("12:34")); // true
// 空字符串
var regexp = /^$/;
console.log(regexp.test("")); // true

// 词边界
// /bJava/b
console.log("Hello, Java!".match(/\bJava\b/)); // Java
// /bJava感叹号不是单词
console.log("Hello, Java!".match(/\bJava/)); // Java
// 空格不是单词Java/b
console.log("Hello, Java!".match(/Java\b/)); // Java
// /bJavaScript/b
console.log("Hello, JavaScript!".match(/\bJava\b/)); // null
// /bJavaScript
console.log("Hello, JavaScript!".match(/\bJava/)); // Java
// JavaScript/b
console.log("Hello, JavaScript!".match(/Java\b/)); // null
// 时间
console.log("Breakfast at 09:00 in the room 123:456".match(/\b\d\d:\d\d\b/))

// 集合范围
// tm集合
console.log("Mop top".match(/[tm]op/gi)); // Mop,top
// 不用转义的字符集合(转义仍能工作)
console.log("1 + 2 - 3".match(/[-().^+]/g)); // +,-
// 排除不用转义的字符集合
console.log("1 + 2 - 3".match(/[^-().^+\s]/g)); // 1,2,3
// 范围
console.log("number: xAF".match(/x[A-F0-9][A-F0-9]/g)); // xAF
// 时间
console.log("Breakfast at 09:00. Dinner at 21-30".match(/\d\d[:-]\d\d/g)); // 09:00,21-30

// 量词
// {2} 2个数字
console.log("+7(903)-123-45-67".match(/\b\d{2}\b/g)); // 45,67
console.log("+7(903)-123-45-67".match(/\d{2}/g)); // 90,12,45,67
// {2,3} 2到3个数字
console.log("+7(903)-12223-45-67".match(/\d{2,3}/g)); // 903,122,45,67
// {2} 2以上个数字
console.log("+7(903)-12223-45-67".match(/\d{2,}/g)); // 903,12223,45,67
// 缩写量词 
// + 一个或多个{1,}
console.log("+7(903)-12223-45-67".match(/\d+/g)); // 7,903,12223,45,67
// ? 零个或一个{0,1}
console.log("1 10 100".match(/100?/g)); // 10,100
// * 零个或多个{0,}
console.log("1 10 100 1000".match(/10*/g)); // 1,10,100,1000
// 标签
console.log("<body><h1>Hi!</h1></body>".match(/<[a-z][a-z0-9]*>/gi)); // <body>,<h1>
// 颜色
console.log("color:#121212; background-color:#AA00ef bad-colors:f#fddee #fd2 #12345678".match(/(#((\p{Hex_Digit}){3}){1,2}\b)/gu)); // #121212,#AA00ef,#fd2
// 懒惰量词
console.log('a "witch" and her "broom" is one'.match(/".+?"/g)); // "witch","broom"
// 贪婪量词(默认)
console.log('a "witch" and her "broom" is one'.match(/".+"/g)); // "witch" and her "broom"
// 注释
var str = `... <!-- My -- comment
test --> ..  <!----> ..
`;
console.log(str.match(/<!--[\s\S]*?-->/g)); // '<!-- My -- comment \n test -->', '<!---->'
// 标签
var str = '<> <a href="/"> <input type="radio" checked> <b>';
console.log(str.match(/<[^<>]+>/g)); // '<a href="/">', '<input type="radio" checked>', '<b>'

// 捕获组
// go作为一个整体
console.log('Gogogo now!'.match(/(go)+/i)); // "Gogogo"
// 域名
console.log("site.com my.site.com".match(/(\w+\.)+\w+/g)); // site.com,my.site.com
// 兼容email
console.log("my@mail.com @ his@site.com.uk".match(/[-.\w]+@([\w-]+\.)+[\w-]+/g)); // my@mail.com, his@site.com.uk
// 标签名
console.log("<><demo <body> demo>".match(/<([^<>]+?)>/i)[1]); // body
// 嵌套
console.log("<a href='xyz'>".match(/<(([a-z0-9]+)\s((\w+)=['"]{1}([^'"]*)['"]{1}))>/i));
// 可选组
console.log('ac'.match(/a(z)?(c)?/)); // ac,undefined,c
// 命名组
var regexp = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/;
var str = "2019-04-30";
var groups = str.match(regexp).groups;
console.log(groups.year); // 2019
console.log(groups.month); // 04
console.log(groups.day); // 30
// 替换捕获组
console.log(str.replace(regexp, '$<day>.$<month>.$1'))
// 非捕获组 ?:
console.log("<demo>".match(/(?:<)(.+)(?:>)/i)[1]); // demo
// 颜色
console.log("color: #3f3; background-color: #AA00ef; and: #abcd".match(/(#((\p{Hex_Digit}){3}){1,2}\b)/gu))
// 数字
console.log("-1.5 0 2 -123.4.".match(/[-+]?\d+(\.\d+)?/g))
var [s, a, op, b] = "1.2 * 3.4".match(/([-+]?\d+(?:\.\d+)?)\s*([\+\-\*\/])\s*([-+]?\d+(?:\.\d+)?)/)
console.log(a); // 1.2
console.log(op); // *
console.log(b); // 3.4

// 反向引用
// 编号反向引用 \N
console.log(`He said: "She's the one!".`.match(/(['"])(.*?)\1/g)); // "She's the one!"
// 按命名反向引用：\k<name>
console.log(`He said: "She's the one!".`.match(/(?<quote>['"])(.*?)\k<quote>/g)); // "She's the one!"

// or |
console.log("javascript typescript".match(/type|javascript/gi)); // javascript,type
console.log("javascript typescript".match(/(type|java)script/gi)); // javascript,typescript
// 时间
console.log("12:12".match(/\b([01]\d|2[0-3]):[0-5]\d\b/g)); // 12:12
// 编程语言 无法匹配一个单独字母C
console.log("Java JavaScript C++ PHP C C1".match(/\bJava(Script)?\b|\bPHP\b|C(\+\+)?/g)); // Java,JavaScript,C++,PHP,C
// 嵌套标签
console.log(`
[b]hello![/b]
[quote]
[url]http://google.com[/url]
[/quote]`.match(/\[(.+?)\][\s\S]*?\[\/\1\]/g)); // [b]hello![/b],[quote]\n[url]http://google.com[/url]\n[/quote]
// 标签
console.log("<style> <styler> <style test='...'>".match(/<style(>|\s.*?>)/g)); // <style>,<style test='...'>
