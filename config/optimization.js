/**
 * wp-6.js 
 * webpack config demo
 * 性能优化
 */

module.exports = (config, resolve, options) => {
    return () => {
      // 使用动态 import 或者 require.ensure 语法， 使用 babel-plugin-import 插件按需引入一些组件库
      // 将公共的包提取到 chunk-vendors 里面，比如你 require('vue')，webpack 会将 vue 打包进 chunk-vendors.bundle.js
      if(options.env === 'build') { // dev下会导致模块不刷新
        config
        .optimization.splitChunks({
          chunks: 'async',
          minSize: 30000,
          minChunks: 1,
          maxAsyncRequests: 3,
          maxInitialRequests: 3,
          cacheGroups: {
            vendors: {
              name: `chunk-vendors`,
              test: /[\\/]node_modules[\\/]/,
              priority: -10,
              chunks: 'initial'
            },
            common: {
              name: `chunk-common`,
              minChunks: 2,
              priority: -20,
              chunks: 'initial',
              reuseExistingChunk: true
            }
          }
        })

        config.optimization.usedExports(true)
      } 
    }
  }