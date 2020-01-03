/**
 * wp-3.js 
 * webpack config demo
 * postcss 配置
 */

module.exports = {
    plugins: {
      'postcss-px-to-viewport': {
        unitToConvert: 'px',
        viewportWidth: 750,
        unitPrecision: 5,
        propList: ['*'],
        viewportUnit: 'vw',
        fontViewportUnit: 'vw',
        selectorBlackList: [],
        minPixelValue: 1,
        mediaQuery: false,
        replace: true,
        exclude: [],
        landscape: false,
        landscapeUnit: 'vw',
        landscapeWidth: 568
      },
      // 自动添加 css 前缀
      'autoprefixer': {
        overrideBrowserslist: [
          "> 1%",
          "last 3 versions",
          "iOS >= 8",
          "Android >= 4",
          "Chrome >= 40"
        ]
      }
    }
  }