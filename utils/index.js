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


exports.findSync = findSync