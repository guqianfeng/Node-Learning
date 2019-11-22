/*
let buffer = Buffer.alloc(10);
console.log(buffer);*/

/*let buffer = Buffer.from("大家好");
console.log(buffer); //<Buffer e5 a4 a7 e5 ae b6 e5 a5 bd>*/

/*let buffer = Buffer.from([0xe5, 0xa4, 0xa7, 0xe5, 0xae, 0xb6, 0xe5, 0xa5, 0xbd,]);
console.log(buffer, buffer.toString()); //<Buffer e5 a4 a7 e5 ae b6 e5 a5 bd> '大家好'*/

/*console.log(Buffer.from([0xe5, 0xa4, 0xa7]).toString()); //大
console.log(Buffer.from([0xe5, 0xae, 0xb6]).toString()); //家
console.log(Buffer.from([0xe5, 0xa5, 0xbd]).toString()); //好*/

//破坏出现乱码
/*console.log(Buffer.from([0xe, 0xa4, 0xa7]).toString());
console.log(Buffer.from([0xe5, 0xa, 0xb6]).toString());
console.log(Buffer.from([0xe5, 0xa5, 0xb]).toString());*/


//换种玩的方式
/*let buffer1 = Buffer.from([0xe5, 0xa4, 0xa7, 0xe5,]); //一个中文代表3个，把9个分成前4个
let buffer2 = Buffer.from([0xae, 0xb6, 0xe5, 0xa5, 0xbd,]); //后5个
console.log(buffer1.toString());
console.log(buffer2.toString());

let newBuffer = Buffer.concat([buffer1, buffer2]);
console.log(newBuffer.toString());*/

const {StringDecoder} = require("string_decoder");
let buffer1 = Buffer.from([0xe5, 0xa4, 0xa7, 0xe5,]);
let buffer2 = Buffer.from([0xae, 0xb6, 0xe5, 0xa5, 0xbd,]);
let decoder = new StringDecoder();
let res1 = decoder.write(buffer1); //大
let res2 = decoder.write(buffer2); //家好
console.log(res1);
console.log(res2);
