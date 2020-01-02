/**
 * wp-2.js 
 * webpack config demo
 */

const { findSync } = require('../utils')
const Config = require('webpack-chain')
const config = new Config()
const files = findSync('config')
const path = require('path')
const resolve = src => path.join(process.cwd(), src)


module.exports = () => {
    const map = new Map()
    files.map(_ => {
        // 获取文件夹config下的文件名
        // console.log(_.split('/').pop().replace('.js',''))
        // HtmlWebpackPlugin
        // MiniCssExtractPlugin
        // base
        // css

        const fname = _.split('/').pop().replace('.js','')
        return map.set(fname, require(_)(config, resolve)) // 生成各个配置项 ---- 实现可插可拔
    })

    map.forEach((v,name) => {
        // css 配置
        if(name !== 'base') {
            if(name === 'css') {
                v('css', /\.css$/)
            } else {
                v()
            }
        }
    })

    return config
}

