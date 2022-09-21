# azure

## 概念

- [app services](#app-services)
  - 基于 HTTP 的服务，用于托管后端服务和前端网站
- [function app](#function-app)
  - 快速部署一个简单的业务函数， 而不是一整个项目，主要目的通过各种 trigger 都可以触发的函数，例如：时间 trigger，event-hub trigger，http trigger 等，而且费用低；
  - function 是无状态函数，而 durable function 是有状态函数，这里的无状态是指每次响应都是和重启函数后的响应结果是一样的，这里的有状态是指可以根据上下文获取之前响应
  - function 是无服务器计算服务，而 logic app 是无服务器业务流程服务，虽然可以通过编排 function 来达到业务流程功能，但这不是 function 的设计初衷
- iot-hub
  - 是物联网应用服务，使用 mqtt 等协议让设备之间轻量，安全，快速的通信，iot-hub 连接 IoT 设备以收集数据
  - iot edge 将云分析和自定义业务逻辑移到设备，它是 iot-hub 中进行管理，将业务代码使用 docker 部署到 iot 设备中，iot 设备就会将数据传递给 iot-hub
- [event-hub](#event-hub)
  - 是大数据流服务，类似于 kafka，提供高吞吐服务
- azure data explorer
  - 可以汇总，存储和分析各种数据，类似于 elasticSearch；使用 kql 语句类似 SQL 的查询语言
- [stream analytics jobs](#stream-analytics-jobs)
  - 流分析是一个实时分析和复杂事件处理引擎，通过设定 input 和 output 就可设定出入口，再设定 query/function 来进行分析处理；目前场景从 iot-hub/event-hub 获取数据，再吐给其他服务，例如：function、storage、adx、db 等
- azure databricks
  - 是一个数据分析平台，相当于一个可智能分析的 kafka，目前场景接受 iot-hub 的数据再透过 streaming job 传给 event-hub，但是程式需要自己编写（目前不采用这种方式，使用 iot-hub 的 message routing）
- [azure cache for redis](#azure-cache-for-redis)
  - redis 服务，目前场景缓存最新的一笔数据，在 signalR 推送新数据前，没有数据时就可采用 redis 中的数据
- [signalR](#signalr)
  - 采取 websocket 的服务器主动推送，当 websocket 不可用时，采用长轮询或者 sse
- azure database for mariadb servers
  - 云上的 MariaDB
- sql Database
  - 云上的 SQL Server
- storage accounts
  - 访问 blob storage 的账号，可以访问 containers、tables 等
  - 在 containers 定义二进制存储的位置，使用 storage accounts 可以以 http 方式访问数据
  - 在 tables 定义 NoSQL 数据存储位置，tables -> table -> partition -> entity -> 键值对
  - blob storage 可以大规模存储和访问非结构化数据，如图片，电影等二进制数据，以及日志和数据缓存等
- azure cosmos db
  - 用于现代应用开发的完全托管的 NoSQL 数据库
  - 可以选择 MongoDB Api 等
  - 使用 db accounts 访问 cosmos db，在 containers 定义存储的位置
- static web app
  - 静态资源的 web 网站，基于代码更改生成并部署应用，与 app services 不同，它作用与前端网站，并必须需要绑定 github 等版本库；因为全球分布式存放静态资源，所以理论加载更快
  - Azure 会直接与 GitHub 或 Azure DevOps 交互以监控您选择的分支。每次您将提交或接受拉取请求推送到监视的分支时，都会自动运行构建并将您的应用程序和 API 部署 Azure
- app service plans
  - 规划定义一组计算资源以供 Web 应用运行，定义 cpu，memory 等
- Resource groups
  - 规划定义一个资源组，当创建资源/服务时，可以根据业务或者内容放在不同的资源组，可以一起部署、更新和删除这些资源/服务，做统一管理

## app services

- ✅ dev 和 prd 这样不同的环境配置怎么处理？
  - 服务的 Configuration 属性可以设置 Application settings 环境变量，在不同的 app service 设定不同的值即可区分 dev 和 prd 环境
- ✅ 如果未设置 azure 的环境变量，它可以读取程式中已经存在的.env 文件嘛？
  - 文件以点开头的文件无法上传到 azure app service，所以 azure app service 程式不会读取.env 文件，需要设置 app setting
  - ❓ 以点开头的文件是否无法上传到云，还是因为隐藏文件而不显示，之前有看视频说不上传以点开头的文件？

## function app

- ✅ 命令 func init/new/start 可以执行 是预先装好了什么软件或者怎么配置环境
  - 安装 azure cli.msi，可以识别 az 命令
  - 使用 node 安装 azure function 包，或者在 vscode 上安装 azure 扩展，即可用 ui 创建 function
- ✅ function 初始化 vscode 步骤
  - 使用 vscode azure tool 创建 function，期间要获取 azure 授权以及选择 function setting 配置
  - 修改 function.json，修改 bindings 的 in/out 配置，注意不要将 AccessKey，连接字符串 等放在其中，需要抽离到 local.setting.json
  - 修改 local.settings.json，修改所需要的配置
  - 将 function 部署到 azure，期间需要选择 function app
  - 在 azure 上配置 function app 的 configuration 的 app setting，将对应的参数和参数值添加在其中
  - 以上步骤也可以根据命令行实现，模板可以采用 bicep 和 ARM
- ✅ function 绑定介绍
  - context 是上下文，out/in 的出/入参会绑定在上下文，上下文有一些属性，如：context.bindings；还提供一些方法，如：context.log()
  - in 是入参
    - eventhubTrigger 第一个入参是 eventHubMessages(事件消息)，需要绑定 hubname, eventHub 连接字符串
    - httpTrigger 第一个入参是 req(请求对象)
    - timerTrigger 第一个入参是 myTimer(定时器对象)，需要绑定 schedule，注意时区，云上的时间+8 才是国内时间
    - table，blob storage 中存储结构化非关系型数据，需要绑定表名，分区名(可选)，entity key(可选)，account storage 连接字符串
    - signalRConnectionInfo，signalR 的连接信息，是一个 json，里面有 url 和 accessToken，需要绑定 hubName, signalR 连接字符串
    - blob, blob storage 中存储二进制数据，需要绑定数据路径，account storage 连接字符串
    - cosmosDB, 存储非关系型数据，需要绑定数据库名，集合名，分区名(可选)，sql(可选)，cosmosdb 连接字符串
    - ⏸ orchestrationClient，业务流程客户端，如何使用，待查看文档
    - ⏸ durableClient，持久函数客户端，待查看文档
  - out 是出参
    - httpTrigger 第一个出参是 res(响应对象)
    - table，blob storage 中存储结构化非关系型数据，需要绑定表名，account storage 连接字符串
    - signalR，消息字符串，给这个消息字符串赋值即可，需要绑定 hubName, signalR 连接字符串
    - queue，blob storage 中存储消息队列用于异步处理积压工作，需要绑定队列名，account storage 连接字符串
    - serviceBus，service bus 中存储带 topic 的队列消息，需要绑定队列名，topic name，service bus 连接字符串
    - eventHub，消息字符串，给这个消息字符串赋值即可，需要绑定 hubname, eventHub 连接字符串
    - cosmosDB，存储非关系型数据，需要绑定数据库名，集合名，分区名(可选)，cosmosdb 连接字符串
    - sendGrid，发送电子邮件
    - twilioSms，发送短信
- function 建立的 gitlab 地址？
- 目前 function 的主要作用是否是把 event-hub 数据传到其他地方？
- 没有很好的命名 function，不能一眼看出 function 的作用，编程语言，出口，入口
- 目前使用什么语言编写 function，python 或是 nodejs
- function 中去连接 redis，它会每次收到消息都进行一次连接嘛？
  - ❓ 涉及到 function 的生命周期
  - ❓ redis 是否每次连接操作完毕就要断掉连接
- 本地运行 python 的 event-hub trigger 一直报错，不是报 datatype 要改为 string 就是说不支持 collection_string，node trigger 正常
- ⏸ function 中的 context 有那些属性，有那些方法，待查看文档
- ⏸ Durable Functions 比较难懂，待查看文档

## event-hub

- ✅ Receiver 'nil' with epoch 0 cannot be created
  - 这是因为同一个消费组在争夺，换一个消费组即可
- ✅ 什么时候会触发 eventhubTrigger，采用 http 向某个 topic 发送数据，但是 trigger 好像没有触发（查看 monitor 没有 log），用分析 job 查询有时候有数据有时候没有，但是看 topic 图表 message count 是增加的
  - 也是因为消费组问题，换一个消费组即可
  - ❓ 这里引出如何使用消费组，一个 function 就需要一个消费组嘛
- ✅ 手动抛送数据到 event-hub
  - 通过程式，js 为例：安装@azure/event-hubs，即可发送数据到 event-hub
  - 通过 http，获取官方提供的加密方法，获得 SharedAccessToken，即可发送数据到 event-hub
- 新建的 consumer 是否是从订阅建立成功后才开始订阅数据
- 能否在 azure 上直接去看某个 topic 的数据
  - 还是说需要使用 function 监控 event-hub 或者某个 topic；
  - 或者开启 capture 查看 storage；
  - 或者使用流分析 job；
- 使用者组也就是 consumer group，它主要是用来做功能分组嘛？例如吐给 redis/signalR/blob，这里引出了命名问题，如何给相关创建的服务或者属性合理命名？
- ⏸ 分区暂时不使用嘛，schema 暂时不使用嘛，检查点和偏移量不太懂，没找到相关设置，待查看文档
- 目前建立 event-hub 或者 topic 是 ui 手动建立嘛，有通过命令批量建立嘛

## azure cache for redis

- ✅ redis 的数据是怎么出/入的？
  - 一般是 function 将数据抛入，客户端连接使用
  - 客户端也不能直接连接 redis 服务，需要通过 function 做一道中转
  - 通过在 function 连接 redis，客户端以 http 传递需要查询的数据参数给 function，然后将查询到的数据传给客户端
  - ❓ 代理是否需要做 token 验证或者权限管控
- ✅ 如何查看 redis 的数据
  - 在 redis 服务 -> overview -> console，通过 azure redis 控制台获取
    - `exists [key]` -- 是否存在 key
    - `set [key] [value]` -- 设置 key 值
    - `get [key]` -- 获取 key 值
  - 使用本地工具 redis-cli.exe 连接 azure redis 服务

## signalR

- ✅ signalR 的数据是怎么出/入的？
  - 一般是 function 将数据抛入，客户端连接使用
  - 客户端也不能直接连接 signalR 服务，需要通过 function 做一道中转
  - 通过在 function 绑定一个连接信息在 input，然后通过 httpTrigger 直接传递连接信息给客户端
  - ❓ 代理是否需要做 token 验证或者权限管控
- ✅ 如何定义/查看 signalR 的 hubname?
  - 自行定义，客户端和服务端需要为同一个 hubname 才可正常交互

## stream analytics jobs

## 其他

- cicd 是那个 cicd？cicd 在哪里去看？怎么执行的 cicd？azure devops repos 和 gitlab？
- Databricks 没有权限访问
- ✅ azure 的 blob storage / function / event hub / data factory / data explorer 是每个人都必须掌握还是各自负责各自的？
  - 都需要掌握
- ✅ 使用 azure 后是不是之前的 k8s，docker，kafka，nifi，elasticsearch 之类的工具都不再使用，而是使用微软的产品和服务？
  - 是
- ✅ 服务如果因为某些原因挂掉了，它会自动启动嘛？
  - 会
