/***** 以下需要基于 webpack-cli **********/

const path = require('path')
const rmdir = require('rimraf')

// 删除dist文件夹
rmdir.sync('dist')


// webpack配置
// module.exports = {
// 	entry: path.join(__dirname, '../src/js/index'),  // 入口
// 	mode: process.env.NODE_ENV,
// 	output: {		// 打包出口
// 		filename: 'bundle.js',
// 		path: path.join(__dirname, '../dist')
// 	}
// }



// 链式配置
const Config = require('webpack-chain')
const config = new Config()
const resolve = src => {
	return path.join(process.cwd(), src); // cwd 是工作目录： 调用js的目录
}


config
.entry(resolve('src/js/index')) // 入口
.add(resolve('src/js/index.js'))
.end()
//.mode(process.env.NODE_ENV)
.set('mode', process.env.NODE_ENV) // 同上
.output.path(resolve('dist'))
.filename("[name].bundle.js") // name和源码文件名同步


config.module
.rule('css')
.test(/\.css$/)
.use('css')
.loader('css-loader')

module.exports = config.toConfig()



// bundle 是一个立即执行函数，可以认为它是把所有模块捆绑在一起的一个巨型模块。
// webpack 将所有模块打包成了 bundle 的依赖，通过一个对象注入
// 0 模块 就是入口
// webpack 通过 __webpack_require__ 引入模块
// __webpack_require__ 就是我们使用的 require，被 webpack 封装了一层

// 我们知道 import 跟 require 的区别是，import 是动态加载只有在用到的时候才会去加载，而 require 只要声明了就会加载，webpack 遇到了 require 就会把它当成一个模块加载到 bundle 的依赖里


// 动态模块加载逻辑
// 我们再看下 dist/bundle.js

// 方便理解，我把大部分代码和注释都删掉了

// 原理很简单，就是利用的 jsonp 的实现原理加载模块，只是在这里并不是从 server 拿数据而是从其他模块中

// 调用模块时会在 window 上注册一个 webpackJsonp 数组，window['webpackJsonp'] = window['webpackJsonp'] || []
// 当我们 import时，webpack 会调用 __webpack_require__.e(0) 方法，也就是 requireEnsure
// webpack 会动态创建一个 script 标签去加载这个模块，加载成功后会将该模块注入到 webpackJsonp 中
// webpackJsonp.push 会调用 webpackJsonpCallback 拿到模块
// 模块加载完（then）再使用 __webpack_require__ 获取模块