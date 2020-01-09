#!/usr/bin/env node

// 脚手架链接命令
const chalk = require('chalk')
const program = require('commander')
const packageConfig = require('../package.json')
const { cleanArgs } = require('../utils')
const path = require('path')
const wpConfig = require(path.join(process.cwd(), "wp.config.js"))()
let lock = false

/**
 * @desc 页面编译配置解析
 * @param {object} wpages 配置项pages
 * @param {object} args  编译参数
 */
const resolvePages = ({ wpages, args }) => {
    const _pages = [];
    Object.keys(wpages).forEach(page => {
        _pages.push(page)
    })
    args.output = _pages
    require(`../build/${args.env}`)(args)
}


/**
 * @desc build 本地打包构建
 * @args wp build  [-r] [-d] [-w] 
 * @mode  procution
 */
program
    .usage("<command> [options]") // useage 用法 desc 描述 command命令行 action 执行  
    .version(packageConfig.version)
    .command('build [app-page]')
    .description('build production enviroment')
    .option('-r --report', "Package analysis report")
    .option('-d, --dll', 'Merge difference packets')
    .option('-w, --worker', 'start worker')
    .action(async (name, cmd) => {
        const options = cleanArgs(cmd)
        // console.log(options) 
        //return
        // wp build test -d    { dll: true } -d表示可选性为true , 后边的 - 要在option可见范围内 --  wp build test -r    { report: true }
        // wp build -r -d -w ----------> { report: true, dll: true, worker: true }
        const args = Object.assign(options, { name }, wpConfig)  // 拷贝对象属性 --- 传入config的webpack配置中 根据 参数是否开启对应的插件
        const wpages = wpConfig.pages
        if(lock) return // 只执行一次
        lock = true 
        args.mode = 'production'
        args.clear = true // 清除之前的dist目录
        args.env = 'build'
        resolvePages.call(null, { wpages, args })
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
    .action(async (name, cmd) => {
        const options = cleanArgs(cmd)
        const args = Object.assign(options, { name }, wpConfig) 
        const wpages = wpConfig.pages
        args.mode = 'development'
        args.env = 'dev'
        resolvePages.call(null, { wpages, args })
    })


// 命令行参数解析
program.parse(process.argv).args && program.parse(process.argv).args[0];
program.commands.forEach(c => c.on('--help', () => console.log(`自个百度去  (￣▽￣)~*`)))


//console.log(process.argv)
// [ '/Users/qiuchenglei/.nvm/versions/node/v10.16.0/bin/node',
//   '/Users/qiuchenglei/github/webpack-study/bin/wp.js',
//   'wp',
//   '-V' ]

// wp build
// console.log(name,cmd)
// undefined Command {
//     commands: [],
//     options:
//      [ Option {
//          flags: '-r --report',
//          required: false,
//          optional: false,
//          mandatory: false,
//          negate: false,
//          short: '-r',
//          long: '--report',
//          description: 'Package analysis report' },
//        Option {
//          flags: '-d, --dll',
//          required: false,
//          optional: false,
//          mandatory: false,
//          negate: false,
//          short: '-d',
//          long: '--dll',
//          description: 'Merge difference packets' } ],
//  ............


// wp build test
// console.log(name,cmd)
// test Command {
//     commands: [],
//     options:
//      [ Option {
//          flags: '-r --report',
//          required: false,
//          optional: false,
//          mandatory: false,
//          negate: false,
//          short: '-r',
//          long: '--report',
//          description: 'Package analysis report' },
//        Option {
//          flags: '-d, --dll',
//          required: false,
//          optional: false,
//          mandatory: false,
//          negate: false,
//          short: '-d',
//          long: '--dll',
//          description: 'Merge difference packets' } ],
//  ............

