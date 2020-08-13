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

module.exports = {
  isNull,
  getUrlParam,
  changeURLArg,
  os,
  closeWindow
}