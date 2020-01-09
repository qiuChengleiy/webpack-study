/**
 * wp-2.js 
 * webpack config demo
 * 开发环境
 */

 module.exports = function(options) {
    const config = require("./base")(options); // 编译基础配置 配置可选项
    const webpack = require("webpack");
    const path = require('path')
    const chalk = require("chalk");
    const WebpackDevServer = require("webpack-dev-server");
    const port = options.port
    const publicPath = options.publicDevPath
    const contentBase = options.assetsPath // 静态资源位置
    const _proxy = {
        '/test/*':{
            target: 'https://www.baidu.com',
            secure: true,
            changeOrigin: true
        }
    }
    const allowedHosts = [   // 允许请求的hosts
        'host.com',
        'subdomain.host.com',
        'subdomain2.host.com',
        'host2.com'
    ]
    const historyApiFallback = {
        rewrites: [
          { from: /^\/index/, to: '/index.html' },
          { from: /^\/index2/, to: '/index2.html' },
        ],
        disableDotRule: true
    }
    
    // 开启本地webpack服务
    config.devServer
    .quiet(true)
    .stats({ chunks:false })
    .hot(true)
    .overlay(true) // 开启：浏览器页面上显示错误
    .open(false) // 是否： 自动打开浏览器
    .inline(true) // 监视页面改动
    //.stats("errors-only") // 表示只打印错误：
    // .proxy(_proxy)  // 代理服务器配置项
    //.allowedHosts(allowedHosts)
    .https(false)
    .compress(false)
    .disableHostCheck(true)
    .publicPath(publicPath)
   // .contentBase(contentBase) // contentBase表示的是告诉服务器从哪里提供内容。（只有想提供静态文件时才需要）
    .clientLogLevel('none')
    //.historyApiFallback(historyApiFallback) // 路由配置  ----- 多页应用
    
    // 编译配置
    const compiler = webpack(config.toConfig())
    // 拿到devserver参数
    const chainDevServer = compiler.options.devServer
    const server = new WebpackDevServer(
        compiler,
        Object.assign(chainDevServer, {})
    )
    
    // 监听信号事件 - http://nodejs.cn/api/process.html#process_warning_using_uncaughtexception_correctly
    // 'SIGTERM' 和 'SIGINT' 在非 Windows 平台绑定了默认的监听器，这样进程以代码 128 + signal number 结束之前，可以重置终端模式。
    //  如果这两个事件任意一个绑定了新的监听器，原有默认的行为会被移除（Node.js 不会结束）。
    const SIGNALS = ['SIGINT', 'SIGTERN']
    SIGNALS.map(signal => {
        process.on(signal, () => {
            server.close(() => {
                process.exit(0)
            })
        })
    });
    
    server.listen(port)
    
    new Promise(() => {
        // 监听： https://webpack.docschina.org/api/compiler-hooks/
        compiler.hooks.done.tap('dev', stats => {
            const empty = "    "
            const common = `App running at:
            - Local: http://127.0.0.1:${port}${publicPath}\n`;
            console.log(chalk.cyan("\n" + empty + common));
          })
    })
 }

