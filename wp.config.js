/**
 * wp-7.js 
 * webpack config demo
 * 多页配置
 */

module.exports = function (config) {
    return {
      assetsPath: 'assests',
      publicDevPath: '/',
      publicBuildPath: `dist/project/`,
      port: 8080,
      pages: {
        index: {
          title: 'index', // 网站标题
          favicon: '',  // 网站图标
          mete: {viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'}, // 网站meta信息
          base: './src/',
          entry: 'src/main.js',
          template: 'public/index.html',
          filename: 'index.html',
        },
        index2: {
          title: 'index2',
          favicon: '',
          mete: {viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'},
          base: './src/',
          entry: 'src/main2.js',
          template: 'public/index2.html',
          filename: 'index2.html',
        }
      },
      chainWebpack(config) {
      }
    }
  }



