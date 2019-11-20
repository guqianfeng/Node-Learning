console.log("index");
let a = require("./a");
let b = require("./b");
console.log(a.test);
console.log(b.test);

console.log(module.exports === exports);

