# CCoE

CCoE（Cloud Center of Excellence - 云卓越中心）平台可以提供标准化、自动化的管理云部署环境

## 目录

- [简介](#简介)
- [流程](#流程)

## 简介

- 分组
  - CDG -- deployment 部署团队，yaml 问题
  - COG -- operation 操作环境团队，环境权限问题
  - CAG -- architecture 架构团队
- 核心
  - Build once, deploy anywhere
    - 构建一次，可以部署在任何地方；例如：k8s、azure、aws
  - Infra as code
    - Infrastructure as code（基础设施即代码）；管理配置环境并不是通过交互式工具，而是使用可定义的文件，这些文件也可以在 gitlab 中被记录管理；例如：rancher 中修改某个专案的 memory 或者 cpu 等配置，是没有任何记录的，也没有任何管控的
  - Policy as code
    - 政策即代码；当设置了一些设定，当更新部署环境时，会有扫描去验证文件是否符合设定
  - Billing
    - 计费；根据环境所需要的硬件配置，需要使用多少成本费用

## 流程

- rancher 流程
  1. 开发推送代码到 gitlab
  2. cicd template 生效，gitlab runner 工作
  3. 镜像推送到 harbor
  4. 在 rancher ui 创建 Workload、Ingress、Service Discovery、ConfigMap，手动设定镜像地址或者由 gitlab runner 获取 gitlab variables 中 rancher workload 地址自动设定镜像地址，通过 rancher ui 来查看部署结果
- CCoE 流程
  - 1-3 步骤保持不变，4 步骤由 CCoE 的 cicd 和 IT 的 yaml 文件来创建相关配置和设定地址，以达到自动部署到 k8s 目的，所以原有项目 cicd template 还是可以通用，但是不要再设定 rancher 相关的 gitlab variables
  - 书写项目的详细信息，涉及到系统架构，使用了那些技术等等项目信息，以及一个详细的 checklist.csv
  - 申请环境与权限
  - rancher ui 的点击最终就是生成一个 yaml 的配置文件，rancher 的 yaml 都可在 `view/edit yaml` 按钮进行下载，所以之前 rancher 生成的 yaml 文件会转为由 IT 自行上传至对应 gitlab，CCoE runner 会根据 yaml 完成部署
  - 通过 Argo CD 网站来查看部署的结果，只能查看，不能编辑，不能打开 pod 去执行 shell
- 实际部署 CCoE 流程
  - 可查看 CCoE 的相关信息
  - 确认架构
    - 准备 arch.md 文档，一般还会有 arch.png
    - checklist.csv，是一个项目的问答表，供 IT 来审查自己的项目是否更标准更安全
    - 提交 gtilab 并发起 merge request，提交人需要在该 gitlab 有提交权限
    - CDG 人员审查完毕就会进行合并
  - 环境权限申请
    - IBG（Infra billing group）
      - 环境费用所属组
    - IBU（Infra billing unit）
      - 环境费用所属单位，直接与环境资源相关，要部署多少个环境就要有多少个 IBU（dev qas prd = 3）
    - 根据环境和资源来计算费用
    - 登录 CCoE 网址 填写申请，申请后会有 CCoE 团队的人员来负责查看申请单进行权限操作，人员权限可通过 COG 团队处理
      - IBG
        - Group Name -- 处级
        - Group Owner -- 处级负责人
        - PAJ Owner -- 处级负责人
        - Charge Cost Center -- 处级
        - Charge Project Code -- 项目 EP Code，用于计费，由 PO 告知
      - IBU
        - Service Provider -- 部署云，k8s 或是 azure 等等
        - Infra Billing Group -- 选择对应组
        - Unit Name -- Cloud+Name+Env
        - Unit Owner -- 单位负责人，也就是 TL 或者 PO
        - PAJ Owner -- 单位负责人，也就是 TL 或者 PO
        - Charge Cost Center -- 单位
        - Charge Project Code -- 项目 EP Code，用于计费，由 PO 告知
        - Description -- 描述，一般需要填写项目的基本信息，注意需要将 Resource 需求填写在其中，不填写默认 1 cpu 1G memory
          - Code owner 权限既可以提交发起 merge request 也可以 approve 合并请求，后续修改可联系 COG 人员修改
          - Release Management 权限仅可以提交发起 merge request
          - PRD Release 权限可以 approve prd 环境的合并请求
          ```
          Release Management: gitlab账号添加在此，以空格隔开；建议整个团队开启 + 运维IT(选填)
          Code owner: gitlab账号添加在此，以空格隔开；TL灵活决定那些人员开启 + 运维IT(选填)
          PRD Release(可删除此行): ITSM用户添加在此，以空格隔开；TL + 运维IT(选填)
          Resource需求
          DEV 2 cpu 4G memory
          QAS 2 cpu 4G memory
          PRD 3 cpu 6G memory
          ```
  - 上传配置文件
    - 申请完权限后，会自动根据 IBU 名称在 gitlab 对应环境创建一个文件夹（所属的命名空间），在这个文件夹中可以根据自己的项目创建文件夹（项目），yaml 可以参考[k8s 官网](https://kubernetes.io/)或者 rancher 下载的 yaml 填写，下列写出了对应 yaml 的在 rancher 下载位置
      - deployment.yaml -- Workload 下载，包括设置镜像地址、volumes 的 configmap 映射 、环境变量等等基础配置
      - ingress.yaml -- Load Balancing 下载，设置访问 host 地址
      - configmap.yaml -- Resources_Config 下载，volumes 的 configmap 值
      - secret.yaml -- Resources_Secrets 下载，设置加密的值，如数据库密码等，只做了简单的 base64 加密
      - sealedSecret.yaml -- Resources_Secrets 下载，通过 secret.yaml 和密钥手动加密后生成
      - service.yaml -- Service Discovery 的 service 类型下载，设置端口映射
      - persistentvolume.yaml -- Volume 下载，设置持久卷
      - kustomization.yaml -- 用来加载所有 yaml 或设置公共配置
    - 从 0 开始，自己创建配置 yaml
      - 准备模板 yaml
        - 如果没有对应 yaml 不用强行配置
        - configmap.yaml
        - deployment.yaml
        - ingress.yaml
        - kustomization.yaml
        - harborSecret.yaml
        - secret.yaml
        - service.yaml
      - 替换字段
        - YourProjectName-svc
          - service 的名称
        - YourProjectName-config
          - configmap 的名称
        - YourProjectName-ingress
          - ingress 的名称
        - YourProjectName-ccoe.YourEnvHost
          - 应用程序域名网址，分不同的环境填写
        - YourHarborSecret
          - 认证 harbor 的 secret 的名称
          - 一般配置`YourNamespace-harbor-secrets`，可以前后端通用
        - YourHarborSecretData
          - 认证 harbor 的 secret 的加密内容加密而成，所以需要根据环境填写
          - 这个内容是根据不同环境的密钥加密生成
        - YourImage
          - harbor 镜像地址
        - YourConfigPath
          - 挂载文件到容器的地址
          - 前端一般添加了 cicd template，就是按`/usr/share/nginx/html/assets/YourConfigFilePath`配置
          - 后端一般添加了 cicd template，就是按`app/dist/YourConfigFilePath`配置
        - YourConfigFileName
          - 挂载文件名称
        - YourProjectName
          - 项目名称
        - YourBg
          - 开发人员所属组织架构代码
        - YourEnv
          - 部署环境
        - YourIbu
          - IBU 名称
        - YourNamespace
          - 命名空间，一般是项目所属的的系统
        - YourTeam/YourNamespace
          - 团队名称或者与命名空间一致
        - YourEmail
          - 负责人邮箱
    - 提交 gtilab 并发起 merge request，提交人需要在该 gitlab 有 Release Management 权限，如果想自己 approve 合并请求，则需要有 Code owner 权限
    - 发起人发起 merge request 后，CCoE Bot 会自动审查你的 yaml 文件，会将问题分为多个等级，目前需要保证不能有 High 等级问题，所以如果存在需要修复的问题，可在 CCoE Policy 去查看对应 RuleID 的具体原因以及修复方案
    - 审核人在 gitlab 的 MR 评论区输入 `ccoebot /approve`
    - 审核人在 gitlab 的 MR 评论区输入 `ccoebot /merge`
    - 至此完成 approve 和 merge 后，CCoE 将开始执行部署，大概需要几分钟
    - 后续修改同样执行上述上传配置文件步骤，一般仅修改 deployment.yaml 的 tag 版本号；如果需要删除 workload 部分，可删除 deployment.yaml，再重新上传即可；如果需要重新部署所有部分，应该也是删除所有 yaml 后再重新添加
  - 确认部署结果
    - 通过 keycloak 登录进去，通过搜索项目相关信息去查到对应的部署情况
    - 也可通过 Argo 生成的 ingress.yaml 的模块打开项目连接查看部署情况
    - Argo 无法同步状态，可以考虑删除 yaml 再重新添加
    - 无法解决部署问题可联系 COG 人员
    - 异常
      - 如果使用 configmap，但是 mount 地址不正确会导致 pod 无法正常启动，所以需要检查 build 打包产物的路径
      - 如果 nginx 提示没有权限而导致 pod 无法正常启动
        - 在 dockerfile 中添加命令（未成功）
          ```bash
            RUN chgrp -R root /var/cache/nginx /var/run /var/log/nginx && \
              chmod -R 770 /var/cache/nginx /var/run /var/log/nginx
          ```
        - 或者修改 nginx 的基础镜像为 nginx-unprivileged（成功）
