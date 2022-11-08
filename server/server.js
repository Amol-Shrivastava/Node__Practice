const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const sessionCookie = require('cookie-session');
const cookieSession = require('cookie-session');
const app = express();

//1. Basic cookie example
// app.use((req, res, next) => {
//     // res.cookie('name', 'Amol');
//     // res.send('Hello Welcome to first cookie example.');
// }).listen(3000);

//2. Cookie Parser example converting header cookie into js object
// app.use(cookieParser())
// .use((req, res) => {
//     // console.log(req.headers);
//     // console.log(res.headers);
//     if(req.cookies.name)
//         console.log(`User Name : ${req.cookies.name}`)
//     else res.cookie('name', 'Amol');
// }).listen(3000);

//3. Clear Cookie data
// app.use(cookieParser())
// .use('/toggle', (req, res) => {
//     if(req.cookies.name){
//         res.clearCookie('name');
//         res.end(`Cookie deleted with value ${req.cookies.name}`);
//     }else{
//         res.cookie('name', 'Burdd');
//         res.end('name Cookie Set');
//     }
// }).listen(3000)

// //4. Signed Cookie
// app.use(cookieParser('This is my first signed Cookie'))
// .use((req, res) => {
//     if(req.signedCookies.name){
//         res.clearCookie('name')
//         res.send(`value of cookie deleted: ${req.signedCookies.name}`);
//     }else{
//         res.cookie('name', 'VKKB', {signed: true});
//         res.send(`Value of signed cookie set: ${req.signedCookies.name}`)
//     }
// }).listen(3000)

// 5. httpOnly Cookie can't be accessed using document.cookie
// app.use(cookieParser())
// .use((req, res) => {
//     if(req.cookies.name){
//         res.clearCookie('name');
//         res.send('Value of deleted cookie: '+req.cookies.name);
//     }else{
//         res.cookie('name', 'kkjd', {httpOnly: true});
//         res.send(`Now the cookie can't be accessed using document.cookie`);
//     }
// }).listen(3000)

//6. Secure cookie sent over HTTPS only
// app.use(cookieParser())
// .use((req, res) => {
//     if(req.cookies.name) {
//         res.clearCookie('name');
//         res.send('Value of secure cookie deleted: '+req.cookies.name)
//     }else{
//         res.cookie('name', 'resteer', {secure: true});
//         res.send('Now cookie can only be shared over https')
//     }
// }).listen(3000);

//7. Session Cookie --> Used to store user specific information
app.use(sessionCookie({
    keys: ['This is my first session cookie']
}))
.use(cookieSession({
    name: 'Session__Cookie_first',
    keys: 'This is my custom session object key'
}))
.use('/home',(req, res) => {
    if(req.session.views){
        req.session.views++;
        req.cookieS('name', 'sessionCookie')
    }
    else 
        req.session.views = 1;
    
    res.end(`Total views for you: ${req.session.views}`)
})
.use('/reset', (req, res) => {
    delete req.session.views;
    res.end('Cleared the view session')
}).listen(3000);


console.log('Broda express server is running on port 3000');