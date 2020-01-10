/**
 * wp-2.js 
 * webpack config demo
 * 基础配置
 */

 module.exports = (config, resolve, options) => {
   const devMode = options.env === 'dev'
   const output = resolve(devMode ? options.publicDevPath : options.publicBuildPath)
   
    return () => {
      config
      // 模式 "production" | "development" | "none"
      // .mode(process.env.NODE_ENV) 等价下面
      .set('mode', options.mode) // process.env.NODE_ENV
      // 出口
      .output
      .path(output)                     // vendor: 提供的意思
      .filename(devMode ? `[name]/vendor.[name].bundle.js` : `[name]/vendor.[name].[chunkhash:8].min.js`)
      .publicPath(`./`) // 输出的公共路径： 

      // 开启 source map
      const sourceMap = devMode ? 'inline-source-map' : 'source-map'
      config.devtool(sourceMap)
    }
 }

