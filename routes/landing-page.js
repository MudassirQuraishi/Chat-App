const express = require('express');

const bodyParser = require('body-parser');

const router = express.Router();

router.use(bodyParser.urlencoded({extended: true}));


const code = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chat App</title>
</head>
<body>
    <h1>Welcome to chat app</h1>
    <h4>Please login to continue</h4>
    <form action="" method="post" id ="form">
        <input type="text" name="username" id="username">
        <button type="submit">Login</button>
    </form>
    <script>
        const myform = document.getElementById('form');

        myform.addEventListener('submit',()=>{
            const name = document.getElementById('username');
            console.log(name.value);
            localStorage.setItem('username', name.value);
        });
    </script>
</body>
</html>`;

router.get('/',(req,res,next)=>{
    res.send(code);
})
router.post('/',(req,res,next)=>{
    res.redirect('/user');
})

module.exports= router;