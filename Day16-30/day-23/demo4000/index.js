const Koa = require("koa");
const Router = require("koa-router");
const static = require("koa-static");
const koaBody = require("koa-body");
const axios = require("axios");

let app = new Koa();
let router = new Router();
app.use(static(__dirname + "/static"));
app.use(koaBody({
    multipart: true
}))

router.get("/", ctx => {
    ctx.body = "hello 4000";
})

router.get("/users", ctx => {
    ctx.body = [
        {
            id: 1,
            name: "gqf - 4000",
            gender: "M"
        },
        {
            id: 2,
            name: "zhangsan - 4000",
            gender: "F"
        }
    ]
})

app.use(router.routes());
app.listen(4000);