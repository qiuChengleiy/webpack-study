/**
 * wp-2.js 
 * webpack config demo
 * html文件自动生成
 */

const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = (config, resolve, options) => {  
    return () => {
      Object.keys(options.pages).forEach((item, k) => {
        config.plugin(`${item}-html`)
          .use(HtmlWebpackPlugin, [{
              favicon: options.pages[item].favicon,             
              title: options.pages[item].title,           
              base: options.pages[item].base,
              template: options.pages[item].template,
              filename: `${options.pages[item].filename}`,
              chunks: [`${item}`, `${item}Runtime`],  
              cache: true,
              minify: options.env !== 'dev',
              inject: 'body',
          }])
        })
    }
}



