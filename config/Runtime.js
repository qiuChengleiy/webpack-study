/**
 * wp-6.js 
 * webpack config demo
 * 性能优化
 * 将 optimization.runtimeChunk 设置为 true 或 "multiple"，会为每个仅含有 runtime 的入口起点添加一个额外 chunk。此设置是如下设置的别名：
 */

module.exports = (config, resolve, options) => {
    return () => {
      config
        .optimization
        .runtimeChunk({
          name: entrypoint => `${entrypoint.name}Runtime`
      })
    }
  }