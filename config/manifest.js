/**
 * wp-6.js 
 * webpack config demo
 * 性能优化
 */


module.exports = (config, resolve, options) => {
    return () => {
       // 分离manifest
      // config
      //   .optimization
      //   .runtimeChunk({
      //     name: "manifest"
      // })

      Object.keys(options.pages).forEach(v => {
        // 多页面配置 --- 相当于new 多个 HtmlWebpackPlugin
        config
        .optimization
        .runtimeChunk({
          name: `pages/${v}/manifest`
        })
      })
    }
  }