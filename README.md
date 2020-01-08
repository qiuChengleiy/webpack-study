# webpack-study
webpack学习系列笔记

#### 一些依赖包

rimraf：以包的形式包装rm -rf命令，就是用来删除文件和文件夹的，不管文件夹是否为空，都可以删除。

cross-env: 这个包能够提供一个设置环境变量的scripts，让你能够以unix方式设置环境变量，然后在windows上也能兼容运行。----环境兼容

webpack-chain： 尝试通过提供可链式或顺流式的 API 创建和修改 webpack 配置。API 的 Key 部分可以由用户指定的名称引用，这有助于跨项目修改配置方式的标准化。

ora： 是一个在终端显示输出中显示一些动态内容的优终端显示。改变了以往命令行页面简单枯燥的展示形象。 ora是一个npm包，它的api很少也很容易上手，很适合终端交互展示。

chalk： 包的作用是修改控制台中字符串的样式，包括：字体样式(加粗、隐藏等) 字体颜色 背景颜色

git cz && conventional-changelog : package:husky : 规范你的 commit message 并且根据 commit 自动生成 CHANGELOG.md

