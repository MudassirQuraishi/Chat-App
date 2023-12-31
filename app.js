//importing epxress
const express = require('express');

//custom importing routes
const landingPageRouter = require('./routes/landing-page');
const userRouter = require('./routes/user');

const app = express();

//middleware
app.use('/login', landingPageRouter);
app.use('/user', userRouter);

app.use((req,res,next)=>{
    res.status(404).send('<h1>Error 404</h1><h1>Page not found</h1>')
})

//starting sever
const port = 2000;
console.log(`Starting server at ${port}`);
app.listen(port);