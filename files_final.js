//nodejs imports
const fs = require('fs');
const request = require('request-promise');
//log for app startup
console.log('[ App: Start ]');
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
//function to make a request and write the data to file
async function getdata() {
    //makes a request to the news api
    try {
        //loop to request all articles
        for (var num = 0, len = urls.length; num < len; num++) {
            //makes a request to the news api
            const response = await request.get(`${urls[num]}`);
            console.log(response);
            //gets the data and writes it to file
            var filedata = response;
            fs.writeFileSync(files[num], filedata);
        };
    //error
    } catch (error) {
        console.log(error.message);
    };
};
//timer for api gets
setInterval(getdata, 600000);