# solved question list

- 如何确定多数据库，模型和数据库的对应关系
  - 设置 DATABASE_ROUTERS 路由数据库的映射方法
  - 手动判断模型属于那个数据库返回该数据库配置的的 key
- 如何确定一个项目的 python 版本，是根据什么判断一个项目应该使用什么版本
  - 根据所需框架的最低和最高支持版本来确定需要使用什么版本的 python
- 虚拟环境的目的是因为 python 项目的依赖包是装在 python 目录的 lib/site-packages 目录下，根据不同的依赖生成 requirements.txt
- python 没有 service 层嘛，前后端分离不使用 MVT 架构后，应该使用 MVCS 架构
  - 一个模型的功能放在一个包里
  - views.py -- control
  - services.py -- service
  - models.py -- model
- No migrations to apply，明明有字段调整，却没有可应用的 migrations
  - 删除掉对应应用下的 migrations
  - 进入数据库，在 django_migrations 中删除对应应用的记录
  - 重新执行命令
    - python ./manage.py makemigrations
    - pyton ./manage.py migrate
- django migragte 之前已存在的数据表不能进行迁移，怎么让后续更改生效
  - python manage.py migrate --fake \<appname\>

## 环境配置

- 安装 python
- 为单独的项目配置虚拟环境
  - virtualenv –p D:\work\Python\Python39\Python.exe D:\work\Python\Python_virtualenvs\for_my_django_project3.26 -- 这里路径需要自己定义
- 为 vscode 或者其他编译器设置项目解释器路径
- 使用 pip 安装依赖
  - pip install 依赖包
  - pip install -r requirements.txt -- 根据依赖 txt 安装

# question list

# to-do list
