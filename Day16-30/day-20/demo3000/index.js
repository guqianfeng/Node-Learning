const Koa = require("koa")
const Router = require("koa-router")
const static = require("koa-static")

let app = new Koa();
let router = new Router();
app.use(static(__dirname + "/static"));
app.use(router.routes());

router.get("/", ctx => {
    ctx.body = "hello 3000";
})

router.get("/getData", ctx => {
    ctx.body = {
        msg: "test 3000"
    }
})

app.listen(3000); 