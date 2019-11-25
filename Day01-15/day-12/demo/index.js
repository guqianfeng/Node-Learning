const Koa = require("koa");
const Router = require("koa-router");
const nunjucks = require("koa-nunjucks-2");

let app = new Koa();
let router = new Router();
app.use(nunjucks({
    ext: "html", //.njk 文件后缀，这里用的html
    path: __dirname + "views", //引擎所放在的目录
    nunjucksConfig: {
        trimBlocks: true, //防止xxs漏洞
    }
}))
router.get('/', ctx => {
    ctx.body = "hello nunjucks";
})


app.use(router.routes());
app.listen(3000);