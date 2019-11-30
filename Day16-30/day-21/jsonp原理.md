# jsonp原理

> 知识大纲
* jsonp是解决跨域的一种方式
* 不受同源策略影响的资源引入
    1. script
    2. img
    3. link
    4. iframe

> 练习 
1. 还是之前的项目，我们在3000的项目下新建一个页面，取名叫script.html
2. 不受同源策略影响的资源引入，其实很简单,我们百度随便搞个图片下来 
    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
    </head>
    <body>
        <h1>不受同源策略影响的资源引入</h1>
        <img src="http://b-ssl.duitang.com/uploads/item/201208/30/20120830173930_PBfJE.jpeg" alt="">
    </body>
    </html>    
    ``` 
3. 很明显，我们引入的图片协议相同，域名不同，端口也不同，根据定义属于跨域，但img是属于不受同源策略影响的资源引入，所以依然能够展示这个图片

    ![](./images/演示img标签.jpg)

4. script标签也是这样，我们也可以简单测试下，复制下vue官网的script标签，引入vue    
    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
        <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    </head>
    <body>
        <h1>不受同源策略影响的资源引入</h1>
        <img src="http://b-ssl.duitang.com/uploads/item/201208/30/20120830173930_PBfJE.jpeg" alt="">
        <script>
            {
                console.log(Vue);
            }
        </script>
    </body>
    </html>    
    ```
5. 然后打开页面看下

    ![](./images/演示script标签.jpg)

6. 既然知道原理了那我们就可以这么操作下了
    1. 先在4000端口的项目中，新写个接口 
        ```js
        router.get("/getJsonp", ctx => {
            ctx.body = "let a = 10;"
        })    
        ```
    2. 然后在3000端口的项目中的script.html的页面中引入 
        ```html
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Document</title>
            <!-- <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script> -->
            <script src="http://localhost:4000/getJsonp"></script>
        </head>
        <body>
            <h1>不受同源策略影响的资源引入</h1>
            <img src="http://b-ssl.duitang.com/uploads/item/201208/30/20120830173930_PBfJE.jpeg" alt="">
            <script>
                {
                    // console.log(Vue);
                    console.log(a);
                }
            </script>
        </body>
        </html>        
        ```    
    3. 可以看到我们引入的script标签的写法是`<script src="http://localhost:4000/getJsonp"></script>`
    4. 然后我们在自己写的js中打印了a,来看下结果吧  

        ![](./images/打印a.jpg)  

    5. 以上代码就是最简单的一个jsonp的实现   
    6. 但这样的实现并不是很好，我们可以动态创建script实现请求
    7. 我们在重新新开个页面，在3000的项目中的static下新建个jsonp.html
        ```html
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Document</title>
        </head>
        <body>
            <h1>动态创建script</h1>
            <button>动态的哦</button>
            <script>
                {
                    let oBtn = document.querySelector("button");
                    oBtn.addEventListener("click", e => {
                        let scriptEle = document.createElement("script");
                        scriptEle.src = "http://localhost:4000/getJsonp";
                        document.querySelector("head").appendChild(scriptEle);
                        //console.log(a) //这个会报错,因为还没有加载好scirpt标签
                        scriptEle.onload = function(){
                            //注意这里一定要onload否则取不到a，因为是异步的
                            console.log(a);
                        }
                    },{once: true})
                }
            </script>
        </body>
        </html>
        ```
    8. 虽然前端页面依然能拿到我们的值，但这样的写法并不好，一般我们会传入一个回调函数，然后由后端在处理好返回给我们，代码如下 
        1. 先来看下3000里的页面该怎么写
            ```js
            function cbfn(res){
                console.log(res);
            }

            let oBtn = document.querySelector("button");
            oBtn.addEventListener("click", e => {
                let scriptEle = document.createElement("script");
                scriptEle.src = "http://localhost:4000/getJsonp?cb=cbfn";
                document.querySelector("head").appendChild(scriptEle);
                //console.log(a) //这个会报错,因为还没有加载好scirpt标签
                scriptEle.onload = function(){
                    //注意这里一定要onload否则取不到a，因为是异步的
                    // console.log(a);
                }
                
            },{once: true})
            ```  
        2. 注意2个地方，在这个页面里面首先我们先定义了cbfn的函数，它调用的时机，其实是在请求ajax成功后才会去调用，其次看我们ajax的url,我们在url后面拼接了query,`cb=cbfn`,cb作为个key，是让后端去取，cbfn则是我们定义的方法名，可以让后端动态的获取，方便之后jsonp传回前端在调用
        3. 我们在来看下4000的后端代码就知道了
            ```js
            router.get("/getJsonp", ctx => {
                // ctx.body = "let a = 10;"
                let cb = ctx.query.cb; //拿到前端定义的方法名
                let resultObj = {
                    a: 10,
                    b: "20",
                    c: "我随意传入个字符串试试",
                    d: true,
                }
                ctx.body = `${cb}(${JSON.stringify(resultObj)})`; //这边就是传入前端后,在调用这个方法，把具体需要的值传进去前端就能拿到
            })
            ```
        4. 页面操作把就可以看到效果了 

            ![](./images/jsonp奥义.png) 

7. 我们做一个jsonp的ajax封装 
    1. 我们先来封装ajax,在3000的static下新建个工具类`utils.js`            

> 知道你不过瘾继续吧
* [目录](../../README.md)
* [上一篇-ajax不能跨域](../day-20/ajax不能跨域.md) 