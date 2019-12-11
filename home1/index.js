const express = require('express');
const webServer = express();
const hostInfo  = require('../config');

webServer.use(express.urlencoded({extended:true}));

webServer.get('/home1', (req, res) => {
    res.send(`
        <form action="${hostInfo.host}/form" method="get">
            <input type="text" name="firstname">
            <input type="text" name="lastname">
            <input type="submit" value="send data">
        </form>
    `)
});

webServer.get('/form', (req, res) => {
    if(req.query.firstname === ''){
        res.send(`
            <form action="${hostInfo.host}/form" method="get">
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
            <form action="${hostInfo.host}/form" method="get">
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

webServer.listen(hostInfo.port);
console.log('server started');