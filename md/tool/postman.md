# PostMan@9.31.11

该文档是使用 PostMan@9.31.11 软件版本，web 网页端或者其他软件版本可能会有些差异。

## 设置工作区

![20220927172635](https://raw.githubusercontent.com/VirgoHxy/image-hosting/main/img/20220927172635.png)

postman 中有 workspace（工作区）、connection（集合）、folder（文件夹），一个工作区可以有多个集合，集合间不可以嵌套，一个集合可以有多个文件夹，文件夹可以嵌套。仅个人用法，将工作区当作一个整体系统的项目，将集合当作大项目中的一个子项目，将文件夹当作子项目中的控制器目录，里面的 request 请求就是一个个控制器方法。

集合，文件夹都是可以当一个整体去运行的，所以集合和文件夹都可以当作业务中一系列动作去设计的。例如：用户的操作时是先新增后刷新列表，就可以把新增的请求和获取列表的请求放在一个集合或者文件夹中。其他场景可自行设置。集合是不支持自定义排序的，命名时使用 1234，可以让集合按照数字顺序排序，文件夹是支持自定义排序的。

## 设置变量

![20220927163646](https://raw.githubusercontent.com/VirgoHxy/image-hosting/main/img/20220927163646.png)

postman 中变量分为三种，Global（全局）、Enviroment（环境）、Connection（集合），优先级依次递增，也就是说如果有同名变量，范围小的变量会覆盖范围大的变量。使用变量在可以在请求的地址，参数，请求头等等中使用变量`{{variable_key}}`，当输入`{{`会有变量提示弹出。

- 全局变量是可以作用于该工作区的所有请求，一般用来设置 token，将 token 作为全局变量可以在 token 过期时一键替换。如果不同环境的加密的密钥不同可以把 token 设置为环境变量，其他场景全局变量可自行设置。

- 环境变量可根据自己需要来定义需要几个环境，这里我设置了四种环境，分别是 local（本地）、dev（开发），qas（预发布），prd（生产），命名时使用 1234，可以让环境按照数字顺序排序；一般会将请求的基础地址抽离出来，这样在测试不同环境的接口就不必替换 request 的请求地址，其他场景环境变量可自行设置。

- 集合变量是只作用当前集合的变量，当临时需要改变变量时可以使用集合变量，例如：当集合间需要采用不同的环境变量，一个集合使用的是 local 的环境变量，另一个集合需要使用 dev 的环境变量，其他场景集合变量可自行设置。

## 设置前置脚本

![20220928104919](https://raw.githubusercontent.com/VirgoHxy/image-hosting/main/img/20220928104919.png)

前置脚本就是在请求前执行操作的 javascript，可以在集合或者文件夹中设置。例如：在集合的前置脚本中给请求添加 token 请求头，token 从全局变量或者环境变量中获取，这样不用去再每个请求的请求头手动添加 token 变量，变得更加方便。其他场景可自行设置。

- 操作变量

```javascript
// 获取变量
pm.variables.get('variable_key');
// 获取集合变量
pm.collectionVariables.get('variable_key');
// 获取环境变量
pm.environment.get('variable_key');
// 获取全局变量
pm.globals.get('variable_key');
// 设置变量
pm.variables.set('variable_key', 'variable_value');
// 设置集合变量
pm.collectionVariables.set('variable_key', 'variable_value');
// 设置环境变量
pm.environment.set('variable_key', 'variable_value');
// 设置全局变量
pm.globals.set('variable_key', 'variable_value');
// 清理变量
pm.variables.unset('variable_key');
// 清理集合变量
pm.collectionVariables.unset('variable_key');
// 清理环境变量
pm.environment.unset('variable_key');
// 清理全局变量
pm.globals.unset('variable_key');
```

- 操作请求头

```javascript
// 获取请求头
pm.request.headers.get('key');
// 添加请求头
pm.request.headers.add('key', 'value');
// 删除请求头
pm.request.headers.remove('key');
```

## 设置后置脚本

![20220928105553](https://raw.githubusercontent.com/VirgoHxy/image-hosting/main/img/20220928105553.png)

后置脚本就是在请求后进行测试断言操作的 javascript，同样可以在集合或者文件夹中设置。

```javascript
pm.test('Status code is 200', function () {
  pm.response.to.have.status(200);
});
pm.test('status is true', function () {
  var jsonData = pm.response.json();
  pm.expect(jsonData.status).to.eql(true);
});
```

## 比较

个人推荐：postman > apifox > apipost

- postman
  - 官网说明：Postman is an API platform for building and using APIs. Postman simplifies each step of the API lifecycle and streamlines collaboration so you can create better APIs—faster.（简化协作，可以更快地创建更好的 api 平台）
  - 优点：
    - 广泛使用老牌 api 工具
    - 界面较清晰
    - 工作区，集合概念
    - 功能完善
    - 支持离线使用
  - 缺点：
    - 没有中文
    - 同步需要外网
- apifox
  - 官网说明：[Apifox](https://www.apifox.cn/) = Postman + Swagger + Mock + JMeter
  - 优点：
    - 支持中文
    - 不同响应示例概念
    - 更注重协作
  - 缺点：
    - 新出现的 api 工具，文章推广较多
    - 界面操作繁琐，先写份文档，再运行接口等等
    - 文档在运行时候保存无论是否改动都会新建一个响应示例，保存必须要点进响应示例中保存
    - 不支持离线使用，必须注册账号
    - 没有变量提示
- apipost
  - 官网说明：[Apipost](https://www.apipost.cn/) = Postman + Swagger + Mock + Jmeter
  - 优点：
    - 支持中文
    - 界面清晰
    - 更注重协作
    - 支持离线使用
    - postman 过渡到 apipost 无压力
  - 缺点：
    - 新出现的 api 工具，文章推广较多
    - 没有工作区概念，项目只能独立存放，一个大项目的子项目只能来回切换查看
    - postman 的中文翻译版

## 其他

- curl，在编辑 curl 时可使用 import 导入功能，将 curl 链接粘贴在 raw test 生成 request，然后可以在界面中方便的测试和修改，后面可再按需求导出该 request。
  ![20220928132155](https://raw.githubusercontent.com/VirgoHxy/image-hosting/main/img/20220928132155.png)
