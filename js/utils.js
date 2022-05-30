/**
 * 判断null | undefined | 空字符串
 *
 * @param {*} val
 *
 * @returns {Boolean} 是null或者undefined或者空字符串返回true
 */
function isNull(val) {
  return val == null || val === '';
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
    let query = [];
    if (url) {
      let matchUrl = url.match(/.+?\?(.*)/);
      query = matchUrl ? matchUrl[1] : '';
    } else {
      query = window.location.search.substring(1);
    }
    let querys = query.split('&');
    for (let i = 0; i < querys.length; i++) {
      let pair = querys[i].split('=');
      if (pair[0] == key) {
        return typeof pair[1] == 'string'
          ? decodeURIComponent(pair[1])
          : pair[1];
      }
    }
  } catch (error) {
    console.log(error);
  }
}

/**
 * 修改url参数的值
 *
 * @param {String} key 参数的名称
 * @param {*} value 参数的值 非字符串转换为字符串
 * @param {String} [url] 链接地址 默认为当前浏览器地址
 * @param {Boolean} [hrefFlag = false] 是否修改当前地址 true 修改当前地址
 *
 * @returns 返回修改后的地址
 */
function changeURLArg(key, value, url, hrefFlag) {
  try {
    let pattern = key + '=([^&]*)';
    let replaceText =
      key + '=' + (!(value instanceof Object) ? value : JSON.stringify(value));
    !url && (url = window.location.href);
    let returnUrl = '';
    if (url.match(pattern)) {
      let tmp = '/(' + key + '=)([^&]*)/gi';
      tmp = url.replace(eval(tmp), replaceText);
      returnUrl = tmp;
    } else {
      if (url.match('[?]')) {
        returnUrl = url + '&' + replaceText;
      } else {
        returnUrl = url + '?' + replaceText;
      }
    }
    if (hrefFlag) {
      window.history.replaceState(null, null, returnUrl);
    }
    return returnUrl;
  } catch (error) {
    console.log(error);
    return '';
  }
}

/**
 * 操作url的方法
 *
 * @param {String} [data.url] 链接地址 默认为当前浏览器地址
 * @param {String} data.type 操作类型
 * @param {String} data.key 参数的名称
 * @param {*} data.value 参数的值 非字符串转换为字符串
 * @param {Boolean} [data.hrefFlag = true] 是否返回字符串地址 true 返回字符串地址
 *
 * @returns {*} 返回值
 */
function urlMethod(data = {}) {
  let { url, type, key, value, hrefFlag = true } = data;
  let href = url || (window ? window.location.href : '');
  if (!href) {
    return 'url不能为空';
  }
  let URLObject = new URL(href);
  let params = URLObject.searchParams;
  // set get has delete
  switch (type) {
    case 'set':
      params.set(key, value);
      return !hrefFlag ? URLObject : URLObject.href;
    case 'objectSet':
      for (const key in value) {
        if (Object.prototype.hasOwnProperty.call(value, key)) {
          const element = value[key];
          params.set(key, element);
        }
      }
      return !hrefFlag ? URLObject : URLObject.href;
    case 'get':
      return params.get(key);
    case 'has':
      return params.has(key);
    case 'delete':
      params.delete(key);
      return !hrefFlag ? URLObject : URLObject.href;

    default:
      return 'type类型错误 set,objectSet,get,has,delete';
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
    expire: expire,
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

/*
// 遍历缓存键值对
for(let i = 0; i < localStorage.length; i++) {
  let key = localStorage.key(i);
  console.log(`${key}: ${localStorage.getItem(key)}`);
}
*/

/**
 * 获取cookie(必须在浏览器环境下运行)
 *
 * @param {String} name 存储对象名称
 *
 * @returns {String | Undefined}
 */
function getCookie(name) {
  let matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)'
    )
  );
  return matches
    ? matches[1]
      ? JSON.parse(decodeURIComponent(matches[1]))
      : undefined
    : undefined;
}

/**
 * 设置cookie(必须在浏览器环境下运行)
 *
 * @param {String} name 存储对象名称
 * @param {String} value 存储对象
 * @param {Object} options 该cookie的配置值
 *
 */
function setCookie(name, value, options = {}) {
  options = {
    path: '/',
    // 如果需要，可以在这里添加其他默认值
    ...options,
  };
  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }
  let updatedCookie =
    encodeURIComponent(name) +
    '=' +
    encodeURIComponent(
      typeof value == 'object' ? JSON.stringify(value) : value
    );
  for (let optionKey in options) {
    updatedCookie += '; ' + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += '=' + optionValue;
    }
  }
  document.cookie = updatedCookie;
}

/**
 * 删除cookie(依赖setCookie方法)(必须在浏览器环境下运行)
 *
 * @param {String} name 存储对象名称
 *
 */
function deleteCookie(name) {
  // 设置到期时间 max-age(秒数) expires(时间)
  setCookie(name, '', {
    'max-age': -1,
  });
}

/**
 * 获取终端类型(必须在浏览器环境下运行)
 *
 * @returns {Object} 包含终端类型的对象
 */
function os() {
  let u = window.navigator.userAgent,
    trident = u.indexOf('Trident') > -1, //IE内核
    presto = u.indexOf('Presto') > -1, //opera内核
    webKit = u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
    gecko = u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
    mobile = !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
    ios = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
    android = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
    iPhone = u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
    iPad = u.indexOf('iPad') > -1, //是否iPad
    webApp = u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
    ali = u.indexOf('Alipay') > -1, //是否支付宝
    weixin = u.indexOf('MicroMessenger') > -1, //是否微信
    qq = u.match(/\sQQ/i) == ' qq', //是否QQ
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
    isPC,
  };
}

/**
 * 获取浏览器类型(必须在浏览器环境下运行)
 *
 * @returns {Object} 包含浏览器类型类型的对象以及版本号
 */
function getBrowser() {
  const sys = {};
  const ua = window.navigator.userAgent.toLowerCase();
  if (ua.indexOf('edge') !== -1) {
    sys.edge = 'edge';
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
 * 获取支付浏览器类型(必须在浏览器环境下运行)
 *
 * @returns {String} weixin 或者 alipay
 */
function getPayBrowser() {
  //判断什么浏览器
  let ua = window.navigator.userAgent.toLowerCase();
  //判断是不是微信
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return 'weixin';
  }
  //判断是不是支付宝
  if (ua.match(/AlipayClient/i) == 'alipayclient') {
    return 'alipay';
  }
  return false;
}

/**
 * 关闭浏览器(必须在浏览器环境下运行)
 */
function closeWindow() {
  // window
  let userAgent = navigator.userAgent;
  if (userAgent.indexOf('Firefox') != -1 || userAgent.indexOf('Chrome') != -1) {
    window.location.href = 'about:blank';
    window.location.replace('about:blank');
  } else if (
    userAgent.indexOf('Android') > -1 ||
    userAgent.indexOf('Linux') > -1
  ) {
    window.opener = null;
    window.open('about:blank', '_self', '').close();
  } else {
    window.close();
    window.pener = null;
    window.open('about:blank', '_self');
  }

  if (window.WeixinJSBridge) {
    window.WeixinJSBridge.call('closeWindow'); // 微信
  } else if (window.AlipayJSBridge) {
    window.AlipayJSBridge.call('closeWebview'); // 支付宝
  }
}

/**
 * 获取下载文件blob(必须在浏览器环境下运行)
 *
 * @param {String} data 文件内容
 * @param {String} type 文件类型
 *
 * @returns {Blob}
 */
function getDownloadUri(data, type) {
  switch (type) {
    case 'image': {
      let parts = data.split(';base64,');
      let contentType = parts[0].split(':')[1];
      let raw = window.atob(parts[1]);
      let rawLength = raw.length;
      let uInt8Array = new Uint8Array(rawLength);
      for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }
      return new Blob([uInt8Array], {
        type: contentType,
      });
    }
    case 'txt': {
      const _utf = '\uFEFF'; // 为了使文件以utf-8的编码模式，同时也是解决中文乱码的问题
      return new Blob([_utf + data], {
        type: 'text/json', // 自己需要的数据格式
      });
    }
    default:
      console.log('下载文件类型不合规');
      return false;
  }
}

/**
 * 下载文件(依赖getBrowser,getDownloadUri方法)(必须在浏览器环境下运行)
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
      type = 'image';
    }
    blob = getDownloadUri(data, type); //new Blob([data]);
    if (blob === false) {
      console.log('下载失败,内容不合规');
      return false;
    }
    if (!bw['edge'] && !bw['ie']) {
      let aLink = document.createElement('a');
      // let evt = document.createEvent("HTMLEvents");
      // evt.initEvent("click", true, true); //initEvent 事件类型，是否冒泡，是否阻止浏览器的默认行为
      aLink.download = fileName;
      aLink.href = URL.createObjectURL(blob);
      // aLink.dispatchEvent(evt);
      aLink.click();
    } else if (bw['ie'] >= 10 || bw['edge'] === 'edge') {
      window.navigator.msSaveBlob(blob, fileName);
    }
  } catch (error) {
    console.log(error, '下载失败');
    return false;
  }
}

/**
 * 通过元素下载文件(必须在浏览器环境下运行)
 *
 * @param {String} url 文件地址
 * @param {String} fileName 文件名称
 */
function downloadByAElement(url, fileName) {
  try {
    const element = document.createElement('a');
    element.href = url;
    element.download = fileName;
    const a = document.body.appendChild(element);
    a.click();
    document.body.removeChild(element);
  } catch (error) {
    console.log(error);
  }
}

/**
 * 读取文件内容(必须在浏览器环境下运行)
 *
 * @param {Blob} blob 文件
 * @param {String} type mediatype
 */
function readBlob(blob, type) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      resolve(e.target.result);
    };
    type.indexOf('image') != -1
      ? reader.readAsDataURL(blob)
      : reader.readAsText(blob);
  });
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

console.log(isNull(1));
console.log(isNull(0));
console.log(isNull());
console.log(isNull(null));
console.log(isNull(''));
console.log(isNull({}));
console.log(isNull(false));

console.log(
  getUrlParam('c', 'http://wxy.ittiger.club:9999/In?p=20180718152957184&c=1')
);

console.log(
  changeURLArg(
    'c',
    123,
    'http://wxy.ittiger.club:9999/In?p=20180718152957184&c=1'
  )
);
console.log(
  changeURLArg(
    'b',
    123,
    'http://wxy.ittiger.club:9999/In?p=20180718152957184&c=1'
  )
);

console.log(
  urlMethod({
    url: 'http://wxy.ittiger.club:4001/?1=1&openId=oIyVLwypKFQ',
    type: 'get',
    key: 'openId',
  })
);
console.log(
  urlMethod({
    url: 'http://wxy.ittiger.club:4001/?1=1&openId=oIyVLwypKFQ',
    type: 'has',
    key: 'openId',
  })
);
let href = urlMethod({
  url: 'http://wxy.ittiger.club:4001/?1=1&openId=oIyVLwypKFQ',
  type: 'delete',
  key: 'openId',
});
console.log(href);
let href1 = urlMethod({
  url: 'http://wxy.ittiger.club:4001/?1=1&openId=oIyVLwypKFQ',
  type: 'set',
  key: 'openId',
  value: '123123',
});
console.log(href1);
console.log(
  urlMethod({
    url: 'http://wxy.ittiger.club:4001/?1=1&openId=oIyVLwypKFQ',
    type: 'set',
    key: 'openId',
    value: '123123',
    hrefFlag: false,
  })
);
let href2 = urlMethod({
  url: 'http://wxy.ittiger.club:4001/?1=1&openId=oIyVLwypKFQ',
  type: 'objectSet',
  value: {
    demo1: '123123',
    demo2: '456456',
  },
});
console.log(href2);

let demo = debounce(function () {
  console.log('debounce');
}, 1000);
// 只会执行一次
for (let index = 0; index < 10000; index++) {
  demo();
}

let demo1 = throttle(function (x) {
  console.log('throttle' + x);
}, 2000);
demo1(1); // throttle1
demo1(2); // 节流
demo1(3); // 节流
// 2000ms后 输出throttle3 2被3替换
