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

app.listen(3000);