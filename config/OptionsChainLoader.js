/**
 * wp-4.js 
 * webpack config demo
 * chain-loader 配置项
 */

module.exports = (config, resolve) => {
    const baseRule = config.module.rule("js").test(/.js|.tsx?$/);
    const normalRule = baseRule.oneOf("normal");
    return () => {
      normalRule.use("options-chain").loader(resolve("loaders/chain-loader"));
    }
  }