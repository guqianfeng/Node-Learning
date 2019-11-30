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

> 知道你不过瘾继续吧
* [目录](../../README.md)
* [上一篇-ajax不能跨域](../day-20/ajax不能跨域.md) 