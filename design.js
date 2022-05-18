/* 
设计模式是解决问题的一种思想，和语言无关。通过不同场景采用适合的设计模式可以增加代码的可重用性、可扩展性、可维护性，最终使得我们的代码高内聚、低耦合。遵守五大原则，基本分为三大类型

单一职责原则：一个程序只需要做好一件事。如果功能过于复杂就拆分开，保证每个部分的独立
开放封闭原则：对扩展开放，对修改封闭。增加需求时，扩展新代码，而不是修改源代码。这是软件设计的终极目标。
里氏置换原则：子类能覆盖父类，父类能出现的地方子类也能出现。
接口独立原则：保持接口的单一独立，避免出现“胖接口”。这点目前在TS中运用到。
依赖导致原则：面向接口编程，依赖于抽象而不依赖于具体。客户只专注接口而不用关注具体类的实现。俗称“鸭子类型”

创建型：工厂模式(简单工厂，抽象工厂)，建造者模式，单例模式(普通单例，代理单例)，原型模式
结构型：适配器模式，装饰器模式，代理模式，外观模式，桥接模式，组合模式，享元模式
行为型：策略模式，模板方法模式，发布订阅模式，迭代器模式，职责链模式，命令模式，备忘录模式，状态模式，访问者模式，中介者模式，解释器模式。

*/

/* 工厂模式

设计意图：是为了解决多个类似产品声明的问题，将产品的使用与创建解耦，工厂负责创建，客户无需关心创建过程和逻辑，只负责使用。
具体划分：分为简单工厂和抽象工厂模式。

简单工厂：
  设计：一个简单工厂类通过传入的参数决定创建哪一种实例
  场景：
    工厂类负责生产的产品较少，一个静态方法用于创建产品；
    客户知道需要传入工厂的参数而并不关心具体的类创建逻辑。
  总结：
    结构非常简单，易于使用，适合简单场景；
    每次增加一个产品，就需要一个具体的类，会使得简单工厂无比庞大而难以维护。

抽象工厂：
  设计：一个抽象工厂类以创建一系列相关或互相依赖的产品，将类的实例化延迟到子类，由客户选择用哪一个子类
  场景：
    需要创建的产品是一系列相互关联或相互依赖的，并且客户知道将要使用哪一个子类；
  总结：
    抽象工厂模式是让系列对象依赖或者关系能够正确的关联，具有较高扩展性，如果后续想要增加类时，直接编写一个新的子类即可；
    对于抽象工厂模式抛出的接口难以进行修改，因为一旦修改接口，所有实现类也需要修改。

*/

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
  throw new Error(
    'abstract class must implement this method, abstract functions cannot be called directly'
  );
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

/* 建造者模式

设计意图：将一个复杂对象分解成多个相对简单的部分，然后根据不同需要分别创建它们，最后构建成该复杂对象，其使用和创建也是分开的
具体划分：建造者模式。

建造者模式：
  设计：一个建造者类内部实现一个复杂对象的具体创建逻辑，同样的构建过程可以创建不同的产品
  场景：
    建造者类负责生产的对象内部复杂；
    复杂对象内部的属性相互关联。
  总结：
    建造者模式是让复杂对象依赖或者关系能够正确的关联；
    当内部有变化时，会需要很多建造类。
  例如：
    车：底盘，发动机，电气设备，车身，但是客户不需要知道这些具体细节和复杂的依赖，只需要知道类型就可以创建一个车
*/

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
  return new Car(
    this.chassis,
    this.engine,
    this.electricalEquipment,
    this.body
  );
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

/* 单例模式

设计意图：是为了解决全局仅需一个实例的场景，例如全局状态管理(vuex)、window对象、购物车和弹窗(固定配置)
具体划分：分为普通单例，代理单例。

普通单例：
  设计：一个类只能被实例一次，多次实例的话只返回最开始的实例
  场景：
    全局仅需一个实例
  总结：
    简单方便，不需要引用代理；
    单例类逻辑和实例化逻辑混在一起，违反了单一职责原则。

代理单例：
  设计：一个类只能被实例一次，多次实例的话只返回最开始的实例
  场景：
    全局仅需一个实例
  总结：
    全局只有一个实例，减少了内存的开销；单例类与代理类分隔开，代理类只负责实例化；
    略微比普通代理复杂，需要在公共位置定义代理单例逻辑。

*/

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

/* 原型模式

设计意图：是为了将一个对象作为原型，通过拷贝原型创建新的对象，和简单工厂有点类似
具体划分：分为原型模式。

原型模式
  设计：克隆自己，生成一个新的对象
  场景：
    类似与简单工厂
  总结：
    不再依赖构造函数或者类创建对象，可以将这个对象作为一个模板生成更多的新对象；
    对于包含引用类型值的属性来说，所有实例在默认的情况下都会取得相同的属性值。

*/
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

/* 模块模式

设计意图：模块模式是为了模拟类的概念，这个类拥有方法和变量，但是它可以选择性的抛出，作为其公有方法和公有属性，未抛出的就是其私有方法和私有属性，创建的模块可以再执行扩充、克隆、继承等类操作。
具体划分：模块模式。

*/

// 模块模式
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

/* 适配器模式

设计意图：适配器模式是为了兼容，适配器允许因为接口不兼容而不能在一起工作的类工作在一起，并且持有目标对象，实现了需要在一起工作的类的接口。
具体划分：适配器模式。

适配器模式
  设计：让接口不兼容而不能在一起工作的类工作在一起
  场景：
    接口不兼容的类无法在一起正常工作，又不能修改目标类，一般这种类比较复杂老旧；
  总结：
    通过适配器模式可以不更改源代码的情况下让不兼容的类在一起正常工作，主要是修改源代码收益并不高；
    过多的使用适配器模式，会让系统变得琐碎。
  例如：
    一个中文交流的会谈，一个只会说英语的外国人就无法正常交谈，这时候翻译可以作为适配器去解析外国人的话语，这样就可以正常在一起交谈了

*/

// 适配器模式

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
  return `${this.foreigner.speakEnglish()} 翻译原话: 你好! 我的名字叫 ${this.transalte(
    this.foreigner.name
  )}`;
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

/* 装饰器模式

设计意图：装饰器模式是为了增强，装饰器类持有目标对象，所以会有目标类的方法，然后可以实现一些增强型接口。
具体划分：装饰器模式。

装饰器模式
  设计：不改变目标类，还能有一些增强型的功能
  场景：
    想加一些其他功能，但又不能修改目标类，一般这种类比较复杂老旧；
  总结：
    通过装饰器模式可以不更改源代码的情况下，让目标类实现增强型功能，装饰类的接口还可以反复再被装饰；
    过多的使用装饰器模式，会让系统变得复杂。
  例如：
    一个手机有正常使用的功能，我给它加一个手机壳，它就增强其保护手机摔坏的能力，我可以在加手机壳的基础上在加个手机支架，它就又有了个看视频不用手拿着的功能，还有其他等等。这里手机壳和手机支架就起到装饰作用，而且也没影响到原有的功能。
    一个手机有打游戏功能，我给手机旁边放个风扇，降低温度也就增强其打游戏的能力。这里风扇就起到装饰作用，而且也没影响到原有的功能。
    下面例子中出现了嵌套，首先被风扇装饰，然后接着被手机壳/手机支架装饰

*/

// 装饰器模式

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

/* 代理模式

设计意图：代理模式是为了隔离，隔离访问对象和被访问对象，要访问本体，要先访问代理对象，通过代理做授权和控制，可起到保护的作用。
具体划分：代理模式。

代理模式
  设计：隔离访问对象和被访问对象，对是否能访问做控制
  场景：
    一个类不方便暴露给太多客户，这时候就可以使用代理模式
  总结：
    可以起到保护作用；
    需要做额外的工作，层层代理会影响速度
  例如：
    经纪人和明星就是代理模式，商务和谈肯定不是直接和明星去谈，而是和经纪人去谈，当价格和档期都合适了，才能见到明星，明星才会表演节目

*/

// 代理模式

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

/* 外观模式

设计意图：外观模式本质就是内部封装交互和依赖，隐藏系统的复杂性，提供一个可以访问的接口
具体划分：外观模式

代理模式
  设计：
    由一个将子系统一组的接口集成在一起的高层接口，以提供一个一致的外观，减少外界与多个子系统之间的直接交互
  场景：
    客户需要和多个子系统交互，过于复杂的时候
  总结：
    减少系统的相互依赖，提高简便性；
    违反开放封闭原则，复杂逻辑改动会很麻烦
  例如：
    外观模式常用于兼容处理
    function addEvent(el, type, fn) {
      if (el.addEventlistener) {
        // 高级游览器添加事件DOM API
        el.addEventlistener(type, fn, false);
      } else if (el.attachEvent) {
        // 低版本游览器的添加事件API
        el.attachEvent(`on${type}`, fn);
      } else {
        //其他
        el[type] = fn;
      }
    }
*/

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

/* 观察者模式

设计意图：它定义了一种一对N的关系，让N个观察者对象同时观察某一个被观察者对象，这个被观察者对象的状态发生变化时就会通知所有的观察者对象，使得它们能够自动更新自己。
具体划分：观察者模式，发布订阅(基于观察者模式的一种范式)

观察者模式
  设计：
    由被观察者和观察者组成，被观察者发生改变，观察者会收到通知
  场景：
    一个对象(观察者)的行为依赖于另一个对象(被观察者)的状态，这个被观察者才是重点
  总结：
    观察者和被观察者它们之间是抽象耦合的。并且建立了异步触发机制；
    当订阅者比较多的时候，同时通知所有的订阅者可能会造成性能问题；无用的观察者需清除逻辑。
  例如：
    js中的事件流(dom.onclick和dom.click(),这个是一对一的)(多个dom.addEventListener('click')和dom.click(),这个是一对多);
    nodejs的events的EventEmitter(只是eventEmitter又是观察者(on)又是被观察者(emit));
    websocket,服务端的websocket可以既是观察者又是被观察者,客户端的websocket也是如此,可以相互send或者onMessage;

发布订阅
  设计：
    由发布者、订阅者和发布订阅中心组成，发布者和订阅者并不直接交互，发布者向中心发布内容，订阅者从中心订阅了某个topic，某个topic变化后，中心去通知订阅者
  场景：
    一个对象的行为依赖于另一个对象的状态，但是它们是相互独立的，由发布订阅中心来派发，这个中心才是重点
  总结：
    观察者和被观察者它们之间是抽象耦合的。并且建立了异步触发机制；
    当订阅者比较多的时候，同时通知所有的订阅者可能会造成性能问题；无用的观察者需清除逻辑。
  例如：
    海量数据实时处理中心kafka
    异步事件流处理工具RXJs
    代码中发现有watch、watcher、observe、observer、listen、listener、dispatch、trigger、emit、on、event、eventbus、EventEmitter这类单词出现的地方

*/

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
  this.messages = {};
  this.listeners = {};
}
PubSub.prototype.publish = function (type, content) {
  this.messages[type] = content;
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
  const messages = this.messages[type];
  const subscribers = this.listeners[type] || [];
  subscribers.forEach((cb) => cb(messages));
};

function Publisher(name, context) {
  this.name = name;
  this.context = context;
}
Publisher.prototype.publish = function (type, content) {
  this.context.publish(type, content);
};

function Subscriber(name, context) {
  this.name = name;
  this.context = context;
}
Subscriber.prototype.subscribe = function (type, cb) {
  this.context.subscribe(type, cb);
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
