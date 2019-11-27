const express = require('express');

const webServer = express();
webServer.use(express.urlencoded({extended:true}));
const port = 8080;

webServer.get('/home1', (req, res) => {
    res.send(`
        <form action="http://138.197.219.113:8080/form" method="get">
            <input type="text" name="firstname">
            <input type="text" name="lastname">
            <input type="submit" value="send data">
        </form>
    `)
});

webServer.get('/form', (req, res) => {
    if(req.query.firstname === ''){
        res.send(`
            <form action="http://138.197.219.113:8080/form" method="get">
                <label>
                    <input type="text" name="firstname">
                    enter your firstname
                </label>
                <input type="text" name="lastname" value=${req.query.lastname}>
                <input type="submit" value="send data">
            </form>
        `);
    }
    else if(req.query.lastname === ''){
        res.send(`
            <form action="http://138.197.219.113:8080/form" method="get">
                <input type="text" name="firstname" value=${req.query.firstname}>
                <label>
                    <input type="text" name="lastname">
                    enter your lastname
                </label>
                <input type="submit" value="send data">
            </form>
        `);
    }
    else{
        res.send(`<h1>Success</h1>`)
    }
});

webServer.listen(port);
console.log('server started');