//importing epxress
const express = require('express');

const app = express();

//starting middlewares
app.use('/',(req,res,next)=>{
    res.send('<h1>Welcome to chat application</h1>')
});


//starting sever
const port = 2000;
console.log(`Starting server at ${port}`);
app.listen(port);