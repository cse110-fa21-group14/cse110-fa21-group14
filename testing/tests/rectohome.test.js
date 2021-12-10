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
    });
    

    it('Home to recommended', async() => {
        await page.click("#site-name");
        await page.waitForSelector('#recipe-otd-title');
        const pageName = await page.evaluate(() => {
            return document.querySelector('#recipe-otd-title').innerHTML;
        });
        expect(pageName).toBe('Featured Recipe');
    }, 10000);

})