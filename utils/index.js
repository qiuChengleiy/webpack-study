const fs = require('fs')
const join = require('path').join

/**
 * @desc 文件遍历
 * @param {string} startPath 起始路径
 * @return {Array} 返回查找结果
 */
function findSync(startPath) {
    let results = []
    const finder = (path) => {
        const files = fs.readdirSync(path)
        files.map((val, index) => {
            let fpath = join(path, val)
            let pstat = fs.statSync(fpath)
            if(pstat.isDirectory()) finder(fpath)
            if(pstat.isFile()) results.push(fpath)
        })
    }
    finder(join(process.cwd(), startPath))
    return results
} 

/**
 * @desc 命令行格式化
 * @param {object} cmd 
 */
function cleanArgs(cmd) {
    const args = {}
    cmd.options.forEach(o => {
      const key = camelize(o.long.replace(/^--/, ''))
      if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
        args[key] = cmd[key]
      }
    })
    return args
}
  

/**
 * @desc 解析指令并转为大写 例: -t --> T
 * @param {string} str 
 */
function camelize(str) {
    // console.log(1111)
    // console.log(str) // wp build -----> report build
    // str.replace(/-(\w)/g, (_, c) => {
    //     console.log('cameL..........')
    //     console.log(_, c, c ? c.toUpperCase() : '') // -t t T
    // })
    // return str
    return str.replace(/-(\w)/g, (_, c) => c ? c.toUpperCase() : '')
}


exports.findSync = findSync
exports.cleanArgs =cleanArgs