const { product } = require("prelude-ls");
const puppeteer = require('puppeteer');
describe('Website flow', () => {

    beforeAll(async () => {
        await page.goto('https://recipechamber.netlify.app/recommended.html');
    });

    it('Land on recommended page', async() => {
        await page.waitForSelector('#page-title');
        const recPageName = await page.evaluate(() => {
            return document.querySelector('#page-title').innerHTML;
        });
        expect(recPageName).toBe('Recommended');
    }, 10000);

    it('Click search more', async() => {
        // click and find name of first recipe
        await page.click("recipe-card");
        const firstRec = await page.evaluate(() => {
            return document.querySelector('#recipe-name').innerHTML;
        });

        //close and search more
        await page.click("#recommended-recipe-close");
        await page.click("#search-button");

        // find new first recipe and make sure its different
        await page.click("recipe-card");
        const secondRec = await page.evaluate(() => {
            return document.querySelector("#recipe-name").innerHTML;
        });
        expect(secondRec).not.toBe(firstRec);
    }, 20000);
});