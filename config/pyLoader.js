/**
 * wp-4.js 
 * webpack config demo
 * py-loader 配置项
 */


module.exports = (config, resolve) => {
    const baseRule = config.module.rule("js").test(/.py?$/);
    const normalRule = baseRule.oneOf("normal");
    return () => {
      normalRule.use("options-chain").loader(resolve("loaders/py-loader"));
    };
  };