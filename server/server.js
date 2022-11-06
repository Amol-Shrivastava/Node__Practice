const express = require('express');
const serverStatic = require('serve-static');
const serveIndex = require('serve-index');
const path = require('path');



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
app
.use(express.static(path.join(__dirname, '..', 'public')))
.use('/js',serveIndex(path.join(__dirname, '..', 'public','js'), {
    'icons':true,
    stylesheet: stylePath
})).listen(3000);
console.log(path.join(__dirname, '..', 'public','js'));

console.log('Broda express server is running on port 3000');