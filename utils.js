/**
 * 判断null | undefined | 空字符串
 * 
 * @param {*} val
 * 
 * @returns {Boolean} 是null返回true
 */
function isNull(val) {
  return (val == null || val === "");
}
console.log(isNull(1))
console.log(isNull(0))
console.log(isNull())
console.log(isNull(null))
console.log(isNull(""))
console.log(isNull({}))
console.log(isNull(false))

/**
 * 获取url参数的值
 * 
 * @param {String} key 参数的名称
 * 
 * @param {String} [url] 链接地址 默认为当前浏览器地址
 */
function getUrlParam(key, url) {
  try {
    var query = [];
    if (url) {
      let matchUrl = url.match(/.+?\?(.*)/);
      query = matchUrl ? matchUrl[1] : "";
    } else {
      query = window.location.search.substring(1);
    }
    var querys = query.split("&");
    for (var i = 0; i < querys.length; i++) {
      var pair = querys[i].split("=");
      if (pair[0] == key) {
        return typeof pair[1] == "string" ? decodeURIComponent(pair[1]) : pair[1];
      }
    }
  } catch (error) {
    console.log(error)
  }
}

console.log(getUrlParam("c", "http://wxy.ittiger.club:9999/In?p=20180718152957184&c=1"))

/**
 * 修改url参数的值
 * 
 * @param {String} arg 参数的名称
 * @param {*} argVal 参数的值 非字符串转换为字符串
 * @param {String} [url] 链接地址 默认为当前浏览器地址
 * 
 * @returns 返回修改后的地址
 */
function changeURLArg(arg, argVal, url) {
  try {
    var pattern = arg + "=([^&]*)";
    var replaceText = arg + "=" + (!(argVal instanceof Object) ? argVal : JSON.stringify(argVal));
    !url && (url = window.location.href);
    if (url.match(pattern)) {
      var tmp = "/(" + arg + "=)([^&]*)/gi";
      tmp = url.replace(eval(tmp), replaceText);
      return tmp;
    } else {
      if (url.match("[\?]")) {
        return url + "&" + replaceText;
      } else {
        return url + "?" + replaceText;
      }
    }
  } catch (error) {
    return "";
  }
}
console.log(changeURLArg("c", { a: 1 }, "http://wxy.ittiger.club:9999/In?p=20180718152957184&c=1"))

/**
 * 设置期限Storage
 * @param {Object} storage 存储对象类型 localStorage或者sessionStorage
 * @param {String} key 存储对象名称
 * @param {Any} value 存储对象值
 * @param {number} expire 存储时间(毫秒)
 *
 */
function setExpire(storage, key, value, expire) {
  let obj = {
    data: value,
    time: Date.now(),
    expire: expire
  };
  storage.setItem(key, JSON.stringify(obj));
}

/**
 * 获取Storage
 * @param {Obeject} storage 存储对象类型 localStorage或者sessionStorage
 * @param {String} key 存储对象名称
 *
 */
function getExpire(storage, key) {
  let val = storage.getItem(key);
  if (!val) {
    return val;
  }
  val = JSON.parse(val);
  if (val.expire) {
    if (Date.now() - val.time > val.expire) {
      storage.removeItem(key);
      return null;
    }
  }
  return val.data;
}

/**
 * 获取终端类型
 * 
 * @returns {Object} 包含终端类型的对象
 */
function os() {
  var u = navigator.userAgent,
    trident = u.indexOf("Trident") > -1, //IE内核
    presto = u.indexOf("Presto") > -1, //opera内核
    webKit = u.indexOf("AppleWebKit") > -1, //苹果、谷歌内核
    gecko = u.indexOf("Gecko") > -1 && u.indexOf("KHTML") == -1, //火狐内核
    mobile = !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
    ios = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
    android = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1, //android终端
    iPhone = u.indexOf("iPhone") > -1, //是否为iPhone或者QQHD浏览器
    iPad = u.indexOf("iPad") > -1, //是否iPad
    webApp = u.indexOf("Safari") == -1, //是否web应该程序，没有头部与底部
    ali = u.indexOf("Alipay") > -1, //是否支付宝
    weixin = u.indexOf("MicroMessenger") > -1, //是否微信
    qq = u.match(/\sQQ/i) == " qq", //是否QQ
    isPC = !mobile && !ios && !android;
  return {
    trident,
    presto,
    webKit,
    gecko,
    mobile,
    ios,
    android,
    iPhone,
    iPad,
    webApp,
    weixin,
    ali,
    qq,
    isPC
  };
}

/**
 * 获取浏览器类型
 * 
 * @returns {Object} 包含浏览器类型类型的对象以及版本号
 */
function getBrowser() {
  const sys = {};
  const ua = navigator.userAgent.toLowerCase();
  if (ua.indexOf("edge") !== -1) {
    sys.edge = "edge";
  } else if (ua.match(/rv:([\d.]+)\) like gecko/)) {
    sys.ie = ua.match(/rv:([\d.]+)\) like gecko/)[1];
  } else if (ua.match(/msie ([\d.]+)/)) {
    sys.ie = ua.match(/msie ([\d.]+)/)[1];
  } else if (ua.match(/firefox\/([\d.]+)/)) {
    sys.firefox = ua.match(/firefox\/([\d.]+)/)[1];
  } else if (ua.match(/chrome\/([\d.]+)/)) {
    sys.chrome = ua.match(/chrome\/([\d.]+)/)[1];
  } else if (ua.match(/opera.([\d.]+)/)) {
    sys.opera = ua.match(/opera.([\d.]+)/)[1];
  } else if (ua.match(/version\/([\d.]+).*safari/)) {
    sys.safari = ua.match(/version\/([\d.]+).*safari/)[1];
  }
  return sys;
}

/**
 * 获取支付浏览器类型
 * 
 * @returns {String} weixin 或者 alipay
 */
function getPayBrowser() {
  //判断什么浏览器
  var ua = window.navigator.userAgent.toLowerCase();
  //判断是不是微信
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return "weixin";
  }
  //判断是不是支付宝
  if (ua.match(/AlipayClient/i) == 'alipayclient') {
    return "alipay";
  }
  return false;
}

/**
 * 关闭浏览器
 */
function closeWindow() {
  // window
  window.opener = null;
  window.open("", "_self");
  window.close();

  if (window.WeixinJSBridge) {
    window.WeixinJSBridge.call("closeWindow"); // 微信
  } else if (window.AlipayJSBridge) {
    window.AlipayJSBridge.call("closeWebview"); // 支付宝
  }
}

/**
 * 下载文本.txt(依赖getBrowser,getDownloadUri方法)
 * 
 * @param {String} data 数据
 * @param {String} fileName 文件名称
 */
function downloadTxt(data, fileName) {
  const bw = getBrowser(); // 获取浏览器信息
  if (!bw["edge"] && !bw["ie"]) {
    const element = document.createElement("a");
    const uri = getDownloadUri(data);
    element.href = uri;
    element.download = fileName;
    const a = document.body.appendChild(element);
    // const evt = document.createEvent("HTMLEvents");
    // evt.initEvent("click", false, false); // 不加后面两个参数在Firefox上报错
    // a.dispatchEvent(evt);
    a.click();
    document.body.removeChild(element);
  } else if (bw["ie"] >= 10 || bw["edge"] === "edge") {
    const _utf = "\uFEFF"; // 为了使文件以utf-8的编码模式，同时也是解决中文乱码的问题
    const blob = new Blob([_utf + data], {
      type: "text/json" // 自己需要的数据格式
    });
    navigator.msSaveBlob(blob, fileName);
  }
}

/**
 * 获取文本下载资源
 * 
 * @param {String} data 数据
 * @returns {String}
 */
function getDownloadUri(data) {
  const mimeType = "attachment/csv";
  const charset = ";charset=utf-8,";
  const _utf = "\uFEFF"; // 为了使文件以utf-8的编码模式，同时也是解决中文乱码的问题
  return "data:" + mimeType + charset + _utf + encodeURIComponent(data);
}

/**
 * 下载图片(依赖getBrowser,base64ToBlob方法)
 * 
 * @param {String} data 数据
 * @param {String} fileName 文件名称
 */
function downloadImg(data, fileName) {
  const bw = getBrowser(); // 获取浏览器信息
  let blob = base64ToBlob(data); //new Blob([data]);
  if (!bw["edge"] && !bw["ie"]) {
    let aLink = document.createElement("a");
    let evt = document.createEvent("HTMLEvents");
    evt.initEvent("click", true, true); //initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
    aLink.download = fileName;
    aLink.href = URL.createObjectURL(blob);
    // aLink.dispatchEvent(evt);
    aLink.click();
  } else if (bw["ie"] >= 10 || bw["edge"] === "edge") {
    window.navigator.msSaveBlob(blob, fileName);
  }
}

/**
 * 获取base64下载资源
 * 
 * @param {String} data 数据
 * @returns {Blob}
 */
function base64ToBlob(data) {
  let parts = data.split(";base64,");
  let contentType = parts[0].split(":")[1];
  let raw = window.atob(parts[1]);
  let rawLength = raw.length;
  let uInt8Array = new Uint8Array(rawLength);
  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }
  return new Blob([uInt8Array], { type: contentType });
}