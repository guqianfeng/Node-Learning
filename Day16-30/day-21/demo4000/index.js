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
    // ctx.body = "let a = 10;"
    let cb = ctx.query.cb;
    let resultObj = {
        a: 10,
        b: "20",
        c: "我随意传入个字符串试试",
        d: true,
    }
    ctx.body = `${cb}(${JSON.stringify(resultObj)})`;
})

app.listen(4000); 