const puppeteer = require('puppeteer');
let data = require('./data');

totalComments = 0;

function postComment() {
    console.log('Ready to start');

(async () => {
    console.log('Launching puppeteer..');

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

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
    for (let i = 0; i <= data.iterations; i++) {
        for (let j = 0; j < data.comments.length; j++) {
            await page.goto(data.url);
            await page.waitForSelector('textarea');
            await page.type('textarea', data.comments[j]);
            await page.click('button[type="submit"]');
            console.log(data.comments[j]);
            totalComments++;
        }
    }

    await browser.close();
    console.log('Total comments posted: ' + totalComments);
    
}) ();
}

module.exports = postComment;