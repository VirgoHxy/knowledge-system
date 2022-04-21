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
    throw new Error(
      'abstract class must implement this method, abstract functions cannot be called directly'
    );
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

// 建造者模式
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
    return new Car(
      this.chassis,
      this.engine,
      this.electricalEquipment,
      this.body
    );
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
      : (Singleton.#hasInstance = true) &&
          (Singleton.#instance = new Singleton(name));
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

// 模块模式
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
let moduleObj = new Module();
console.log(moduleObj.property);
console.log(moduleObj.somethingMethod());
// Private field '#field' must be declared in an enclosing class
// console.log(moduleObj.#privateVar);
// console.log(moduleObj.#privateMethod());
