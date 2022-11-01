const http = require('http');
const fs = require('fs');

const send404 = (res) => {
const msg = 'Error 404 => Resource cannot be found';
 res.writeHead(404, {
    'Content-Type': 'text/plain'
 })
 res.write(msg);
 res.end();
}

const server = http.createServer((req, res) => {
    if(req.method == 'GET' && req.url == '/') {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        fs.createReadStream('../index.html').pipe(res);
    }else{
        send404(res);
    }
}).listen(3000);

console.log('Server is running on port 3000');