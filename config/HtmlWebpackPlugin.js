/**
 * wp-2.js 
 * webpack config demo
 * html文件自动生成
 */

const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = (config, resolve, options) => {  
    return () => {
      Object.keys(options.pages).forEach(item => {
         // 多页面配置 --- 相当于new 多个 HtmlWebpackPlugin
        config.plugin(`${item}-html`)
          .use(HtmlWebpackPlugin, [{
              template: options.pages[item].template,
              filename: options.pages[item].filename,
              chunks: [`manifest`, `vendor`],  // 输出的html文件引入的入口chunk --- 配置要引入的路径
              minify: {
                removeAttributeQuotes:true,
                removeComments: true,
                collapseWhitespace: true,
                removeScriptTypeAttributes:true,
                removeStyleLinkTypeAttributes:true
              }
          }])
        })
    }
}



