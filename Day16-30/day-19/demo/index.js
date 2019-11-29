const Koa = require("koa");
const Router = require("koa-router");
const koaBody = require("koa-body");
const static = require("koa-static");
const fs = require("fs");
const userData = require("./data/users.json");
// console.log(userData);

let app = new Koa();
let router = new Router();

app.use(static(__dirname + "/static"));
app.use(koaBody({
  multipart: true
}));
app.use(router.routes());

router.get("/", async ctx => {
  ctx.body = "hello Koa";
});

router.get("/checkUsername", ctx => {
  let username = ctx.request.query.username;
  // console.log(username);
  let index = userData.findIndex(item => item.username === username);
  if (index > -1) {
    //说明在数据文件中找到了,已经注册了
    ctx.body = {
      status: 1,
      msg: "用户名已注册"
    };
  } else {
    //未注册可以使用的用户名
    ctx.body = {
      status: 0,
      msg: "用户名可以使用"
    };
  }
});

router.get("/get/:id", ctx => {
  console.log(ctx.params.id);
  ctx.body = {
    id: ctx.params.id
  };
});

router.post("/post", ctx => {
  console.log(ctx.request.body);
  ctx.body = {
    msg: "接收到body了",
    body: ctx.request.body
  };
});

router.get("/xml", ctx => {
//   ctx.set("content-type", "text/xml");
  ctx.body = `<xml version='1.0' encoding='utf-8'>
                    <books>
                        <nodejs>
                            <name>nodejs实战</name>
                            <price>50元</price>
                        </nodejs>
                        <vuejs>
                            <name>vue入门</name>
                            <price>45元</price>
                        </vuejs>
                    </books>
                </xml>`;
});

router.post("/upload", ctx => {
  // console.log(ctx.request.body);
  // console.log(ctx.request.files);
  let fileData = fs.readFileSync(ctx.request.files.file.path);
  let writePath = __dirname + "/static/upload/" + ctx.request.files.file.name
  // console.log(writePath);
  fs.writeFileSync(writePath, fileData);
  ctx.body = {
    status: 1,
    msg: "上传成功"
  }
})

app.listen(3000);
