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
        success(res) {

        }
    }
    let newOpts = Object.assign(defaultOptions, opts);
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
