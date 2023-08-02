const express = require('express');
const bodyParser = require('body-parser');
const fs= require('fs');

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }))

const htmlCode = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chat App</title>
</head>
<body>
    <h1></h1>
    <h4>Enter a message to start converstaion</h4>
    <form action="/user" method="post" id="form">
       <input type="hidden" name="username" id="username">
       <input type="text" name="message" id="message">
       <button type="submit">Send Message</button>
       <h2>Messages</h2>
       <ul >
            <!-- This will be populated with products from the products.txt file -->
            <!-- Server-side rendering will add the li elements here -->
        </ul>
    </form>
    <script>
        const form = document.getElementById('form');
        const username = document.getElementById('username');
        const messages = document.getElementById('messages');
        window.addEventListener('DOMContentLoaded',()=>{
            username.value = localStorage.getItem('username');
        })
    </script>
</body>
</html>`;

router.get('/',(req,res,next)=>{

    const messagesContent = fs.readFileSync('messages.txt', 'utf8');
    const messages = messagesContent.split('\n');
    const message = messages.map((messages) => `<li>${messages}</li>`).join('');
    const updatedCode = htmlCode.replace(`<!-- Server-side rendering will add the li elements here -->`,message)

    res.send(htmlCode);
})
router.post('/',(req,res,next)=>{

    const username = req.body['username'];
    const message = req.body['message'];
    const display =`${username}: ${message} \n`;

    try {
        fs.appendFileSync('messages.txt', display);
    } catch (err) {
        console.error('Error appending product:', err);
        return res.status(500).send('Error saving messages');
    }

    res.redirect('/user');
})

module.exports = router;
