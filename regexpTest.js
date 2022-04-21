// RegExp extends Function;RegExp extends Object;正则类继承方法类和对象类

// 字符类
// \d 0到9的字符
// \s 空格 制表符 换行符 少数稀有字符
// \w 拉丁字母、数字、_

// 反向类
// \D 0到9以外的字符
// \S 除了空格 制表符 换行符 少数稀有字符
// \W 除了拉丁字母、数字、_

// 常用含义
// . 表示除了换行符以外的任何字符 [\s\S]
// + 一个或多个{1,}
// ? 零个或一个{0,1}
// * 零个或多个{0,}
// ^ 以开头
// $ 以结尾
// | 或者
// \ 转义

// 搜索模式 修饰符
// g 搜索时会查找所有的匹配项
// u unicode修饰符搜索
// i 搜索时不区分大小写
// m 多行搜索
// y 粘性标志,精准搜索,必须从头部开始

let str, regexp;

/* 动态正则 new RegExp(`/@import\\s+(\\S+)\\.js/`) */
let ext = 'js';
console.log(
  "@import 'demo.js';@import 'demo.css';".match(
    new RegExp(`@import\\s+'\\S+\\.${ext}'`, 'g')
  )[0]
);
ext = 'css';
console.log(
  "@import 'demo.js';@import 'demo.css';".match(
    new RegExp(`@import\\s+'\\S+\\.${ext}'`, 'g')
  )[0]
);

/* 字符正则方法 */
console.log('1,2,3'.match(/\d/)); // 1, index: 0, input: '1,2,3'
console.log('abc'.match(/\d/)); // null
// 返回[object RegExp String Iterator] 可迭代对象 返回所有匹配 index input | 没有匹配项返回空迭代对象
console.log(Array.from('abc1'.matchAll(/\d/g))); // [ '1', index: 0, input: '1,2,3', groups: undefined ]
// 返回数组 第二个参数限定个数
console.log('1,2,3'.split(/,/)); // 1,2,3
console.log('1,2,3'.split(/,/, 2)); // 1,2
// 寻找匹配项index 未找到返回-1
console.log('1,2,3'.search(/2/)); // 2
// 替换字符
console.log('12-34-56'.replace(/-/g, ':')); // 12:34:56
// 插入字符
console.log('12-34-56'.replace(/-/g, '测试$&测试')); // 12--34--56
// 匹配项替换成匹配项之前字符 12前面没有字符就为空
console.log('124'.replace(/12/g, '$`')); // 4
// 匹配项替换成匹配项之后字符
console.log('124'.replace(/12/g, "$'")); // 44
// 捕获组number
console.log('12-34-56'.replace(/(\d+)-(\d+)-(\d+)/g, '$2-$3-$1')); // 34-56-12
// 捕获组name
console.log(
  '12-34-56'.replace(
    /(?<one>\d+)-(?<two>\d+)-(?<three>\d+)/g,
    '$<two>-$<three>-$<one>'
  )
); // 34-56-12
// replace函数 没有捕获组 match匹配项 index位置 input源字符串
console.log(
  'html and css'.replace(/html|css/gi, (match) => match.toUpperCase())
); // HTML and CSS
// replace函数 没有捕获组 match匹配项 p1,p2,...,pn分组内容 index位置 input源字符串 groups分组对象
console.log(
  'html and css'.replace(
    /(html).*(css)/gi,
    (match, p1, p2, offset, input, groups) => `${p2} and ${p1}`
  )
); // css and html
// 将下划线命名转换为大驼峰
let line2upper = (str) =>
  str
    .replace(/\s/g, '')
    .replace(/_{0,1}([^_])([^_]*)/g, (_, $1, $2) => $1.toUpperCase() + $2);
console.log(line2upper('line__a_to_upper'));
// 大小写互换
let lowerSwapUpper = (str) =>
  str.replace(
    /([A-Z]*)([a-z]*)/g,
    (_, $1, $2) => $1.toLowerCase() + $2.toUpperCase()
  );
console.log(lowerSwapUpper('line__a_to_upper'));
// exec通过循环得到所有匹配项 matchAll的替代方法 返回 match匹配项,index位置,input源字符串,groups分组对象
regexp = /javascript/gi;
//'JavaScript',index: 11,input: 'More about JavaScript at https://javascript.info',groups: undefined
let result = regexp.exec('More about JavaScript at https://javascript.info');
console.log(result[0]); // 'JavaScript'
console.log(result.index); // 11
console.log(result.input); // 'More about JavaScript at https://javascript.info'
console.log(result.groups); // undefined
//'javascript',index: 33,input: 'More about JavaScript at https://javascript.info',groups: undefined
let result1 = regexp.exec('More about JavaScript at https://javascript.info');
console.log(result1[0]); // 'javascript'
console.log(result1.index); // 33
console.log(result1.input); // 'More about JavaScript at https://javascript.info'
console.log(result1.groups); // undefined
// 是否存在匹配项 等同于search的index!==-1
console.log(/love/i.test('I love JavaScript')); // true

/* 搜索模式 */
// g 返回所有匹配
console.log('1,2,3'.match(/\d/g)); // 1,2,3

// u unicode搜索
// 16进制数字
regexp = /x\p{Hex_Digit}\p{Hex_Digit}/u;
console.log('number: xAF'.match(regexp)); // xAF
// 中文
regexp = /\p{sc=Han}/gu;
console.log('Hello Привет 你好 123_456'.match(regexp)); // 你,好
// 货币
regexp = /\p{Sc}\d/gu;
console.log('Prices: $2, €1, ¥9'.match(regexp)); // $2,€1,¥9

// i 大小写修饰符
console.log(/love/i.test('I Love JavaScript')); // true
console.log(/love/.test('I Love JavaScript')); // false

// m 多行修饰符
str = `1st place: Winnie
2nd place: Piglet
33rd place: Eeyore
`;
// 每行以数字开头
console.log(str.match(/^\d+/gm)); // 1,2,33
// 每行最后一个单词
console.log(str.match(/\w+$/gm)); // Winnie,Piglet,Eeyore

// y 粘性标志,精准搜索,必须从头部开始
regexp = /\w+/y;
// 下一次搜索位置为3 也就是第4个字符为空格 匹配失败
regexp.lastIndex = 3;
console.log("let varName = 'value'".match(regexp)); // null
// 下一次搜索位置为4 也就是第5个字符为v 匹配成功
regexp.lastIndex = 4;
console.log("let varName = 'value'".match(regexp)); // varName

/* 完全匹配 ^以开头 $以结尾 */
// 时间
regexp = /^\d\d:\d\d$/;
console.log(regexp.test('12:34')); // true
// 空字符串
regexp = /^$/;
console.log(regexp.test('')); // true

/* or | */
console.log('javascript typescript'.match(/type|javascript/gi)); // javascript,type
console.log('javascript typescript'.match(/(type|java)script/gi)); // javascript,typescript
// 时间
console.log('12:12'.match(/\b([01]\d|2[0-3]):[0-5]\d\b/g)); // 12:12
// 编程语言 无法匹配一个单独字母C
console.log(
  'Java JavaScript C++ PHP C C1'.match(/\bJava(Script)?\b|\bPHP\b|C(\+\+)?/g)
); // Java,JavaScript,C++,PHP,C
// 嵌套标签
console.log(
  `
[b]hello![/b]
[quote]
[url]http://google.com[/url]
[/quote]`.match(/\[(.+?)\][\s\S]*?\[\/\1\]/g)
); // [b]hello![/b],[quote]\n[url]http://google.com[/url]\n[/quote]
// 标签
console.log("<style> <styler> <style test='...'>".match(/<style(>|\s.*?>)/g)); // <style>,<style test='...'>

/* 量词 */
// {2} 2个数字
console.log('+7(903)-123-45-67'.match(/\b\d{2}\b/g)); // 45,67
console.log('+7(903)-123-45-67'.match(/\d{2}/g)); // 90,12,45,67
// {2,3} 2到3个数字
console.log('+7(903)-12223-45-67'.match(/\d{2,3}/g)); // 903,122,45,67
// {2} 2以上个数字
console.log('+7(903)-12223-45-67'.match(/\d{2,}/g)); // 903,12223,45,67
// 缩写量词
// + 一个或多个{1,}
console.log('+7(903)-12223-45-67'.match(/\d+/g)); // 7,903,12223,45,67
// ? 零个或一个{0,1}
console.log('1 10 100'.match(/100?/g)); // 10,100
// * 零个或多个{0,}
console.log('1 10 100 1000'.match(/10*/g)); // 1,10,100,1000
// 标签
console.log('<body><h1>Hi!</h1></body>'.match(/<[a-z][a-z0-9]*>/gi)); // <body>,<h1>
// 颜色
console.log(
  'color:#121212; background-color:#AA00ef bad-colors:f#fddee #fd2 #12345678'.match(
    /(#((\p{Hex_Digit}){3}){1,2}\b)/gu
  )
); // #121212,#AA00ef,#fd2
// 懒惰量词
console.log('a "witch" and her "broom" is one'.match(/".+?"/g)); // "witch","broom"
// 贪婪量词(默认)
console.log('a "witch" and her "broom" is one'.match(/".+"/g)); // "witch" and her "broom"
// 注释
str = `... <!-- My -- comment
test --> ..  <!----> ..
`;
console.log(str.match(/<!--[\s\S]*?-->/g)); // '<!-- My -- comment \n test -->', '<!---->'
// 标签
str = '<> <a href="/"> <input type="radio" checked> <b>';
console.log(str.match(/<[^<>]+>/g)); // '<a href="/">', '<input type="radio" checked>', '<b>'

/* 集合范围 */
// tm集合
console.log('Mop top'.match(/[tm]op/gi)); // Mop,top
// 不用转义的字符集合(转义仍能工作)
console.log('1 + 2 - 3'.match(/[-().^+]/g)); // +,-
// 排除不用转义的字符集合
console.log('1 + 2 - 3'.match(/[^-().^+\s]/g)); // 1,2,3
// 范围
console.log('number: xAF'.match(/x[A-F0-9][A-F0-9]/g)); // xAF
// 时间
console.log('Breakfast at 09:00. Dinner at 21-30'.match(/\d\d[:-]\d\d/g)); // 09:00,21-30

/* 捕获组 */
// go作为一个整体
console.log('Gogogo now!'.match(/(go)+/i)); // "Gogogo"
// 域名
console.log('site.com my.site.com'.match(/(\w+\.)+\w+/g)); // site.com,my.site.com
// 兼容email
console.log(
  'my@mail.com @ his@site.com.uk'.match(/[-.\w]+@([\w-]+\.)+[\w-]+/g)
); // my@mail.com, his@site.com.uk
// 标签名
console.log('<><demo <body> demo>'.match(/<([^<>]+?)>/i)[1]); // body
// 嵌套
console.log(
  "<a href='xyz'>".match(/<(([a-z0-9]+)\s((\w+)=['"]{1}([^'"]*)['"]{1}))>/i)
);
// 可选组
console.log('ac'.match(/a(z)?(c)?/)); // ac,undefined,c
// 命名组
regexp = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/;
str = '2019-04-30';
let groups = str.match(regexp).groups;
console.log(groups.year); // 2019
console.log(groups.month); // 04
console.log(groups.day); // 30
// 替换捕获组
console.log(str.replace(regexp, '$<day>.$<month>.$1'));
// 非捕获组 ?:
console.log('<demo>'.match(/(?:<)(.+)(?:>)/i)[1]); // demo
// 颜色
console.log(
  'color: #3f3; background-color: #AA00ef; and: #abcd'.match(
    /(#((\p{Hex_Digit}){3}){1,2}\b)/gu
  )
);
// 数字
console.log('-1.5 0 2 -123.4.'.match(/[-+]?\d+(\.\d+)?/g));
let [s, a, op, b] = '1.2 * 3.4'.match(
  /([-+]?\d+(?:\.\d+)?)\s*([+\-*/])\s*([-+]?\d+(?:\.\d+)?)/
);
console.log(s); // 1.2 * 3.4
console.log(a); // 1.2
console.log(op); // *
console.log(b); // 3.4

/* 词边界 */
// \bJava\b
console.log('Hello, Java!'.match(/\bJava\b/)); // Java
// \bJava感叹号不是单词
console.log('Hello, Java!'.match(/\bJava/)); // Java
// 空格不是单词Java\b
console.log('Hello, Java!'.match(/Java\b/)); // Java
// \bJavaScript\b
console.log('Hello, JavaScript!'.match(/\bJava\b/)); // null
// \bJavaScript
console.log('Hello, JavaScript!'.match(/\bJava/)); // Java
// JavaScript\b
console.log('Hello, JavaScript!'.match(/Java\b/)); // null
// 时间
console.log('Breakfast at 09:00 in the room 123:456'.match(/\b\d\d:\d\d\b/));

/* 反向引用 */
// 编号反向引用 \N
console.log('He said: "She\'s the one!".'.match(/(['"])(.*?)\1/g)); // "She's the one!"
// 按命名反向引用：\k<name>
console.log(
  'He said: "She\'s the one!".'.match(/(?<quote>['"])(.*?)\k<quote>/g)
); // "She's the one!"

/* 断言 */
// 前瞻断言 匹配\d仅在后面是€
console.log('1 turkey costs 30€'.match(/\d+(?=€)/)); // 30
// 前瞻否定断言 匹配\d仅在后面不是€
console.log('1 turkey costs 30€'.match(/\d+(?!€)/)); // 1
// 后瞻断言 匹配\d仅在前面是$
console.log('1 turkey costs $30'.match(/(?<=\$)\d+/)); // 30
// 后瞻否定断言 匹配\d仅在前面不是$
console.log('1 turkey costs $30'.match(/(?<!\$)\d+/)); // 1
// 多个单位
console.log('1 turkey costs 30€ and 15kr'.match(/\d+(?=€|kr)/g)); // 30,15
// 非负数
console.log('0 12 -5 123 -18 +1'.match(/(?<![-\d])\d+/g)); // 0,12,123,1
// 捕获组 插入标签
str = `
<html>
  <body style="height: 200px">
  ...
  </body>
</html>
`;
console.log(str.replace(/(?<=(<body.*?>))/, '<h1>Hello</h1>'));
// 防止无限回溯
str = '12312312222222222222222222222222222222222222222222222222222222232!';
let str1 =
  'An input string that takes a long time or even makes this regexp to hang';
// console.log(/^(\d+)*$/.test(str)); // 将会导致javascript挂起
// console.log(/^(\w+\s?)*$/.test(str1)); // 将会导致javascript挂起
// 解决 反向引用的n根据括号位置定义
console.log(/(?=(\d+))\1/.test(str)); // true
console.log(/^((?=(\w+))\2\s?)*$/.test(str1)); // true
