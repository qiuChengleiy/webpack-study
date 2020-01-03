/**
 * wp-3.js 
 * webpack config demo
 * babel 配置
 */

module.exports = (config, resolve) => {
    const baseRule = config.module.rule('js').test(/.js|.tsx?$/)
    const babelPath = resolve('babel.js')
    const bableConf = require(babelPath)
    const version = require(resolve('node_modules/@babel/core/package.json')).version
    return () => {
        baseRule
        .use('babel')
        .loader(require.resolve("babel-loader"))
        .options(bableConf({ version }))
    }
}

// require.resolve ---  console.log(require.resolve('babel-loader')) // /Users/qiuchenglei/github/webpack-study/node_modules/babel-loader/lib/index.js
// resolve ---- console.log(resolve('babel-loader')) // /Users/qiuchenglei/github/webpack-study/babel-loader








