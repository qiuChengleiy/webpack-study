export function square(x) {
    return x * x;
  }
  
  export function cube(x) {
    return x * x * x;
  }

// 如何使用 tree-shaking？

// 确保代码是 es6 格式,即 export，import
// package.json 中，设置 sideEffects
// 确保 tree-shaking 的函数没有副作用
// babelrc 中设置 presets [["@babel/preset-env", { "modules": false }]] 禁止转换模块，交由 webpack 进行模块化处理
// 结合 uglifyjs-webpack-plugin
// 其实在 webpack4 我们根本不需要做这些操作了，因为 webpack 在生产环境已经帮我们默认添加好了，开箱即用！