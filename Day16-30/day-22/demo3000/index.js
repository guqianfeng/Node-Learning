const Koa = require("koa")
const Router = require("koa-router")
const static = require("koa-static")
const koaBody = require("koa-body")

let app = new Koa();
let router = new Router();

app.use(static(__dirname + "/static"));
app.use(koaBody());
app.use(router.routes());

router.get("/", ctx => {
    ctx.body = "hello 3000";
})

router.get("/getData", ctx => {
    ctx.body = {
        status: 1,
        msg: "3000 msg"
    }
})

router.post("/test", ctx => {
    //同源 设置cookie
    ctx.cookies.set("name", "test", {
        maxAge: 1 * 60 * 60 * 1000 //设置过期时间 1个小时=60分钟=3600秒=3600*1000毫秒
    })
    ctx.body = {
        name: "test",
        age: 999,
    }
})

app.listen(3000);