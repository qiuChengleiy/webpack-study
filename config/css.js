/**
 * wp-2.js 
 * webpack config demo
 * css 编译配置
 */

module.exports = (config, reslove) => {
    return (rule, test) => {
        const baseRule = config.module.rule(rule).test(test)
        const normalRule = baseRule.oneOf('normal')
        const applyLoaders = rule => {
            rule.use('extract-css-loader')
            .loader(require("mini-css-extract-plugin").loader)
            .options({ publicPath: './' })

            rule.use('css-loader')
            .loader('css-loader')
            .options({})
        }
        applyLoaders(normalRule)
    }
}


