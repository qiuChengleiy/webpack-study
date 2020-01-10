/**
 * wp-2.js 
 * webpack config demo
 */

const { findSync } = require('../utils')
const Config = require('webpack-chain')
const config = new Config()
const files = findSync('config')
const path = require('path')
const map = new Map()
const entryConfig = {}
const resolve = src => path.join(process.cwd(), src)

module.exports = options => {
    files.map(_ => {
        const fname = _.split('/').pop().replace('.js','')
        
        return map.set(fname, require(_)(config, resolve, options)) // 生成各个配置项 ---- 实现可插可拔
    })

    map.forEach((v,name) => v())

    // entry 入口配置
    Object.keys(options.pages).forEach(v => {
        const entry = {
            [v]: resolve(options.pages[v].entry)
        }
        if(entryConfig.entry) {
            entryConfig.entry = Object.assign(entryConfig.entry, entry)  
        } else {
            entryConfig.entry = entry
        }
    })

    return { config, entryConfig }
}

