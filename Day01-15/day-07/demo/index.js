const fs = require("fs");

/*fs.writeFile("1.txt", "我是写入的文字", (err) => {
    if(err){
        return console.log(err)
    }
    console.log("write success");
});*/

//w-默认 重写，覆盖掉之前的 a-追加写入， r-读取
/*
fs.writeFile("1.txt", "我是写入的文字-新写的", {flag: "a"}, (err) => {
    if(err){
        return console.log(err)
    }
    console.log("write success");
});*/

/*fs.readFile("1.txt", "utf-8", (err, data) => {
    if(err){
        return console.log(err);
    }
    console.log(data);
});*/

/*fs.readFile("1.txt",  (err, data) => {
    if(err){
        return console.log(err);
    }
    console.log(data);
});*/

/*let data = fs.readFileSync("1.txt", "utf-8");
console.log(data);*/

/*fs.rename("1.txt", "2.txt", (err) => {
    if(err){
        return console.log(err);
    }
    console.log("update success");
});*/

/*fs.unlink("2.txt", err => {
    if(err){
        return console.log(err);
    }
    console.log("delete success");
});*/

/*fs.copyFile("index.js", "copyIndex.js", err => {
    if(err){
        return console.log(err);
    }
    console.log("copy success");
});*/

function myCopyFile(src, dist){
    fs.writeFileSync(dist, fs.readFileSync(src, "utf-8"));
}

myCopyFile("index.js", "myCopyIndex.js");