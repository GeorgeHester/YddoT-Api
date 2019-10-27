const fs = require('fs');
const request = require('request-promise');
const editjson = require("edit-json-file");
     /*
async function get (url) {
    return new Promise((resolve, reject) => {
        request({ url, method: 'GET' }, (error, response, body) => {
        if (error) return reject(error)
  
        return resolve({ body, response })
        });
    });
};
*/   
/*
async function getdata2(url, file) {
    console.log(url);
    console.log(file);

    let { response, body } = await request.get(url)

    if (response.statusCode !== 200) {
        console.log('test')
        console.log(response, body)
    }

    console.log('test_2')
    console.log(response, body)
}*/

async function getdata(url, file) {

    console.log(url);
    console.log(file);

/*
async function test(url, file) {
    try {

        var res = await request.get(`${url}`);
        console.log(res);

    } catch (e) {
    console.log(r.message);
    }   

};*/

    /*var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.send();

    xhr.onreadystatechange = process_request;

    function process_request() {
        if (xhr.readyState == 4 && xhr.status == 200) {

            var data = JSON.parse(xhr.responseText);

            fs.writeFileSync(file, data);

            console.log(data);

        };
    };*/

    
/*
    https.get(url, (res) => {
    var data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        console.log(JSON.parse(data).explanation);
        var filedatajson = JSON.parse(data).explanation;
        let filedata = JSON.stringify(filedatajson);
        fs.writeFileSync(file, filedata);

    });

    }).on("error", (err) => {
    console.log("Error: " + err.message);
    });*/

    request(url, { json: true }, (err, res, body) => {
        if (err) {
            return console.log(err); 
        };
        
        var rawfiledata = res.body;
        let filedata = JSON.stringify(rawfiledata);
        fs.writeFileSync(file, filedata);

        console.log('Written');
    });

    /*request('https://newsapi.org/v2/top-headlines?country=gb&pageSize=3&apiKey=4c75d0c75a2c41f9a1c8563fa358e81b', { json: true }, (err, res, body) => {
        if (err) {
            return console.log(err); 
        };
        
        var breakfiledata = res.body;
        let filedata = JSON.stringify(breakfiledata);
        fs.writeFileSync('./json/break_news.json', filedata);

        console.log('Written');

    });*/
  
};

function getrequests() {
    /*var url_1 = "https://newsapi.org/v2/top-headlines?sources=wired&language=en&apiKey=4c75d0c75a2c41f9a1c8563fa358e81b";
    var url_2 = "https://newsapi.org/v2/top-headlines?sources=techradar&language=en&apiKey=4c75d0c75a2c41f9a1c8563fa358e81b";
    var url_3 = "https://newsapi.org/v2/top-headlines?country=gb&pageSize=3&apiKey=4c75d0c75a2c41f9a1c8563fa358e81b";
    var file_1 = "./json/tech_news.json";
    var file_2 = "./json/tech_news_2.json";
    var file_3 = "./json/break_news.json";*/

    /*getdata(url = 'https://newsapi.org/v2/top-headlines?sources=wired&language=en&apiKey=4c75d0c75a2c41f9a1c8563fa358e81b', file = './json/tech_news.json');
    getdata(url = 'https://newsapi.org/v2/top-headlines?sources=techradar&language=en&apiKey=4c75d0c75a2c41f9a1c8563fa358e81b', file = './json/tech_news_2.json');
    getdata(url = 'https://newsapi.org/v2/top-headlines?country=gb&pageSize=3&apiKey=4c75d0c75a2c41f9a1c8563fa358e81b', file =  './json/break_news.json');*/

    getdata('https://newsapi.org/v2/top-headlines?sources=wired&language=en&apiKey=4c75d0c75a2c41f9a1c8563fa358e81b', './json/tech_news.json');
    getdata('https://newsapi.org/v2/top-headlines?sources=techradar&language=en&apiKey=4c75d0c75a2c41f9a1c8563fa358e81b', './json/tech_news_2.json');
    getdata('https://newsapi.org/v2/top-headlines?country=gb&pageSize=3&apiKey=4c75d0c75a2c41f9a1c8563fa358e81b', './json/break_news.json');

    /*getdata(url_1, file_1);
    getdata(url_2, file_2);
    getdata(url_3, file_3);*/

    /*getdata(url = url_1, file = file_1);
    getdata(url = url_2, file = file_2);
    getdata(url = url_3, file = file_3);*/

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