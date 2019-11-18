const http = require("http");

const server = http.createServer((req, res) => {
    res.write("hello node, hello world, i love node~~");
    res.end();
});

server.listen(1234);