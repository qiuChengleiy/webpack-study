/**
 * wp-6.js 
 * webpack config demo
 * 线程数越小编译速度越快
 */

module.exports = (config, resolve) => {
    const baseRule = config.module.rule("js").test(/.js|.tsx?$/);
    return () => {
      const useThreads = true;
      if (useThreads) {
        const threadLoaderConfig = baseRule
          .use("thread-loader")
          .loader("thread-loader");
        threadLoaderConfig.options({ workers: 3 });
      }
    };
  };
  