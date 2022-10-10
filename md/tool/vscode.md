# vscode 使用配置

该 vscode 使用配置等偏个人向，可能有些设置不合理或者没必要，但是符合个人使用习惯

## 目录导航

  - [vscode 扩展](#vscode-扩展)
    - [通用扩展](#通用扩展)
    - [项目扩展](#项目扩展)
      - [前端](#前端)
      - [nodejs](#nodejs)
      - [python](#python)
      - [java](#java)
      - [azure](#azure)
      - [其他](#其他)
  - [vscode 配置](#vscode-配置)
    - [setting.json](#settingjson)
    - [代码片段](#代码片段)
      - [javascript](#javascript)
    - [快捷键](#快捷键)
      - [文档操作](#文档操作)
        - [通用文档操作](#通用文档操作)
        - [文档行操作](#文档行操作)
        - [文档折叠操作](#文档折叠操作)
        - [文档光标操作](#文档光标操作)
        - [前端文档操作](#前端文档操作)
      - [编辑器操作](#编辑器操作)
      - [其他操作](#其他操作)
    - [其他配置](#其他配置)
  - [all in vscode](#all-in-vscode)
    - [比较](#比较)
    - [好处](#好处)
    - [坏处](#坏处)
    - [vscode 未来功能](#vscode-未来功能)

## vscode 扩展

---

扩展分为通用扩展和项目扩展，项目扩展更偏向实际开发和个人技术栈，有些没有展示的扩展可能已被 vscode 内部支持，所以可以检查下那些扩展不需要再安装。

Google 搜索: 那些你应该考虑卸载的 VSCode 扩展

推荐程度：强烈推荐，推荐，不推荐，卸载推荐，百分比推荐（是否能被更多人使用，而非扩展好坏），无（使用无感或者没怎么用）

### 通用扩展

|            扩展            | 作用             | 备注                                                                                               | 推荐程度 |
| :------------------------: | ---------------- | -------------------------------------------------------------------------------------------------- | -------- |
|       `Code Runner`        | 代码片段运行工具 | 支持 js、python、java 等代码片段运行                                                               | 强烈推荐 |
|   `Material Icon Theme`    | vscode 图标      | 让文件以及文件夹图标更友好，更清晰，同比 vscode-icons，更推荐                                      | 强烈推荐 |
|       `vscode-icons`       | vscode 图标      | 让文件以及文件夹图标更友好，更清晰                                                                 | 推荐     |
|         `GitLens`          | git 工具         | git 视图工具，但是还是建议多使用 git 命令行完成一些操作                                            | 推荐     |
|        `Git Graph`         | git 工具         | git 视图工具，但是还是建议多使用 git 命令行完成一些操作                                            | 推荐     |
|    `git-commit-plugin`     | git 工具         | 可通过选择生成规范 commit message                                                                  | 推荐     |
|  `Chinese Language Pack`   | 中文简体翻译包   | 不会翻译所有的地方，比如不会包含某些第三方扩展的右键或功能                                         | 推荐     |
|    `Comment Translate`     | 翻译工具         | 悬停翻译，注释快捷翻译，可配置多个翻译源，目前不需额外配置太多的有：有道云（需要手动添加源），必应 | 推荐     |
|   `Markdown All in One`    | md 工具          | md 工具                                                                                            | 推荐     |
|       `markdownlint`       | md 工具          | md 语法工具                                                                                        | 推荐     |
|       `IntelliCode`        | 代码提示工具     | 代码提示工具                                                                                       | 推荐     |
| `EditorConfig for VS Code` | 代码样式规范工具 | 让不同的编辑器也能保持样式规范                                                                     | 推荐     |
|       `vscode-json`        | 格式化 json      | 多种方式格式化 json                                                                                | 推荐     |
|    `Clipboard History`     | 剪切板           | 记录在 vscode 内部复制记录                                                                         | 推荐     |
|          `Codelf`          | 命名工具         | 右键可以快速打开 CodeLF 网址，进行变量名查询                                                       | 推荐     |
|        `transpose`         | 光标工具         | 两个光标选中内容进行交换                                                                           | 推荐     |
|      `Copy File Name`      | vscode 右键工具  | 右键文件夹/文件可以复制名称                                                                        | 推荐     |
|      `fe-file-rename`      | 命名规范检查工具 | 可以检测并修复文件夹、文件命名                                                                     | 推荐     |
|        `Bookmarks`         | 标记位置工具     | 无需滚动翻找某个属性                                                                               | 50       |
|        `Tabnine AI`        | AI 写代码工具    | 智能预测代码书写                                                                                   | 50       |
|          `PicGo`           | 图床工具         | 便捷上传图片到图床并生成 md 形式的图片链接                                                         | 40       |
|       `Paste Image`        | 图床工具         | 便捷从剪切板生成 md 形式的图片链接，如微信截图                                                     | 40       |
|    `Code Spell Checker`    | 拼写检测工具     | 检测单词是否拼写正确                                                                               | 30       |
|   `Increment Selection`    | 生成数字         | 当需要打出 1，2，3，4，5...时，可通过该扩展 ctrl+alt+i 快捷 + 多光标选择生成                       | 30       |
|       `change-case`        | 命名工具         | 可以快速转换命名规则，驼峰，下划线等                                                               | 30       |
|           `SFTP`           | sftp 工具        | 配置好远程桌面的 ftp 服务和远程账号密码，可直接通过 vscode 查看/上传/下载文件到服务器              | 30       |
|     `CJK Word Handler`     | 中文词语断言     | 在进行光标/选中操作时能够识别中文词语                                                              | 30       |
|      `Code Translate`      | 翻译工具         | 悬停翻译，使用内置 vscode 词库翻译，可离线使用，可惜只能翻译单词                                   | 30       |
|           `SVN`            | svn 版本同步     | 一般只有老项目才使用，建议老项目也转到 git                                                         | 不推荐   |
|       `TortoiseSVN`        | svn 工具         | svn 工具                                                                                           | 不推荐   |
|      `Settings Sync`       | vscode 同步      | 多设备同步扩展，快捷键等配置，同步在 github；vscode 内置同步功能                                   | 卸载推荐 |

### 项目扩展

#### 前端

|               扩展               | 作用                    | 备注                                                               | 推荐程度 |
| :------------------------------: | ----------------------- | ------------------------------------------------------------------ | -------- |
|             `ESLint`             | js 规范                 | 主要偏向代码质量检查，通常搭配 prettier，达到质量检查和风格统一    | 强烈推荐 |
|            `Prettier`            | 风格规范&格式化         | 代码格式化，通常搭配 eslint，达到质量检查和风格统一                | 强烈推荐 |
|             `Vetur`              | vue 工具                | vue 工具                                                           | 推荐     |
|     `Vue Language Features`      | vue 工具                | vue 工具                                                           | 推荐     |
|         `Vue 3 Snippets`         | vue3 代码片段           | vue3 代码片段                                                      | 推荐     |
|      `Vue VSCode Snippets`       | vue2/3 代码片段         | vue2/3 代码片段                                                    | 推荐     |
|        `Color Highlight`         | 颜色高亮                | 显示实际的色彩在颜色代码上                                         | 推荐     |
|          `Color Picker`          | 色彩板                  | 可在色彩板选择颜色，然后生成颜色代码                               | 推荐     |
|            `CSScomb`             | css 风格规范&格式化     | 主要用来规范手写 css 的顺序                                        | 推荐     |
|            `CSS Peek`            | 查看 css 定义           | html 中查看 css 的 class，id 的 css 属性                           | 推荐     |
| `JavaScript (ES6) code snippets` | js es6 代码片段         | js es6 代码片段                                                    | 推荐     |
|    `JavaScript Snippet Pack`     | js 代码片段             | js 代码片段                                                        | 推荐     |
|       `Turbo Console Log`        | js 快速生成 console.log | js 快速生成 console.log                                            | 推荐     |
|        `Wrap Console Log`        | js 快速生成 console.log | js 快速生成 console.log                                            | 推荐     |
|         `json2interface`         | ts 快速生成 interface   | 根据复制过的 json 内容，生成 ts interface                          | 推荐     |
|       `Path Intellisense`        | 引用路径提示            | 提示文件夹层级过长的文件路径                                       | 50       |
|             `Minify`             | 文件压缩工具            | 可压缩 html，css，js 成一个*.min.js/*.min.css                      | 50       |
|          `Live Server`           | html http 服务工具      | 可本地启动一个 http 服务，让 html 通过 http 打开，而不是 file 协议 | 30       |
|        `open in browser`         | 打开浏览器工具          | 可右键打开 html 到默认浏览器                                       | 30       |
|             `stylus`             | stylus 工具             | 主要用来高亮 stylus 和规则提示，使用其他 css 预处理器，则无需安装  | 30       |
|    `Manta's Stylus Supremacy`    | stylus 风格规范&格式化  | 主要用来规范格式化 stylus，使用其他 css 预处理器，则无需安装       | 30       |
|      `Debugger for Chrome`       | 断点调试工具            | 映射 vscode 断点到 chrome 浏览器断点，快捷调试                     | 无       |
|         `Image preview`          | css 图片预览            | 可在 css 中预览图片文件                                            | 无       |
|          `Import Cost`           | 引用大小提示            | 可显示 import/requrie 引用包的大小；可能影响性能                   | 卸载推荐 |

#### nodejs

|        扩展        | 作用     | 备注                          | 推荐程度 |
| :----------------: | -------- | ----------------------------- | -------- |
|       `npm`        | npm 工具 | 验证依赖，运行 npm 脚本       | 无       |
| `npm Intellisense` | npm 工具 | 自动完成 import，以及跳转定义 | 无       |

#### python

|             扩展             | 作用                | 备注                                                           | 推荐程度 |
| :--------------------------: | ------------------- | -------------------------------------------------------------- | -------- |
|   `Python Extension Pack`    | python 组合包       | 包含 7 个扩展                                                  | 推荐     |
|           `Python`           | 语言支持工具        | 无                                                             | 无       |
|          `Pylance`           | 语言支持工具        | 无                                                             | 无       |
| `Python Environment Manager` | 虚拟环境管理工具    | 支持 vscode 工作区终端绑定虚拟环境                             | 无       |
|      `Python Extended`       | 代码片段            | 无                                                             | 无       |
|      `python snippets`       | 代码片段            | 无                                                             | 无       |
|       `Python Indent`        | 缩进工具            | 无                                                             | 无       |
|       `autoDocstring`        | 文档注释生成工具    | 暂未使用                                                       | 无       |
|           `Django`           | Django web 框架工具 | 提供代码片段以及框架提示，如果使用其他 python 框架，则无需安装 | 无       |
|          `Jupyter`           | 大数据工具          | 暂未使用                                                       | 无       |

#### java

|           扩展            | 作用        | 备注                                       | 推荐程度 |
| :-----------------------: | ----------- | ------------------------------------------ | -------- |
| `Extension Pack for Java` | java 组合包 | 包含 6 个扩展；java 建议还是使用 idea 开发 | 不推荐   |

#### azure

|     扩展      | 作用           | 备注           | 推荐程度 |
| :-----------: | -------------- | -------------- | -------- |
| `Azure Tools` | Azure 云工具包 | 包含 13 个扩展 | 推荐     |

#### 其他

|   扩展   | 作用                | 备注            | 推荐程度 |
| :------: | ------------------- | --------------- | -------- |
| `Docker` | Docker 部署镜像工具 | Docker 部署镜像 | 无       |

## vscode 配置

---

偏个人向配置，快捷键并不展示所有操作，并不追求完全脱离鼠标

### setting.json

```json
{
  /* 编辑器等格式化 */
  // prettier规则
  "prettier.tabWidth": 2, // 缩进字节数
  "prettier.useTabs": false, // 缩进不使用tab，使用空格
  "prettier.semi": true, // 句尾添加分号
  "prettier.singleQuote": false, // 使用单引号代替双引号
  "prettier.proseWrap": "preserve", // 默认值。因为使用了一些折行敏感型的渲染器（如GitHub comment）而按照markdown文本样式进行折行
  "prettier.arrowParens": "avoid", //  (x) => {} 箭头函数参数只有一个时是否要有小括号。avoid：省略括号
  "prettier.bracketSpacing": true, // 在对象，数组括号与文字之间加空格 "{ foo: bar }"
  "prettier.endOfLine": "auto", // 结尾是 \n \r \n\r auto
  "prettier.htmlWhitespaceSensitivity": "ignore",
  "prettier.ignorePath": ".prettierignore", // 不使用prettier格式化的文件填写在项目的.prettierignore文件中
  "prettier.jsxBracketSameLine": false, // 在jsx中把'>' 是否单独放一行
  "prettier.jsxSingleQuote": false, // 在jsx中使用单引号代替双引号
  "prettier.requireConfig": false, // Require a 'prettierconfig' to format prettier
  "prettier.trailingComma": "es5", // 在对象或数组最后一个元素后面是否加逗号（在ES5中加尾逗号）
  // 编辑器设定
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[css]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[stylus]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[less]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[scss]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[jsonc]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[markdown]": {
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "yzhang.markdown-all-in-one"
  },
  "[python]": {
    "editor.defaultFormatter": "ms-python.python",
    "editor.tabSize": 4
  },
  "[shellscript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[java]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "editor.linkedEditing": true,
  "editor.tabSize": 2,
  "editor.wordWrap": "on",
  "editor.detectIndentation": false,
  "editor.renderControlCharacters": true,
  "editor.formatOnSave": false,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": false
  },
  "editor.suggest.snippetsPreventQuickSuggestions": false,
  "editor.unicodeHighlight.ambiguousCharacters": false,
  "editor.bracketPairColorization.enabled": true,
  "eslint.format.enable": true,
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "jsx",
    "typescript",
    "typescriptreact",
    "tsx",
    "css",
    "scss",
    "stylus"
  ],
  "eslint.workingDirectories": [{ "mode": "auto" }],
  "eslint.alwaysShowStatus": true,
  /* 前端配置 */
  "files.associations": {
    "*.vue": "vue",
    "*.wpy": "vue",
    "*.wxml": "html",
    "*.wxs": "javascript",
    "*.wxss": "css",
    "*.cshtml": "html",
    "*.env": "yaml"
  },
  "emmet.triggerExpansionOnTab": true,
  "emmet.showAbbreviationSuggestions": true,
  "emmet.showExpandedAbbreviation": "always",
  "emmet.includeLanguages": {
    "vue-html": "html",
    "vue": "html",
    "wpy": "html",
    "wxml": "html",
    "cshtml": "html"
  },
  "csscomb.syntaxAssociations": {
    "postcss": "scss"
  },
  "stylusSupremacy.insertColons": false, // 是否插入冒号
  "stylusSupremacy.insertSemicolons": false, // 是否插入分号
  "stylusSupremacy.insertBraces": true, // 是否插入大括号
  "stylusSupremacy.insertNewLineAroundImports": true, // import之后是否换行
  "stylusSupremacy.insertNewLineAroundBlocks": true, // 两个选择器中是否换行
  "javascript.updateImportsOnFileMove.enabled": "always",
  "typescript.updateImportsOnFileMove.enabled": "always",
  "js/ts.implicitProjectConfig.experimentalDecorators": true,
  /* 资源管理 */
  "explorer.confirmDelete": false,
  "explorer.confirmDragAndDrop": false,
  // updated 2022-04-01 14:10
  // https://github.com/antfu/vscode-file-nesting-config
  "explorer.fileNesting.enabled": true,
  "explorer.fileNesting.expand": false,
  "explorer.fileNesting.patterns": {
    "*.asax": "$(capture).*.cs, $(capture).*.vb",
    "*.ascx": "$(capture).*.cs, $(capture).*.vb",
    "*.ashx": "$(capture).*.cs, $(capture).*.vb",
    "*.aspx": "$(capture).*.cs, $(capture).*.vb",
    "*.c": "$(capture).h",
    "*.cc": "$(capture).hpp, $(capture).h, $(capture).hxx",
    "*.cpp": "$(capture).hpp, $(capture).h, $(capture).hxx",
    "*.csproj": "*.config, *proj.user, appsettings.*, bundleconfig.json",
    "*.css": "$(capture).css.map, $(capture).*.css",
    "*.cxx": "$(capture).hpp, $(capture).h, $(capture).hxx",
    "*.dart": "$(capture).freezed.dart, $(capture).g.dart",
    "*.ex": "$(capture).html.eex, $(capture).html.heex, $(capture).html.leex",
    "*.java": "$(capture).class",
    "*.js": "$(capture).js.map, $(capture).*.js",
    "*.jsx": "$(capture).js, $(capture).*.jsx",
    "*.master": "$(capture).*.cs, $(capture).*.vb",
    "*.module.ts": "$(capture).resolver.ts, $(capture).controller.ts, $(capture).service.ts",
    "*.pubxml": "$(capture).pubxml.user",
    "*.resx": "$(capture).*.resx, $(capture).designer.cs, $(capture).designer.vb",
    "*.ts": "$(capture).js, $(capture).*.ts",
    "*.tsx": "$(capture).ts, $(capture).*.tsx",
    "*.vbproj": "*.config, *proj.user, appsettings.*, bundleconfig.json",
    "*.vue": "$(capture).*.ts, $(capture).*.js",
    ".clang-tidy": ".clang-format",
    ".env": "*.env, .env.*, .envrc, env.d.ts",
    // ".gitignore": ".gitattributes, .gitmodules, .gitmessage, .mailmap, .git-blame*",
    ".project": ".classpath",
    "BUILD.bazel": "*.bzl, *.bazel, *.bazelrc, bazel.rc, .bazelignore, .bazelproject, WORKSPACE",
    "CMakeLists.txt": "*.cmake, *.cmake.in, .cmake-format.yaml, CMakePresets.json",
    "artisan": "*.env, .babelrc*, .codecov, .cssnanorc*, .env.*, .envrc, .htmlnanorc*, .mocha*, .postcssrc*, .terserrc*, api-extractor.json, ava.config.*, babel.config.*, cssnano.config.*, cypress.json, env.d.ts, htmlnanorc.*, jasmine.*, jest.config.*, jsconfig.*, karma*, playwright.config.*, postcss.config.*, puppeteer.config.*, server.php, svgo.config.*, tailwind.config.*, tsconfig.*, tsdoc.*, unocss.config.*, vitest.config.*, webpack.config.*, webpack.mix.js, windi.config.*",
    "astro.config.*": "*.env, .babelrc*, .codecov, .cssnanorc*, .env.*, .envrc, .htmlnanorc*, .mocha*, .postcssrc*, .terserrc*, api-extractor.json, ava.config.*, babel.config.*, cssnano.config.*, cypress.json, env.d.ts, htmlnanorc.*, jasmine.*, jest.config.*, jsconfig.*, karma*, playwright.config.*, postcss.config.*, puppeteer.config.*, svgo.config.*, tailwind.config.*, tsconfig.*, tsdoc.*, unocss.config.*, vitest.config.*, webpack.config.*, windi.config.*",
    "cargo.toml": ".clippy.toml, .rustfmt.toml, cargo.lock, clippy.toml, cross.toml, rust-toolchain.toml, rustfmt.toml",
    "composer.json": ".php*.cache, composer.lock, phpunit.xml*, psalm*.xml",
    "default.nix": "shell.nix",
    "dockerfile": ".dockerignore, docker-compose.*, dockerfile*",
    "flake.nix": "flake.lock",
    "gatsby-config.*": "*.env, .babelrc*, .codecov, .cssnanorc*, .env.*, .envrc, .htmlnanorc*, .mocha*, .postcssrc*, .terserrc*, api-extractor.json, ava.config.*, babel.config.*, cssnano.config.*, cypress.json, env.d.ts, gatsby-browser.*, gatsby-node.*, gatsby-ssr.*, gatsby-transformer.*, htmlnanorc.*, jasmine.*, jest.config.*, jsconfig.*, karma*, playwright.config.*, postcss.config.*, puppeteer.config.*, svgo.config.*, tailwind.config.*, tsconfig.*, tsdoc.*, unocss.config.*, vitest.config.*, webpack.config.*, windi.config.*",
    "gemfile": ".ruby-version, gemfile.lock",
    "go.mod": ".air*, go.sum",
    "mix.exs": ".credo.exs, .dialyzer_ignore.exs, .formatter.exs, mix.lock",
    "next.config.*": "*.env, .babelrc*, .codecov, .cssnanorc*, .env.*, .envrc, .htmlnanorc*, .mocha*, .postcssrc*, .terserrc*, api-extractor.json, ava.config.*, babel.config.*, cssnano.config.*, cypress.json, env.d.ts, htmlnanorc.*, jasmine.*, jest.config.*, jsconfig.*, karma*, next-env.d.ts, playwright.config.*, postcss.config.*, puppeteer.config.*, svgo.config.*, tailwind.config.*, tsconfig.*, tsdoc.*, unocss.config.*, vitest.config.*, webpack.config.*, windi.config.*",
    "nuxt.config.*": "*.env, .babelrc*, .codecov, .cssnanorc*, .env.*, .envrc, .htmlnanorc*, .mocha*, .postcssrc*, .terserrc*, api-extractor.json, ava.config.*, babel.config.*, cssnano.config.*, cypress.json, env.d.ts, htmlnanorc.*, jasmine.*, jest.config.*, jsconfig.*, karma*, playwright.config.*, postcss.config.*, puppeteer.config.*, svgo.config.*, tailwind.config.*, tsconfig.*, tsdoc.*, unocss.config.*, vitest.config.*, webpack.config.*, windi.config.*",
    "package.json": ".browserslist*, .circleci*, .codecov, .commitlint*, .cz-config.js, .czrc, .editorconfig, .eslint*, .firebase*, .flowconfig, .github*, .gitlab*, .gitpod*, .huskyrc*, .jslint*, .lintstagedrc*, .markdownlint*, .mocha*, .node-version, .nodemon*, .npm*, .nvmrc, .pm2*, .pnp.*, .pnpm*, .prettier*, .babel*, .releaserc*, .sentry*, .stackblitz*, .styleci*, .stylelint*, .tazerc*, .textlint*, .tool-versions, .travis*, .versionrc*, .vscode*, .watchman*, .xo-config*, .yamllint*, .yarnrc*, Procfile, api-extractor.json, apollo.config.*, appveyor*, ava.config.*, azure-pipelines*, bower.json, build.config.*, commitlint*, crowdin*, cypress.json, dangerfile*, dprint.json, firebase.json, grunt*, gulp*, jasmine.*, jenkins*, jest.config.*, jsconfig.*, karma*, lerna*, lint-staged*, nest-cli.*, netlify*, nodemon*, nx.*, package-lock.json, phpcs.xml, playwright.config.*, pm2.*, pnpm*, prettier*, pullapprove*, puppeteer.config.*, pyrightconfig.json, renovate*, rollup.config.*, stylelint*, tsconfig.*, tsdoc.*, tslint*, tsup.config.*, turbo*, typedoc*, vercel*, vetur.config.*, vitest.config.*, webpack.config.*, workspace.json, xo.config.*, yarn*, .gitignore, *.d.ts, .nyc*",
    "pubspec.yaml": ".metadata, .packages, all_lint_rules.yaml, analysis_options.yaml, build.yaml, pubspec.lock",
    "pyproject.toml": ".pdm.toml, pdm.lock, pyproject.toml",
    "quasar.conf.js": "*.env, .babelrc*, .codecov, .cssnanorc*, .env.*, .envrc, .htmlnanorc*, .mocha*, .postcssrc*, .terserrc*, api-extractor.json, ava.config.*, babel.config.*, cssnano.config.*, cypress.json, env.d.ts, htmlnanorc.*, jasmine.*, jest.config.*, jsconfig.*, karma*, playwright.config.*, postcss.config.*, puppeteer.config.*, quasar.extensions.json, svgo.config.*, tailwind.config.*, tsconfig.*, tsdoc.*, unocss.config.*, vitest.config.*, webpack.config.*, windi.config.*",
    "readme": "authors, backers.md, changelog*, citation*, code_of_conduct.md, codeowners, contributing.md, contributors, copying, credits, governance.md, history.md, license*, maintainers, readme*, security.md, sponsors.md",
    "readme.md": "authors, backers.md, changelog*, citation*, code_of_conduct.md, codeowners, contributing.md, contributors, copying, credits, governance.md, history.md, license*, maintainers, readme*, security.md, sponsors.md",
    "readme.rst": "authors, backers.md, changelog*, citation*, code_of_conduct.md, codeowners, contributing.md, contributors, copying, credits, governance.md, history.md, license*, maintainers, readme*, security.md, sponsors.md",
    "readme.txt": "authors, backers.md, changelog*, citation*, code_of_conduct.md, codeowners, contributing.md, contributors, copying, credits, governance.md, history.md, license*, maintainers, readme*, security.md, sponsors.md",
    "remix.config.*": "*.env, .babelrc*, .codecov, .cssnanorc*, .env.*, .envrc, .htmlnanorc*, .mocha*, .postcssrc*, .terserrc*, api-extractor.json, ava.config.*, babel.config.*, cssnano.config.*, cypress.json, env.d.ts, htmlnanorc.*, jasmine.*, jest.config.*, jsconfig.*, karma*, playwright.config.*, postcss.config.*, puppeteer.config.*, remix.*, svgo.config.*, tailwind.config.*, tsconfig.*, tsdoc.*, unocss.config.*, vitest.config.*, webpack.config.*, windi.config.*",
    "rush.json": ".browserslist*, .circleci*, .codecov, .commitlint*, .cz-config.js, .czrc, .editorconfig, .eslint*, .firebase*, .flowconfig, .github*, .gitlab*, .gitpod*, .huskyrc*, .jslint*, .lintstagedrc*, .markdownlint*, .mocha*, .node-version, .nodemon*, .npm*, .nvmrc, .pm2*, .pnp.*, .pnpm*, .prettier*, .releaserc*, .sentry*, .stackblitz*, .styleci*, .stylelint*, .tazerc*, .textlint*, .tool-versions, .travis*, .versionrc*, .vscode*, .watchman*, .xo-config*, .yamllint*, .yarnrc*, Procfile, api-extractor.json, apollo.config.*, appveyor*, ava.config.*, azure-pipelines*, bower.json, build.config.*, commitlint*, crowdin*, cypress.json, dangerfile*, dprint.json, firebase.json, grunt*, gulp*, jasmine.*, jenkins*, jest.config.*, jsconfig.*, karma*, lerna*, lint-staged*, nest-cli.*, netlify*, nodemon*, nx.*, package-lock.json, phpcs.xml, playwright.config.*, pm2.*, pnpm*, prettier*, pullapprove*, puppeteer.config.*, pyrightconfig.json, renovate*, rollup.config.*, stylelint*, tsconfig.*, tsdoc.*, tslint*, tsup.config.*, turbo*, typedoc*, vercel*, vetur.config.*, vitest.config.*, webpack.config.*, workspace.json, xo.config.*, yarn*",
    "shims.d.ts": "*.d.ts",
    "svelte.config.*": "*.env, .babelrc*, .codecov, .cssnanorc*, .env.*, .envrc, .htmlnanorc*, .mocha*, .postcssrc*, .terserrc*, api-extractor.json, ava.config.*, babel.config.*, cssnano.config.*, cypress.json, env.d.ts, htmlnanorc.*, jasmine.*, jest.config.*, jsconfig.*, karma*, mdsvex.config.js, playwright.config.*, postcss.config.*, puppeteer.config.*, svgo.config.*, tailwind.config.*, tsconfig.*, tsdoc.*, unocss.config.*, vitest.config.*, webpack.config.*, windi.config.*",
    "vite.config.*": "*.env, .babelrc*, .codecov, .cssnanorc*, .env.*, .envrc, .htmlnanorc*, .mocha*, .postcssrc*, .terserrc*, api-extractor.json, ava.config.*, babel.config.*, cssnano.config.*, cypress.json, env.d.ts, htmlnanorc.*, jasmine.*, jest.config.*, jsconfig.*, karma*, playwright.config.*, postcss.config.*, puppeteer.config.*, svgo.config.*, tailwind.config.*, tsconfig.*, tsdoc.*, unocss.config.*, vitest.config.*, webpack.config.*, windi.config.*",
    "vue.config.*": "*.env, .babelrc*, .codecov, .cssnanorc*, .env.*, .envrc, .htmlnanorc*, .mocha*, .postcssrc*, .terserrc*, api-extractor.json, ava.config.*, babel.config.*, cssnano.config.*, cypress.json, env.d.ts, htmlnanorc.*, jasmine.*, jest.config.*, jsconfig.*, karma*, playwright.config.*, postcss.config.*, puppeteer.config.*, svgo.config.*, tailwind.config.*, tsconfig.*, tsdoc.*, unocss.config.*, vitest.config.*, webpack.config.*, windi.config.*"
  },
  /* 其他配置 */
  // vscode其他配置
  "security.workspace.trust.untrustedFiles": "open",
  "search.followSymlinks": false,
  "extensions.ignoreRecommendations": false,
  "breadcrumbs.enabled": true,
  // 其他插件配置
  "liveServer.settings.donotShowInfoMsg": true,
  "GitCommitPlugin.ShowEmoji": false,
  "tabnine.experimentalAutoImports": true,
  "picgo.picBed.current": "github",
  "picgo.picBed.github.branch": "main",
  "picgo.picBed.github.repo": "xxx/image-hosting",
  "picgo.picBed.github.path": "img/",
  "picgo.picBed.github.token": "xxxxxx",
  "commentTranslate.source": "Bing",
  "commentTranslate.targetLanguage": "zh-CN",
  "commentTranslate.googleTranslate.tld": "cn",
  "commentTranslate.hover.nearShow": false,
  "commentTranslate.hover.content": false,
  "commentTranslate.hover.variable": true,
  "code-runner.executorMap": {
    "javascript": "node",
    "java": "cd $dir && java $fileName",
    "c": "cd $dir && gcc $fileName -o $fileNameWithoutExt && $dir$fileNameWithoutExt",
    "cpp": "cd $dir && g++ $fileName -o $fileNameWithoutExt && $dir$fileNameWithoutExt",
    "objective-c": "cd $dir && gcc -framework Cocoa $fileName -o $fileNameWithoutExt && $dir$fileNameWithoutExt",
    "php": "php",
    // "python": "python -u",
    "python": "set PYTHONIOENCODING=utf8 && python -u",
    "perl": "perl",
    "perl6": "perl6",
    "ruby": "ruby",
    "go": "go run",
    "lua": "lua",
    "groovy": "groovy",
    "powershell": "powershell -ExecutionPolicy ByPass -File",
    "bat": "cmd /c",
    "shellscript": "bash",
    "fsharp": "fsi",
    "csharp": "scriptcs",
    "vbscript": "cscript //Nologo",
    "typescript": "ts-node",
    "coffeescript": "coffee",
    "scala": "scala",
    "swift": "swift",
    "julia": "julia",
    "crystal": "crystal",
    "ocaml": "ocaml",
    "r": "Rscript",
    "applescript": "osascript",
    "clojure": "lein exec",
    "haxe": "haxe --cwd $dirWithoutTrailingSlash --run $fileNameWithoutExt",
    "rust": "cd $dir && rustc $fileName && $dir$fileNameWithoutExt",
    "racket": "racket",
    "scheme": "csi -script",
    "ahk": "autohotkey",
    "autoit": "autoit3",
    "dart": "dart",
    "pascal": "cd $dir && fpc $fileName && $dir$fileNameWithoutExt",
    "d": "cd $dir && dmd $fileName && $dir$fileNameWithoutExt",
    "haskell": "runhaskell",
    "nim": "nim compile --verbosity:0 --hints:off --run",
    "lisp": "sbcl --script",
    "kit": "kitc --run",
    "v": "v run",
    "sass": "sass --style expanded",
    "scss": "scss --style expanded",
    "less": "cd $dir && lessc $fileName $fileNameWithoutExt.css",
    "FortranFreeForm": "cd $dir && gfortran $fileName -o $fileNameWithoutExt && $dir$fileNameWithoutExt",
    "fortran-modern": "cd $dir && gfortran $fileName -o $fileNameWithoutExt && $dir$fileNameWithoutExt",
    "fortran_fixed-form": "cd $dir && gfortran $fileName -o $fileNameWithoutExt && $dir$fileNameWithoutExt",
    "fortran": "cd $dir && gfortran $fileName -o $fileNameWithoutExt && $dir$fileNameWithoutExt"
  },
  "code-runner.respectShebang": false,
  "turboConsoleLog.addSemicolonInTheEnd": true,
  "turboConsoleLog.includeFileNameAndLineNum": false,
  "turboConsoleLog.delimiterInsideMessage": "",
  "turboConsoleLog.logMessagePrefix": "",
  "turboConsoleLog.quote": "`",
  // 工作台
  "workbench.iconTheme": "material-icon-theme",
  "workbench.startupEditor": "newUntitledFile",
  "workbench.editorAssociations": {
    "*.ipynb": "jupyter.notebook.ipynb",
    "*.class": "default"
  },
  // 终端
  "terminal.integrated.profiles.windows": {
    "PowerShell": {
      "source": "PowerShell",
      "icon": "terminal-powershell"
    },
    "Command Prompt": {
      "path": [
        "${env:windir}\\Sysnative\\cmd.exe",
        "${env:windir}\\System32\\cmd.exe"
      ],
      "args": [],
      "icon": "terminal-cmd"
    },
    "Git-Bash": {
      "path": "D:\\work\\Git\\bin\\bash.exe",
      "args": []
    }
  },
  "terminal.integrated.defaultProfile.windows": "PowerShell"
}
```

### 代码片段

#### javascript

```
{
  // Place your snippets for javascript here. Each snippet is defined under a snippet name and has a prefix, body and
  // description. The prefix is what is used to trigger the snippet and the body will be expanded and inserted. Possible variables are:
  // $1, $2 for tab stops, $0 for the final cursor position, and ${1:label}, ${2:another} for placeholders. Placeholders with the
  // same ids are connected.
  "anonymous function": {
    "prefix": "()=>{}",
    "body": [
      "() => {",
      "  ${2:}",
      "}",
    ],
    "description": "Anonymous Function"
  },
  "for decline": {
    "prefix": "for-",
    "body": [
      "for (let index = array.length - 1; index >= 0; index--) {",
      "  const element = array[index];",
      "}"
    ],
    "description": "for decline"
  },
  "array map": {
    "prefix": "map",
    "body": [
      "array.map(ele => {",
      "  ${2}",
      "})"
    ],
    "description": "map"
  },
  "promise": {
    "prefix": "promise",
    "body": [
      "new Promise((resolve, reject) => {",
      "  ${2}",
      "})"
    ],
    "description": "promise"
  },
  "requireVar": {
    "prefix": "require",
    "body": [
      "const {} = require(\"${2}\")"
    ],
    "description": "require"
  },
  "requireModule": {
    "prefix": "require",
    "body": [
      "const moduleName = require(\"${2}\")"
    ],
    "description": "require"
  }
}
```

### 快捷键

#### 文档操作

##### 通用文档操作

|                按键                | 类别     | 作用                          | 备注                                        |
| :--------------------------------: | -------- | ----------------------------- | ------------------------------------------- |
|           `Shift+Alt+F`            | 文档操作 | 格式化文档                    |                                             |
|              `Ctrl+F`              | 文档操作 | 文档查找                      | 当使用正则匹配时，使用 `Alt+Enter` 选中匹配 |
|           `Ctrl+Shift+F`           | 文档操作 | 项目级文档查找                |                                             |
|              `Ctrl+H`              | 文档操作 | 文档替換                      |                                             |
|           `Ctrl+Shift+H`           | 文档操作 | 项目级文档替換                |                                             |
|              `Ctrl+Z`              | 文档操作 | 撤销更改内容                  |                                             |
|  默认: `Ctrl+Y` / `Ctrl+Shift+Z`   | 文档操作 | 恢复更改内容                  |                                             |
|                `F2`                | 文档操作 | 重命名选中内容/重命名文档名称 |                                             |
|             `Ctrl+F2`              | 文档操作 | 选中所有匹配项                |                                             |
|              `Ctrl+/`              | 文档操作 | 行注释                        |                                             |
|           `Ctrl+Shift+/`           | 文档操作 | 选中内容块注释                |                                             |
|             `Alt+F12`              | 文档操作 | 速览定义                      |                                             |
|  默认: `Ctrl+I` / 自定义: `Alt+/`  | 文档操作 | 显示文档建议，代码提示        |                                             |
|           `Shift+Alt+O`            | 文档操作 | 整理 import 语句              |                                             |
|              `Ctrl+S`              | 文档操作 | 保存                          |                                             |
|           `Ctrl+Shift+S`           | 文档操作 | 另存为                        |                                             |
|              `Ctrl+W`              | 文档操作 | 关闭文档                      |                                             |
|           `Ctrl+Shift+T`           | 文档操作 | 打开已关闭的文档              |                                             |
| 默认: `Ctrl+Tab` / 自定义: `Alt+Q` | 文档操作 | 文档来回切换                  |                                             |
|              `Ctrl+P`              | 文档操作 | 根据搜索内容进行文档切换      |                                             |
|              `Ctrl+A`              | 文档操作 | 选中整个文档                  |                                             |
|              `Ctrl+C`              | 文档操作 | 复制                          |                                             |
|              `Ctrl+V`              | 文档操作 | 粘贴                          |                                             |
|              `Ctrl+X`              | 文档操作 | 剪切                          |                                             |
|              `delete`              | 文档操作 | 删除文档                      |                                             |
|           `Shift+delete`           | 文档操作 | 永久删除文档，不进回收站      |                                             |
|           `Ctrl+Shift+V`           | 文档操作 | 打开剪切板                    | 由 `Clipboard History` 提供                 |
|          `Ctrl+Alt+Space`          | 文档操作 | 去除文档尾部空格              |                                             |

##### 文档行操作

|                         按键                         | 类别   | 作用                | 备注 |
| :--------------------------------------------------: | ------ | ------------------- | ---- |
|                    `Alt+UpArrow`                     | 行操作 | 上移当前行          |      |
|                   `Alt+DownArrow`                    | 行操作 | 下移当前行          |      |
|                 `Shift+Alt+UpArrow`                  | 行操作 | 向上复制一行        |      |
| 默认: `Shift+Alt+DownArrow` / 自定义: `Ctrl+Shift+C` | 行操作 | 向下复制一行        |      |
|                  `Ctrl+Shift+Enter`                  | 行操作 | 向上添加空行        |      |
|                     `Ctrl+Enter`                     | 行操作 | 向下添加空行        |      |
|                       `Ctrl+[`                       | 行操作 | 当前行向左 tab 移动 |      |
|                       `Ctrl+]`                       | 行操作 | 当前行向右 tab 移动 |      |
|                     `Ctrl+Alt+J`                     | 行操作 | 合并下一行为一行    |      |
|                `Ctrl+Shift+Backspace`                | 行操作 | 删除当前行          |      |

##### 文档折叠操作

|      按键       | 类别          | 作用                                 | 备注 |
| :-------------: | ------------- | ------------------------------------ | ---- |
| `Ctrl+Shift+[`  | 展开/折叠操作 | 折叠代码块                           |      |
| `Ctrl+Shift+]`  | 展开/折叠操作 | 展开代码块                           |      |
| `Ctrl+K Ctrl+L` | 展开/折叠操作 | 折叠代码块                           |      |
| `Ctrl+K Ctrl+J` | 展开/折叠操作 | 展开所有代码块                       |      |
| `Ctrl+K Ctrl+1` | 展开/折叠操作 | 折叠代码块，保留一层代码块，最高级别 |      |
| `Ctrl+K Ctrl+2` | 展开/折叠操作 | 折叠代码块，保留两层代码块           |      |
| `Ctrl+K Ctrl+3` | 展开/折叠操作 | 折叠代码块，保留三层代码块，以此类推 |      |

##### 文档光标操作

|             按键              | 类别     | 作用                        | 备注                                                     |
| :---------------------------: | -------- | --------------------------- | -------------------------------------------------------- |
|        `Alt+左键点击`         | 光标操作 | 创建一个光标，可多次创建    |                                                          |
|        `Alt+左键拖拽`         | 光标操作 | 创建一个选区，可多次创建    |                                                          |
|     `Shift+Alt+左键点击`      | 光标操作 | 垂直创建多个光标            |                                                          |
|           `Ctrl+U`            | 光标操作 | 光标撤销                    |                                                          |
|       `Shift+左键点击`        | 光标操作 | 光标间块选中                |                                                          |
|      `Shift+Rightarrow`       | 光标操作 | 光标向右选中一格            |                                                          |
|       `Shift+Leftarrow`       | 光标操作 | 光标向左选中一格            |                                                          |
|         `Shift+home`          | 光标操作 | 光标从当前光标向左选中行    |                                                          |
|          `Shift+end`          | 光标操作 | 光标从当前光标向右选中行    |                                                          |
|       `Ctrl+Rightarrow`       | 光标操作 | 光标向右移动一个词语        | 汉语默认是不支持词语的，`CJK Word Handler`可支持词语断言 |
|       `Ctrl+Leftarrow`        | 光标操作 | 光标向左移动一个词语        | 汉语默认是不支持词语的，`CJK Word Handler`可支持词语断言 |
|          `Ctrl+home`          | 光标操作 | 光标移动当前光标到最上面    |                                                          |
|          `Ctrl+end`           | 光标操作 | 光标移动当前光标到最下面    |                                                          |
|    `Ctrl+Shift+Rightarrow`    | 光标操作 | 光标向右选中词语            |                                                          |
|    `Ctrl+Shift+Leftarrow`     | 光标操作 | 光标向左选中词语            |                                                          |
|       `Ctrl+Shift+home`       | 光标操作 | 光标从当前光标向最上面选中  |                                                          |
|       `Ctrl+Shift+end`        | 光标操作 | 光标从当前光标向最下面选中  |                                                          |
| 默认: `Ctrl+左键点击` / `F12` | 光标操作 | 光标切换到定义位置/调用位置 |                                                          |

##### 前端文档操作

|     按键     | 类别          | 作用                                       | 备注                        |
| :----------: | ------------- | ------------------------------------------ | --------------------------- |
| `Ctrl+Alt+L` | 前端文档操作  | 根据选中内容在下方快速生成 console.log     | 由 `Turbo Console Log` 提供 |
| `Ctrl+Alt+P` | 前端文档操作  | 根据选中内容在上方快速生成 console.log     | 由 `Wrap Console Log` 提供  |
| `Ctrl+Alt+B` | 前端文档操作  | 根据复制过的 json 内容生成 ts 的 interface | 由 `json2interface` 提供    |
| `Ctrl+Alt+U` | json 文档操作 | 压缩 json                                  | 由 `vscode-json` 提供       |
| `Ctrl+Alt+'` | json 文档操作 | 转义 json                                  | 由 `vscode-json` 提供       |
| `Ctrl+Alt+;` | json 文档操作 | 解义 json                                  | 由 `vscode-json` 提供       |

#### 编辑器操作

|              按键               | 类别       | 作用                           | 备注             |
| :-----------------------------: | ---------- | ------------------------------ | ---------------- |
|         `Ctrl+Shift+P`          | 编辑器操作 | 打开命令中心                   |                  |
| 默认: `Alt+F4` / `Ctrl+Shift+W` | 编辑器操作 | 关闭 vscode                    |                  |
|          `` Ctrl+` ``           | 编辑器操作 | 打开/关闭终端视图              |                  |
|       `` Ctrl+Shift+` ``        | 编辑器操作 | 新建终端                       |                  |
|            `Ctrl+,`             | 编辑器操作 | 打开视图化设置                 |                  |
|         `Ctrl+Shift+,`          | 编辑器操作 | 打开 json 化设置               |                  |
|          `Ctrl+Alt+,`           | 编辑器操作 | 打开快捷键设置                 |                  |
|            `Ctrl+Q`             | 编辑器操作 | 选择打开侧边栏图标内容         |                  |
|          `Shift+Alt+0`          | 编辑器操作 | 切换垂直/水平布局              | 需要有两个区域组 |
|          `Ctrl+Pageup`          | 编辑器操作 | 打开上一个编辑器               |                  |
|         `Ctrl+Pagedown`         | 编辑器操作 | 打开下一个编辑器               |                  |
|       `Ctrl+Shift+Pageup`       | 编辑器操作 | 仅在该区域组中打开上一个编辑器 |                  |
|      `Ctrl+Shift+Pagedown`      | 编辑器操作 | 仅在该区域组中打开下一个编辑器 |                  |
|            `Ctrl++`             | 编辑器操作 | 视图放大                       |                  |
|            `Ctrl+-`             | 编辑器操作 | 视图缩小                       |                  |
|             `Alt+Z`             | 编辑器操作 | 是否超长自动换行，仅修改显示   |                  |

#### 其他操作

|                   按键                    | 类别     | 作用                                                 | 备注                  |
| :---------------------------------------: | -------- | ---------------------------------------------------- | --------------------- |
|                   `F5`                    | 服务操作 | 启动 launch 服务/重启 launch 服务                    | 重启 F5 是自定义设置  |
|                   `F10`                   | 服务操作 | debugger 下一步                                      |                       |
|                 `Ctrl+R`                  | 服务操作 | 运行当前文件                                         | 由`Code Runner` 提供  |
|                 `Ctrl+C`                  | 服务操作 | 停止运行                                             | 需要在输出/终端中聚焦 |
| 默认: `Ctrl+Alt+U` / 自定义: `Ctrl+Alt+C` | md 操作  | 从剪切板上传图片到已设定的图床并生成 md 形式图片链接 | 由 `PicGo` 提供       |
|            默认: `Ctrl+Alt+E`             | md 操作  | 选中图片并上传到已设定的图床并生成 md 形式图片链接   | 由 `PicGo` 提供       |
|               `Ctrl+Alt+V`                | md 操作  | 从剪切板复制图片到本地项目并生成 md 形式图片链接     | 由 `Paste Image` 提供 |

### 其他配置

- 同步配置
  - 使用 vscode 内置同步，可同步扩展，快捷键，ui 等，因此可以卸载`sync setting`
- 视图配置
  - 可以隐藏不想显示的图标等
  - 自定义布局，我这边会开启辅助侧边栏
- 工作区配置
  - 部分设置可以设置在工作区的 setting.json，例如扩展禁用/启用设置，视图设置等等

## all in vscode

在具体语言中，如 java，python，js 和 idea，pycharm 比较 vscode 是否适合开发；比如 webstorm，sublime 等，不比较软件好坏

个人还是偏向 all in vscode，目前推荐 python，前端在 vscode 中开发；java 在 idea 中开发

### 比较

- Microsoft
  - vscode
    - 适合前端，python 也还 ok
  - vs2017
    - 适合 c 语言系列
    - 未使用
- JetBrains
  - idea
    - 适合 java
    - 多设备同步不太友好
    - 插件下载慢，插件少
    - 设置是悬浮打开，一次只能打开一个，而且不能做其他动作，不太好用
  - pycharm
    - 适合 python
    - 未使用

### 好处

- 前端主力工具，体验雀食好
  - 扩展多
  - 多设备同步
  - 界面设计友好使用舒适
  - 工作区概念使用舒适
- 习惯得以保留，减少学习成本
  - 同一套快捷键，ui，配置
  - 工作习惯有时候比工作软件更重要

### 坏处

- 所有语言扩展都要安装
  - 影响:
    - 导致扩展列表臃肿，影响启动性能和原本的配置环境
    - 扩展按键冲突
    - 代码提示混乱
    - 需要自己手动在不同的工作区禁用不同的扩展
- 扩展杂
  - 影响:
    - 不知道到底要安装那个扩展
    - 不维护且有问题的扩展没有及时清理
- 无法与专门为一门语言而做的 ide 体验好
  - java 影响：
    - java 中修改包名，idea 可以做到关联命令修改，全文修改
    - 有专门适用于 java 开发的界面和设计， 如：maven 界面等

### vscode 未来功能

- 支持多环境以支持多编程语言的环境切换和绑定
  - 暂时方法，用工作区来手动来实现，非通用扩展全局禁用，具体项目工作区启用
