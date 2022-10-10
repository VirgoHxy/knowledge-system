// node 的内置模块，用来处理二进制数据流，在 node 中 Buffer 储存是存储的二进制数据，打印出来显示的是16进制数据，方便转换

// 构造函数方式已被删除
// new Buffer(number) => Buffer.alloc(number)
// new Buffer(string, encoding) => Buffer.from(string, encoding)
// new Buffer(...arguments) => Buffer.from(...arguments)
const buf1 = Buffer.from('test'); // <Buffer 74 65 73 74> 创建 buffer，将 'test' 数据拷贝到 Buffer，默认使用 UTF-8（Unicode Transformation Format）进行编码，在 Unicode 编码表中，t => 0074 e => 0065 s => 0073
const buf2 = Buffer.from('test', 'base64'); // <Buffer b5 eb 2d> 创建 buffer，将 'test' 数据拷贝到 Buffer，并且使用 base64 编码
const buf3 = Buffer.alloc(10); // <Buffer 00 00 00 00 00 00 00 00 00 00> 创建 buffer，指定 Buffer 对象长度为10
const buf4 = Buffer.alloc(5, 12); // <Buffer 0c 0c 0c 0c 0c> 创建 buffer，指定 Buffer 对象长度为5，并且每位用 12 填充
buf1.toString(); // 'test'
buf2.toString('base64'); // 'test'
buf3.fill(1); // buf2 == <Buffer 01 01 01 01 01 01 01 01 01 01>
