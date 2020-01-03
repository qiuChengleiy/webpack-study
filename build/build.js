/**
 * wp-2.js 
 * webpack config demo
 * 生产环境
 */

const rimraf = require('rimraf')
const ora = require('ora')
const chalk = require('chalk')
const path = require('path')

// 删除之前编译的dist目录
rimraf.sync(path.join(process.cwd(), 'dist'))

const config = require('./base')()
const webpack = require('webpack')
const spinner = ora('项目开始构建中    (￣▽￣)~*' + '\n')
spinner.start()

webpack(config.toConfig(), (err, stats) => {
    spinner.stop()
    if(err) throw err
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false,
    }) + "\n\n")

    if(stats.hasErrors()) {
        console.log(chalk.red('构建失败\n ┭┮﹏┭┮' + '\n'))
        process.exit(1)
    }

    console.log(chalk.cyan('production has been builded  (￣▽￣)~*' + '\n'))
})

