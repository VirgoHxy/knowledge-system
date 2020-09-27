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

/**
 * 获取浏览器类型 终端类型
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
 * 获取浏览器类型 终端类型
 * 
 * @returns {Object} 包含终端类型的对象以及版本号
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
 * 获取下载文件blob
 * 
 * @param {String} data 文件内容
 * @param {String} type 文件类型
 * 
 * @returns {Blob}
 */
function getDownloadUri(data,type) {
  switch (type) {
    case "image": {
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
    case "txt": {
      const _utf = "\uFEFF"; // 为了使文件以utf-8的编码模式，同时也是解决中文乱码的问题
      return new Blob([_utf + data], {
        type: "text/json" // 自己需要的数据格式
      });
    }
    default:
      console.log("下载文件类型不合规")
      return false;
  }
}

/**
 * 下载文件(依赖getBrowser方法)
 * 
 * @param {String} data 文件内容
 * @param {String} fileName 文件名称
 * 
 */
function download(data, fileName) {
  try {
    const bw = getBrowser(); // 获取浏览器信息
    let type = fileName.match(/.+\.(.+)$/)[1];
    let blob = false;
    if(/(gif|jpg|jpeg|png|gif|jpg|png)$/.test(type)){
      type = "image";
    }
    blob = getDownloadUri(data,type); //new Blob([data]);
    if (blob === false) {
      console.log("下载失败,内容不合规")
      return false;
    }
    if (!bw["edge"] && !bw["ie"]) {
      let aLink = document.createElement("a");
      // let evt = document.createEvent("HTMLEvents");
      // evt.initEvent("click", true, true); //initEvent 事件类型，是否冒泡，是否阻止浏览器的默认行为
      aLink.download = fileName;
      aLink.href = URL.createObjectURL(blob);
      // aLink.dispatchEvent(evt);
      aLink.click();
    } else if (bw["ie"] >= 10 || bw["edge"] === "edge") {
      window.navigator.msSaveBlob(blob, fileName);
    }
  } catch (error) {
    console.log(error,"下载失败")
    return false;
  }
}

module.exports = {
  isNull,
  getUrlParam,
  changeURLArg,
  os,
  getBrowser,
  closeWindow,
  download
}