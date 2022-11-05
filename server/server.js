const express = require('express');

const app = express();

app.use((req, res, next)=> {
    res.end('Welcome to express server.');
}).listen(3000);

console.log('Broda express server is running on port 3000');