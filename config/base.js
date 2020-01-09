/**
 * wp-2.js 
 * webpack config demo
 * 基础配置
 */

 module.exports = (config, resolve, options) => {
   const devMode = options.env === 'dev'
   const basePath = 'pages/[name]/src/vendor.[name]'
    return () => {
      // 初始版本 ---- 单入口
      // config
      // .entry('src/main')
      // .add(resolve('src/main.js'))
      // .end()
      // .set('mode', process.env.NODE_ENV)
      // .output.path(resolve('dist'))
      // .filename('[name].bundle.js')

      config
      // 模式 "production" | "development" | "none"
      // .mode(process.env.NODE_ENV) 等价下面
      .set('mode', options.mode) // process.env.NODE_ENV
      // 出口
      .output
      .path(resolve('dist'))
      .filename(devMode ? `${basePath}.bundle.js` : `${basePath}.[chunkhash:8].min.js`)
      .publicPath('src/') // 输出的公共路径： 

      // 开启 source map
      const sourceMap = devMode ? '#inline-source-map' : 'source-map'
      config.devtool(sourceMap)
    }
 }






