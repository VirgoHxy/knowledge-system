# sca

- 本地 sca 检测
  - `auditjs iq -a YOUR_PROJECT_SCA_ID -h https://sca.xxx.com/ -u YOUR_ACCOUNT -p YOUR_PWD --insecure`
    会检测本地 node_modules 生成一个报告在 develop report
  - `auditjs iq -a YOUR_PROJECT_SCA_ID -h https://sca.xxx.com/ -u YOUR_ACCOUNT -p YOUR_PWD -s build --insecure`
    会检测本地 node_modules 生成一个报告在 build report 和 cicd 的生成相同
  - 本地依赖安装有问题的话，会影响 sca 扫描的结果（--force or --legacy-peer-deps）
- npm 包漏洞解决（勾表示可以解决，问号表示可能可以解决，叉表示不能解决）
  - 顶级包
    - ✅ 顶级包可以升级解决警告
    - ❌ 顶级包已经最新或者升级最新漏洞依然存在
  - 嵌套依赖包升级
    - ❓ 尝试升级顶级包，可能会删除或者升级嵌套依赖包
    - ❌ 升级顶级包无效，并且嵌套依赖包已经最新或者升级最新漏洞依然存在
    - ❓ 升级顶级包无效，尝试单独升级嵌套依赖包，使用 npm cli 8 版本的 overrides 强行覆盖嵌套依赖包版本，可能导致代码无法运行
      ![20221205111214](https://raw.githubusercontent.com/VirgoHxy/image-hosting/main/img/20221205111214.png)
      ![20221205111221](https://raw.githubusercontent.com/VirgoHxy/image-hosting/main/img/20221205111221.png)
  - 如果有能力，可以自行 fork 仓库代码，修改后再发包在 npm，作为最后的解决办法
