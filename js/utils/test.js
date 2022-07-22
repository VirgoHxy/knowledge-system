const {
  isNull,
  getUrlParam,
  changeURLArg,
  urlMethod,
  debounce,
  throttle,
  isEquals,
  setExpire,
  getExpire,
  getCookie,
  setCookie,
  deleteCookie,
  os,
  getBrowser,
  getPayBrowser,
  closeWindow,
  getDownloadUri,
  download,
  downloadByAElement,
  readBlob,
} = require('.');

console.log_ = console.log;
console.log = function () {
  let name = arguments.callee.caller.name;
  !console.log.obj && (console.log.obj = {});
  if (!name) {
    name = 'noName';
  }
  !console.log.obj[name] && console.log_(`\r\n————${name}————: `);
  console.log.obj[name] = 1;
  console.log_(...arguments);
};

function isNullTest() {
  console.log(isNull(1));
  console.log(isNull(0));
  console.log(isNull());
  console.log(isNull(null));
  console.log(isNull(''));
  console.log(isNull({}));
  console.log(isNull(false));
}
function getUrlParamTest() {
  console.log(getUrlParam('c', 'http://wxy.ittiger.club:9999/In?p=20180718152957184&c=1'));
}
function changeURLArgTest() {
  console.log(changeURLArg('c', 123, 'http://wxy.ittiger.club:9999/In?p=20180718152957184&c=1'));
  console.log(changeURLArg('b', 123, 'http://wxy.ittiger.club:9999/In?p=20180718152957184&c=1'));
}
function urlMethodTest() {
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
}
function debounceTest() {
  let demo = debounce(function () {
    console.log('debounce');
  }, 1000);

  // 只会执行一次
  for (let index = 0; index < 10000; index++) {
    demo();
  }
}
function throttleTest() {
  let demo1 = throttle(function (x) {
    console.log('throttle' + x);
  }, 2000);

  // 只有throttle0，throttle2000，throttle2999会打印
  for (let index = 0; index < 3000; index++) {
    setTimeout(() => {
      demo1(index);
    }, index);
  }
}
function isEqualsTest() {
  console.log(isEquals(1 + 1, 2 / 1, 2 * 1));
}

isNullTest();
getUrlParamTest();
changeURLArgTest();
urlMethodTest();
debounceTest();
throttleTest();
isEqualsTest();
