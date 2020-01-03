// 这样有一个好处就是可以根据逻辑去加载css
require("./css/index.less"); //  导入后会被打包提出去
require("./css/index.scss");
require("./css/index.css");

const h2 = document.createElement("h2");
h2.className = "test";
h2.innerText = "test";
document.body.append(h2);

// ts编译
require('./test.ts')()

