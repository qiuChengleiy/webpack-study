/**
 * wp-2.js 
 * webpack config demo
 * 开发环境
 */

 module.exports = function(options) {
    const config = require("./base")(options); // 编译基础配置 配置可选项
    const webpack = require("webpack");
    const chalk = require("chalk");
    const WebpackDevServer = require("webpack-dev-server");
    const port = 8080
    const publicPath = "/common/"
    
    // 开启本地webpack服务
    config.devServer
    .quiet(true)
    .hot(true)
    .https(false)
    .disableHostCheck(true)
    .publicPath(publicPath)
    .clientLogLevel('none')
    
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

