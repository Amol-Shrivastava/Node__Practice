const connect = require('connect');
const util = require('util');

const logit = (req, res, next) => {
    util.log(util.format('Request received: %s, %s', req.method, req.url));
    next();
}

const echo = (req, res) => {
    req.pipe(res)
}

connect()
.use(logit)
.use('/echo', echo)
.use((req, res, next) => res.write('Wassup'))
.listen(3000);
console.log('Server is running on port 3000 middleware');

// const http = require('http');
// const fs = require('fs');
// const path = require('path');
// const { send } = require('process');

// function send404(res) {
//     res.writeHead(404, {'Content-Type': 'text/html'});
//     fs.createReadStream('../public/404.html').pipe(res);
// }

// const mimeTable = {
//     '.js': 'application/javascript',
//     '.html': 'text/html',
//     '.css': 'text/css'
// }

// const server = http.createServer((req, res) => {
//  if(req.method == 'GET') {
//     let fileUrl = '';
    
//     if(req.url == '/' || req.url == '/home') fileUrl = '/index.html';
//     else fileUrl = req.url;
 
//     console.log(`requested url : ${fileUrl}`);
//     const filePath = path.resolve('../public'+ fileUrl);
//     console.log(`filePath requested: ${filePath}`);
//     console.log('-------------------');

//     const fileExt = path.extname(filePath);
//     const mimeType = mimeTable[fileExt];

//     if(!mimeType){
//         send404(res);
//         return;
//     }

//     fs.exists(filePath, (file) => {
//         if(!file){
//             send404(res);
//             return;
//         }
        
//         fs.createReadStream(filePath).pipe(res);
//     })

//  }else{
//     send404(res);
//     return;
//  }
// }).listen(3000);
// console.log('Broda server is running on port 3000.');


