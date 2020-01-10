/**
 * wp-2.js 
 * webpack config demo
 * css提取插件
 */

const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = (config, reslove, options) => {
    const devMode = options.env === 'dev'
    const basePath = v => `${v}/vendor.${v}`
    return () => {
        Object.keys(options.pages).forEach((v,k) => {
            config
            .plugin(`${v}-style`)
            .use(MiniCssExtractPlugin, [{
                filename: devMode ? `${basePath(v)}.css` : `${basePath(v)}.[chunkhash:8].min.css`,
                chunkFilename: devMode ? `${basePath(v)}.[chunkhash:8].css` : `${basePath(v)}.[chunkhash:8].min.css`,
            }])
        })
    }
}

