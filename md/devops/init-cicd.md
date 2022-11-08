# 项目引入 cicd

## 前提

- 需要在项目推到 gitlab 前，需要使用账密登录 rancher，依次把 NameSpace，Workload，Service Discovery，Load Balancing 建立完成
- 建立 **NameSpace**

  - 点击 Add Namespace 按钮
  - `Name` - TMS（系统名）
  - 其他默认跳过
  - 如果 cpu 和 memory 不够，则需要调整后再添加

- 建立 **Workload**

  - 点击 Deploy 按钮
  - `Name` - test-api（项目名）
  - `Workload Type` - 1 pod（默认）
  - `Docker Image` - 暂时跳过
  - `Namespace` - 输入 TMS
  - `Port Mapping` - 跳过
  - `Environment Variables`
    - TZ = Asia/Taipei - docker 镜像的时区环境变量
  - `Node Scheduling` - 跳过
  - `Health Check` - 跳过
  - `Volumes` - 暂时跳过
  - `Scaling/Upgrade Policy`
    - `Progress Deadline` - 600
    - 其他跳过
  - 点击 Show advanced options 按钮
  - `Command` - 跳过
  - `Networking` - 跳过
  - `Labels & Annotations`
    - 点击 Add Label 按钮
    - app = test-api - 这个很重要，这样才可以让 Service 和 Workload 绑定
  - `Security & Host Config` - 跳过

- 建立 **Service Discovery**

  - 点击 Add Record 按钮
  - `Name` - test-api-svc（-svc / -service）
  - `Namespace` - 选择 TMS
  - `Resolves To` - 选择 The set of pods which match a selector
  - 点击 Add Selector 按钮
    - APP = test-api
  - 点击 Show advanced options 按钮
  - `As a` - 选择 Cluster IP (Internal Only)
  - `Published IP Addresses` - 跳过
  - 点击 Add Port 按钮
    - `Port Name` - 跳过
    - `Publish the service port` - 3000
    - `Protocol` - 跳过
    - `Target Port` - 3000

- 建立 **Load Balancing**

  - 点击 Add Ingress 按钮
  - `Name` - test-api
  - `Namespace` - 选择 TMS
  - `Rules` - Automatically generate（默认）
  - remove 掉默认的 workdload
  - 点击 + Service 按钮
    - `Path` - 跳过
    - `Target` - 选择上述创建的 Service
    - `Port` - 选择 3000

## 步骤

1. 首先完成可正常运行的项目
   - api 这里以 test-api 为项目示例，TMS 为系统示例，项目启动 url 为 127.0.0.1:3000
   - ui 这里以 test-ui 为项目示例，TMS 为系统示例，项目启动 url 为 127.0.0.1:4200
2. 需要将配置项提到一个 json 文件中，这里以 setting.json 为例，方便 rancher 设置 config map
3. 项目需要能成功执行`npm run test`
4. 在项目添加对应[模板](https://gitlab.xxx.com/project/cicdtemplate.git)的文件

   - nodejs / ts-node / loopback3
     - .gitlab-ci.yml 和 Dockerfile
   - loopback4
     - .gitlab-ci.yml 和 Dockerfile
     - UTScriptsSetting.json
   - angular
     - .gitlab-ci.yml 和 Dockerfile
     - karma.config.js
     - nginx-custom.conf

5. 修改项目中的 .gitlab-ci.yml 的变量

   - nodejs / ts-node
     - BUILD_IMAGE_NAME 为 test-api
   - loopback3 / loopback4
     - BUILD_IMAGE_NAME 为 test-api
     - SERVICE_NAME 为 test-api
     - EXPOSE_PORT 默认为 3000
   - angular
     - BUILD_IMAGE_NAME 为 test-ui
     - SERVICE_NAME 为 test-ui
     - EXPOSE_PORT 默认为 4200

6. 添加 gitlab 中的 cicd 变量

   - GITLAB_KEY = 由 PM 告知
   - BUILD_IMAGE_NAME = test-api

7. 配置 [sca](https://sca.xxx.com/assets/index.html#/reports/violations) 依赖检查

   - 使用账密登录
   - 点击 Orgs and Policies 再点击 Add New App 按钮
   - `Application Name` - test-api
   - `Application Id` - gitlab 的设置 - 通用 - 项目名称

8. 将代码推送到 gitlab，将会开始执行 cicd；将新分支 merge 到 master 分支、master 分支 merge 到 pre-production 分支，pre-production 分支 merge 到 production 都会执行 cicd，这分别对应部署 dev，qas，prd 环境
9. 创建 pre-production 和 production 两个分支，分别对应 qas 环境和 prd 环境，两个分支和默认的 master 分支需要开启分支保护，只允许管理员推送
10. cicd 产生模板中的变量后，需要修改以下变量（不是必须），设定了以下的变量，将会在 merge 分支时，k8s 自动拉去对应 docker 镜像并更新 pod

    - K8S_DEV_API = 选择 dev 环境对应的 Workload，点击 View in Api，复制新打开页面的地址
    - K8S_DEV_KEY = 由 PM 告知
    - K8S_QAS_API = 选择 qas 环境对应的 Workload，点击 View in Api，复制新打开页面的地址
    - K8S_QAS_KEY = 由 PM 告知
    - K8S_PRD_API = 选择 prd 环境对应的 Workload，点击 View in Api，复制新打开页面的地址
    - K8S_PRD_KEY = 由 PM 告知

11. 查看 cicd 结果，没有失败则进入下一步，出现失败则需要通过 log 排查问题
12. 使用账密登录 [harbor](https://harbor.xxx.com/harbor/sign-in?redirect_url=%2Fharbor%2Fprojects) 查看 image，修改 Workload 的 `Docker Image` 为 harbor.xxx.com/project/test-api:1.0.1
13. 点击 Resource 中的 Config，点击 Add Config Map 按钮

    - `Name` - test-api-config
    - `Namespace` - 选择 TMS
    - `Config Map Values`
      - setting.json = {}

14. 修改 Workload 的 `Volumes`

    - 点击 Add Volumes 按钮，选择 Use a config map
    - `Volume Name` - 跳过
    - `Default Mode` - 755
    - `Config Map Name` - 选择 test-api-config，选择 Select Specific Keys
      - `Key` - 选择 setting.json
      - `Path` - 输入 setting.json
      - `Mode` - 755
    - 点击 Add Mount Point 按钮
    - `Mount Point` - app/config/setting.json（app 为项目根目录）
    - `Sub Path in Volume` - setting.json
    - `Read-Only` - 跳过

15. 增加日志缓存

    - 切换到`Volumes`
    - 点击 Add Volume 按钮，输入完成后保存
    - `Name` - test-api-storage
    - `Source` - 跳过
    - `Storage Class` - 选择 ssd-io2
    - `Request Storage` - 根据内容输入 1，2，10 等 GB 大小
    - 切换到`Workloads`，编辑对应的 Workload
    - 点击 Add Volumes 按钮，选择 Use an existing persistent volume (claim)
    - `Volume Name` - 跳过
    - `Persistent Volume Claim` - 选择 ssd-io2 的储存，这里为 test-api-storage
    - `Mount Point` - 输入日志的路径，这里为/app/logs
    - `Sub Path in Volume` - 跳过
    - `Read-Only` - 跳过
    - 查看时候使用 pod 的 shell 面板查看

16. 增加日志缓存到 minio

    - 前提条件已经有创建好的 minio 服务，没有可以在 Apps 创建 minio 服务
    - 点击 Add Volumes 按钮，选择 Use an existing persistent volume (claim)
    - `Volume Name` - 跳过
    - `Persistent Volume Claim` - minio-test，选择 minio 的储存
    - `Mount Point` - /app/logs，这里为项目日志的路径
    - `Sub Path in Volume` - test-api/logs，这里是 bucket 名称
    - `Read-Only` - 跳过
    - 查看时候使用 minio browser 下载查看

## 流程详解(gitlab + docker + k8s)

1. 为代码仓库配置了**gitlab-runner**服务(主要负责执行环境和 job 调度), 并创建`.gitlab-ci.yml`文件, 该文件是用来指定构建、测试和部署流程、以及 CI 触发条件的脚本, 指定的脚本就会在 gitlba-runner 中运行, 具体 executor(执行方式)有**Docker**和**Kubernetes**等, gitlab-server 和 gitlab-runner 在不同的机器上通过请求来通信
2. 在客户端`.git`文件中的 hooks 文件夹可以增加`pre-commit`文件客户端钩子(clienthook), 用来作为 commit 代码时做 eslint 代码格式检测、图片压缩等(可以使用`git commit --no-verify`命令来绕过钩子) 但是本地钩子并不会同步到仓库, 可以使用**Husky**库来写 hook, 下面延伸下`.git`文件的服务器钩子(webhook)
   - `pre-receive`服务器钩子(push/merge 操作之前调用)
   - `update`服务器钩子(与 pre-receive 类似, 多个分支一起提交会触发多次, 而 pre-receive 只会触发一次)
   - `post-receive`服务器钩子(push/merge 操作完成之后调用)
3. 通过 gitlab 在 master 分支设置分支保护, 让开发者只能通过合并请求方式开发, 创建一个新的 feature/fix 分支, 一个新的分支被提交到 git 后, 会触发 gitlab 中的**webhook**的**Push Events**, 这个应该是 gitlab 内部实现, 不需要额外配置
4. 触发对应项目的`.gitlab-ci.yml`会形成一个 pipeline, 一个 pipeline 会有一个或多个 stage, 可以给 stage 指定一个或多个 job, job 中的 script 可以一个或多个 命令/脚本, 然后由 gitlab-runner(分为**特定 runner**和**共享 runner**, 共享就是管理多个项目, 特定就是单独为一个项目)来负责执行环境和 job 调度, 通过 executor 来执行命令或脚本, pipeline 开始会在固定项目文件夹中初始化一个空的 git 储存库, 然后指定固定项目库的 git 地址, 拉取代码并切换到这个 feature/fix 分支, 环境创建好后, push 新分支 ci 做依赖包安装和单元测试等代码检查两个步骤
5. push 新分支 ci 有问题, 开发需要不断调整代码逻辑以及测试用例, 每次提交会创建一个新的 pipeline 直到 ci 通过
6. push 新分支 ci 没有问题, 开发者会发出一个合并请求, 将 feature/fix 分支内容合并到 master/production 分支, 项目管理者会再进行代码的审查, 确认无误后同意这个合并请求, 如果是合并到 master, 可以设置是否默认删除源 feature/fix 分支, 然后会触发 gitlab 中的**webhook**的**Merge Requests Events**, 这个应该是 gitlab 内部实现, 不需要额外配置
7. 触发对应项目的`.gitlab-ci.yml`会形成一个 pipeline(任意一个流程失败, 可以调整后重新启动 pipeline 失败的 stage, 也可以重新启动一个新的 pipeline), 还是在固定项目文件夹中初始化一个空的 git 储存库, 然后指定固定项目库的 git 地址, 拉取代码并切换到 master/pre-production/production 分支, 环境创建好后, 合并请求 cicd 步骤为以下步骤
   1. 依赖包安装 - `npm i`
   2. 单元测试 - `npm run test`
   3. 计算 tag - `ci.sh中getTag方法`
      - feature 分支合并到 master 分支: tag 中修订号+1
      - master 分支合并到 pre-production/production: 获取 gitlab 的 tag
      - fix 分支合并到 production: tag 中修订号+1
   4. 通过 `docker build` 创建镜像, `docker tag` 来设置默认变量配置的 docker 的 tag, 然后把这个镜像通过`docker push`推送到镜像仓库
   5. 通过 k8s 的 restAPI 进行部署/更新命令, `docker pull` 拉取 docker 镜像到 k8s 服务器上, 在 workload 创建 test pod
   6. 对这个 test pod 中的镜像进行漏洞扫描(sonar-scanner-cli), 可以检查这些镜像扫描结果, 并在出现任何严重问题时停止构建
   7. 通过 curl 创建请求, 给这个 docker 镜像更新/创建 tag, 在分支为 master 时更新/创建 gitlab 的 tag
      - 如果是 qas 合并请求, 会把 qas tag 添加到 dev 镜像, 一般 dev 和 qas 指向同一个镜像, 然后通过 tag 区分, 不同的配置需要抽离出来用 k8s 的 Volumes 去配置(比如不同的数据库连接地址)
      - 不带后缀或者带`dev`后缀是测试版本, 带`qas`后缀就是预发布, 带`prd`后缀就是正式版本
      - 一般镜像版本保存 3 个, 如果发布存在问题可直接在 k8s 回退到上一个镜像版本
   8. 创建一个新的 pod, 更新 k8s 的 workload 的镜像地址配置, 同时也会更新 gitlab 的有关版本的变量, 成功创建 pod 后, 然后将 old pod / test pod 释放掉, 实现无缝更新
8. dev 合并请求 cicd 没有问题, 开发者可在 dev 网址进行联调测试, 确认无误后再发起一个 qas 合并请求, 将 master 分支合并到 pre-production 分支, 后面走的流程与上述一致, 但是会因为分支不同, 执行不同的命令, 产生不同的结果
9. qas 合并请求 cicd 没有问题, 开发者可在 qas 网址进行联调测试, 确认无误后再发起一个 prd 合并请求, 将 pre-production 分支合并到 production 分支, 后面走的流程与上述一致, 但是会因为分支不同, 执行不同的命令, 产生不同的结果

## 问题

- 不同的环境的 ci 重复执行问题
