/**
 * wp-7.js 
 * webpack config demo
 * webpack 看板
 */

const WebpackDashboardPlugin = require('webpack-dashboard')

module.exports = (config, resolve, options) => {
  return () => {
      if(options.env === 'dev' && options.dashboard) {
        config.plugin('dashboardPlugin')
        .use(WebpackDashboardPlugin, [{
            port: options.port 
        }])
      }
  }
}