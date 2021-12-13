const puppeteer = require('puppeteer');

let username;
let password;
let comments = ['@rochisala_', '@segundosala', '@salapato', '@panchosala227'];

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    /* login */
    await page.goto('https://www.instagram.com/accounts/login/');
    await page.waitForSelector('input[name="username"]');
    await page.type('input[name="username"]', username);
    await page.type('input[name="password"]', password);
    await page.click('button[type="submit"]');

    /* wait for page to refresh*/
    await page.waitForNavigation();

    /* navigate to post and comment */
    for (let i = 0; i <= 5; i++) {
        for (let j = 0; j < comments.length; j++) {
            await page.goto('https://www.instagram.com/p/CWR2NkVrb4G/');
            await page.waitForSelector('textarea');
            await page.type('textarea', comments[j]);
            await page.click('button[type="submit"]');
            console.log(comments[j]);
        }
    }

    await browser.close();
    
}) ();