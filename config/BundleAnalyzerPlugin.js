/**
 * wp-6.js 
 * webpack config demo
 * 性能优化
 */

const {
    BundleAnalyzerPlugin
  } = require('webpack-bundle-analyzer')
  
  module.exports = (config, resolve) => {
    return () => {
      if (process.argv.includes('--report')) {
        config.plugin('BundleAnalyzerPlugin')
          .use(BundleAnalyzerPlugin, [{
            analyzerMode: 'static'
          }])
      }
    }
  }