const { product } = require("prelude-ls");
const puppeteer = require('puppeteer');
describe('Website flow', () => {

    beforeAll(async () => {
        await page.goto('https://recipechamber.netlify.app/');
    });

    it('Land on home page', async() => {
        const pageName = await page.evaluate(() => {
            return document.querySelector('#site-name').innerHTML;
        });
        expect(pageName).toBe('Recipe Chamber');
    });
    

    it('Home to recommended', async() => {
        await page.click("#home-recommended-button");
        await page.waitForSelector('#page-title');
        const recPageName = await page.evaluate(() => {
            return document.querySelector('#page-title').innerHTML;
        });
        expect(recPageName).toBe('Recommended');
    }, 10000);

})