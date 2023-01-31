# CodeMirror

CodeMirror 是 Web 的代码编辑器组件。它可以在网站中用于实现一个支持多种编辑功能的文本输入字段，并且具有丰富的编程接口以允许进一步扩展。目前有 V5 版本和 V6 版本，V5 和 V6 区别还比较大。

## 使用

### angular + V5

- 安装依赖
  - 这里要注意 @ctrl/ngx-codemirror 和 codemirror 的版本关联
  - @ctrl/ngx-codemirror@5.1.1
  - codemirror@5.65.11
  - jshint
  - @types/codemirror
  - @types/jshint
- 引入样式
  - 在 styles.less 引入样式
    ```less
    // 引入codemirror样式
    @import "../node_modules/codemirror/lib/codemirror";
    @import "../node_modules/codemirror/theme/material-darker";
    @import "../node_modules/codemirror/theme/panda-syntax";
    @import "../node_modules/codemirror/addon/hint/show-hint";
    @import "../node_modules/codemirror/addon/lint/lint";
    @import "../node_modules/codemirror/addon/dialog/dialog";
    @import "../node_modules/codemirror/addon/search/matchesonscrollbar";
    @import "../node_modules/codemirror/addon/scroll/simplescrollbars";
    .cm-matchhighlight {
      background: #645124 !important;
    }
    ```
- 组件元素
  - 在 codemirror.component.html 引入样式
    ```html
    <ngx-codemirror
      #codeMirror
      [(ngModel)]="code"
      [options]="editorOptions"
    ></ngx-codemirror>
    ```
- 引入核心文件
  - 在 codemirror.module.ts 引入样式
    ```typescript
    import { CommonModule } from "@angular/common";
    import { FormsModule } from "@angular/forms";
    import { CodemirrorModule } from "@ctrl/ngx-codemirror";
    import { JSHINT } from "jshint/dist/jshint";
    (<any>window).JSHINT = JSHINT;
    // 引入codemirror配置文件
    import "codemirror/mode/javascript/javascript";
    import "codemirror/addon/edit/closebrackets";
    import "codemirror/addon/edit/matchbrackets";
    import "codemirror/addon/hint/show-hint";
    import "codemirror/addon/hint/javascript-hint";
    import "codemirror/addon/lint/lint";
    import "codemirror/addon/lint/javascript-lint";
    import "codemirror/addon/selection/active-line";
    import "codemirror/addon/dialog/dialog";
    import "codemirror/addon/search/search";
    import "codemirror/addon/search/searchcursor";
    import "codemirror/addon/search/jump-to-line";
    import "codemirror/addon/search/match-highlighter";
    import "codemirror/addon/search/matchesonscrollbar";
    import "codemirror/addon/scroll/annotatescrollbar";
    import "codemirror/addon/scroll/simplescrollbars";
    ```
- 逻辑
  - 核心配置
    ```javascript
    {
      mode: 'javascript', // 语言模型
      // theme: 'default', // 默认主题
      // theme: 'material-darker', // 显示的主题，前提需要在styles.less中进行引入才可以
      theme: 'panda-syntax',
      indentUnit: 2,
      tabSize: 2,
      lineNumbers: true,
      extraKeys: { 'Alt-/': 'autocomplete' },
      /** 下方配置都需要引入配置文件 */
      // 自动补齐引号
      autoCloseBrackets: true,
      matchBrackets: true,
      // 高亮行
      styleActiveLine: true,
      // 查找
      search: { bottom: true },
      highlightSelectionMatches: true,
      // 增加代码提示的配置
      showHint: true,
      hintOptions: {
        completeSingle: false,
        alignWithWord: false,
        hint: CodeMirror.hint.javascript,
      },
      // 格式化检测 需要搭配hint和jshint
      lint: CodeMirror.lint.javascript,
      gutters: ['CodeMirror-lint-markers'],
    }
    ```
  - 获取实例以及设置高度
    ```typescript
      ngAfterViewInit() {
        const timer = setInterval(() => {
          if (this.codeMirrorCmpt.codeMirror !== undefined) {
            clearInterval(timer);
            this.codeMirrorCmpt.codeMirror.setSize('100%', '100%');
        }, 500);
      }
    ```

### html + V5

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>codemirror</title>
    <!-- 核心库文件的引入 -->
    <link href="./codemirror-5.65.11/lib/codemirror.css" rel="stylesheet" />
    <!-- 主题 -->
    <link
      href="./codemirror-5.65.11/theme/material-darker.css"
      rel="stylesheet"
    />
    <link href="./codemirror-5.65.11/theme/panda-syntax.css" rel="stylesheet" />
    <!-- 代码提示 -->
    <link
      href="./codemirror-5.65.11/addon/hint/show-hint.css"
      rel="stylesheet"
    />
    <!-- 语法检查 -->
    <link href="./codemirror-5.65.11/addon/lint/lint.css" rel="stylesheet" />
    <!-- codemirror对话框 -->
    <link
      href="./codemirror-5.65.11/addon/dialog/dialog.css"
      rel="stylesheet"
    />
    <!-- 搜索 -->
    <link
      href="./codemirror-5.65.11/addon/search/matchesonscrollbar.css"
      rel="stylesheet"
    />
    <!-- 滚动 -->
    <link
      href="./codemirror-5.65.11/addon/scroll/simplescrollbars.css"
      rel="stylesheet"
    />
    <!-- 需要引入jshint -->
    <script src="./jshint.js"></script>
    <!-- 核心库文件的引入 -->
    <script src="./codemirror-5.65.11/lib/codemirror.js"></script>
    <!-- javascript语言模式 -->
    <script src="./codemirror-5.65.11/mode/javascript/javascript.js"></script>
    <!-- 自动补全括号引号 -->
    <script src="./codemirror-5.65.11/addon/edit/closebrackets.js"></script>
    <!-- 匹配括号高亮 -->
    <script src="./codemirror-5.65.11/addon/edit/matchbrackets.js"></script>
    <!-- 高亮选中行 -->
    <script src="./codemirror-5.65.11/addon/selection/active-line.js"></script>
    <!-- show-hint 和 javascript-hint 代码提示 -->
    <script src="./codemirror-5.65.11/addon/hint/show-hint.js"></script>
    <script src="./codemirror-5.65.11/addon/hint/javascript-hint.js"></script>
    <!-- 语法检查，需要引入jshint -->
    <script src="./codemirror-5.65.11/addon/lint/lint.js"></script>
    <script src="./codemirror-5.65.11/addon/lint/javascript-lint.js"></script>
    <!-- codemirror对话框 -->
    <script src="./codemirror-5.65.11/addon/dialog/dialog.js"></script>
    <!-- 搜索 -->
    <script src="./codemirror-5.65.11/addon/search/search.js"></script>
    <script src="./codemirror-5.65.11/addon/search/searchcursor.js"></script>
    <script src="./codemirror-5.65.11/addon/search/jump-to-line.js"></script>
    <script src="./codemirror-5.65.11/addon/search/match-highlighter.js"></script>
    <script src="./codemirror-5.65.11/addon/search/matchesonscrollbar.js"></script>
    <!-- 滚动 -->
    <script src="./codemirror-5.65.11/addon/scroll/annotatescrollbar.js"></script>
    <script src="./codemirror-5.65.11/addon/scroll/simplescrollbars.js"></script>
    <style>
      html,
      body {
        margin: 0;
        padding: 0;
      }

      .cm-matchhighlight {
        background: #645124 !important;
      }

      .button-ctnr {
        position: absolute;
        top: 10px;
        right: 10px;
        z-index: 1;
      }

      .button-ctnr .button-cont > button {
        margin-left: 10px;
      }
    </style>
  </head>

  <body>
    <div class="button-ctnr">
      <div class="button-cont">
        <button type="button" id="copy">复制</button>
        <button type="button" id="download">下载</button>
      </div>
    </div>
    <textarea name="name" id="editor3" cols="30" rows="10"></textarea>
  </body>
  <script>
    var editorBox3 = document.getElementById("editor3");
    var option = {
      mode: "javascript",
      // theme: 'default', // 默认主题
      // theme: 'material-darker', // 显示的主题是什么，前提需要在styles.less中进行引入才可以
      theme: "panda-syntax",
      indentUnit: 2,
      tabSize: 2,
      lineNumbers: true,
      extraKeys: { "Alt-/": "autocomplete" },
      /** 下方配置都需要引入核心文件 */
      // 自动补齐引号
      autoCloseBrackets: true,
      matchBrackets: true,
      // 高亮行
      styleActiveLine: true,
      // 查找
      search: { bottom: true },
      highlightSelectionMatches: true,
      // 增加代码提示的配置
      showHint: true,
      hintOptions: {
        completeSingle: false,
        alignWithWord: false,
        hint: CodeMirror.hint.javascript,
      },
      // 格式化检测 需要搭配hint和jshint
      lint: CodeMirror.lint.javascript,
      gutters: ["CodeMirror-lint-markers"],
    };
    // 还可以使用 CodeMirror 提供的 fromTextarea 方法
    // 此时 Dom元素需要为 textarea 否则会报错
    // 此时生成的编辑器默认值为 html 中 textarea的值 function abc() {}
    var editor3 = CodeMirror.fromTextArea(editorBox3, option);
    editor3.setValue(`/**
 * Alt + / 开启提示
 * Alt + G 跳转到某行
 * Ctrl + F 查找字符
 */
`);
    editor3.setSize("100vw", "100vh");
    // editor3.on("keypress", instance => {
    //   // 在键盘事件的时候触发showHint显示自动完成提示框
    //   instance.showHint();
    // });
    function getCode() {
      let str = editor3.getValue();
      str = str.replace(/^\/\*\*[\s\S]*?\*\/\n/m, "");
      return str;
    }
  </script>
  <script>
    var downloadButton = document.querySelector("#download");

    // 下载文件方法
    var funDownload = function (content, filename) {
      var eleLink = document.createElement("a");
      eleLink.download = filename || "codemirror.js";
      eleLink.style.display = "none";
      // 字符内容转变成blob地址
      var blob = new Blob([content]);
      eleLink.href = URL.createObjectURL(blob);
      // 触发点击
      document.body.appendChild(eleLink);
      eleLink.click();
      // 然后移除
      document.body.removeChild(eleLink);
    };

    if ("download" in document.createElement("a")) {
      downloadButton.addEventListener("click", function () {
        funDownload(getCode());
      });
    } else {
      downloadButton.onclick = function () {
        alert("浏览器不支持");
      };
    }
  </script>
  <script>
    var copyButton = document.querySelector("#copy");
    copyButton.addEventListener("click", function () {
      navigator.clipboard.writeText(getCode()).then(
        function () {
          alert("复制成功");
        },
        function (err) {
          console.error("Async: Could not copy text: ", err);
          alert("复制失败");
        }
      );
    });
  </script>
</html>
```
