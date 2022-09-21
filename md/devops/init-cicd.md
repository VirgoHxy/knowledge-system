# 项目初始化 cicd

## nodejs

1. 首先完成可正常运行的项目，这里以 test-api 为项目示例，TMS 为系统示例，项目启动 url 为 127.0.0.1:3000
2. 需要将配置项提到一个 json 文件中，这里以 setting.json 为例
3. 在项目添加 .gitlab-ci.yml 和 Dockerfile
4. 修改项目中的 .gitlab-ci.yml 的变量
5. 需要在项目推到 gitlab 前，需要使用账密登录 rancher，依次把 NameSpace，Workload，Service Discovery，Load Balancing 建立完成
6. 建立 **NameSpace**

   - 点击 Add Namespace 按钮
   - `Name` - TMS（系统名）
   - 其他默认跳过
   - 如果 cpu 和 memory 不够，则需要调整后再添加

7. 建立 **Workload**

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

8. 建立 **Service Discovery**

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

9. 建立 **Load Balancing**

   - 点击 Add Ingress 按钮
   - `Name` - test-api
   - `Namespace` - 选择 TMS
   - `Rules` - Automatically generate（默认）
   - remove 掉默认的 workdload
   - 点击 + Service 按钮
     - `Path` - 跳过
     - `Target` - 选择上述创建的 Service
     - `Port` - 选择 3000

10. 将代码推送到 gitlab，将会开始执行 cicd
11. cicd 产生模板中的变量后，需要修改以下变量

    - K8S_DEV_API = 选择 dev 环境对应的 Workload，点击 View in Api，复制新打开页面的地址
    - K8S_DEV_KEY = 由 PM 告知
    - K8S_QAS_API = 选择 qas 环境对应的 Workload，点击 View in Api，复制新打开页面的地址
    - K8S_QAS_KEY = 由 PM 告知
    - K8S_PRD_API = 选择 prd 环境对应的 Workload，点击 View in Api，复制新打开页面的地址
    - K8S_PRD_KEY = 由 PM 告知

12. 查看 cicd 结果，没有失败则进入下一步，出现失败则需要通过 log 排查问题
13. 使用账密登录 harbor 查看 image，修改 Workload 的 `Docker Image` 为 harbor.com/folder/test-api:1.0.1
14. 点击 Resource 中的 Config，点击 Add Config Map 按钮

    - `Name` - test-api-config
    - `Namespace` - 选择 TMS
    - `Config Map Values`
      - setting.json = {}

15. 修改 Workload 的 `Volumes`

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

16. 增加日志缓存

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

17. 增加日志缓存到 minio

    - 前提条件已经有创建好的 minio 服务，没有可以在 Apps 创建 minio 服务
    - 点击 Add Volumes 按钮，选择 Use an existing persistent volume (claim)
    - `Volume Name` - 跳过
    - `Persistent Volume Claim` - minio-test，选择 minio 的储存
    - `Mount Point` - /app/logs，这里为项目日志的路径
    - `Sub Path in Volume` - test-api/logs，这里是 bucket 名称
    - `Read-Only` - 跳过
    - 查看时候使用 minio browser 下载查看
