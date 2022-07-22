const { compareObject, clone, getType } = require('.');

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

function compareObjectTest() {
  let a = { demo: 1 };
  let b = { demo: 1 };
  let c = a;
  let d = { demo: '1' };
  console.log(compareObject(a, b)); // true 因为对象内容相同
  console.log(compareObject(a, c)); // true 因为是同一个对象
  console.log(compareObject(b, d)); // false
}
function cloneTest() {
  let sourceObj1 = {
    a: 1,
    c: null,
    date: new Date(),
    func: () => {
      console.log(1);
    },
    regexp: new RegExp('1'),
    map: new Map([[1, 1]]),
  };
  sourceObj1.b = sourceObj1;
  let cloneObj1 = clone(sourceObj1);
  sourceObj1.a = 2;
  sourceObj1.c = 3;
  sourceObj1.date.setFullYear(1998);
  sourceObj1.func.name = '1998';
  sourceObj1.regexp.lastIndex = 5;
  sourceObj1.map.set(1, 5);
  console.log(sourceObj1);
  console.log(cloneObj1);
}
function getTypeTest() {
  let user = {
    [Symbol.toStringTag]: 'User',
  };
  console.log(getType(1)); //number
  console.log(getType(new Date())); //date
  console.log(getType(user)); //user
}

compareObjectTest();
cloneTest();
getTypeTest();
