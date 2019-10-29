//nodejs imports
const fs = require('fs');
var cors = require('cors')
const express = require('express');
const app = express();
const request = require('request-promise');
//log for app startup
console.log('[ App: Start ][ ApiSys ]');
//array of all urls
const urls = [
    `https://newsapi.org/v2/top-headlines?country=gb&pageSize=3&apiKey=4c75d0c75a2c41f9a1c8563fa358e81b`,
    `https://newsapi.org/v2/top-headlines?sources=wired&language=en&apiKey=4c75d0c75a2c41f9a1c8563fa358e81b`,
    `https://newsapi.org/v2/top-headlines?sources=techradar&language=en&apiKey=4c75d0c75a2c41f9a1c8563fa358e81b`,
];
//array of all file locations
const files = [
    './json/break_news.json',
    './json/tech_news_wired.json',
    './json/tech_news_techradar.json',
];
//allow Cross-Origin Resource Sharing
app.use(cors())
//api get request function
app.get('/newstech/wired', (req, res) => {
    //opens the request file to send back
    var techrawdata = fs.readFileSync('./json/tech_news_wired.json');
    var techdata = JSON.parse(techrawdata);
    //log to show that the file has been read
    console.log('[ Read: TechWired ]');
    //response sending
    res.send(techdata);
    //log to say the the file has been sent
    console.log('[ Sent: TechWired ]');
});

app.get('/newstech/techradar', (req, res) => {
    var techrawdata = fs.readFileSync('./json/tech_news_techradar.json');
    var techdata = JSON.parse(techrawdata);
    console.log('[ Read: TechTechRadar ]');
    res.send(techdata);
    console.log('[ Sent: TechTechRadar ]');
});

app.get('/newsbreak', (req, res) => {
    var breakrawdata = fs.readFileSync('./json/break_news.json');
    var breakdata = JSON.parse(breakrawdata);
    console.log('[ Read: NewsBreak ]');
    res.send(breakdata);
    console.log('[ Sent: NewsBreak ]');
});

app.listen(process.env.PORT || 54321, function () {
    console.log("[ Port: %d ][ Mode: %s ]", this.address().port, app.settings.env);
});
//log for app startup
console.log('[ App: Start ][ FileSys ]');
//function to make a request and write the data to file
async function getdata() {
    //makes a request to the news api
    try {
        //loop to request all articles
        for (var num = 0, len = urls.length; num < len; num++) {
            //makes a request to the news api
            const response = await request.get(`${urls[num]}`);
            console.log(response);
            //log that request has been made to certain url
            console.log('[ Request: ' + urls[num] + ']');
            //gets the data and writes it to file
            var filedata = response;
            fs.writeFileSync(files[num], filedata);
            //log that the news file has been written
            console.log('[ Write: ' + files[num] + ']');
        };
        //error
    } catch (error) {
        console.log(error.message);
    };
};
//timer for api gets
setInterval(getdata, 900000);