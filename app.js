//nodejs imports
const fs = require('fs');
var cors = require('cors')
const express = require('express');
const app = express();
//log for app startup
console.log('[ App: Start ]');
//allow Cross-Origin Resource Sharing
app.use(cors())
//api get request function
app.get('/newstech/wired', (req, res) => {
    //opens the request file to send back
    var techrawdata = fs.readFileSync('./json/tech_news.json');
    var techdata = JSON.parse(techrawdata);
    //log to show that the file has been read
    console.log('[ Read: TechWired ]');
    //response sending
    res.send(techdata);
    //log to say the the file has been sent
    console.log('[ Sent: TechWired ]');
});

app.get('/newstech/techradar', (req, res) => {
    var techrawdata = fs.readFileSync('./json/tech_news_2.json');
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