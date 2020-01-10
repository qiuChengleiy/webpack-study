/**
 * wp-2.js 
 * webpack config demo
 * 开发环境
 */

 module.exports = function(options) {
    const { config, entryConfig } = require("./base")(options); 
    const webpack = require("webpack");
    const chalk = require("chalk");
    const WebpackDevServer = require("webpack-dev-server");
    const publicPath = options.publicDevPath
    const port = options.port

    // 编译配置
    const _base_ = Object.assign(config.toConfig(), entryConfig)
    const compiler = webpack(_base_)
    // 拿到devserver配置项
    const chainDevServer = compiler.options.devServer
    const server = new WebpackDevServer(
        compiler,
        Object.assign(chainDevServer, {})
    )
    
    server.listen(port)
    
    // 监听： https://webpack.docschina.org/api/compiler-hooks/
    compiler.hooks.done.tap('dev', stats => {
        const empty = "    "
        const common = `App running at:
        - Local: http://127.0.0.1:${port}${publicPath}\n`;
        console.log(chalk.cyan("\n" + empty + common));
    })

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
 }

