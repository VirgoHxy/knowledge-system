; (function (undefined) {
  "use strict"

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
   * @param {String} key 参数的名称
   * @param {*} value 参数的值 非字符串转换为字符串
   * @param {String} [url] 链接地址 默认为当前浏览器地址
   * 
   * @returns 返回修改后的地址
   */
  function changeURLArg(key, value, url) {
    try {
      var pattern = key + "=([^&]*)";
      var replaceText = key + "=" + (!(value instanceof Object) ? value : JSON.stringify(value));
      !url && (url = window.location.href);
      if (url.match(pattern)) {
        var tmp = "/(" + key + "=)([^&]*)/gi";
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
   * 设置期限Storage
   * 
   * @param {Object} storage 存储对象类型 localStorage或者sessionStorage
   * @param {String} key 存储对象名称
   * @param {*} value 存储对象值
   * @param {number} expire 存储时间(毫秒)
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
   * 
   * @param {Obeject} storage 存储对象类型 localStorage或者sessionStorage
   * @param {String} key 存储对象名称
   * 
   * @returns {*}
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
    window.location.href = "about:blank";
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
  function getDownloadUri(data, type) {
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
   */
  function download(data, fileName) {
    try {
      const bw = getBrowser(); // 获取浏览器信息
      let type = fileName.match(/.+\.(.+)$/)[1];
      let blob = false;
      if (/(gif|jpg|jpeg|png|gif|jpg|png)$/.test(type)) {
        type = "image";
      }
      blob = getDownloadUri(data, type); //new Blob([data]);
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
      console.log(error, "下载失败")
      return false;
    }
  }

  /**
   * 防抖装饰器
   * 
   * @param {Function} func 函数
   * @param {Number} ms 毫秒延时
   * 
   * @returns {Function}
   */
  function debounce(func, ms) {
    let timeout;
    return function () {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, arguments), ms);
    };
  }

  /**
   * 节流装饰器
   * 
   * @param {Function} func 函数
   * @param {Number} ms 毫秒延时
   * 
   * @returns {Function}
   */
  function throttle(func, ms) {
    let isThrottled = false,
      savedArgs,
      savedThis;
    function wrapper() {
      if (isThrottled) {
        savedArgs = arguments;
        savedThis = this;
        return;
      }
      func.apply(this, arguments);
      isThrottled = true;
      setTimeout(function () {
        isThrottled = false;
        if (savedArgs) {
          wrapper.apply(savedThis, savedArgs);
          savedArgs = savedThis = null;
        }
      }, ms);
    }
    return wrapper;
  }

  let global = (function () { return this || (0, eval)('this'); }());
  let JAFOUtilsMethod = {
    isNull,
    getUrlParam,
    changeURLArg,
    setExpire,
    getExpire,
    os,
    getBrowser,
    getPayBrowser,
    closeWindow,
    download,
    debounce,
    throttle
  }

  // 最后将插件对象暴露给全局对象
  if (typeof module !== "undefined" && module.exports) {
    module.exports = JAFOUtilsMethod;
  } else if (typeof define === "function" && define.amd) {
    define(function () { return JAFOUtilsMethod; });
  } else {
    !('JAFOUtilsMethod' in global) && (global.JAFOUtilsMethod = JAFOUtilsMethod);
  }
}());