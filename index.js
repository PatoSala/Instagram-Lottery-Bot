const puppeteer = require('puppeteer');

let username = 'patosala998@gmail.com';
let password = 'pato.com';
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
    for (let i = 0; i < comments.length; i++) {
        await page.goto('https://www.instagram.com/p/CWR2NkVrb4G/');
        await page.waitForSelector('textarea');
        await page.type('textarea', comments[i]);
        await page.click('button[type="submit"]');
        console.log(comments[i]);
    }

    await browser.close();
    
}) ();