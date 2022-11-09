const express = require('express');
const path = require('path');

const app = express();

app.all('/', (req, res, next) => {
    res.write('Called all HTTP verb \n');
    next();
})

app.get('/', (req, res, next) => {
    res.end('Called get HTTP verb');
})

app.post('/', (req, res, next) => {
    res.end('Called post HTTP verb')
})

app.put('/', (req, res, next) => {
    res.end('Called put HTTP verb');
})

app.delete('/', (req, res, next) => {
    res.end('Called delete HTTP verb');
})

app.listen(3000);

console.log('Broda express server is running on port 3000');