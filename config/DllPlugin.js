/**
 * wp-6.js 
 * webpack config demo
 * 将 dll 包合并
 */

const webpack = require('webpack')

module.exports = (config, resolve, options) => {
  return () => {
    if (process.argv.includes('--dll') || options.dll) {
      config.plugin('DllPlugin')
      .use(webpack.DllReferencePlugin, [{
          context: process.cwd(),
          name: '[name]_[hash]',
          manifest: require(resolve('dll/manifest.json')),
          scope: 'xyz',
          sourceType: 'commonjs2'
      }])
    }
  }
}