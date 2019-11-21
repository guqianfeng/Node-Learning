const fs = require("fs");

/*
fs.mkdir("123456", err => {
    if(err){
        return console.log(err);
    }
    console.log("mkdir success");
});*/

/*fs.rename("123456", "654321", err => {
    if(err){
        return console.log(err);
    }
    console.log("rename success");
});*/

/*fs.readdir("../../../../NODE", (err, data) => {
    if(err){
        return console.log(err);
    }
    console.log(data);
});*/

/*fs.rmdir("654321", err => {
    if(err){
        return console.log(err);
    }
    console.log("rmdir success");
});*/

/*fs.exists("1.html", flag => {
    console.log(flag);
});*/

fs.stat("2.js", (err,stat) => {
    if(err){
        return console.log(err);
    }
    console.log(stat);
    console.log(stat.isFile());
    console.log(stat.isDirectory());
});



