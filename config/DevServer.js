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

            // 开启本地webpack服务
            config.devServer
            .quiet(true) // 除了初始启动信息之外的任何内容都不会被打印到控制台。这也意味着来自 webpack 的错误或警告在控制台不可见。
            .stats({ chunks:false })
            .hot(true)
            .overlay(true) // 开启：浏览器页面上显示错误
            .open(true) // 是否： 自动打开浏览器
            .inline(true) // 监视页面改动
            .proxy(_proxy)  // 代理服务器配置项
            .allowedHosts(allowedHosts)
            .compress(false)
            .publicPath(publicPath)
            .contentBase(contentBase) // contentBase表示的是告诉服务器从哪里提供内容。（只有想提供静态文件时才需要）
            .clientLogLevel('none')
         }
    }
  }
