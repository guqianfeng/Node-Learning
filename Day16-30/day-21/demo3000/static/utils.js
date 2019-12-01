function ajax(opts) {
    let defaultOptions = {
        url: "",
        method: "get",
        data: "",
        async: true,
        //<form action="" enctype="application/x-www-form-urlencoded"></form>
        header: {
            "content-type": "application/x-www-form-urlencoded"
        },
        dataType: "json",
        jsonp: "cb",
        success(res) {

        }
    }
    let newOpts = Object.assign(defaultOptions, opts);

    //处理jsonp,dataType需要传入jsonp
    if(newOpts.dataType === "jsonp"){
        jsonpFn(newOpts.url,newOpts.data,newOpts.jsonp,newOpts.success);
        return; //jsonp请求就不需要后面的ajax了所以return
    }

    let xhr = new XMLHttpRequest();    
    if(newOpts.method.toLowerCase() === "get"){
        xhr.open(newOpts.method, newOpts.url + "?" + obj2UrlStr(newOpts.data), newOpts.async);
    }else{
        xhr.open(newOpts.method, newOpts.url, newOpts.async);
    }
    xhr.setRequestHeader("content-type", newOpts.header["content-type"])
    xhr.onload = function () {
        newOpts.success(newOpts.dataType === "json" ? JSON.parse(xhr.responseText) : xhr.responseText);
    }
    if(newOpts.method.toLowerCase() === "get"){
        xhr.send()
    }else{
        xhr.send(obj2UrlStr(newOpts.data))
    }
}

function obj2UrlStr(obj) {
    return Object.keys(obj).map(item => item + "=" + obj[item]).join("&");
}


function jsonpFn(url, data, cbName, cbFn){
    let fnName = "GQF_" + Math.random().toString(16).substring(2);
    window[fnName] = cbFn;
    let path = url + "?" + obj2UrlStr(data) + "&" + cbName + "=" + fnName;
    let scriptEle = document.createElement("script");
    scriptEle.src = path;
    document.querySelector("head").appendChild(scriptEle);
}
