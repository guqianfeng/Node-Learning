const Koa = require("koa");
const Router = require("koa-router");
const static = require("koa-static");
const userData = require("./data/users.json");
// console.log(userData);

let app = new Koa();
let router = new Router();

router.get("/", async ctx => {
   ctx.body = "hello Koa";
})

router.get("/checkUsername", ctx => {
    let username = ctx.request.query.username;
    // console.log(username); 
    let index = userData.findIndex(item => item.username === username);
    if(index > -1){ 
        //说明在数据文件中找到了,已经注册了
        ctx.body = {
            status: 1,
            msg: "用户名已注册"
        }
    }else{
        //未注册可以使用的用户名
        ctx.body = {
            status: 0,
            msg: "用户名可以使用"
        }
    }
})

app.use(static(__dirname + "/static"));
app.use(router.routes());

app.listen(3000);