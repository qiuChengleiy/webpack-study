// 这样有一个好处就是可以根据逻辑去加载css
require("./css/index.less"); //  导入后会被打包提出去

// require("./css/index.scss");
//require("./css/index.css");

//import "./css/index.scss"

// const h2 = document.createElement("h2");
// h2.className = "test";
// h2.innerText = "test";
// document.body.append(h2);

// // ts编译
//require('./test.ts')()
import { cube } from './js/treeShaking'

console.log(cube(2))

console.log(3)



// // loader 实现可选链
// const obj = {
//     a: {
//         b: {
//             c: 1
//         }
//     }
// }
// console.log(obj.a.b?.c) // 输出：1 -----  会被转成 obj && obj.a && obj.a.b && obj.a.b.c


// py 文件测试
// console.log(require('./test.py').a) 
// ƒ a() {
//     var a = 1;
//   }



