/* 工厂模式 */

// 简单工厂
class BMW {
  type: number;
  constructor() {
    this.type = 1;
  }
  drive() {
    console.log('BMW drive fast');
  }
}

class Benz {
  type: number;
  constructor() {
    this.type = 0;
  }
  drive() {
    console.log('Benz drive fast');
  }
}

class SimpleCarFactory {
  static createCar(type: string): BMW | Benz | null {
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

const mySimpleBMW = SimpleCarFactory.createCar('BMW');
console.log('type: ', mySimpleBMW.type);
mySimpleBMW.drive();

const mySimpleBenz = SimpleCarFactory.createCar('Benz');
console.log('type: ', mySimpleBenz.type);
mySimpleBenz.drive();

// 抽象工厂
interface CarInterface {
  createCar: () => BMW | Benz;
}

class BMWFactory implements CarInterface {
  createCar(): BMW {
    return new BMW();
  }
}

class BenzFactory implements CarInterface {
  createCar(): Benz {
    return new Benz();
  }
}

const bmwFactory = new BMWFactory();
const myBMW = bmwFactory.createCar();
console.log('type: ', myBMW.type);
myBMW.drive();

const benzFactory = new BenzFactory();
const myBenz = benzFactory.createCar();
console.log('type: ', myBenz.type);
myBenz.drive();

/* 建造者模式 */
class Car {
  chassis: Chassis;
  engine: Engine;
  electricalEquipment: ElectricalEquipment;
  body: Body;
  constructor(
    chassis: Chassis,
    engine: Engine,
    electricalEquipment: ElectricalEquipment,
    body: Body
  ) {
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
  type: string;
  constructor(type: string) {
    this.type = type;
  }
}
class Engine {
  type: string;
  constructor(type: string) {
    this.type = type;
  }
}
class ElectricalEquipment {
  type: string;
  constructor(type: string) {
    this.type = type;
  }
}
class Body {
  type: string;
  constructor(type: string) {
    this.type = type;
  }
}

class CarBuilder {
  chassis: Chassis;
  engine: Engine;
  electricalEquipment: ElectricalEquipment;
  body: Body;
  addChassis(type: string) {
    this.chassis = new Engine(type);
    return this;
  }
  addEngine(type: string) {
    this.engine = new Chassis(type);
    return this;
  }
  addElectricalEquipment(type: string) {
    this.electricalEquipment = new ElectricalEquipment(type);
    return this;
  }
  addBody(type: string) {
    this.body = new Body(type);
    return this;
  }
  createCar(): Car {
    return new Car(
      this.engine,
      this.chassis,
      this.electricalEquipment,
      this.body
    );
  }
}

console.log('---建造者模式---');

const car = new CarBuilder()
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
  private static instance;
  private static hasInstance = false;
  name: string;
  constructor(name: string) {
    this.name = name;
    return Singleton.hasInstance
      ? Singleton.instance
      : (Singleton.hasInstance = true) &&
          (Singleton.instance = new Singleton(name));
  }
  getName(): string {
    return this.name;
  }
  setName(name: string) {
    this.name = name;
  }
}

console.log('---普通单例---');

const sun = new Singleton('Sun');
const moon = new Singleton('Moon');

console.log(sun === moon); // true
console.log(sun.getName()); // 'Sun'
console.log(moon.getName()); // 'Sun'
moon.setName('Moon');
console.log(sun.getName()); // 'Moon'
console.log(moon.getName()); // 'Moon'

// 代理单例
class ProxySingle {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(classTarget: any) {
    return new Proxy(classTarget.prototype.constructor, {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-explicit-any
      construct(target: any, args: unknown[], newTarget: any): object {
        if (!this.instance) {
          // Reflect.construct类似于new target(...args)
          this.instance = Reflect.construct(target, args);
        }
        return this.instance;
      },
    });
  }
}

class Single {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  getName() {
    return this.name;
  }
  setName(name: string) {
    this.name = name;
  }
}

const single = new ProxySingle(Single);
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const man = new single('Man');
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const woman = new single('Woman');

console.log('---代理单例---');
console.log(man === woman); // true
console.log(man.getName()); // 'Man'
console.log(woman.getName()); // 'Man'
woman.setName('Woman');
console.log(man.getName()); // 'Woman'
console.log(woman.getName()); // 'Woman'

/* 模块模式 */
class Module {
  // 私有属性和方法，只能在类“Module”中访问，但是这个只在ts编译前有效，编译后并没有私有限制
  private privateVar = 1;
  property: number;
  constructor() {
    this.property = 1;
  }
  private privateMethod() {
    console.log('private method');
  }
  somethingMethod(): number {
    this.privateMethod();
    return this.property + this.privateVar;
  }
}

console.log('---模块模式---');

const moduleObj = new Module();

console.log(moduleObj.property);
console.log(moduleObj.somethingMethod());
// Private field '#field' must be declared in an enclosing class
// console.log(moduleObj.privateVar);
// console.log(moduleObj.privateMethod());

/* 适配器模式 */

class Foreigner {
  name: string;
  constructor(name: string) {
    this.name = name;
  }

  speakEnglish(): string {
    return `Hello! My name is ${this.name}`;
  }
}

class Chinese {
  name: string;
  constructor(name: string) {
    this.name = name;
  }

  speakChinese(): string {
    return `你好! 我的名字叫 ${this.name}`;
  }
}

class Translator {
  foreigner: Foreigner;
  constructor(foreigner: Foreigner) {
    this.foreigner = foreigner;
  }

  transalte(name: string) {
    const map = {
      Jack: '杰克',
    };
    return map[name];
  }

  speakChinese(): string {
    return `${this.foreigner.speakEnglish()} 翻译原话: 你好! 我的名字叫 ${this.transalte(
      this.foreigner.name
    )}`;
  }
}

class ChineseCommunication {
  speak(person: Chinese | Translator) {
    console.log(person.speakChinese());
  }
}

console.log('---适配器模式---');

const communication = new ChineseCommunication();
const zhangSan = new Chinese('张三');
const liSi = new Translator(new Foreigner('Jack'));

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
  phone: Phone;
  constructor(phone: Phone) {
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
  phone: Phone;
  constructor(phone: Phone) {
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
  phone: Phone;
  constructor(phone: Phone) {
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

const phone = new Phone();
const phoneWithFan = new FanDecorator(phone);
const phoneWithCase = new CaseDecorator(phoneWithFan);
const phoneWithSupport = new SupportDecorator(phoneWithFan);

phoneWithCase.playGame();
phoneWithCase.protect();

phoneWithSupport.playGame();
phoneWithSupport.support();

// es7类装饰器
class PhoneES7 {
  @startFan
  @support('.')
  playGame() {
    console.log('play game');
  }
}

function startFan(
  target: unknown,
  key: string,
  descriptor: PropertyDescriptor
) {
  const fn = descriptor.value;
  descriptor.value = function (...args: unknown[]) {
    console.log('start fan');
    fn && fn(...args);
    // fn && fn.apply(this, args);
  };
}

function support(arg: unknown) {
  return function (
    target: unknown,
    key: string,
    descriptor: PropertyDescriptor
  ) {
    const fn = descriptor.value;
    descriptor.value = function (...args: unknown[]) {
      console.log(`support phone ${arg}`);
      fn && fn(...args);
      // fn && fn.apply(this, args);
    };
  };
}

console.log('---es7装饰器模式---');

const phoneES7 = new PhoneES7();

phoneES7.playGame();

/* 代理模式 */

class Star {
  price: number;
  constructor(price: number) {
    this.price = price;
  }
  provideService() {
    console.log('star sing a song');
  }
}

interface Contract {
  money: number;
  other?: object;
}

class Broker {
  star: Star;
  contract: Contract;
  constructor() {
    this.star = new Star(100);
  }
  judge() {
    return this.contract.money > this.star.price;
  }
  provideService() {
    this.star.provideService();
  }
  tellResult(contract: Contract) {
    this.contract = contract;
    const flag = this.judge();
    flag ? console.log('ok ok') : console.log('too cheap');
  }
}

class Producer {
  createContract(money: number): Contract {
    return {
      money: money,
      other: {},
    };
  }
}

console.log('---代理模式---');

const producer = new Producer();
const broker = new Broker();

const contract80 = producer.createContract(80);
broker.tellResult(contract80);
const contract120 = producer.createContract(120);
broker.tellResult(contract120);
broker.provideService();

/* 外观模式 */

class BuyService {
  orderService: OrderService;
  payService: PayService;
  logisticsService: LogisticsService;
  constructor(order: number) {
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
  order: number;
  constructor(order: number) {
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
  buy(order: number) {
    const buyService = new BuyService(order);
    buyService.service();
  }
}

console.log('---外观模式---');

const client = new Client();

client.buy(1);
client.buy(2);

/* 观察者模式 */

class Subject {
  private observerList = [];
  addObserver(observer) {
    this.observerList.push(observer);
  }
  removeObserver(observer) {
    const index = this.observerList.findIndex((o) => o.name === observer.name);
    this.observerList.splice(index, 1);
  }
  notifyObservers(message) {
    this.observerList.forEach((observer) => observer.notify(message));
  }
}

class Observer {
  private event = {};
  name: string;
  constructor(name: string, subject?: Subject) {
    this.name = name;
    subject && subject.addObserver(this);
  }
  notify(message: string) {
    this.event[this.name + message] && this.event[this.name + message]();
  }
  onNotify(message: string, func: () => void) {
    this.event[this.name + message] = func;
  }
}

console.log('---观察者模式---');

const subject = new Subject();
const observerA = new Observer('observerA');
const observerB = new Observer('observerB', subject);
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
  messages = {};
  listeners = {};
  constructor() {
    this.messages = {};
    this.listeners = {};
  }
  publish(type: string, content: unknown) {
    this.messages[type] = content;
    this.notify(type);
  }
  subscribe(type, cb) {
    const existListener = this.listeners[type];
    if (!existListener) {
      this.listeners[type] = [];
    }
    // 这里用数组表示可以存储多个事件,也可以直接后面事件覆盖前面事件,只保留一个事件
    this.listeners[type].push(cb);
  }
  // notify 通知方法 可以作为一个调度管控 比如一些100万粉up不可能一下通知100万个人或者说给某些up限流
  private notify(type) {
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
  }
  private doCallBack(type) {
    const messages = this.messages[type];
    const subscribers = this.listeners[type] || [];
    subscribers.forEach((cb) => cb(messages));
  }
}

class Publisher {
  name: string;
  context: PubSub;
  constructor(name: string, context: PubSub) {
    this.name = name;
    this.context = context;
  }
  publish(type: string, content: unknown) {
    this.context.publish(type, content);
  }
}

class Subscriber {
  name: string;
  context: PubSub;
  constructor(name: string, context: PubSub) {
    this.name = name;
    this.context = context;
  }
  subscribe(type: string, cb: () => void) {
    this.context.subscribe(type, cb);
  }
}

console.log('---发布订阅范式---');

const center = new PubSub();

const subscriberA = new Subscriber('publisherA', center);
const subscriberB = new Subscriber('publisherB', center);

const wangGang = new Publisher('美食作家王刚', center);
const news = new Publisher('央视新闻', center);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
subscriberA.subscribe(wangGang.name, function (...args) {
  console.log('subscriberA: 准备好零食');
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
subscriberA.subscribe(wangGang.name, function (...args) {
  console.log('subscriberA: 打开视频');
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
subscriberA.subscribe(news.name, function (...args) {
  console.log('subscriberA: 打开视频');
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
subscriberB.subscribe(wangGang.name, function (...args) {
  console.log('subscriberB: 打开视频');
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
subscriberB.subscribe(news.name, function (...args) {
  console.log('subscriberB: 今天不看了,不打开视频');
});

wangGang.publish(wangGang.name, { title: '盐焗黄鳝' });
news.publish(news.name, { title: '粮食安全意识之粮转饲' });
