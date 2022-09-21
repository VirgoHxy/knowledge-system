# loopback4 初始化流程

- loopback 很多地方定的很死
  - 文件夹不能加子文件夹，否则命令不识别
  - 数据库文件必须放在 datasources，命名也有要求，否则命令不识别
  - 模型和存储库的命名之间需要有关联，否则命令不识别
  - 但是不使用命令会比较麻烦，所以必须按它的规则来
- 前提条件全局安装 loopback4

```sh
npm i -g @loopback/cli
```

- 示例项目为 test-api
- 示例数据库 postgres 类型 testlb4

1. lb4 test-api
2. lb4 datasource testlb4

```json
{
  "name": "testlb4",
  "connector": "postgresql",
  "host": "localhost",
  "port": 5432,
  "user": "root",
  "password": "root",
  "database": "testlb4"
}
```

3. 根据所需安装 connector

```sh
npm i loopback-connector-mysql

npm i loopback-connector-postgresql

...
```

4. 从数据库中发现 model

   - 一般从数据库发现模型后，还需要对模型进行调整
   - 一般有三个方面，必填项，默认值，格式化
   - 比如 id 一般不需要必填，但是 id 数据库一定存在
   - 比如有些默认值设置在代码中并没有定义在数据库，就需要设定 default 属性
   - 比如时间在数据库存的是时间戳，可以在 model 的构造函数中进行格式化转换

```
# 查找 testlb4 数据库的模型
lb4 discover --dataSource testlb4

# 查找 testlb4 数据库的 testschema 的模型
lb4 discover --dataSource testlb4 --schema testschema
```

5. 修改 .vscode/launch.json

```json
{
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "node dist/index.js",
      "skipFiles": ["<node_internals>/**"],
      "program": "${workspaceFolder}/dist/index.js"
    },
    {
      "type": "node",
      "request": "launch",
      "name": "Run Mocha tests",
      "program": "${workspaceRoot}/node_modules/mocha/bin/_mocha",
      "runtimeArgs": [
        "-r",
        "${workspaceRoot}/node_modules/source-map-support/register"
      ],
      "cwd": "${workspaceRoot}",
      "autoAttachChildProcesses": true,
      "args": [
        "--config",
        "${workspaceRoot}/.mocharc.json",
        "${workspaceRoot}/dist/__tests__/**/*.js",
        "-t",
        "0"
      ]
    },
    {
      "type": "node-terminal",
      "request": "launch",
      "name": "npm start",
      "command": "npm start"
    }
  ]
}
```

6. 修改 .vscode/settings.json

- 可以选择修改 eslint prettier 等配置
- 可以选择修改保存配置
  - formatOnSave
  - editor.codeActionsOnSave
  - eslint.run
- files.exclude 包含了 dist，想要查看生成文件可以注释 dist

7. 根据所需增加文件夹结构

- config/ - 配置
  - 不要在此文件夹存放数据库配置 json，lb4 命令会报错
  - 请将数据库配置 json 放在 datasources 下，命名为\*.datasource.config.json
- plugins/ - 插件
- events/ - 事件
- middlewares/ - 中间件
- observers/ - 启动任务和 job

8. 最终文件夹结构

- 不要在 lb4 默认文件夹使用子文件夹，lb4 命令会报错
- 文件夹结构可根据业务来确定

- config
- controllers
- datasources
- events
- middlewares
- models
- observers
- plugins
- repositories
- services

9. 配置别名

- 别名可视情况确定是否需要添加
- loopback 因为无法使用子文件夹，所以不会有很深的结构，不推荐使用别名

```sh
npm install module-alias

npm install @types/module-alias --save-dev
```

- 在 tsconfig.json 中的 compilerOptions 添加

```json
    "baseUrl": "./",
    "paths": {
      "$config/*": ["src/config/*"],
      "$datasources/*": ["src/datasources/*"],
      "$events/*": ["src/events/*"],
      "$plugins/*": ["src/events/*"],
      "$models/*": ["src/models/*"],
      "$repositories/*": ["src/repositories/*"],
      "$services/*": ["src/services/*"],
      "$config": ["src/config/index"],
      "$datasources": ["src/datasources/index"],
      "$events": ["src/events/index"],
      "$plugins": ["src/plugins/index"],
      "$models": ["src/models/index"],
      "$repositories": ["src/repositories/index"],
      "$services": ["src/services/index"]
    }
```

- 在 package.json 中添加\_moduleAliases，与 tscofnig.json 中规定的别名一致即可

```json
  "_moduleAliases": {
    "$config": "dist/config",
    "$datasources": "dist/datasources",
    "$events": "dist/events",
    "$models": "dist/models",
    "$plugins": "dist/plugins",
    "$repositories": "dist/repositories",
    "$services": "dist/services"
  },
```

- 在 application.ts 中添加`import 'module-alias/register'`

10. 将配置抽离到一个文件中方便控制，例如 loopback.config.json 和 setting.config.json
11. 在 application.ts 引入 observer， middleware 和 sequence，以及 loopback.config.json
12. 在 index.ts 引入 loopback.config.json，
13. 一般后续操作

```sh
# 生成默认crud仓库方法
lb4 repository [<name>]
# 生成模板控制器,可直接在原有控制器进行修改
lb4 controller [<name>]
# 生成实际业务文件
lb4 service [<name>]
```

14. 在根据其他生成器语句生成所需逻辑，下列命名已经排序

```sh
# generate project
lb4 [<name>]
# generate datasource
lb4 datasource [<name>]
# generate model from datasource
lb4 discover
# generate model
lb4 model [<name>]
# generate repository
lb4 repository [<name>]
# generate controller
lb4 controller [<name>]
# generate service
lb4 service [<name>]
# generate model`s relation
lb4 relation [<name>]
# generate observer
lb4 observer [<name>]
```
