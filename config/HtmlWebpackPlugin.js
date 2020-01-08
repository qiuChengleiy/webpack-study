/**
 * wp-2.js 
 * webpack config demo
 * html文件自动生成
 */

const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = (config, resolve, options) => {
    let template = 'public/index.html', filename = 'index.html';
    // 多页面配置 --- 公共模板
    console.log(options.name)
    if (options.name) {
      const name = options.name;
      template = options.pages[name].template;
      filename = options.pages[name].filename;
      publicPath = options.pages[name].publicPath;
    }

    return () => {
      config.plugin('html')
      .use(HtmlWebpackPlugin, [{
        template,
        filename,
        publicPath
      }])
    }
}



