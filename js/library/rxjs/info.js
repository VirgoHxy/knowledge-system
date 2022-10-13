const { Observable, Subject, interval, map, of, filter, take, from } = require('rxjs');

// 流
const myObservable = new Observable(observer => {
  observer.next(Math.random());
  // 1s后产生数据，模拟不断产生数据
  setTimeout(() => {
    observer.next(Math.random());
    observer.complete();
  }, 1000);
});
const observer = {
  complete: () => console.log('done'),
  next: data => console.log('mySubscription', data),
  error: () => console.log('error'),
};
// 订阅后的流
const mySubscription = myObservable.subscribe(observer);
// 2s后再订阅，依旧可以收到流数据，就像函数一样，订阅就执行 observer 方法
setTimeout(() => {
  myObservable.subscribe({
    complete: () => console.log('done'),
    next: data => console.log('mySubscription1', data),
    error: () => console.log('error'),
  });
}, 2000);
// 因为在第二次流出数据前，mySubscription 就已经取消订阅，所以 done mySubscription 都不会打印
mySubscription.unsubscribe();

// 特殊流
const mySubject = new Subject();
// 这条数据无法被观察，因为是在流出数据后再订阅的
mySubject.next(Math.random());
const mySubscription2 = mySubject.subscribe(function observer2(data) {
  console.log('mySubscription2', data);
});
const mySubscription3 = mySubject.subscribe(function observer3(data) {
  console.log('mySubscription3', data);
});
// 这条数据可以被观察，而且多个订阅会观察到同一个结果
mySubject.next(Math.random());

const mySubject1 = new Subject();
// 隐藏特殊流，转为 Observable 后，就不用为订阅者暴露 next 等方法，只能使用 Observable.subscribe 等方法
const myObservable1 = mySubject1.asObservable();
// 这条数据无法被观察，因为是在流出数据后再订阅的
mySubject1.next(Math.random());
const mySubscription4 = myObservable1.subscribe(function observer4(data) {
  console.log('mySubscription4', data);
});
const mySubscription5 = myObservable1.subscribe(function observer5(data) {
  console.log('mySubscription5', data);
});
// 这条数据可以被观察，而且多个订阅会观察到同一个结果
mySubject1.next(Math.random());

// 静态操作符一般创造流实例，实例操作符一般操作流实例
// 每3秒发送自增数字，0 1 2 3 4 ... ，map相当于 js 的数组map，将流数据做一个平方处理
interval(3000)
  .pipe(map(ele => ele ** 2))
  .subscribe(data => console.log('interval + map', data));

// 接收任意多个参数，1 '2' 3 作为流数据，filter相当于 js 的数组filter，过滤流数据只允许字符串通过
of(1, '2', 3)
  .pipe(filter(ele => typeof ele === 'string'))
  .subscribe(data => console.log('of + filter', data));

// 接收数组、类数组对象、promise、迭代器对象或者类Observable对象参数，1 2 3，take表示取指定数量的值，只取前两个流数据
from([1, 2, 3])
  .pipe(take(2))
  .subscribe(data => console.log('from + take', data));
