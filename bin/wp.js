#!/usr/bin/env node

// 脚手架链接命令
const chalk = require('chalk')
const program = require('commander')
const packageConfig = require('../package.json')
const { cleanArgs } = require('../utils')
const path = require('path')
const __name__ = `build,dev,dll`

let wpConfig;
let lock = false;

try {
    wpConfig = require(path.join(process.cwd(), "wp.config.js"))()
} catch(err) {
    console.log('err:' + err + '\n')
}

//console.log(process.argv)
// [ '/Users/qiuchenglei/.nvm/versions/node/v10.16.0/bin/node',
//   '/Users/qiuchenglei/github/webpack-study/bin/wp.js',
//   'wp',
//   '-V' ]


program
.usage("<command> [options]") // useage 用法 desc 描述 command命令行 action 执行  
.version(packageConfig.version)
.command('build [app-page]')
.description('build production enviroment')
.option('-r --report', "Package analysis report")
.option('-d, --dll', 'Merge difference packets')
.option('-t, --dll-test', 'command test')
.action(async (name, cmd) => {
    const options = cleanArgs(cmd)
    console.log(options) 
    // wp build test -d    { dll: true } -d表示可选性为true , 后边的 - 要在option可见范围内 --  wp build test -r    { report: true }
    const args = Object.assign(options, { name }, wpConfig)  // 拷贝对象属性
    const wpages = wpConfig.pages
    if(lock) return // 只执行一次
    lock = true 
    args.mode = 'production'
    args.clear = true // 清除之前的dist目录
    if(wpages) {
        Object.keys(wpages).forEach(page => {
            console.log(page)
            args.name = page
            require('../build/build')(args)
        })
    }else {
        require('../build/build')(args)
    }
})

// 命令行参数解析
program.parse(process.argv).args && program.parse(process.argv).args[0];
program.commands.forEach(c => c.on('--help', () => console.log(`自个百度去  (￣▽￣)~*`)))




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

