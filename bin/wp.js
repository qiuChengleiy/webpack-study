#!/usr/bin/env node

// 脚手架链接命令
const chalk = require('chalk')
const program = require('commander')
const packageConfig = require('../package.json')
const { cleanArgs } = require('../utils')
const path = require('path')
const wpConfig = require(path.join(process.cwd(), "wp.config.js"))()
const __name__ = 'build,dev,dll'
let lock = false

/**
 * @desc 页面编译配置解析
 * @param {object} wpages 配置项pages
 * @param {object} args  编译参数
 */
const resolvePages = ({ args }) => {
    require(`../build/${args.env}`)(args)
}


/**
 * @desc build 本地打包构建
 * @args wp build  [-r] [-d] [-w] 
 * @mode  procution
 */
program
    .usage("<command> [options]") // useage 用法 desc 描述 command命令行 action 执行  
    .version(packageConfig.version) // wp -V | --version
    .command('build [app-page]')
    .description('build production enviroment')
    .option('-r --report', "Package analysis report")
    .option('-d, --dll', 'Merge difference packets')
    .option('-w, --worker', 'start worker')
    .action(async (name, cmd) => {
        const options = cleanArgs(cmd)
        const args = Object.assign(options, { name }, wpConfig)  // 拷贝对象属性 --- 传入config的webpack配置中 根据 参数是否开启对应的插件
        if(lock) return // 只执行一次
        lock = true 
        args.mode = 'production'
        args.clear = true // 清除之前的dist目录
        args.env = 'build'
        resolvePages.call(null, { args })
    })



/**
 * @desc dev 本地开发环境构建
 * @args wp dev [-d]
 * @mode  development
 */
program
    .usage("<command> [options]") 
    .version(packageConfig.version)
    .command('dev [app-page]')
    .description('rebuilding the local development environment')
    .option('-d, --dll', 'Merge difference packets')
    .option('-w, --worker', 'start worker')
    .option('-dash, --dashboard', 'open webpack dashboard')
    .action(async (name, cmd) => {
        const options = cleanArgs(cmd)
        const args = Object.assign(options, { name }, wpConfig) 
        if(lock) return // 只执行一次
        lock = true 
        args.mode = 'development'
        args.env = 'dev'
        resolvePages.call(null, { args })
    })


/**
 * @desc dll 整合外部资源包
 * @args wp dll 
 * @mode  development
 */
program
    .usage("<command> [options]") 
    .version(packageConfig.version)
    .command('dll [app-page]')
    .description('rebuilding the local development environment')
    .option('-r, --report', 'Merge difference packets')
    .action(async (name, cmd) => {
        const options = cleanArgs(cmd)
        const args = Object.assign(options, { name }, wpConfig) 
        if(lock) return // 只执行一次
        lock = true 
        args.mode = 'production'
        args.env = 'dll'
        resolvePages.call(null, { args })
    })


// 命令行参数解析
program.parse(process.argv).args && program.parse(process.argv).args[0];
program.commands.forEach(c => c.on('--help', () => console.log(`自个百度去  (￣▽￣)~*`)))

// 判断命令输入是否正确， 没有则输出命令行相关参数
if (process.argv[2] && !__name__.includes(process.argv[2])) {
    console.log('\n'+chalk.red(`没有找到 ${process.argv[2]} 命令 ┭┮﹏┭┮`))
    program.help()
}
  
if (!process.argv[2]) {
    program.help()
}