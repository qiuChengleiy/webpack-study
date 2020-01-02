/**
 * wp-2.js 
 * webpack config demo
 * css提取插件
 */

const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = (config, reslove) => {
    return () => {
        config
        .plugin('mini-css-extract')
        .use(MiniCssExtractPlugin)
    }
}

