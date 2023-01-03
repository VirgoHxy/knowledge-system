# k8s

Kubernetes 是一个可移植、可扩展的开源平台，用于管理容器化的工作负载和服务，可促进声明式配置和自动化

## 目录

- [特点](#特点)
- [组件](#组件)
- [对象](#对象)
  - [基本对象](#基本对象)
  - [常用对象](#常用对象)
- [yaml](#yaml)
  - [deployment.yaml](#deploymentyaml)
  - [configmap.yaml](#configmapyaml)
  - [ingress.yaml](#ingressyaml)
  - [service.yaml](#serviceyaml)
  - [secret.yaml](#secretyaml)
  - [sealedSecret.yaml](#sealedsecretyaml)
  - [persistentvolume.yaml](#persistentvolumeyaml)

## 特点

k8s 得益于容器化部署，部署时代由传统部署时代 -> 虚拟化部署时代 -> 容器部署时代 -> k8s 分布式管理容器系统

- 传统部署时代 -- 单个物理服务器上运行多个应用程序，程序间可互相影响资源性能
- 虚拟化部署时代 -- 单个物理服务器的 CPU 上运行多台虚拟机（VM），每个 VM 是一台完整的计算机，虚拟化将一组物理资源呈现为虚拟机集群
- 容器部署时代 -- 容器是类似于更轻量级的 VM，容器之间可以共享操作系统，容器都独立具有自己的文件系统、CPU、内存、进程空间等
- k8s 分布式管理容器系统 -- 基于容器
  - 服务发现和负载均衡 -- 可以使用 DNS 名称或自己的 IP 地址来暴露容器，还可以负载均衡并分配网络流量
  - 存储编排 -- 自动挂载选择的存储系统，例如本地存储、公共云提供商等
  - 自动部署和回滚 -- 可以自动化部署创建新容器， 删除现有容器并将它们的所有资源用于新容器
  - 自动完成装箱计算 -- 设置容器需要多少 CPU 和 Memory，可以将容器按实际情况调度到你的节点上
  - 自我修复 -- 将重新启动失败的容器、替换容器、杀死不响应用户定义的运行状况检查的容器
  - 密钥与配置管理 -- 在不重建容器镜像的情况下部署和更新密钥和应用程序配置

## 组件

![k8s架构](https://raw.githubusercontent.com/VirgoHxy/image-hosting/main/img/2022-12-09-10-03-32.png)

- 控制平面组件（Control Plane Components）
  - 这是多个组件的组合，它会为集群做出全局决策，比如资源的调度，以及检测和响应集群事件。一般是放在多台计算机上运行，不会和运行用户容器进行混用。控制平面指的是指容器编排层，它暴露 API 和接口来定义、部署容器和管理容器的生命周期
  - kube-controller-manager
    - 该组件负责运行控制器进程，在 k8s 中，控制器通过 apiserver 监控集群的公共状态，并致力于将当前状态转变为期望的状态，例如温控设置，当设置一个温度，通过对设备进行开关，温度自动调节器（控制器）让当前温度（当前状态）转变为设置温度（期望状态）
    - 节点控制器（Node Controller）：负责在节点出现故障时进行通知和响应
    - 任务控制器（Job Controller）：监测代表一次性任务的 Job 对象，然后创建 Pods 来运行这些任务直至完成
    - 端点分片控制器（EndpointSlice controller）：填充端点分片（EndpointSlice）对象（以提供 Service 和 Pod 之间的链接）
    - 服务账号控制器（ServiceAccount controller）：为新的命名空间创建默认的服务账号（ServiceAccount）
  - cloud-controller-manager
    - 该组件嵌入了特定云平台的控制逻辑，与 kube-controller-manager 逻辑类似，但是可以将集群连接到云提供商的 API
    - 节点控制器（Node Controller）：用于在节点终止响应后检查云提供商以确定节点是否已被删除
    - 路由控制器（Route Controller）：用于在底层云基础架构中设置路由
    - 服务控制器（Service Controller）：用于创建、更新和删除云提供商负载均衡器
  - kube-apiserver
    - 该组件负责公开了 k8s API，负责处理接受请求的工作。API 服务器是 k8s 控制平面的入口，验证并配置 API 对象的数据，这些对象包括 Pods、Services、ReplicationControllers 等，这些传入的数据验证通过后会通知给其他控制平面组件
  - kube-scheduler
    - 该组件负责整个集群资源的调度功能，它会监视新创建的、未指定运行节点的 Pods，合理选择将 Pods 放在那个节点，从而更加合理、更加充分的利用集群的资源
  - etcd
    - 一致且高度可用的键值存储，用作 k8s 的所有集群数据的后台数据库

![k8s组件架构](https://raw.githubusercontent.com/VirgoHxy/image-hosting/main/img/2022-12-09-13-32-32.jpg)

- 节点组件（Node）
  - 节点组件会在每个节点（一个虚拟机或者物理机器）上运行，负责维护运行的 Pod 并提供 k8s 运行环境
  - kubelet
    - 该组件会在集群中每个节点上运行，负责容器生命周期管理，保证容器（Container）都运行在 Pod 中
  - kube-proxy
    - 该组件会在集群中每个节点上运行，是一个网络代理，它维护节点上的一些网络规则，这些网络规则会允许从集群内部或外部的网络会话与 Pod 进行网络通信，服务提供了一种访问一群 Pod 的途径，提供了一个高可用的负载均衡解决方案
  - container runtime
    - 它是负责运行容器的软件，支持许多容器运行环境，一般就为 docker 软件，负责操作 docker 的 image 镜像，只要实现了 k8s CRI 运行环境接口即可
  - 想像一个豆荚中一些豆子是 Pod，豆子皮里面包裹的就是 Container（Docker 实例），有多少个 Pod 就对应多少个 Container（一般一个 Pod 就一个 Container），多个 Pod 就会承担更大的流量，通过 Service 就有更好的负载均衡，再和剩余服务 kubelet，kube-proxy，还有 container runtime 软件（docker 软件）就组成了一个完整的豆荚（Node 组件），一株会有多个豆荚，Workloads（工作负载）就会管控这些运行在集群中的节点上的 Node 组件，包括扩缩容、启停、删除、升级、资源监控等操作

![k8s节点组件](https://raw.githubusercontent.com/VirgoHxy/image-hosting/main/img/2022-12-09-13-33-32.png)

## 对象

k8s 中的对象都可以在 YAML 文件中作为一种 API 类型来配置，对象是持久化的，k8s 使用这些对象去表示整个集群的状态

一旦创建对象，k8s 系统将持续工作以确保对象存在。通过创建对象，可以有效地告知 k8s 系统，所需要的集群工作负载看起来是什么样子的，这就是 k8s 的期望状态，操作这些对象也就必须通过 k8s 入口，也就是 kube-apiserver

| 类别     | 名称                                                                                                                                                                                   |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 资源对象 | Pod、ReplicaSet、ReplicationController、Deployment、StatefulSet、DaemonSet、Job、CronJob、HorizontalPodAutoscaling、Node、Namespace、Service、Ingress、Label、CustomResourceDefinition |
| 存储对象 | Volume、PersistentVolume、Secret、ConfigMap                                                                                                                                            |
| 策略对象 | SecurityContext、ResourceQuota、LimitRange                                                                                                                                             |
| 身份对象 | ServiceAccount、Role、ClusterRole                                                                                                                                                      |

### 基本对象

- 下列对象能够表示系统中部署的应用、工作负载、网络和磁盘资源，共同定义了集群的状态，k8s 中很多其他的对象其实只对这些基本的对象进行了组合
- Pod
  - Pod 是 k8s 中创建管理的基本单元，Pods 共享存储、网络、以及怎样运行这些 Pod 的声明
  - 通常不需要直接创建 Pod，会使用诸如 Deployment 或 Job 这类对象来创建 Pod
- Service
  - Service 是将运行在一组 Pods 上的应用程序公开为网络服务的抽象方法
  - k8s 为 Pod 提供自己的 IP 地址，并为一组 Pod 提供相同的 DNS 域名，并且可以在它们之间进行负载均衡，也可以称为微服务（将大块服务拆分多个小服务，服务间可以进行相互交互）
- Volume
  - Volume 是 k8s 的存储卷，卷有多种[类型](https://kubernetes.io/zh-cn/docs/concepts/storage/volumes/#volume-types)
  - 容器中的磁盘文件是短暂的，因为 kubelet 以干净的状态重新启动 Pod；销毁 Pod 的时候，k8s 也会销毁临时卷，不过不会销毁持久卷，所以一般会用 configMap 来进行配置的持久保存，以区分不同环境配置
- Namespace
  - Namespace 命名空间提供一种机制，将同一集群中的资源划分为相互隔离的组，起到虚拟的隔离作用，一般将同一个系统的的项目放在同一个命名空间

### 常用对象

- Deployment
  - Deployment 为 Pod 和 ReplicaSet 提供声明式的更新能力，ReplicaSet 的目的是维护一组在任何时候都处于运行状态的 Pod 副本的稳定集合
  - 在该对象负责描述 Deployment 中的 目标状态，而 Deployment 控制器以受控速率更改实际状态，使其变为期望状态
- ConfigMap
  - ConfigMap 是一种 API 对象，用来将非机密性的数据保存到键值对中
  - Pods 可以将其用作环境变量、命令行参数或者存储卷中的配置文件，解耦镜像和配置，便于应用配置的修改
- Ingress
  - Ingress 是对集群中服务的外部访问进行管理的 API 对象，典型的访问方式是 HTTP
  - 还可以提供负载均衡、SSL 终结和基于名称的虚拟托管
- PersistentVolume
  - PersistentVolume 持久卷是集群中的一块存储
  - 持久卷是集群资源，就像节点也是集群资源一样。不同于普通的 volume，它拥有独立于 Pod 的生命周期
- PersistentVolumeClaim
  - PersistentVolumeClaim 是用户针对一个持久卷的请求和申领，PVC 申领会耗用 PV 资源

## yaml

- 基本字段

  - 下面使用 deployment.yaml 作为示例
  - apiVersion
    ```yaml
    apiVersion: apps/v1
    ```
    - 创建必填字段
    - 对象所使用的 k8s API 的版本
  - kind
    ```yaml
    kind: Deployment
    ```
    - 创建必填字段
    - 对象的类型，上述表格就是完整类型
  - metadata
    ```yaml
    metadata:
      annotations:
        owner: YourEmail
      labels:
        app: YourProjectName
    ```
    - 创建必填字段
    - 自定义元数据，帮助识别对象唯一性的嵌套字段
  - spec
    ```yaml
    spec: # 部分字段
      progressDeadlineSeconds: 600
      replicas: 1
      revisionHistoryLimit: 10
      selector:
        matchLabels:
          app: YourProjectName
      strategy:
        rollingUpdate:
          maxSurge: 1
          maxUnavailable: 0
        type: RollingUpdate
      template:
        metadata:
          annotations:
            owner: YourEmail
          labels:
            app: YourProjectName
        spec:
          containers:
            - image: YourImage
              imagePullPolicy: Always
              name: YourProjectName
              resources:
                limits:
                  cpu: 250m
                  memory: 256Mi
                requests:
                  cpu: 250m
                  memory: 256Mi
              volumeMounts:
                - mountPath: YourConfigPath
                  name: config
                  subPath: YourConfigFileName
          volumes:
            - configMap:
                defaultMode: 0775
                items:
                  - key: YourConfigFileName
                    mode: 0775
                    path: YourConfigFileName
                name: YourProjectName-config
                optional: false
              name: config
    ```
    - 大多数对象创建必填字段，`ConfigMap`类型不需要
    - 管理对象配置的嵌套字段，也就是所说的期望状态
  - status
    ```yaml
    status: # 部分字段
      readyReplicas: 1
      replicas: 1
      updatedReplicas: 1
    ```
    - 系统生成字段，`ConfigMap`类型不存在 status 字段
    - 总结了系统中对象的当前状态的嵌套字段，通常通过自动化过程与对象一起保存，也可能是动态生成的

### deployment.yaml

- apiVersion : `apps/v1`
- kind : `Deployment`
- metadata
  ```yaml
  metadata:
    annotations:
      owner: YourEmail
    labels:
      app: YourProjectName
    name: YourProjectName
    namespace: YourNamespace
  ```
  - annotations
    - 非标识的元数据，不同于 label 标签，是不用于选择对象的
  - labels
    - 标签列表，对 k8s 中各种资源进行分类、分组，添加一个具有有意义且相关的标识属性，可以让对象有更清楚的含义，然后可以使用 selector 选择符 来选择对应标签
  - name
    - 资源名称
  - namespace
    - 命名空间
- spec
  ```yaml
  spec:
    progressDeadlineSeconds: 600
    replicas: 1
    revisionHistoryLimit: 10
    selector:
      matchLabels:
        app: YourProjectName
    strategy:
      rollingUpdate:
        maxSurge: 1
        maxUnavailable: 0
      type: RollingUpdate
  ```
  - progressDeadlineSeconds
    - 定义 deploy 升级的最大时间，超过最大时间没有升级完成，就会变成超时状态
  - Replicas
    - 指定 Pod 副本数量
    - 默认为 1
  - RevisionHistoryLimit
    - 指定 deployment 最多保留多少历史记录；如果将该项配置为 0，deployment 就不允许回滚了
    - 默认保留所有的 reversion
  - selector
    - selector 选择符，通过语法查找到对应标签的资源
  - strategy
    - 更新策略
    - Recreate
      - 停机重建
      - 先停用 V1 版本，在原资源上部署启用 V2 版本，会产生服务停止时间间隙；适用于开发环境
    - RollingUpdate
      - 滚动升级
      - V2 版本实例加入集群，逐个/批替换 V1 版本实例，V2 可正常访问后，才会关闭删除 V1；默认策略
      - maxSurge
        - 和期望状态配置的副本数 Replicas 比较，更新副本的最大值；多副本情况下，越大更新越快
      - maxUnavailable
        - 和期望状态配置的副本数 Replicas 比较，不可用副本的最大值；多副本情况下，越小更新越稳定
    - blue/green
      - 蓝绿部署，并不会设置该 strategy 值
      - 该策略也称为红/黑部署，V1 和 V2 版本是同时占用资源存在的，一开始是 V1 占用所有流量，V2 发布后将占用所有流量；适用于测试程序版本问题
      - 10 个 V1 版本 Pod 正常运行，部署好 10 个 V2 版本 Pod 后，通过更新 Service 对象，替换 label selector 中的版本标签来将所有流量指向到 V2，没有问题后再将 V1 版本全部删除
    - Canary
      - 金丝雀部署，并不会设置该 strategy 值
      - 该策略也称为灰度部署，在黑与白之间，能够平滑过渡的一种方式，V1 占用大多数流量，V2 占用少数流量，让少部分用户使用 V2；适用于部分用户参与测试体验
      - 部署好一个 V2 版本 Pod 后，长时间观察没有报错后，然后再以 1:1 的比例分配流量，再长时间观察没有问题就将所有流量指向 V2，也就是删除 V1 版本的所有对象
  - template
    ```yaml
    # pod 配置放在 deployment 的 spec 下
    template:
      metadata:
        annotations:
          owner: YourEmail
        labels:
          app: YourProjectName
      spec:
        containers:
          - env:
              - name: TZ
                value: Asia/Shanghai
            image: YourImage
            imagePullPolicy: Always
            name: YourProjectName
            resources:
              limits:
                cpu: 1
                memory: 256Mi
              requests:
                cpu: 500m
                memory: 128Mi
            securityContext:
              allowPrivilegeEscalation: false
              privileged: false
              readOnlyRootFilesystem: false
              runAsNonRoot: false
              runAsUser: 1
            stdin: true
            terminationMessagePath: /dev/termination-log
            terminationMessagePolicy: File
            tty: true
            volumeMounts:
              - mountPath: YourConfigPath
                name: config
                subPath: YourConfigFileName
        dnsPolicy: ClusterFirst
        imagePullSecrets:
          - name: YourHarborSecret
        restartPolicy: Always
        schedulerName: default-scheduler
        securityContext: {}
        terminationGracePeriodSeconds: 30
        volumes:
          - configMap:
              defaultMode: 0775
              items:
                - key: YourConfigFileName
                  mode: 0775
                  path: YourConfigFileName
              name: YourProjectName-config
              optional: false
            name: config
    ```
    - 是关于 Pod 的定义，但是被包含在其他的 k8s 对象中（例如 Deployment、StatefulSet、DaemonSet 等控制器），控制器通过 Deployment spec 中的 template 信息来创建 Pod
    - metadata
      - annotations
        - 非标识的元数据，不同于 label 标签，是不用于选择对象的
        - 一般记录：build 信息、release 信息、Docker 镜像信息等，例如时间戳、release id 号、PR 号、镜像 hash 值、docker registry 地址等；日志库、监控库、分析库等资源库的地址信息；程序调试工具信息，例如工具名称、版本号等；团队的联系信息，例如电话号码、负责人名称、网址等
      - labels
        - 标签列表，对 k8s 中各种资源进行分类、分组，添加一个具有有意义且相关的标识属性，可以让对象有更清楚的含义，然后可以使用 selector 选择符 来选择对应标签
    - spec
      - containers
        - env
          - 环境变量
          - 一般会设置一个时区环境变量，env 前面有`-`是因为 containers 是可以多个的，所以用`-`表示一个 container
          - 也可以是用 envFrom 来导入一个 configmap 作为环境变量
        - image
          - 镜像地址
          - 一般容器环境就是 docker，这里也就是 docker 的镜像地址，当然也可以是其他环境镜像地址
        - imagePullPolicy
          - 拉取镜像策略
          - Always
            - 总是拉取镜像，无论 kubelet 本地是否存在镜像缓存
            - tag 为:latest 或者没有设置该配置默认为该策略
          - IfNotPresent
            - 仅当 kubelet 本地没有缓存才拉取镜像
            - tag 设置非:latest 默认为该策略
          - Never
            - 只使用 kubelet 本地镜像，从不拉取，本地没有则启动报错
        - resources
          - 设置资源要求和限制
          - Pod 中 resources 资源是 Containers 的总和，不过一般一个 Pod 就一个 Container。cpu 可以选择是否加单位，cpu 为 0.5 等价于 500m；内存一般使用 Mi 单位，其他单位可选择十进制的 E、P、T、G、M，K、m，或二进制的 Ei、Pi、Ti、Gi、Mi、Ki
            - 1KB = 1000 Bytes = 8000 bits
            - 1KiB = 1024 Bytes = 8192 bits
          - limits
            - 资源限定，占用不得超过该配置
            - cpu = 1
            - memory = 256Mi
          - requests
            - 资源要求，运行需要占用的资源，如果资源充足可能超过该配置
            - cpu = 500m
            - memory = 128Mi
        - securityContext
          - 安全上下文（Security Context）定义 Pod 或 Container 的特权与访问控制配置
          - allowPrivilegeEscalation
            - 控制进程是否可以获得超出其父进程的特权
            - 用于设置容器内的子进程是否可以提升权限，通常在非 Root 用户时进行设置
          - privileged
            - 是否开启特权模式
            - 获取宿主机内核的完整权限，特权模式的 pod 可以看到宿主节点上的所有设备。给容器授予特权模式是非常危险的，它可以自由使用任何设备，还可以修改 Linux 安全模块的配置，并允许容器内的进程逃离容器
          - readOnlyRootFilesystem
            - 是否以只读方式加载容器的根文件系统
          - runAsNonRoot
            - 是否容器必须以非根用户身份运行
            - 当 RunAsNonRoot 为 true 不允许用户以任何方式使用 root 用户运行服务
          - runAsUser
            - 容器用户 UID
            - runAsUser 能指定 Pod 中的所有容器内的进程都使用用户 UID 来运行。如果容器中也设置了 runAsUser 则以容器中设置的优先，服务启动将以 runAsUser 配置的用户 ID 运行
        - stdin
          - 是否需要给容器分配一个标准输入缓存区
        - terminationMessagePath
          - 容器的异常终止的日志的路径
        - terminationMessagePolicy
          - 检索终止消息的策略
          - File
            - 这意味着仅从终止消息文件中检索终止消息
            - 默认策略
          - FallbackToLogsOnError
            - 在容器因错误退出时，如果终止消息文件为空，则使用容器日志输出的最后一块作为终止消息
        - tty
          - 是否需要给容器分配一个终端
          - 也需要 stdin 为真
        - volumeMounts
          - 用来声明卷在容器中的挂载位置，需要和 volumes 一起使用
          - mountPath
            - 要挂载文件到容器的地址
          - name
            - 挂载的名称，需要和 volumes 名称对应
          - subPath
            - 挂载的子地址
            - 一般用做同一个 volume 指定两个目录，挂载到不同的挂载点上，就不需要创建两个 volume，需要和 volumes 的 items 的 path 对应
      - dnsPolicy
        - dns 策略
        - None
          - 清除 Pod 预设 DNS 配置，当 dnsPolicy 设置成为这个值之后，Pod 会忽略 k8s 的 DNS 的配置，所有 DNS 配置都应该使用 dnsConfig 规范中的字段提供
        - Default
          - Pod 里面的 DNS 配置继承了 Node 上的 DNS 配置
        - ClusterFirst
          - 与 Default 相反，会预先使用 kube-dns 或 CoreDNS 的 DNS 信息写入到该 Pod 内的 DNS 配置
          - 默认策略
        - ClusterFirstWithHostNet
          - 对于使用 hostNetwork 运行的 Pod，应该将其 DNS 策略明确设置为该策略；否则，使用 hostNetwork 运行的 Pod 将回退到 Default 策略的行为
      - ImagePullSecrets
        - 从 harbor 拉取镜像时所需要的身份验证 secret 的 name
      - RestartPolicy
        - 重启策略
        - Always
          - Pod 中容器不论如何停止都将自动重启
        - onFailure
          - Pod 中容器非正常停止会自动重启，正常停止不会重启
        - Never
          - Pod 中容器不论以任何方式停止，都不会自动重启
      - SchedulerName
        - 调度器名称
      - securityContext
        - runAsGroup
          - 设置所有容器中的进程都以 runAsGroup 的 GID 组 ID 来运行
        - fsGroup
          - 一些卷类型允许 Kubelet 将该卷的所有权更改为 Pod 拥有，该卷中创建的任何文件的组 ID 将为 fsGroup 配置
      - terminationGracePeriodSeconds
        - 优雅终止宽限期，宽限期是在 Pod 中运行的进程收到终止信号后，以及进程被终止信号强制停止的时间
        - 停止任何长期连接（如数据库连接或 WebSocket 流），如果容器在优雅终止宽限期后仍在运行，则会发送 SIGKILL 信号并强制删除。与此同时，所有的该对象也会被清除
      - volumes
        - 定义 k8s 的卷配置，一般用来保存数据到 k8s 卷目录，采用持久卷可以保持配置数据一直生效
        - configMap
          - defaultMode
            - 默认读写执行权限
          - items
            - 配置文件映射，可多个
            - key
              - item key
            - mode
              - 读写执行权限
            - path
              - configmap path，和 volumeMounts 的 subPath 对应，如果没有 subPath，该 path 回合 mountPath 组成完整的 path
          - name
            - configmap 名称
          - optional
            - 是否可选
        - name
          - volumes 名称，和 volumeMounts 的名称对应

### configmap.yaml

- apiVersion : `v1`
- kind : `ConfigMap`
- metadata
  ```yaml
  metadata:
    annotations:
      owner: YourEmail
    labels:
      app: YourProjectName
    name: YourProjectName-config
    namespace: YourNamespace
  ```
  - 参照 [deployment.yaml](#deploymentyaml) 的 metadata
- data
  ```yaml
  data:
    YourConfigFileName: |-
      {
        "key": "value"
      }
    YourConfigFileName: |-
      {
        "key": "value"
      }
  ```
  - configmap 的挂载文件的值
  - value 的可以与 volumes 的 configMap 的 items 的 key 相对应

### ingress.yaml

- apiVersion : `networking.k8s.io/v1`
- kind : `Ingress`
- metadata
  ```yaml
  metadata:
    annotations:
      owner: YourEmail
    labels:
      app: YourProjectName
    name: YourProjectName-config
    namespace: YourNamespace
  ```
  - 参照 [deployment.yaml](#deploymentyaml) 的 metadata
- spec
  ```yaml
  spec:
    rules:
      - host: YourProjectName-ccoe.YourEnvHost
        http:
          paths:
            - backend:
                serviceName: YourProjectName-svc
                servicePort: 3000
              pathType: ImplementationSpecific
  ```
  - rules
    - ingress 规则，可以有多个规则
    - host
      - 访问地址
    - http
      - http 访问规则
      - paths
        - backend
          - 服务和端口名称的组合
          - serviceName
            - service.yaml 中 metadata 的 name
          - servicePort
            - service.yaml 中 spec 的 ports 的 name
        - pathType
          - 路径匹配的规则
          - Exact
            - 精确匹配 URL 路径，并且区分大小写
          - Prefix
            - 基于由 `/` 分隔的 URL 路径前缀进行匹配。匹配是在逐个元素的路径元素基础上完成的。路径元素指的是路径中由`/`分隔符分隔的标签列表
          - ImplementationSpecific
            - 路径匹配的解释取决于 IngressClass。实现可以将其视为单独的 PathType 或将其视为与 Prefix 或 Exact 路径类型相同
            - 默认规则

### service.yaml

- apiVersion : `v1`
- kind : `Service`
- metadata
  ```yaml
  metadata:
    annotations:
      owner: YourEmail
    labels:
      app: YourProjectName
    name: YourProjectName-config
    namespace: YourNamespace
  ```
  - 参照 [deployment.yaml](#deploymentyaml) 的 metadata
- spec
  ```yaml
  spec:
    clusterIP: None
    clusterIPs:
      - None
    ports:
      - name: '3000'
        port: 3000
        protocol: TCP
        targetPort: 3000
    selector:
      app: YourProjectName
    sessionAffinity: None
    type: ClusterIP
  ```
  - clusterIP
    - clusterIP 是服务的 IP 地址，通常是随机分配的。如果一个地址是手动指定的，在范围内（根据系统配置），并且没有被使用，它将被分配给服务，否则创建失败
  - clusterIPs
    - 和 clusterIP 一样，是一个列表
  - ports
    - 服务公开的端口列表
    - name
      - 端口名称
      - 一般和端口保持一致，也是通过名称和 ingress 的 servicePort 相对应，如果只有一个 port 则可不用设置
    - port
      - 此服务将公开的端口，也就是通过 clusterIP 和 port 可以访问这个 service，再由 service 转到对应的 Pod
    - protocol
      - 此端口的 IP 协议。默认为 TCP
    - targetPort
      - 在 service 对应的 pod 上访问的端口号，这个是 Container 暴露的端口，也就是实际应用程序的端口
  - selector
    - 将服务流量路由到具有与此选择器匹配的标签键和值的 pod
  - sessionAffinity
    - 分发策略
    - None
      - 将客户端请求代理到合适的后端合适的 Pod 上
      - 默认配置
    - ClientIP
      - 根据客户端 IP 会话亲和力，同一个客户端 IP，会被发送到同一个 Pod 上
  - type
    - 集群里有三种 IP 地址类型
    - ClusterIP
      - 通过集群的内部 IP 暴露服务，选择该值时服务只能够在集群内部访问
      - 单独的 ClusterIP 不具备通信的基础，所以它不可被 ping，必须和 ServicePort 组成一个具体的通信端口
      - 默认配置
    - NodePort
      - 通过每个节点上的 IP 和静态端口（NodePort）暴露服务。 为了让节点端口可用，k8s 设置了集群 IP 地址，这等同于你请求 type: ClusterIP 的服务
    - LoadBalancer
      - 使用云提供商的负载均衡器向外部暴露服务。 外部负载均衡器可以将流量路由到自动创建的 NodePort 服务和 ClusterIP 服务上
    - ExternalName
      - 通过返回 CNAME 记录和对应值，可以将服务映射到 externalName 字段的内容（例如 foo.bar.example.com）。无需创建任何类型代理

### secret.yaml

- apiVersion : `v1`
- kind : `Secret`
- metadata
  ```yaml
  metadata:
    creationTimestamp: null
    name: YourConfigSecret
    namespace: YourNamespace
  ```
  - 参照 [deployment.yaml](#deploymentyaml) 的 metadata
- data
  ```yaml
  data:
    KEY: YourEncryptedValue
  ```
  - YourEncryptedValue 是加密的值，KEY 就是字段名
  - 加密的值可以作为环境变量值或者在 volume 挂载，普通的 secret 只做简单的 base64 加密
- type
  ```yaml
  type: Opaque
  ```
  - 加密类型
  - Opaque
    - base64 编码格式的 Secret，用来存储密码、密钥等
  - kubernetes.io/dockerconfigjson
    - 用来存储私有 docker registry 的认证信息

### sealedSecret.yaml

- apiVersion : `bitnami.com/v1alpha1`
- kind : `SealedSecret`
- metadata
  ```yaml
  metadata:
    creationTimestamp: null
    name: YourConfigSecret
    namespace: YourNamespace
  ```
  - 参照 [deployment.yaml](#deploymentyaml) 的 metadata
- spec

  ```yaml
  spec:
    encryptedData:
      KEY: YourEncryptedValue
    template:
      data: null
      metadata:
        creationTimestamp: null
        name: YourConfigSecret
        namespace: YourNamespace
      type: Opaque
  ```

  - encryptedData
    - 经过密钥加密后的数据
  - templte
    - secret templte
    - 参照 [secret.yaml](#secretyaml)

- 生成 secret.yaml & sealedSecret.yaml
  - 将 data 字段中的值进行 base64 编码就得到 secret.yaml 文件
  - 下载 kubeseal 软件并安装
  - 粘贴 cert 密钥文件到 kubeseal 软件目录下，不同环境使用不同的 cert 文件
  - 生成 sealedSecret.yaml
    - `kubeseal.exe --cert YourCertFile -o yaml < secret.yaml > sealedSecret.yaml`
- 生成 imagePullSecret 的 sealedSecret.yaml
  - 下载 kubectl 软件并安装，需要再`.kube`文件夹配置好 kubectl config，否则无法执行命令
    - 要复制 k8s 的 config 到本地
  - 生成 secret
    - `kubectl create secret docker-registry YourSecretName --docker-server=YourHarborUrl --docker-username=YourHarborAccount --docker-password=YourHarborPassword`
  - 使用 serect 生成 yaml 并放在 harborSecret.yaml
    - `kubectl get secret/YourSecretName -o yaml`
  - 上述两步 kubectl 无法使用就改为手动产生
    - 准备 auth.txt
    ```txt
    {
      "auths": {
        "your.harbor.url": {
          "username": "yourHarborAccount",
          "password": "yourHarborPassword",
          "auth": "window.btoa('yourHarborAccount:yourHarborPassword')"
        }
      }
    }
    ```
    - 将 base64 加密后的内容放在 harborSecret.yaml 的 `.dockerconfigjson`
  - 根据不同环境的 cert 密钥生成 harborSealedSecret.yaml
    - `kubeseal.exe --cert YourCertFile -o yaml < harborSecret.yaml > harborSealedSecret.yaml`
  - harborSealedSecret.yaml 可在前后端公用的，可放在 common 文件夹
  - 在 deployment.yaml 中 imagePullSecrets 字段使用 harborSealedSecret.yaml 的 metadata 的 name
  - 同一个环境的 harbor secret 会根据 name 和 namespace 或者时间戳进行加密，所以同一个环境配置也会产生不同的加密内容

### persistentvolume.yaml

- apiVersion : `v1`
- kind : `PersistentVolumeClaim`
- metadata
  ```yaml
  metadata:
    annotations:
      owner: YourEmail
    finalizers:
      - kubernetes.io/pvc-protection
    labels:
      app: YourProjectName
    name: YourProjectName-storage
  ```
  - 参照 [deployment.yaml](#deploymentyaml) 的 metadata
- spec
  ```yaml
  spec:
    accessModes:
      - ReadWriteOnce
    resources:
      requests:
        storage: 1Gi
    storageClassName: ssd-io2
    volumeMode: Filesystem
  ```
  - accessModes
    - 访问 volume 卷的访问模式
    - ReadWriteOnce
      - 该卷可以由单个节点以读写方式挂载。当 Pod 在同一节点上运行时，ReadWriteOnce 访问模式仍然可以允许多个 Pod 访问该卷
    - ReadOnlyMany
      - 该卷可以被许多节点挂载为只读
    - ReadWriteMany
      - 该卷可以被许多节点挂载为读写
    - ReadWriteOncePod
      - 该卷可以由单个 Pod 以读写方式挂载。如果要确保整个集群中只有一个 pod 可以读取或写入该 PVC，请使用 ReadWriteOncePod 访问模式。这仅支持 CSI 卷和 k8s 版本 1.22+
  - resources
    - 资源
    - requests
      - 卷所需要的存储空间
      - storage
        - 空间具体大小
  - storageClassName
    - 存储 class 的名称
    - ssd-io2
    - longhorn
  - volumeMode
    - 设置 volume 卷的类型
    - Filesystem
      - 带有文件系统的卷
      - 默认
    - Block
      - 作为原始块设备的卷
      - 应用程序必须要能够处理原始块设备
