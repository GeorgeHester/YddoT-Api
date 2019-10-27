const fs = require('fs');
const request = require('request');
const editjson = require("edit-json-file");

console.log('[ App: Start ]');
/*
var daydata = new Date();
var mins = daydata.getMinutes();
var oldmins = 00;

if (mins != oldmins) {

    oldmins = mins;

    if (mins == 00 || mins == 15 || mins == 30 || mins == 45) {



    };

};*/

function getdata(url, file) {

    return new Promise((resolve, reject) => {

        request(url, (error, response, body) => {

            if (error) reject(error);

            if (response.statusCode != 200) {

                reject('Invalid status code <' + response.statusCode + '>');

            };

            resolve(body);

        });

    });

};

async function getrequests() {
    var request = await getdata('https://newsapi.org/v2/top-headlines?country=gb&language=en&apiKey=4c75d0c75a2c41f9a1c8563fa358e81b');
    console.log(request);
};

/*
async function getdata(mins) {

    request('https://newsapi.org/v2/top-headlines?country=gb&language=en&apiKey=4c75d0c75a2c41f9a1c8563fa358e81b', { json: true }, (err, res, body) => {
        if (err) {
            return console.log(err); 
        };
        
        var breakfiledata = res.body;
        var filedata = JSON.stringify(breakfiledata);
        fs.writeFileSync('./json/break_news.json', filedata);

        console.log(`[ Mins: ${mins} ][ Url: https://newsapi.org/v2/top-headlines?country=gb&language=en&apiKey=4c75d0c75a2c41f9a1c8563fa358e81b ]`);
        console.log('[ Source: breaking ]');

    });

    request('https://newsapi.org/v2/top-headlines?sources=wired&language=en&apiKey=4c75d0c75a2c41f9a1c8563fa358e81b', { json: true }, (err, res, body) => {
        if (err) {
            return console.log(err); 
        };
        
        var techwiredfiledata = res.body;
        var filedata = JSON.stringify(techwiredfiledata);
        fs.writeFileSync('./json/tech_news_wired.json', filedata);

        console.log(`[ Mins: ${mins} ][ Url: https://newsapi.org/v2/top-headlines?sources=wired&language=en&apiKey=4c75d0c75a2c41f9a1c8563fa358e81b ]`);
        console.log('[ Source: wired ]');

    });

    request('https://newsapi.org/v2/top-headlines?sources=techradar&language=en&apiKey=4c75d0c75a2c41f9a1c8563fa358e81b', { json: true }, (err, res, body) => {
        if (err) {
            return console.log(err); 
        };
        
        var techradarfiledata = res.body;
        var filedata = JSON.stringify(techradarfiledata);
        fs.writeFileSync('./json/tech_news_techradar.json', filedata);

        console.log(`[ Mins: ${mins} ][ Url: https://newsapi.org/v2/top-headlines?sources=techradar&language=en&apiKey=4c75d0c75a2c41f9a1c8563fa358e81b ]`);
        console.log('[ Source: techradar ]');

    });

};*/

while (true) {

    var daydata = new Date();
    var mins = daydata.getMinutes();
    mins = 15;

    var timerawdata = fs.readFileSync('./json/times.json');
    var timefile = JSON.parse(timerawdata);
    var timejsonfile = editjson(`${__dirname}/json/times.json`);

    if (mins == 00 || mins == 15 || mins == 30 || mins == 45) {

        if (mins == 00 && timefile.check.a == "false") {
            timejsonfile.set("check.a", "true");
            timejsonfile.save();
            getdata(mins);
        };

        if (mins == 15 && timefile.check.b == "false") {      
            timejsonfile.set("check.b", "true");
            timejsonfile.save();
            getrequests();
        };

        if (mins == 30 && timefile.check.c == "false") {        
            timejsonfile.set("check.c", "true");
            timejsonfile.save();
            getdata(mins);
        };

        if (mins == 45 && timefile.check.d == "false") {       
            timejsonfile.set("check.d", "true");
            timejsonfile.save();
            getdata(mins);
        };

    };

    if (mins == 46) {
        
        timejsonfile.set("check.a", "false");
        timejsonfile.set("check.b", "false");
        timejsonfile.set("check.c", "false");
        timejsonfile.set("check.d", "false");
        timejsonfile.save();

    };

    setTimeout(() => {
        console.log('[ Timeout ]')
    }, 1000)

};