/**
 * wp-3.js 
 * webpack config demo
 * gzip压缩配置
 */

const CompressionWebpackPlugin = require("compression-webpack-plugin");

module.exports = (config, resolve) => {
  return () => {
    config.plugin("CompressionWebpackPlugin").use(CompressionWebpackPlugin, [
      {
        algorithm: "gzip",
        test: /\.js(\?.*)?$/i,
        threshold: 10240,
        minRatio: 0.8
      }
    ]);
  };
};