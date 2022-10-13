/* 工厂模式 */

// 简单工厂
class BMW {
  constructor() {
    this.type = 1;
  }
  drive() {
    console.log('BMW drive fast');
  }
}

class Benz {
  constructor() {
    this.type = 0;
  }
  drive() {
    console.log('Benz drive fast');
  }
}

class SimpleCarFactory {
  static createCar(type) {
    switch (type) {
      case 'BMW':
        return new BMW();
      case 'Benz':
        return new Benz();

      default:
        return null;
    }
  }
}

console.log('---简单工厂---');

let mySimpleBMW = SimpleCarFactory.createCar('BMW');
console.log('type: ', mySimpleBMW.type);
mySimpleBMW.drive();

let mySimpleBenz = SimpleCarFactory.createCar('Benz');
console.log('type: ', mySimpleBenz.type);
mySimpleBenz.drive();

// 工厂方法
class AbstractCarFactory {
  constructor() {
    if (Object.getPrototypeOf(this) === AbstractCarFactory.prototype) {
      throw new Error('the class is abstract and cannot use new');
    }
  }
  createCar() {
    throw new Error('abstract class must implement this method, abstract functions cannot be called directly');
  }
}

class BMWFactory extends AbstractCarFactory {
  createCar() {
    return new BMW();
  }
}

class BenzFactory extends AbstractCarFactory {
  createCar() {
    return new Benz();
  }
}

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

/* 建造者模式 */
class Car {
  constructor(chassis, engine, electricalEquipment, body) {
    this.chassis = chassis;
    this.engine = engine;
    this.electricalEquipment = electricalEquipment;
    this.body = body;
  }
  drive() {
    console.log('drive');
  }
}

class Chassis {
  constructor(type) {
    this.type = type;
  }
}
class Engine {
  constructor(type) {
    this.type = type;
  }
}
class ElectricalEquipment {
  constructor(type) {
    this.type = type;
  }
}
class Body {
  constructor(type) {
    this.type = type;
  }
}

class CarBuilder {
  constructor() {}
  addChassis(type) {
    this.chassis = new Chassis(type);
    return this;
  }
  addEngine(type) {
    this.engine = new Engine(type);
    return this;
  }
  addElectricalEquipment(type) {
    this.electricalEquipment = new ElectricalEquipment(type);
    return this;
  }
  addBody(type) {
    this.body = new Body(type);
    return this;
  }
  createCar() {
    return new Car(this.chassis, this.engine, this.electricalEquipment, this.body);
  }
}

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
class Singleton {
  // 这里可以使用static(静态)和#关键字(私有)来声明instance
  static #instance;
  static #hasInstance = false;
  constructor(name) {
    this.name = name;
    return Singleton.#hasInstance
      ? Singleton.#instance
      : (Singleton.#hasInstance = true) && (Singleton.#instance = new Singleton(name));
  }
  getName() {
    return this.name;
  }
  setName(name) {
    this.name = name;
  }
}

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
class ProxySingle {
  constructor(single) {
    return class Single {
      static #instance;
      constructor(...args) {
        return Single.#instance || (Single.#instance = new single(...args));
      }
    };
  }
}

class Single {
  constructor(name) {
    this.name = name;
  }
  getName() {
    return this.name;
  }
  setName(name) {
    this.name = name;
  }
}

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

/* 模块模式 */
class Module {
  #privateVar = 1;
  constructor() {
    this.property = 1;
  }
  #privateMethod() {
    console.log('private method');
  }
  somethingMethod() {
    this.#privateMethod();
    return this.property + this.#privateVar;
  }
}

console.log('---模块模式---');

let moduleObj = new Module();

console.log(moduleObj.property);
console.log(moduleObj.somethingMethod());
// Private field '#field' must be declared in an enclosing class
// console.log(moduleObj.#privateVar);
// console.log(moduleObj.#privateMethod());

/* 适配器模式 */

class Foreigner {
  constructor(name) {
    this.name = name;
  }

  speakEnglish() {
    return `Hello! My name is ${this.name}`;
  }
}

class Chinese {
  constructor(name) {
    this.name = name;
  }

  speakChinese() {
    return `你好! 我的名字叫 ${this.name}`;
  }
}

class Translator {
  constructor(foreigner) {
    this.foreigner = foreigner;
  }

  transalte(name) {
    let map = {
      Jack: '杰克',
    };
    return map[name];
  }

  speakChinese() {
    return `${this.foreigner.speakEnglish()} 翻译原话: 你好! 我的名字叫 ${this.transalte(this.foreigner.name)}`;
  }
}

class ChineseCommunication {
  speak(person) {
    console.log(person.speakChinese());
  }
}

console.log('---适配器模式---');

let communication = new ChineseCommunication();
let zhangSan = new Chinese('张三');
let liSi = new Translator(new Foreigner('Jack'));

communication.speak(zhangSan);
communication.speak(liSi);

/* 装饰器模式 */

// es6
class Phone {
  playGame() {
    console.log('play game');
  }
}

class FanDecorator {
  constructor(phone) {
    this.phone = phone;
  }
  startFan() {
    console.log('start fan');
  }
  playGame() {
    this.startFan();
    this.phone.playGame();
  }
}

class CaseDecorator {
  constructor(phone) {
    this.phone = phone;
  }
  playGame() {
    this.phone.playGame();
  }
  protect() {
    console.log('protect phone');
  }
}

class SupportDecorator {
  constructor(phone) {
    this.phone = phone;
  }
  playGame() {
    this.phone.playGame();
  }
  support() {
    console.log('support phone');
  }
}

console.log('---装饰器模式---');

let phone = new Phone();
let phoneWithFan = new FanDecorator(phone);
let phoneWithCase = new CaseDecorator(phoneWithFan);
let phoneWithSupport = new SupportDecorator(phoneWithFan);

phoneWithCase.playGame();
phoneWithCase.protect();

phoneWithSupport.playGame();
phoneWithSupport.support();

// es7类装饰器
class PhoneES7 {
  // 这里用到了es7的装饰器，是Object.defineProperty的语法糖，通过重新定义value，getter等descriptors再通过旧的value来达到装饰
  // 可以装饰属性，函数，参数，类
  // 这个需要使用babel-node来运行
  // 使用npx babel-node file运行
  // 使用npx babel file -o newFile来编译
  // 安装的依赖请看@babel/XXX
  // @startFan // 需要测试时再取消注释
  // @support('.') // 需要测试时再取消注释
  playGame() {
    console.log('play game');
  }
}

function startFan(target, key, descriptor) {
  const fn = descriptor.value;
  descriptor.value = function (...args) {
    console.log('start fan');
    fn && fn(...args);
    // fn && fn.apply(this, args);
  };
}

function support(arg) {
  return function (target, key, descriptor) {
    const fn = descriptor.value;
    descriptor.value = function (...args) {
      console.log(`support phone ${arg}`);
      fn && fn(...args);
      // fn && fn.apply(this, args);
    };
  };
}

console.log('---es7装饰器模式---');

let phoneES7 = new PhoneES7();

phoneES7.playGame();

/* 代理模式 */

class Star {
  constructor(price) {
    this.price = price;
  }
  provideService() {
    console.log('star sing a song');
  }
}

class Broker {
  constructor() {
    this.star = new Star(100);
  }
  judge() {
    return this.contract.money > this.star.price;
  }
  provideService() {
    this.star.provideService();
  }
  tellResult(contract) {
    this.contract = contract;
    let flag = this.judge();
    flag ? console.log('ok ok') : console.log('too cheap');
  }
}

class Producer {
  createContract(money) {
    return {
      money: money,
      other: {},
    };
  }
}

console.log('---代理模式---');

let producer = new Producer();
let broker = new Broker();

let contract80 = producer.createContract(80);
broker.tellResult(contract80);
let contract120 = producer.createContract(120);
broker.tellResult(contract120);
broker.provideService();

/* 外观模式 */

class BuyService {
  constructor(order) {
    this.orderService = new OrderService(order);
    this.payService = new PayService();
    this.logisticsService = new LogisticsService();
  }
  service() {
    this.orderService.service();
    this.payService.service();
    this.logisticsService.service();
  }
}

class OrderService {
  constructor(order) {
    this.order = order;
  }
  service() {
    console.log(`placing an order ${this.order}. jump to payment process.`);
  }
}

class PayService {
  service() {
    console.log('paying. pay successful.');
  }
}

class LogisticsService {
  service() {
    console.log('thx! wait patiently.');
  }
}

class Client {
  buy(order) {
    let buyService = new BuyService(order);
    buyService.service();
  }
}

console.log('---外观模式---');

let client = new Client();

client.buy(1);
client.buy(2);

/* 观察者模式 */

// 观察者模式
class Subject {
  #observerList = [];
  constructor() {}
  addObserver(observer) {
    this.#observerList.push(observer);
  }
  removeObserver(observer) {
    const index = this.#observerList.findIndex(o => o.name === observer.name);
    this.#observerList.splice(index, 1);
  }
  notifyObservers(message) {
    this.#observerList.forEach(observer => observer.notify(message));
  }
}

class Observer {
  #event = {};
  constructor(name, subject) {
    this.name = name;
    subject && subject.addObserver(this);
  }
  notify(message) {
    this.#event[this.name + message] && this.#event[this.name + message]();
  }
  onNotify(message, func) {
    this.#event[this.name + message] = func;
  }
}

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
class PubSub {
  constructor() {
    this.arg = {};
    this.listeners = {};
  }
  publish(type, arg) {
    this.arg[type] = arg;
    this.#notify(type);
  }
  subscribe(type, cb) {
    const existListener = this.listeners[type];
    if (!existListener) {
      this.listeners[type] = [];
    }
    this.listeners[type].push(cb);
  }
  #notify(type) {
    switch (type) {
      case '美食作家王刚':
        this.#doCallBack(type);
        break;
      case '央视新闻':
        setTimeout(() => {
          this.#doCallBack(type);
        }, 2000);
        break;
      default:
        this.#doCallBack(type);
        break;
    }
  }
  #doCallBack(type) {
    const arg = this.arg[type];
    const subscribers = this.listeners[type] || [];
    subscribers.forEach(cb => cb(arg));
  }
}

class Publisher {
  constructor(name, pubsub) {
    this.name = name;
    this.pubsub = pubsub;
  }
  publish(type, arg) {
    this.pubsub.publish(type, arg);
  }
}

class Subscriber {
  constructor(name, pubsub) {
    this.name = name;
    this.pubsub = pubsub;
  }
  subscribe(type, cb) {
    this.pubsub.subscribe(type, cb);
  }
}

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
