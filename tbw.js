const request = require('request-promise');
const url = 'https://newsapi.org/v2/top-headlines?country=gb&pageSize=3&apiKey=4c75d0c75a2c41f9a1c8563fa358e81b';
const url2 = 'https://newsapi.org/v2/top-headlines?sources=wired&language=en&apiKey=4c75d0c75a2c41f9a1c8563fa358e81b';
const url3 = 'https://newsapi.org/v2/top-headlines?sources=techradar&language=en&apiKey=4c75d0c75a2c41f9a1c8563fa358e81b';
var once = false;

async function test() {
    const urls = [
        `${url}`,
        `${url2}`,
        `${url3}`,
    ];
    console.log('2');
    
    (async function main() {
        try {
    
            console.log('3');

            urls.forEach(async(url) => {
                console.log('5');
                const res = await request.get(`${url}`);
                console.log(res);
                console.log('4');
            });
    
            console.log('6');

        } catch (error) {
            console.log(error.message);
        }
    
    })();
};

setInterval(test, 1500);

/*
while (true) {

    var mins = 15;

    if (mins == 15 && once == false) {
        console.log('1');
        once = true;
        test();
    } 

    

};*/


