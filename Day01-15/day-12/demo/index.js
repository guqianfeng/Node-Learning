const Koa = require("koa");
const Router = require("koa-router");
const nunjucks = require("koa-nunjucks-2");

let app = new Koa();
let router = new Router();
app.use(nunjucks({
    ext: "html", //.njk 文件后缀，这里用的html
    path: __dirname + "/views", //引擎所放在的目录
    nunjucksConfig: {
        trimBlocks: true, //防止xxs漏洞
    }
}))
router.get('/', async ctx => {
    // ctx.body = "hello nunjucks";
    await ctx.render("index", {
        username: "张三",
        num: 3,
        arr: [
            {
                petName: "大黄",
                age: 3
            },
            {
                petName: "小黑",
                age: 4
            }
        ],
        str: "hello world"
    });
})

router.get("/son1", async ctx => {
    await ctx.render("son1");
})

router.get("/import", async ctx => {
    await ctx.render("import");
});


app.use(router.routes());
app.listen(3000);