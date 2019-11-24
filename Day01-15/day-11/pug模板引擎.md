# pub模板引擎
> 知识大纲
* 模板引擎 - web应用中动态生成html的工具
* 本章介绍的是pug模板，原名是jade

> 练习
1. 在demo下初始化package.json, `cnpm init -y`
2. 安装下我们需要的模块，这里用到koa的一些模块,后续会补充相关知识,使用
    ```
    cnpm i koa koa-router koa-views pug
    ```
3. 在demo下新建一个**index.js** 
4. 在index中注入灵魂
    ```
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

    ```  
5. 启动node,分别访问**http://localhost:3000/**, **http://localhost:3000/index**, 
    **http://localhost:3000/detail**,就能看到展示不一样的页面   
    
6. 在demo下新建个文件夹取名为views，这个就是我们前面设置的views路径  
7. 新建个index.pug 

> 知道你不过瘾继续吧
* [目录](../../README.md)
* [上一篇-stream流](../day-10/stream流.md)