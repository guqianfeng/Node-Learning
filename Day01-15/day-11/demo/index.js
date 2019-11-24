const Koa = require("koa");
const Router = require("koa-router");
const views = require("koa-views");

let app = new Koa(); //实例化koa
let router = new Router(); //后端路由
//指定模板引擎页面放在哪个目录下，使用的是hug模板
app.use(views(__dirname + "/views", {
    map: {
        html: "hug"
    }
}));
//路由
router.get("/", async ctx => {
    ctx.body = "hello koa";
});
router.get("/index", async ctx => {
    ctx.body = "index";
});
router.get("/detail", async ctx => {
    ctx.body = "detail";
});

app.use(router.routes());//使用路由
app.listen(3000);//监听3000端口
