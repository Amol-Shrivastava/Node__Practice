const express = require('express');
const path = require('path');

const app = express();

//1. API BASICS 
// app.all('/', (req, res, next) => {
//     res.write('Called all HTTP verb \n');
//     next();
// })

// app.get('/', (req, res, next) => {
//     res.end('Called get HTTP verb');
// })

// app.post('/', (req, res, next) => {
//     res.end('Called post HTTP verb')
// })

// app.put('/', (req, res, next) => {
//     res.end('Called put HTTP verb');
// })

// app.delete('/', (req, res, next) => {
//     res.end('Called delete HTTP verb');
// })

//2. app.route() 
// app.route('/')
// .all((req, res, next)=> {
//     res.write('all');
//     next();
// }).get((req, res) => {
//     res.end('GET');
// }).put((req,res)=> {
//     res.end('PUT');
// }).post((req, res) => {
//     res.end('POST');
// }).delete((req, res) => {
//     res.end('DELETE');
// })

//3. parameter based routing
app.get('/user/:userId', (req, res, next) => {
    if(req.params['userId']){
        res.end(JSON.stringify(req.params['userId']));
    }else{
        res.end('Nothing passed user_id parameter');
    }
})

app.put('/user/:put_value', (req, res, next) => {
    if(req.params['put_value'])
        res.end(JSON.stringify(req.params['put_value']))
    else
        res.end('Nothing passed in put_value parameter')
})

app.listen(3000);

console.log('Broda express server is running on port 3000');