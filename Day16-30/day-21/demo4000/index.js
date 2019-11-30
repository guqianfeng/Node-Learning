const Koa = require("koa")
const Router = require("koa-router")
const static = require("koa-static")

let app = new Koa();
let router = new Router();
app.use(static(__dirname + "/static"));
app.use(router.routes());

router.get("/", ctx => {
    ctx.body = "hello 4000";
})

router.get("/getData", ctx => {
    console.log("我们来看下这句话打印不打印~请求过来了");
    ctx.body = {
        msg: "test 4000"
    }
})

router.get("/getJsonp", ctx => {
    ctx.body = "let a = 10;"
})

app.listen(4000); 