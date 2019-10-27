//nodejs imports
const fs = require('fs');
const request = require('request-promise');
const editjson = require("edit-json-file");

console.log('[ App: Start ]');

//function to make a request and write the data to file
async function getdata(url, file) {

    //testing log
    console.log('hello')

    //makes a request to the news api
    request(url, { json: true }, (err, res, body) => {
        if (err) {
            return console.log(err); 
        };
        
        //gets the data and writes it to file
        let rawfiledata = res.body;
        let filedata = JSON.stringify(rawfiledata);
        fs.writeFileSync(file, filedata);

        //testing log
        console.log('Written');
    });

};

//function with all requests needed to be made
function getrequests() {

    //sends the url and file data to the request function
    getdata('https://newsapi.org/v2/top-headlines?country=gb&pageSize=3&apiKey=4c75d0c75a2c41f9a1c8563fa358e81b', './json/break_news.json');
    getdata('https://newsapi.org/v2/top-headlines?sources=wired&language=en&apiKey=4c75d0c75a2c41f9a1c8563fa358e81b', './json/tech_news_wired.json');
    getdata('https://newsapi.org/v2/top-headlines?sources=techradar&language=en&apiKey=4c75d0c75a2c41f9a1c8563fa358e81b', './json/tech_news_techradar.json');

};

while (true) {

    //get current time 
    var daydata = new Date();
    var mins = daydata.getMinutes();

    // testing value 
    mins = 15;

    //opens times files 
    let timerawdata = fs.readFileSync('./json/times.json');
    let timefile = JSON.parse(timerawdata);
    let timejsonfile = editjson(`${__dirname}/json/times.json`);

    //checks the mins value of the time to see if the data needs updating
    if (mins == 00 || mins == 15 || mins == 30 || mins == 45) {

        //checks if the request has already been made for this time
        if (mins == 00 && timefile.check.a == "false") {
            //calls the function to update the data in files
            getrequests();
            //sets the files value to show that the data has been updated
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

    //resets times file for next hour
    if (mins == 46) {
        
        timejsonfile.set("check.a", "false");
        timejsonfile.set("check.b", "false");
        timejsonfile.set("check.c", "false");
        timejsonfile.set("check.d", "false");
        timejsonfile.save();

    };

};