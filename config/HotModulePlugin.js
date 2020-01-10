/**
 * wp-7.js 
 * webpack config demo
 * 模块热替换
 * TODO: express搭建本地服务实现局部刷新
 */

const HotModuleRepacementPlugin = require('webpack-hot-middleware')

module.exports = (config, resolve, options) => {
  return () => {
    // if (options.env === 'dev') {
    //   config.plugin('HotModulePlugin')
    //   .use(HotModuleRepacementPlugin)
    // }
  }
}