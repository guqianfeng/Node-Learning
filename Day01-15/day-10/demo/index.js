const fs = require("fs");

//创建一个65kb的文件
/*let buffer = Buffer.alloc(65 * 1024);
fs.writeFileSync("test.txt", buffer);*/

//写一万句我爱你
/*let showLove = [...".".repeat(10000)].map((item,index) => `我爱你${index+1} \n`).join("");
fs.writeFileSync("mylove.txt", showLove, err => {
    if(err){
        return console.log(err);
    }
    console.log("写入成功");
});*/

//使用fs.readFile去读
/*fs.readFile("mylove.txt", (err,data) => {
    if(err){
        return console.log(err);
    }
    console.log(data.toString());
});*/

//使用stream去读
let num = 0;
let str = "";
let rs = fs.createReadStream("myLove.txt");
rs.on("data", chunk => {
    num++;
    str += chunk;
    console.log(num + "----------------------------------------------------------------------------------");
    console.log(chunk.toString());
});
rs.on("end", () => {
    console.log(str);
});

//写的流这个相当于复制的写法
let ws = fs.createWriteStream("trueLove.txt");
rs.pipe(ws);
