//启动http服务js
const http = require('http');
const koaBody = require('koa-body');
const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const fs = require('fs');
const path = require('path');
let fileName = __filename.match(/[^\\/]*$/)[0];
let readFileSync = function (pathParam) {
  try {
    let filePath = path.resolve("./db", pathParam);
    let result = "";
    if (!fs.existsSync(filePath)) {
      return result;
    }
    result = fs.readFileSync(filePath, "utf8") || "";
    result = typeof result == "string" && result ? JSON.parse(result) : result;
    return result;
  } catch (error) {
    console.error(error);
    return false;
  }
};

let writeFileSync = function (pathParam, str) {
  try {
    let filePath = path.resolve("./db", pathParam);
    str = typeof str == "string" ? str : JSON.stringify(str);
    fs.writeFileSync(filePath, str, "utf8");
  } catch (error) {
    console.error(error);
    return false;
  }
};

let count = function (data) {
  let {key, detailKey, message, detailMessage} = data;
  let results = readFileSync("count.json") || {};
  if (results[key]) {
    results[key].count += 1;
    if (results[key].detail[detailKey]) {
      results[key].detail[detailKey].count += 1;
    } else {
      results[key].detail[detailKey] = {
        message: detailMessage,
        count: 1
      };
    }
  } else {
    results[key] = {
      message,
      count: 1,
      detail: {}
    };
    results[key].detail[detailKey] = {
      message: detailMessage,
      count: 1,
    };
  }
  writeFileSync("count.json", results);
};

// 设置请求参数
app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "*");
  // 这样就能只允许 http://localhost:8080 这个域名的请求了
  // ctx.set("Access-Control-Allow-Origin", "http://localhost:8080");

  // 设置所允许的HTTP请求方法
  ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");

  // 字段是必需的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段.
  ctx.set("Access-Control-Allow-Headers", "x-requested-with, accept, origin, content-type");

  // 服务器收到请求以后，检查了Origin、Access-Control-Request-Method和Access-Control-Request-Headers字段以后，确认允许跨源请求，就可以做出回应。

  // Content-Type表示具体请求中的媒体类型信息
  ctx.set("Content-Type", "application/json;charset=utf-8");

  // 该字段可选。它的值是一个布尔值，表示是否允许发送Cookie。默认情况下，Cookie不包括在CORS请求之中。
  // 当设置成允许请求携带cookie时，需要保证"Access-Control-Allow-Origin"是服务器有的域名，而不能是"*";
  ctx.set("Access-Control-Allow-Credentials", true);

  // 该字段可选，用来指定本次预检请求的有效期，单位为秒。
  // 当请求方法是PUT或DELETE等特殊方法或者Content-Type字段的类型是application/json时，服务器会提前发送一次请求进行验证
  // 下面的的设置只本次验证的有效时间，即在该时间段内服务端可以不用进行验证
  ctx.set("Access-Control-Max-Age", 300);

  await next();
});

// 应用bodyParser 需要先设置请求参数再使用bodyParser
app.use(koaBody({
  muitipark: true
}));

router.all('/log', async (ctx) => {
  let param = {};
  ctx.status = 204;
  ctx.body = "No Content";
  if (ctx.request.method == "GET") {
    param = ctx.request.query;
  } else if (ctx.request.method == "POST") {
    param = ctx.request.body;
  } else {
    return;
  }
  console.log(JSON.parse(JSON.stringify(param)));
  count({
    key: param.key,
    message: param.message,
    detailKey: param.detailKey,
    detailMessage: param.detailMessage
  });
  return;
});

router.all('/count', async (ctx) => {
  let param = {};
  ctx.status = 204;
  ctx.body = "No Content";
  if (ctx.request.method == "GET") {
    param = ctx.request.query;
  } else if (ctx.request.method == "POST") {
    param = ctx.request.body;
  } else {
    return;
  }
  count({
    key: param.key,
    message: param.message,
    detailKey: param.detailKey,
    detailMessage: param.detailMessage
  });
  return;
});

app.use(router.routes()).use(router.allowedMethods());

// 开启服务
http.createServer(app.callback()).listen(3000, function () {
  console.log({
    level: 'info',
    describe: `${fileName}信息`,
    message: `服务启动成功信息 3000 the server is running`,
  });
});