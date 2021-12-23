const puppeteer = require('puppeteer');
let data = require('./data');
let tags = require('./tags');

function createComment(array) {
    let tagOne = array[Math.floor(Math.random() * array.length)];
    let tagTwo = array[Math.floor(Math.random() * array.length)];

    let comment = tagOne + ' ' + tagTwo;

    return(comment);
};

function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

let delay = ms => new Promise(res => setTimeout(res, ms));
let delayValues = [10000, 15000, 18950, 60000, 43890, 11245, 36578, 47888, 7890, 26897, 58795, 36598, 120678, 128790]
totalComments = 0;
cooldownCounter = 0;

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
    await page.goto(data.url);

    /* start loop */
    for (let i = 1; i <= data.iterations; i++) {
        for (let j = 0; j < tags.length; j++) {
            if (cooldownCounter === 10) {
                console.log(formatAMPM(new Date) + '; Waiting 15 mins');
                await delay(900000); // 15 minutes cooldown
                console.log('timer down, starting again...');
                cooldownCounter = 0;
            } else {
                await page.waitForSelector('textarea');
                let randomComment = createComment(tags); //choose random comment
                await page.type('textarea', randomComment); 
                await page.click('button[type="submit"]');
                console.log(randomComment);
                totalComments++;
                cooldownCounter++;
                console.log(totalComments + ' comments posted.');
                
                random = Math.floor(Math.random() * delayValues.length); // choose random delay value from delayValues list
                console.log('Picked ' + delayValues[random]); // print delay value selected
                await delay(delayValues[random]); // apply delay
            }
        }
    }

    await browser.close();
    console.log('Total comments posted: ' + totalComments);
    
}) ();
}

module.exports = postComment;