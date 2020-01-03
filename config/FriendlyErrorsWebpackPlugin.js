/**
 * wp-3.js 
 * webpack config demo
 * 友好错误提示：
 */

const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports = (config, resolve) => {
  return () => {
    config.plugin('error').use(FriendlyErrorsWebpackPlugin);
  };
};