const puppeteer = require('puppeteer');
let data = require('./data');

let delay = ms => new Promise(res => setTimeout(res, ms));
let delayValues = [5000, 10000, 15000, 5790, 6768, 18950, 60000, 43890, 11245, 36578, 5054, 47888, 6893, 5876, 7890, 26897, 58795, 36598]
totalComments = 0;

function postComment() {
    console.log('');
    console.log('Data collected. Ready to start');
    console.log('');

(async () => {
    console.log('Launching puppeteer..');

    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(0); 

    console.log('Launched puppeteer succesfully');

    console.log('Logging to instagram with user ' + data.username);

    /* login */
    await page.goto('https://www.instagram.com/accounts/login/');
    await page.waitForSelector('input[name="username"]');
    await page.type('input[name="username"]', data.username);
    await page.type('input[name="password"]', data.password);
    await page.click('button[type="submit"]');

    console.log('Logged succesfully, waiting for page to refresh...');

    /* wait for page to refresh*/
    await page.waitForNavigation();

    console.log('Posting Comments...');

    /* navigate to post and comment */
    for (let i = 1; i <= data.iterations; i++) {
        for (let j = 0; j < data.comments.length; j++) {
            await page.goto(data.url);
            await page.waitForSelector('textarea');
            await page.type('textarea', data.comments[(Math.floor(Math.random() * data.comments.length))]); //choose random comment from list
            await page.click('button[type="submit"]');
            console.log(data.comments[j]);
            totalComments++;
            console.log(totalComments + ' comments posted.');
            random = Math.floor(Math.random() * delayValues.length); // choose random delay value from delayValues list
            console.log('Picked ' + delayValues[random]); // print delay value selected
            await delay(delayValues[random]); // apply delay
        }
    }

    await browser.close();
    console.log('Total comments posted: ' + totalComments);
    
}) ();
}

module.exports = postComment;