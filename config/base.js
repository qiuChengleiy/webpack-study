/**
 * wp-2.js 
 * webpack config demo
 * 基础配置
 */

 module.exports = (config, resolve, options) => {
    // 多页配置
    let name = 'app',
    entry = options.entry || 'src/main.js',
    dist = options.dist || 'dist';
    publicPath = options.publicPath || '/'

    if (options.name) {
      name = options.name;
      dist = `${dist}/${name}`
      entry = options.pages[name].entry;
    }

    return () => {
      // 初始版本
      // config
      // .entry('src/main')
      // .add(resolve('src/main.js'))
      // .end()
      // .set('mode', process.env.NODE_ENV)
      // .output.path(resolve('dist'))
      // .filename('[name].bundle.js')

      // 多页面配置
      config
      // 入口名称
      .entry(name)
      // 入口路径
      .add(resolve(entry))
      .end()
      // 模式 "production" | "development" | "none"
      // .mode(process.env.NODE_ENV) 等价下面
      .set('mode', options.mode) // process.env.NODE_ENV
      // 出口
      .output.path(resolve(dist))
      .filename('[name].bundle.js')
      .publicPath(publicPath)
 
      // 开启 source map
      config.devtool("cheap-source-map")
 
      // 分离manifest
      config.optimization.runtimeChunk({
         name: "manifest"
      })
 
      // 使用动态 import 或者 require.ensure 语法， 使用 babel-plugin-import 插件按需引入一些组件库
      // 将公共的包提取到 chunk-vendors 里面，比如你 require('vue')，webpack 会将 vue 打包进 chunk-vendors.bundle.js
      config.optimization.splitChunks({
         chunks: "async",
         minSize: 30000,
         minChunks: 1,
         maxAsyncRequests: 3,
         maxInitialRequests: 3,
         cacheGroups: {
           vendors: {
             name: `chunk-vendors`,
             test: /[\\/]node_modules[\\/]/,
             priority: -10,
             chunks: "initial"
           },
           common: {
             name: `chunk-common`,
             minChunks: 2,
             priority: -20,
             chunks: "initial",
             reuseExistingChunk: true
           }
         }
       })
       config.optimization.usedExports(true)
    }
 }






