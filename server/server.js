const express = require('express');
const path = require('path');
const timeout = require('connect-timeout');
const fs = require('fs');
// const serverStatic = require('serve-static');
// const serveIndex = require('serve-index');
// const compression = require('compression');



const app = express();
const stylePath = path.join(__dirname, '..', 'public', 'styles.css');

//1. Simple server initialisation and running using express middleware
// app.use((req, res, next)=> {
//     res.end('Welcome to express server.');
// }).listen(3000);

//2. Directory module
// app.use(serverStatic(path.join(__dirname, '..', 'public'))).listen(3000);
// console.log(path.join(__dirname, '..', 'public', 'js'));
// console.log(__filename);

//3. Show directory
// app
// .use(express.static(path.join(__dirname, '..', 'public')))
// .use('/js',serveIndex(path.join(__dirname, '..', 'public','js'), {
//     'icons':true,
//     stylesheet: stylePath
// })).listen(3000);


//4. Compression of different files
// app.use(compression())
// .use(express.static(path.join(__dirname, '..', 'public'))).listen(3000);

//5. Connect timeout to prevent hanging client request
// app.use(timeout())
// .use('/api', timeout(5000), (req, res, next) => {
//     // Simulates a hanging request by doing sth
// }, (err, req, res, next) => {
//     if(req.timedout){
//         res.send('Sorry for the inconvenience');
//         // res.writeHead(500, {'content-type': 'text/html'});
//         fs.createReadStream(path.join(__dirname, '..', 'public', '404.html'))
//         // res.send('Looks like Resources are busy. Please try again after sometime');
//     }
//     else
//     next(err);
// }).listen(3000);


//6. Sudden Awakening of the middleware
// app.use(timeout(5000))
// .use((req, res, next) => {
//     setTimeout(()=> {
//         next();
//     }, 6000)
// }).use((req,res,next) => {
//     res.send('Done')
// }).listen(3000);

//7. Above error handling
app.use(timeout(5000))
.use((req, res, next) => {
    setTimeout(()=> {
        res.send('Inside setTimeout function');
        next();
    }, 6000)
}).use(haltOnTimeout)
.use((req, res, next) => {
    res.send('This code must not execute')
}).listen(3000);

function haltOnTimeout(req, res, next){
    if(!req.timedout) next();
}

// console.log(path.join(__dirname, '..', 'public','js'));

console.log('Broda express server is running on port 3000');