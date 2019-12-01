const Koa = require("koa")
const Router = require("koa-router")
const static = require("koa-static")
const koaBody = require("koa-body")

let app = new Koa();
let router = new Router();
app.use(koaBody())
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

router.get("/testGetAjax", ctx => {
    let queryObj = ctx.request.query;
    console.log("GET请求--------------------------")
    console.log(queryObj);
    ctx.body = {
        status: 1,
        msg: "get请求成功"
    }
    
})

router.post("/testPostAjax", ctx => {
    let bodyObj = ctx.request.body;
    console.log("POST请求--------------------------")
    console.log(bodyObj);
    ctx.body = {
        status: 1,
        msg: "post请求成功"
    } 
})

app.listen(3000); 