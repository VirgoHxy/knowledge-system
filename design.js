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

*/

// 车：底盘，发动机，电气设备，车身
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
  // 通过let创建局部变量，让实例不会影响全局，也可以使用const加Symbol来实现全局唯一
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

console.log(moduleObj.property);
console.log(moduleObj.somethingMethod());
try {
  console.log(moduleObj._privateVar); // undefined
  console.log(moduleObj._privateMethod());
} catch (error) {
  // console.log(error);
  // moduleObj.privateMethod is not a function
}
