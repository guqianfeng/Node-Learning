const axios = require('./static/myaxios')
// console.log(axios);

axios({
    url: "http://localhost:4000/users",
}).then(res => {
    console.log(res);
})