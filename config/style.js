/**
 * wp-3.js 
 * webpack config demo
 * 配置样式，style，css、less、sass、postcss 等
 */

const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = (config, resolve, options) => {
    const devMode = options.env === 'dev'

    // css 解析配置
    const createCSSRule = (lang, test, loader, options = {}) => {
      const baseRule = config.module.rule(lang).test(test);
      const normalRule = baseRule.oneOf('normal');

      normalRule
        .use('extract-css-loader')
        .loader(require('mini-css-extract-plugin').loader)
        .options({
          hmr: devMode,
          publicPath: '/'
        })
      normalRule
        .use('css-loader')
        .loader(require.resolve('css-loader'))
        .options({})
      normalRule
        .use('postcss-loader')
        .loader(require.resolve('postcss-loader'))
      if (loader) {
        const rs = require.resolve(loader)
        normalRule
          .use(loader)
          .loader(rs)
          .options(options)
      }
    }

    // css压缩插件配置
    const OptimizeCSSAssets = rule => {
      !devMode && config
      .plugin('OptimizeCSSlugin')
      .use(OptimizeCSSAssetsPlugin, [{
          assetNameRegExp: rule,  
          cssProcessor: require('cssnano'), 
          cssProcessorOptions: {
              discardComments: { removeAll: true },
              parser: require('postcss-safe-parser'),
              autoprefixer: false
          },
          canPrint: true
      }])
    }
  
    return () => {
      createCSSRule('css', /\.css?$/, 'css-loader', {})
      createCSSRule('less', /\.less?$/, 'less-loader', {})
      createCSSRule('scss', /\.scss?$/, 'sass-loader', {})
      createCSSRule('postcss', /\.p(ost)?css?$/)
      OptimizeCSSAssets(/\.css$/)
    }
  }