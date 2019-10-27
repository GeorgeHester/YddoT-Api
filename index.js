const fs = require('fs');
const request = require('request');
var cors = require('cors')
const express = require('express');
const app = express();

app.use(cors())

app.get('/newstech/wired', (req, res) => {

    var daydata = new Date();
    var mins = daydata.getMinutes();

    console.log(mins);
    console.log('/newstech/wired');

    if (mins === 00 || mins === 15 || mins === 30 || mins === 45 || mins === 60) {
        request('https://newsapi.org/v2/top-headlines?sources=wired&language=en&apiKey=4c75d0c75a2c41f9a1c8563fa358e81b', { json: true }, (err, res, body) => {
            if (err) {
                return console.log(err); 
            };
            
            var techfiledata = res.body;
            let filedata = JSON.stringify(techfiledata);
            fs.writeFileSync('./json/tech_news.json', filedata);

            console.log('Written');

        });
    };

    var techrawdata = fs.readFileSync('./json/tech_news.json');
    var techdata = JSON.parse(techrawdata);
    console.log('Read');
    res.send(techdata);

});

app.get('/newstech/techradar', (req, res) => {
    
    var daydata = new Date();
    var mins = daydata.getMinutes();

    console.log(mins);
    console.log('/newstech/techradar');

    if (mins === 00 || mins === 15 || mins === 30 || mins === 40 || mins === 60) {
        request('https://newsapi.org/v2/top-headlines?sources=techradar&language=en&apiKey=4c75d0c75a2c41f9a1c8563fa358e81b', { json: true }, (err, res, body) => {
            if (err) {
                return console.log(err); 
            };
            
            var techfiledata = res.body;
            let filedata = JSON.stringify(techfiledata);
            fs.writeFileSync('./json/tech_news_2.json', filedata);

            console.log('Written');

        });
    };

    var techrawdata = fs.readFileSync('./json/tech_news_2.json');
    var techdata = JSON.parse(techrawdata);
    console.log('Read');
    res.send(techdata);

});

app.get('/newsbreak', (req, res) => {
    
    var daydata = new Date();
    var mins = daydata.getMinutes();

    console.log(mins);
    console.log('/newsbreak');

    if (mins === 00 || mins === 15 || mins === 30 || mins === 40 || mins === 60) {
        request('https://newsapi.org/v2/top-headlines?country=gb&pageSize=3&apiKey=4c75d0c75a2c41f9a1c8563fa358e81b', { json: true }, (err, res, body) => {
            if (err) {
                return console.log(err); 
            };
            
            var breakfiledata = res.body;
            let filedata = JSON.stringify(breakfiledata);
            fs.writeFileSync('./json/break_news.json', filedata);

            console.log('Written');

        });
    };

    var breakrawdata = fs.readFileSync('./json/break_news.json');
    var breakdata = JSON.parse(breakrawdata);
    console.log('Read');
    res.send(breakdata);

});

app.listen(process.env.PORT || 54321, function(){
    console.log("[ Port: %d ][ Mode: %s ]", this.address().port, app.settings.env);
});

/*         https.get('https://newsapi.org/v2/top-headlines?sources=wired&language=en&apiKey=4c75d0c75a2c41f9a1c8563fa358e81b', (resp) => {
            let data = '';

            resp.on('data', (chunk) => {
                data += chunk;
            });

            resp.on('end', () => {
                const techdatares = (JSON.parse(data).explanation);
            });
        });

        let data = JSON.stringify(techdatares);
        fs.writeFileSync('./json/tech)news.json', data); */