# rxjs

官网介绍：Think of RxJS as Lodash for events（把它想象成处理流的 Lodash 工具库）。Tip：Lodash 是一个非常丰富的 JavaScript 实用工具库

rxjs 是结合发布订阅、观察者模式，迭代器模式和函数式编程，所以可以很便捷的使用 rxjs 的工具方法来对数据进行控制。但是这些不易理解的原理，以及各种各样的工具方法并不是短时间内就能掌握的，所以需要多查看文档，在不同的场景下实际使用，这样从头回看这些原理，就能有个更清晰的认识，而不会纠结于原理以及概念无法自拔。

## 概念

- Observable
  - 翻译为可观察的，可理解为流，因为它是随时间不断产生数据的集合，通过发布者的 Observer.next 方法把数据流给订阅者的 Observer.next 方法，它是单播（一对一，独立发送数据）
- Observer
  - 翻译为观察者，可理解为流函数，它是处理数据的逻辑方法，它有 next，error，complete 三种方法，例如：向流传递数据（发布者）/ 打印流数据（订阅者）
- Subscription
  - 翻译为订阅，可理解为一个启动后的流，也就是订阅后的流，Observable.subscribe(Observer) -> Subscription；当然订阅后也可取消订阅，Subscription.unsubscribe()
- Subject
  - 翻译为主题，可理解为流和订阅者的结合体，是一个特殊的流，既可以像 Observable 被订阅，也可以像 Observer 使用 next、error、complete 方法；本身就有订阅方法，Subject.subscribe(Observer) -> Subscription；也可以转为 Observable 再订阅，Subject.asObservable() -> Observable，它是多播（一对多，发送同一报文）
- Operators
  - 翻译为操作符，可理解为一个个流工具函数，相当于 lodash 里的工具方法，其本质上是一个 pure function（纯函数），它接收一个 Observable 作为输入，并生成一个新的 Observable 作为输出，这就形成了一个操作符订阅链。操作符也分为静态操作符和实例操作符，例如：Rx.Observable.interval(3000) -> Observable，Observable.pipe(map((ele) => ele \* ele))；按功能分类为创建、转换、过滤、加入、多播、错误处理、工具等等，一开始不用记住所有的操作符，使用时查阅文档即可，熟悉之后就能‘唯手熟尔’
- Schedulers
  - 翻译为调度器，调度器控制着何时启动 subscription 和何时发送通知

![20221010112410](https://raw.githubusercontent.com/VirgoHxy/image-hosting/main/img/20221010112410.png)
