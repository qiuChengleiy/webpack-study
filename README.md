# webpack-study
webpack学习系列笔记

#### 一些依赖包

rimraf：以包的形式包装rm -rf命令，就是用来删除文件和文件夹的，不管文件夹是否为空，都可以删除。

cross-env: 这个包能够提供一个设置环境变量的scripts，让你能够以unix方式设置环境变量，然后在windows上也能兼容运行。----环境兼容

webpack-chain： 尝试通过提供可链式或顺流式的 API 创建和修改 webpack 配置。API 的 Key 部分可以由用户指定的名称引用，这有助于跨项目修改配置方式的标准化。

ora： 是一个在终端显示输出中显示一些动态内容的优终端显示。改变了以往命令行页面简单枯燥的展示形象。 ora是一个npm包，它的api很少也很容易上手，很适合终端交互展示。

chalk： 包的作用是修改控制台中字符串的样式，包括：字体样式(加粗、隐藏等) 字体颜色 背景颜色

git cz && conventional-changelog : package:husky : 规范你的 commit message 并且根据 commit 自动生成 CHANGELOG.md

killport 3000 杀掉3000端口


### 笔记备注

- cammander 

```js
 // console.log(options) 
 // build comannd options
    //return
    // wp build test -d    { dll: true } -d表示可选性为true , 后边的 - 要在option可见范围内 --  wp build test -r    { report: true }
    // wp build -r -d -w ----------> { report: true, dll: true, worker: true }



//console.log(process.argv)
// [ '/Users/qiuchenglei/.nvm/versions/node/v10.16.0/bin/node',
//   '/Users/qiuchenglei/github/webpack-study/bin/wp.js',
//   'wp',
//   '-V' ]

// wp build
// console.log(name,cmd)
// undefined Command {
//     commands: [],
//     options:
//      [ Option {
//          flags: '-r --report',
//          required: false,
//          optional: false,
//          mandatory: false,
//          negate: false,
//          short: '-r',
//          long: '--report',
//          description: 'Package analysis report' },
//        Option {
//          flags: '-d, --dll',
//          required: false,
//          optional: false,
//          mandatory: false,
//          negate: false,
//          short: '-d',
//          long: '--dll',
//          description: 'Merge difference packets' } ],
//  ............


// wp build test
// console.log(name,cmd)
// test Command {
//     commands: [],
//     options:
//      [ Option {
//          flags: '-r --report',
//          required: false,
//          optional: false,
//          mandatory: false,
//          negate: false,
//          short: '-r',
//          long: '--report',
//          description: 'Package analysis report' },
//        Option {
//          flags: '-d, --dll',
//          required: false,
//          optional: false,
//          mandatory: false,
//          negate: false,
//          short: '-d',
//          long: '--dll',
//          description: 'Merge difference packets' } ],
//  ............

```


- build/base

```js
// 获取文件夹config下的文件名
// console.log(_.split('/').pop().replace('.js',''))
// HtmlWebpackPlugin
// MiniCssExtractPlugin
// base
// css
```
- require.resolve

```js
// require.resolve ---  console.log(require.resolve('babel-loader')) // /Users/qiuchenglei/github/webpack-study/node_modules/babel-loader/lib/index.js
// resolve ---- console.log(resolve('babel-loader')) // /Users/qiuchenglei/github/webpack-study/babel-loader
```

- html-webpack-plugin

```js
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = (config, resolve, options) => {  
    return () => {
      Object.keys(options.pages).forEach((item, k) => {
         // 多页面配置 --- 相当于new 多个 HtmlWebpackPlugin
        config.plugin(`${item}-html`)
          .use(HtmlWebpackPlugin, [{
              favicon: options.pages[item].favicon,
              // 使用自定义的模版接收 HtmlWebpackPlugin 中定义的 title 需要使用 <%= htmlWebpackPlugin.options.title %>
              title: options.pages[item].title,
             // mete: {viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'},
              base: options.pages[item].base,
              template: options.pages[item].template,
              filename: `${options.pages[item].filename}`,
              chunks: [`${item}`, `runtime${item}`],  // 输出的html文件引入的入口chunk --- 配置引入对应页面的资源
            // 如果为真，则向所有包含的 js 和 CSS 文件附加一个惟一的 webpack 编译散列。
            // 这对于更新每次的缓存文件名称非常有用  
           // hash: true, 
            // 设置 js css 文件的缓存，当文件没有发生变化时， 是否设置使用缓存
              cache: true,
            // 当文件发生错误时， 是否将错误显示在页面
            // showErrors: true,
            // 当设置为 true 的时候，将会讲 <link> 标签设置为符合 xhtml 规范的自闭合形式
            //xhtml: true,
            // 设置静态资源压缩情况  
               minify: options.env !== 'dev',
            // minify: {
              //   removeAttributeQuotes:true,
              //   removeComments: true,
              //   collapseWhitespace: true,
              //   removeScriptTypeAttributes:true,
              //   removeStyleLinkTypeAttributes:true
              // }
              // 制定 webpack 打包的 js css 静态资源插入到 html 的位置， 
              // 为 true 或者 body 时， 将会把 js 文件放到 body 的底部， 为 head 时，
              //  将 js 脚本放到 head 元素中。
              inject: 'body',
          }])
        })
    }
}
```

- devServer.js

```js
/**
 * wp-7.js 
 * webpack config demo
 * devServer 本地开发环境配置
 */

module.exports = (config, resolve, options) => {
    const devMode = options.env === 'dev'
  
    return () => {
        if(devMode) {
            const publicPath = options.publicDevPath
            const contentBase = options.assetsPath // 静态资源位置
            const allowedHosts = ['localhost'] // 允许请求的hosts
            const _proxy = {
                '/test/*':{
                    target: 'https://www.baidu.com',
                    secure: true,
                    changeOrigin: true
                }
            }

            // 路由配置
            const historyApiFallback = {
                rewrites: [],
                disableDotRule: true
            }
            
            Object.keys(options.pages).forEach(item => {
                historyApiFallback.rewrites.push({ from: RegExp('^'+ `/${item}/` +'$'), to: `${publicPath}/${item}.html` })
            })
            
            // 开启本地webpack服务
            config.devServer
            .quiet(true) // 除了初始启动信息之外的任何内容都不会被打印到控制台。这也意味着来自 webpack 的错误或警告在控制台不可见。
            .stats({ chunks:false })
            .hot(true)
            .overlay(true) // 开启：浏览器页面上显示错误
            .open(true) // 是否： 自动打开浏览器
            .inline(true) // 监视页面改动
            .stats("errors-only") // 表示只打印错误：
            .proxy(_proxy)  // 代理服务器配置项
            .allowedHosts(allowedHosts)
            .https(false)
            .compress(false)
            .disableHostCheck(true)
            .publicPath(publicPath)
            .contentBase(contentBase) // contentBase表示的是告诉服务器从哪里提供内容。（只有想提供静态文件时才需要）
            .clientLogLevel('none')
            .historyApiFallback(historyApiFallback) // 路由配置  ----- 多页应用
         }
    }
  }

```