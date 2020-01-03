/**
 * webpack-loader
 * 可选链 chain-loader
 * 描述: console.log(obj.a.b?.c) // 会被转成 obj && obj.a && obj.a.b && obj.a.b.c
 */

module.exports = content => {
    return content.replace(new RegExp(/([\$_\w\.]+\?\.)/, "g"), function(res) {
        let str = res.replace(/\?\./, "");
        let arrs = str.split(".");
        let strArr = [];
        for (let i = 1; i <= arrs.length; i++) {
          strArr.push(arrs.slice(0, i).join("."));
        }
        let compile = strArr.join("&&");
        const done = compile + "&&" + str + ".";
        return done;
    });
}




/***********************  content 返回源码的内容 ************************/

// // 这样有一个好处就是可以根据逻辑去加载css
// require("./css/index.less"); //  导入后会被打包提出去
// require("./css/index.scss");
// require("./css/index.css");

// const h2 = document.createElement("h2");
// h2.className = "test";
// h2.innerText = "test";
// document.body.append(h2);

// // ts编译
// require('./test.ts')()

// import { cube } from './js/treeShaking'

// console.log(cube(2))


// // loader 实现可选链
// const obj = {
//     a: {
//         b: {
//             c: 1
//         }
//     }
// }
// console.log(obj.a.b?.c) // 会被转成 obj && obj.a && obj.a.b && obj.a.b.c
