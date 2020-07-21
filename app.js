const http = require('http');
const fs = require('fs');

const server = http.createServer((req,res)=>{

    const url = req.url;
    const method = req.method;
    if(url==='/'){
        res.write('<html>');
        res.write('<head><title>Enter message</title></head>')
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        return res.end();
    }
    if(url==='/message' && method ==='POST'){
        fs.writeFileSync('message.txt','DUMMY');
        res.statusCode = 302;
        res.setHeader('Location','/');
        return res.end();
    }

    res.setHeader('Content-type','text/html');
    res.write('<html>');
    res.write('<head><title>My first page</title></head>')
    res.write('<body><h1>Hello from my Node.js</h1></body>');
    res.write('</html>');
    res.end();
});

server.listen(3000);