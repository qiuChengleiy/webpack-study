/**
 * wp-2.js 
 * webpack config demo
 * html文件自动生成
 */

const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = (config, reslove) => {
    return () => {
        config.plugin("html").use(HtmlWebpackPlugin, [
          {
            template: "public/index.html"
          }
        ])
    }
}



