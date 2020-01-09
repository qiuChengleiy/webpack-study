/**
 * wp-7.js 
 * webpack config demo
 * 多页配置
 */

module.exports = function (config) {
    return {
      assetsPath: '/assests/',
      publicDevPath: '/dev/',
      port: 8080,
      pages: {
        index: {
          entry: 'src/main.js',
          template: 'public/index.html',
          filename: 'pages/index/index.html',
        },
        index2: {
          entry: 'src/main.js',
          template: 'public/index2.html',
          filename: 'pages/index2/index2.html',
        }
      },
      chainWebpack(config) {
      }
    }
  }



