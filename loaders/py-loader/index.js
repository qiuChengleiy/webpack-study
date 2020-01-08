/**
 * webpack-loader
 * py-loader: python 转js 
 * 描述: 将 python转成js
 */

module.exports = content => {
    console.log('正在编译python文件...    (￣▽￣)~*')

    let newContent;
    const map = new Map()
    const GrammaticalRelation = [{
        name: 'global_virable',
        value: {
            reg: /([a-zA-Z_\$]+)\s=\s([0-9a-zA-Z_\$\']+)\s*/g,
            replaceFunc: res => `var ${res}`
        }
    }, {
        name: 'console',
        value: {
            reg: /(print | dir)\\([\s\S]+\\)\s*/g,   // \s\S 匹配任意字符
            replaceFunc: res => `console.${res === 'print' ? 'log' : 'dir'}( ${res}`
        }
    }]

    GrammaticalRelation.map(_ => {
        return map.set(_.name, { ..._.value })
    })

    map.forEach((v,k) => {
        newContent = content.replace(v.reg, res => v.replaceFunc(res))
    })
    
   // console.log(newContent)
    return newContent
}

