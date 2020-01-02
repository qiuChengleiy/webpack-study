require("./css/index.css"); //  导入后会被打包提出去

const h2 = document.createElement("h2");
h2.className = "test";
h2.innerText = "test";
document.body.append(h2);

