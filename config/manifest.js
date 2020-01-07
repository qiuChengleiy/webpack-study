/**
 * wp-6.js 
 * webpack config demo
 * 性能优化
 */


module.exports = (config, resolve) => {
    return () => {
      config
        .optimization
        .runtimeChunk({
          name: "manifest"
        })
    }
  }