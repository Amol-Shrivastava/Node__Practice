const connect = require('connect');
const util = require('util');

const logit = (req, res, next) => {
    util.log(util.format('Request received: %s, %s', req.method, req.url));
    next();
}

// const echo = (req, res) => {
//     req.pipe(res)
// }

const func1 = (msg) => {
    return ((req, res, next) => {
        res.end(msg);
    })
}

const gmFunc = func1("Good Morning :) ");
const gnFunc = func1("Good Night :| ");

const parseJSON = (req, res, next) => {
    if(req.headers['content-type']=='application/json'){

        let readData = '';
        req.on('readable', () => {
            readData += req.read();
        })

        req.on('end',()=> {
            try{
                req.body = JSON.parse(readData);
            }catch(error){
                // res.end('error');
            }

            next();
        })

    }else{
        next();
    }
}

const send401 = (res) => {
    res.writeHead(401, {'WWW-Authenticate': 'Basic'});
    res.end();
}

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log(`authHeader ==> ${authHeader}`);

    if(!authHeader){
        send401(res);
        return;
    }

    const val = authHeader.split(' ')[1];
    console.log(`val ==> ${val}`);
    const auth = Buffer.from(val, 'base64').toString().split(':');
    const user = auth[0];
    const password = auth[1];
    console.log(`username ${user} password ${password}`);
    if(user == 'foo' && password == 'bar'){
        next();
    }else{
        send401(res);
    }
}


connect()
.use(logit)
.use('/gm', gmFunc)
.use('/gn', gnFunc)
.use(parseJSON)
.use(auth)
.use((req, res) => {
    res.end('Authorized :)');
})
.use((req,res) => {
    if(req.body){
        res.end('JSON parsed!, value of foo: '+req.body.foo);
    }else{
        res.end('no JSON detected');
    }
    // console.log(req.body);
})
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


