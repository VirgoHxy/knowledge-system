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

// 建造者模式
class Car {
  chassis: Chassis;
  engine: Engine;
  electricalEquipment: ElectricalEquipment;
  body: Body;
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
  type: string;
  constructor(type) {
    this.type = type;
  }
}
class Engine {
  type: string;
  constructor(type) {
    this.type = type;
  }
}
class ElectricalEquipment {
  type: string;
  constructor(type) {
    this.type = type;
  }
}
class Body {
  type: string;
  constructor(type) {
    this.type = type;
  }
}

class CarBuilder {
  chassis: Chassis;
  engine: Engine;
  electricalEquipment: ElectricalEquipment;
  body: Body;
  addEngine(type) {
    this.chassis = new Chassis(type);
    return this;
  }
  addChassis(type) {
    this.engine = new Engine(type);
    return this;
  }
  addBody(type) {
    this.electricalEquipment = new ElectricalEquipment(type);
    return this;
  }
  addElectricalEquipment(type) {
    this.body = new Body(type);
    return this;
  }
  createCar(): Car {
    return new Car(
      this.engine,
      this.chassis,
      this.body,
      this.electricalEquipment
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
  constructor(name) {
    this.name = name;
    return Singleton.hasInstance
      ? Singleton.instance
      : (Singleton.hasInstance = true) &&
          (Singleton.instance = new Singleton(name));
  }
  getName() {
    return this.name;
  }
  setName(name) {
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
  constructor(classTarget) {
    return new Proxy(classTarget.prototype.constructor, {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      construct(target, args: unknown[], newTarget): object {
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

// 模块模式
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
  somethingMethod() {
    this.privateMethod();
    return this.property + this.privateVar;
  }
}
const moduleObj = new Module();
console.log(moduleObj.property);
console.log(moduleObj.somethingMethod());
// Private field '#field' must be declared in an enclosing class
// console.log(moduleObj.privateVar);
// console.log(moduleObj.privateMethod());
