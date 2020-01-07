/**
 * wp-6.js 
 * webpack config demo
 * 编译缓存优化
 * cache-loader 主要是将打包好的文件缓存在硬盘的一个目录里，一般存在 node_modules/.cache 下，
 * 当你再次 build 的时候如果此文件没有修改就会从缓存中读取已经编译过的文件，只有有改动的才会被编译，
 * 这样就大大降低了编译的时间。尤其是项目越大时越明显。
 */


module.exports = (config, resolve) => {
    const baseRule = config.module.rule("js").test(/.js|.tsx?$/);
    const babelPath = resolve("babel.js");
    const babelConf = require(babelPath);
    const version = require(resolve("node_modules/@babel/core/package.json"))
      .version;
    return () => {
      baseRule.exclude
        .add(filepath => {
          // 不缓存 node_modules 下的文件
          return /node_modules/.test(filepath);
        })
        .end()
        .use("cache-loader")
        .loader("cache-loader")
        .options({
          // 缓存位置
          cacheDirectory: resolve("node_modules/.cache/babel")
        });
    };
  };