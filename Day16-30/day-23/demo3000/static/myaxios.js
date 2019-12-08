let utils = {
    extends(a, b, c){
        for (const key in b) {
            if(b.hasOwnProperty(key)){                
                if(typeof b[key] === "function"){
                    //方法
                    a[key] = b[key].bind(c);
                }else{
                    //属性
                    a[key] = b[key]; //新的分支，混入属性
                }
            }
        }
    }
}

// console.log("自己封装的axios")
class Axios{
    constructor(){
        this.test = "一些属性";
    }
    request(config){
        // console.log("发送请求")
        // console.log(config);
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            //解构，这里还需要用到默认值的语法
            let {url="", data=null, method="get", header={}} = config;
            xhr.open(method, url, true); //这里就简单的写死了true，true代表异步
            xhr.onload = function(){
                resolve(xhr.responseText); //这里也简单的返回xhr.responseText，实际上axios这里也做了封装
            }
            xhr.send(data)
        })
    }
}

//这里就展示常用的4种
let methodArr = ["get", "post", "put", "delete"];
methodArr.forEach(method => {
    Axios.prototype[method] = function(config){
        config.method = method;
        return this.request(config)
    }
})

// console.dir(Axios);

function createInstance(){
    let context = new Axios();
    let instance = context.request;
    //把原型里的几个请求函数混入到instance里面
    utils.extends(instance, Axios.prototype, context);
    //把实例中的属性混入到instance中
    utils.extends(instance, context);
    // console.dir(instance)
    return instance;
}

let axios = createInstance();

