/**
 * wp-6.js 
 * webpack config demo
 * 将 dll 包合并
 */

const webpack = require('webpack')

module.exports = (config, resolve) => {
  return () => {
    config.plugin('DllPlugin')
      .use(webpack.DllReferencePlugin, [{
        context: process.cwd(),
        manifest: require(resolve('dll/manifest.json'))
      }])
  }
}