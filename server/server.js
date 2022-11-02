const http = require('http');
const fs = require('fs');
const path = require('path');


const send404 = (res) => {
const msg = 'Error 404 => Resource cannot be found';
 res.writeHead(404, {
    'Content-Type': 'text/html'
 })
fs.createReadStream('../public/404.html').pipe(res);
}

const mimeLookUp = {
    '.js': 'application/javascript',
    '.html': 'text/html',
    '.css': 'text/css'
}

const server = http.createServer((req, res) => {
    let count = 0;
   if(req.method == 'GET') {
    let fileUrl = '';
    if(req.url == '/' || req.url == '/home') fileUrl = '/index.html';
    else fileUrl = req.url;
    let filePath = path.resolve('../public'+fileUrl);

    let fileExt = path.extname(filePath);
    let mimeType = mimeLookUp[fileExt];
    console.log(`${count+1} => ${req.url} `);
    console.log(`fileExt: ${fileExt}`);
    console.log(`mimeType: ${mimeType}`);
    console.log(`fileUrl: ${fileUrl}`);


    if(!mimeType) {
        send404(res);
        return;
    }

    fs.exists(filePath, (exists) => {
        if(!exists){
            send404(res);
            return;
        }
        res.writeHead(200, {'Content-Type': mimeType});
        console.log(`filePath : ${filePath}`);
        fs.createReadStream(filePath).pipe(res);
    })

   }else{
    send404(res)
   }
    
}).listen(3000);

console.log('Server is running on port 3000');