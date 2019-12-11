const express =  require('express');
const webServer =  express();
const fs = require('fs');
const path = require('path');
// const
const hostInfo = require('../config');


webServer.get('/', (req, res) => {
    let mainContent = fs.readFileSync('views/main.html', 'utf8');
    res.send(mainContent)
});

webServer.get('/variants', (req, res) => {
    let variantContent = fs.readFileSync('views/variants.html', 'utf8');
    let replaceUrl = variantContent.replace('$$$vote$$$', `${hostInfo.host}/vote`);
    res.send(replaceUrl);
});

webServer.get('/stat', (req, res) => {
    let currentStat = JSON.parse(fs.readFileSync('json/stat.json', 'utf8'));
    let statHTML = '';

    for(var key in currentStat) {
        statHTML += `<style>
                            span{
                                display: inline-block;
                                width: 100px;
                            }
                            a{
                                text-decoration: none;
                                border: 1px solid black;
                                padding: 10px 30px;
                                display: inline-block;
                                color: #000;
                                margin-top: 20px;
                            }
                            a:hover{
                                background-color: #666;
                                color: #fff;
                    
                            }
                        </style> 
                        <p>
                            <span>${key}:</span>
                            <span>${currentStat[key]}</span>
                        </p>`
    }

    res.send(statHTML+`<a href="/">go back</a>`);
});

webServer.get('/vote', (req, res) => {
    let answer = req.query.lang;
    let currentStat = fs.readFileSync('json/stat.json', 'utf8');
    let parseCurrentStat = JSON.parse(currentStat);

    for(let key in parseCurrentStat) {
        if(key.toLowerCase() === answer.toLowerCase()) {
            parseCurrentStat[key] += 1
        }
    }
    fs.writeFileSync('json/stat.json', JSON.stringify(parseCurrentStat));
    res.send(`
        <style>
            a{
            text-decoration: none;
            border: 1px solid black;
            padding: 10px 30px;
            display: inline-block;
            color: #000;
            margin-top: 20px;
            }
            a:hover{
                background-color: #666;
                color: #fff;
    
            }
        </style>
        <h1>Thanks, Your vote is accepted</h1>
        <a href="/">go back</a>
    `)
});

webServer.listen(hostInfo.port);