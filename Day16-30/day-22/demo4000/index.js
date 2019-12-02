const Koa = require("koa");
const Router = require("koa-router");
const static = require("koa-static");
const koaBody = require("koa-body");

let app = new Koa();
let router = new Router();

app.use(static(__dirname + "/static"));
app.use(koaBody());

app.use((ctx, next) => {
  //可以跨域的地址
  ctx.set("Access-Control-Allow-Origin", "http://localhost:3000");
  //设置请求头的信息，这里用content-type做演示，可以追加其他的属性
  ctx.set("Access-Control-Allow-Headers", "content-type");
  //设置响应头的信息，前端可以拿到，这里用date做演示，也可以追加其他的属性
  ctx.set("Access-Control-Expose-Headers", "Date");
  //设置方法
  ctx.set("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  //允许携带凭证
  ctx.set("Access-Control-Allow-Credentials", true);
  next();
});

app.use(router.routes());

router.options("/*", ctx => {
  ctx.body = "";
});

router.get("/", ctx => {
  ctx.body = "hello 4000";
});

router.get("/getData", ctx => {
  ctx.body = {
    status: 1,
    msg: "4000 msg"
  };
});
 
router.post("/testData", ctx => {
    console.log(ctx.request.headers);
    ctx.body = {
        status: 1,
        msg: "test data in 4000"
      };
})

app.listen(4000);
