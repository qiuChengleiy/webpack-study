/**
 * wp-2.js 
 * webpack config demo
 * 基础配置
 */

 module.exports = (config, resolve) => {
     config
     .entry('src/main')
     .add(resolve('src/main.js'))
     .end()
     .set('mode', process.env.NODE_ENV)
     .output.path(resolve('dist'))
     .filename('[name].bundle.js')
 }






