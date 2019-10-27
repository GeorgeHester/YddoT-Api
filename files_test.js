const fs = require('fs');
const request = require('request-promise');
const editjson = require("edit-json-file");

async function getdata(url, file) {

    request(url, { json: true }, (err, res, body) => {
        if (err) {
            return console.log(err); 
        };
        
        var rawfiledata = res.body;
        let filedata = JSON.stringify(rawfiledata);
        fs.writeFileSync(file, filedata);

        console.log('Written');
    });

};

function getrequests() {

    getdata('https://newsapi.org/v2/top-headlines?country=gb&pageSize=3&apiKey=4c75d0c75a2c41f9a1c8563fa358e81b', './json/break_news.json');
    getdata('https://newsapi.org/v2/top-headlines?sources=wired&language=en&apiKey=4c75d0c75a2c41f9a1c8563fa358e81b', './json/tech_news_wired.json');
    getdata('https://newsapi.org/v2/top-headlines?sources=techradar&language=en&apiKey=4c75d0c75a2c41f9a1c8563fa358e81b', './json/tech_news_techradar.json');

};

while (true) {

    var daydata = new Date();
    var mins = daydata.getMinutes();
    mins = 15;

    var timerawdata = fs.readFileSync('./json/times.json');
    var timefile = JSON.parse(timerawdata);
    let timejsonfile = editjson(`${__dirname}/json/times.json`);

    if (mins == 00 || mins == 15 || mins == 30 || mins == 45) {

        if (mins == 00 && timefile.check.a == "false") {
            getrequests();
            timejsonfile.set("check.a", "true");
            timejsonfile.save();
        };

        if (mins == 15 && timefile.check.b == "false") {
            getrequests();
            timejsonfile.set("check.b", "true");
            timejsonfile.save();
        };

        if (mins == 30 && timefile.check.c == "false") {
            getrequests();
            timejsonfile.set("check.c", "true");
            timejsonfile.save();
        };

        if (mins == 45 && timefile.check.d == "false") {
            getrequests();
            timejsonfile.set("check.d", "true");
            timejsonfile.save();
        };

    };

    if (mins == 46) {
        
        timejsonfile.set("check.a", "false");
        timejsonfile.set("check.b", "false");
        timejsonfile.set("check.c", "false");
        timejsonfile.set("check.d", "false");
        timejsonfile.save();

    };

};