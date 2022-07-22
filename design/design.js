/* 工厂模式 */

// 简单工厂
function BMW() {
  this.type = 1;
}
BMW.prototype.drive = function () {
  console.log('BMW drive fast');
};

function Benz() {
  this.type = 0;
}
Benz.prototype.drive = function () {
  console.log('Benz drive fast');
};

function SimpleCarFactory() {}
SimpleCarFactory.createCar = function (type) {
  switch (type) {
    case 'BMW':
      return new BMW();
    case 'Benz':
      return new Benz();

    default:
      return null;
  }
};

console.log('---简单工厂---');

let mySimpleBMW = SimpleCarFactory.createCar('BMW');
console.log('type: ', mySimpleBMW.type);
mySimpleBMW.drive();

let mySimpleBenz = SimpleCarFactory.createCar('Benz');
console.log('type: ', mySimpleBenz.type);
mySimpleBenz.drive();

// 抽象工厂
function AbstractCarFactory() {
  if (Object.getPrototypeOf(this) === AbstractCarFactory.prototype) {
    throw new Error('the class is abstract and cannot use new');
  }
}
AbstractCarFactory.prototype.createCar = function () {
  throw new Error('abstract class must implement this method, abstract functions cannot be called directly');
};

function BMWFactory() {
  AbstractCarFactory.call(this);
}
BMWFactory.prototype = Object.create(AbstractCarFactory.prototype);
BMWFactory.prototype.createCar = function () {
  return new BMW();
};
BMWFactory.prototype.constructor = BMWFactory;

function BenzFactory() {
  AbstractCarFactory.call(this);
}
BenzFactory.prototype = Object.create(AbstractCarFactory.prototype);
BenzFactory.prototype.createCar = function () {
  return new Benz();
};
BenzFactory.prototype.constructor = BenzFactory;

// 不能实例
try {
  new AbstractCarFactory();
} catch (error) {
  // console.log(error);
  // the class is abstract and cannot use new
}

console.log('---抽象工厂---');

let bmwFactory = new BMWFactory();
let myBMW = bmwFactory.createCar();
console.log('type: ', myBMW.type);
myBMW.drive();

let benzFactory = new BenzFactory();
let myBenz = benzFactory.createCar();
console.log('type: ', myBenz.type);
myBenz.drive();

/* 建造者模式*/

function Car(chassis, engine, electricalEquipment, body) {
  this.chassis = chassis;
  this.engine = engine;
  this.electricalEquipment = electricalEquipment;
  this.body = body;
}
Car.prototype.drive = function () {
  console.log('drive');
};

function Chassis(type) {
  this.type = type;
}
function Engine(type) {
  this.type = type;
}
function ElectricalEquipment(type) {
  this.type = type;
}
function Body(type) {
  this.type = type;
}

function CarBuilder() {}
CarBuilder.prototype.addChassis = function (type) {
  this.chassis = new Chassis(type);
  return this;
};
CarBuilder.prototype.addEngine = function (type) {
  this.engine = new Engine(type);
  return this;
};
CarBuilder.prototype.addElectricalEquipment = function (type) {
  this.electricalEquipment = new ElectricalEquipment(type);
  return this;
};
CarBuilder.prototype.addBody = function (type) {
  this.body = new Body(type);
  return this;
};
CarBuilder.prototype.createCar = function () {
  return new Car(this.chassis, this.engine, this.electricalEquipment, this.body);
};

console.log('---建造者模式---');

let car = new CarBuilder()
  .addChassis('复合材料')
  .addEngine('v12')
  .addElectricalEquipment('ABB')
  .addBody('钛合金')
  .createCar();

console.log(car);
car.drive();

/* 单例模式 */

// 普通单例
let Singleton = (function () {
  // IIFE来构建私有域，闭包保持实例不销毁
  // 这里使用var也不会影响全局
  let instance;
  return function (name) {
    this.name = name;
    return instance || (instance = this);
  };
})();
Singleton.prototype.getName = function () {
  return this.name;
};
Singleton.prototype.setName = function (name) {
  this.name = name;
};

console.log('---普通单例---');

let sun = new Singleton('Sun');
let moon = new Singleton('Moon');

console.log(sun === moon); // true
console.log(sun.getName()); // 'Sun'
console.log(moon.getName()); // 'Sun'
moon.setName('Moon');
console.log(sun.getName()); // 'Moon'
console.log(moon.getName()); // 'Moon'

// 代理单例
let ProxySingle = function (single) {
  // 通过函数创建局部变量，让实例不会影响全局，也可以使用const加Symbol来实现全局唯一
  // 这里使用var也不会影响全局
  let instance;
  // 代理函数仅管控单例的实例化
  return function (...args) {
    // 闭包保持实例不销毁
    // 每此new的时候判断实例是否存在，也可以使用Proxy对象来监听construct()的handler
    return instance || (instance = new single(...args));
  };
};

// 独立的Single类，处理具体逻辑
let Single = function (name) {
  this.name = name;
};
Single.prototype.getName = function () {
  return this.name;
};
Single.prototype.setName = function (name) {
  this.name = name;
};

console.log('---代理单例---');

let single = new ProxySingle(Single);
let man = new single('Man');
let woman = new single('Woman');

console.log(man === woman); // true
console.log(man.getName()); // 'Man'
console.log(woman.getName()); // 'Man'
woman.setName('Woman');
console.log(man.getName()); // 'Woman'
console.log(woman.getName()); // 'Woman'

/* 原型模式 */
const carObj = {
  color: 'red',
  type: 'SUV',
  getInfo() {
    return `${this.color} ${this.type}`;
  },
};

console.log('---原型模式---');

// 以carObj为原型创建对象
const blackSedan = Object.create(carObj);
blackSedan.color = 'black';
blackSedan.type = 'Sedan';

console.log(blackSedan.getInfo());
console.log(carObj.getInfo());

/* 模块模式 */

let moduleObj = (function () {
  let publicObj = {
      property: 1,
    },
    // 也可以使用_来规定为私有(约定俗成)，也可以使用const+Symbol来定义唯一key，class中使用#来规定为私有(官方规定es2022)
    _privateVar = 1;

  function _privateMethod() {
    console.log('private method');
  }

  publicObj.somethingMethod = function () {
    _privateMethod();
    return publicObj.property + _privateVar;
  };

  // 抛出公有对象
  return publicObj;
})();

console.log('---模块模式---');

console.log(moduleObj.property);
console.log(moduleObj.somethingMethod());
try {
  console.log(moduleObj._privateVar); // undefined
  console.log(moduleObj._privateMethod());
} catch (error) {
  // console.log(error);
  // moduleObj.privateMethod is not a function
}

/* 适配器模式 */

function Foreigner(name) {
  this.name = name;
}
Foreigner.prototype.speakEnglish = function () {
  return `Hello! My name is ${this.name}`;
};

function Chinese(name) {
  this.name = name;
}
Chinese.prototype.speakChinese = function () {
  return `你好! 我的名字叫 ${this.name}`;
};

function Translator(foreigner) {
  this.foreigner = foreigner;
}
Translator.prototype.transalte = function (name) {
  let map = {
    Jack: '杰克',
  };
  return map[name];
};
Translator.prototype.speakChinese = function () {
  return `${this.foreigner.speakEnglish()} 翻译原话: 你好! 我的名字叫 ${this.transalte(this.foreigner.name)}`;
};

function ChineseCommunication() {}
ChineseCommunication.prototype.speak = function (person) {
  console.log(person.speakChinese());
};

console.log('---适配器模式---');

let communication = new ChineseCommunication();
let zhangSan = new Chinese('张三');
let liSi = new Translator(new Foreigner('Jack'));

communication.speak(zhangSan);
communication.speak(liSi);

/* 装饰器模式 */

function Phone() {}
Phone.prototype.playGame = function () {
  console.log('play game');
};

function FanDecorator(phone) {
  this.phone = phone;
}
FanDecorator.prototype.startFan = function () {
  console.log('start fan');
};
FanDecorator.prototype.playGame = function () {
  this.startFan();
  this.phone.playGame();
};

function CaseDecorator(phone) {
  this.phone = phone;
}
CaseDecorator.prototype.playGame = function () {
  this.phone.playGame();
};
CaseDecorator.prototype.protect = function () {
  console.log('protect phone');
};

function SupportDecorator(phone) {
  this.phone = phone;
}
SupportDecorator.prototype.playGame = function () {
  this.phone.playGame();
};
SupportDecorator.prototype.support = function () {
  console.log('support phone');
};

console.log('---装饰器模式---');

let phone = new Phone();
let phoneWithFan = new FanDecorator(phone);
let phoneWithCase = new CaseDecorator(phoneWithFan);
let phoneWithSupport = new SupportDecorator(phoneWithFan);

phoneWithCase.playGame();
phoneWithCase.protect();

phoneWithSupport.playGame();
phoneWithSupport.support();

// es5实现装饰器
function PhoneES5() {}
PhoneES5.prototype.playGame = function () {
  console.log('play game');
};

function startFan() {
  console.log('start fan');
}

function support(arg) {
  console.log(`support phone ${arg}`);
}

let defineValueFn = (function () {
  let fn = PhoneES5.prototype.playGame;
  return function (...args) {
    startFan();
    support('.');
    fn && fn(...args);
    // fn && fn.apply(this, args);
  };
})();
Object.defineProperty(PhoneES5.prototype, 'playGame', {
  value: defineValueFn,
});

console.log('---es5实现es7装饰器模式---');

let phoneES5 = new PhoneES5();

phoneES5.playGame();

/* 代理模式 */

function Star(price) {
  this.price = price;
}
Star.prototype.provideService = function () {
  console.log('star sing a song');
};

function Broker() {
  this.star = new Star(100);
}
Broker.prototype.judge = function () {
  return this.contract.money > this.star.price;
};
Broker.prototype.provideService = function () {
  this.star.provideService();
};
Broker.prototype.tellResult = function (contract) {
  this.contract = contract;
  let flag = this.judge();
  flag ? console.log('ok ok') : console.log('too cheap');
};

function Producer() {}
Producer.prototype.createContract = function (money) {
  return {
    money: money,
    other: {},
  };
};

console.log('---代理模式---');

let producer = new Producer();
let broker = new Broker();

let contract80 = producer.createContract(80);
broker.tellResult(contract80);
let contract120 = producer.createContract(120);
broker.tellResult(contract120);
broker.provideService();

/* 外观模式 */

function BuyService(order) {
  this.orderService = new OrderService(order);
  this.payService = new PayService();
  this.logisticsService = new LogisticsService();
}
BuyService.prototype.service = function () {
  this.orderService.service();
  this.payService.service();
  this.logisticsService.service();
};

function OrderService(order) {
  this.order = order;
}
OrderService.prototype.service = function () {
  console.log(`placing an order ${this.order}. jump to payment process.`);
};

function PayService() {}
PayService.prototype.service = function () {
  console.log('paying. pay successful.');
};

function LogisticsService() {}
LogisticsService.prototype.service = function () {
  console.log('thx! wait patiently.');
};

function Client() {}
Client.prototype.buy = function (order) {
  let buyService = new BuyService(order);
  buyService.service();
};

console.log('---外观模式---');

let client = new Client();

client.buy(1);
client.buy(2);

/* 观察者模式 */

// 观察者模式

// 被观察者(主题)
function Subject() {
  this.observerList = [];
}
Subject.prototype.addObserver = function (observer) {
  this.observerList.push(observer);
};
Subject.prototype.removeObserver = function (observer) {
  const index = this.observerList.findIndex((o) => o.name === observer.name);
  this.observerList.splice(index, 1);
};
Subject.prototype.notifyObservers = function (message) {
  this.observerList.forEach((observer) => observer.notify(message));
};

// 观察者
function Observer(name, subject) {
  this.name = name;
  this.event = {};
  subject && subject.addObserver(this);
}
Observer.prototype.notify = function (message) {
  this.event[this.name + message] && this.event[this.name + message]();
};
Observer.prototype.onNotify = function (message, func) {
  this.event[this.name + message] = func;
};

console.log('---观察者模式---');

let subject = new Subject();
let observerA = new Observer('observerA');
let observerB = new Observer('observerB', subject);
subject.addObserver(observerA);

observerA.onNotify('click', function () {
  console.log('observerA click cancel');
});
observerA.onNotify('click', function () {
  console.log('observerA click last');
});
observerA.onNotify('dblclick', function () {
  console.log('observerA dblclick');
});
observerB.onNotify('click', function () {
  console.log('observerB click');
});
observerB.onNotify('dblclick', function () {
  console.log('observerB dblclick');
});

subject.notifyObservers('click');
subject.notifyObservers('dblclick');

subject.removeObserver(observerA);

subject.notifyObservers('click');
subject.notifyObservers('dblclick');

// 发布订阅范式
function PubSub() {
  this.arg = {};
  this.listeners = {};
}
PubSub.prototype.publish = function (type, arg) {
  this.arg[type] = arg;
  this.notify(type);
};
PubSub.prototype.subscribe = function (type, cb) {
  const existListener = this.listeners[type];
  if (!existListener) {
    this.listeners[type] = [];
  }
  // 这里用数组表示可以存储多个事件,也可以直接后面事件覆盖前面事件,只保留一个事件
  this.listeners[type].push(cb);
};
// notify 通知方法 可以作为一个调度管控 比如一些100万粉up不可能一下通知100万个人或者说给某些up限流
PubSub.prototype.notify = function (type) {
  switch (type) {
    case '美食作家王刚':
      this.doCallBack(type);
      break;
    case '央视新闻':
      setTimeout(() => {
        this.doCallBack(type);
      }, 2000);
      break;
    default:
      this.doCallBack(type);
      break;
  }
};
PubSub.prototype.doCallBack = function (type) {
  const arg = this.arg[type];
  const subscribers = this.listeners[type] || [];
  subscribers.forEach((cb) => cb(arg));
};

function Publisher(name, pubsub) {
  this.name = name;
  this.pubsub = pubsub;
}
Publisher.prototype.publish = function (type, arg) {
  this.pubsub.publish(type, arg);
};

function Subscriber(name, pubsub) {
  this.name = name;
  this.pubsub = pubsub;
}
Subscriber.prototype.subscribe = function (type, cb) {
  this.pubsub.subscribe(type, cb);
};

console.log('---发布订阅范式---');

let center = new PubSub();

let subscriberA = new Subscriber('publisherA', center);
let subscriberB = new Subscriber('publisherB', center);

let wangGang = new Publisher('美食作家王刚', center);
let news = new Publisher('央视新闻', center);

subscriberA.subscribe(wangGang.name, function (...args) {
  console.log('subscriberA: 准备好零食');
});
subscriberA.subscribe(wangGang.name, function (...args) {
  console.log('subscriberA: 打开视频');
});
subscriberA.subscribe(news.name, function (...args) {
  console.log('subscriberA: 打开视频');
});

subscriberB.subscribe(wangGang.name, function (...args) {
  console.log('subscriberB: 打开视频');
});
subscriberB.subscribe(news.name, function (...args) {
  console.log('subscriberB: 今天不看了,不打开视频');
});

wangGang.publish(wangGang.name, { title: '盐焗黄鳝' });
news.publish(news.name, { title: '粮食安全意识之粮转饲' });
