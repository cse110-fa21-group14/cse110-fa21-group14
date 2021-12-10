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

    it('Click recipe card', async() => {
        await page.click("recipe-card");
        await page.waitForSelector('#instructions-header');
        const header = await page.evaluate(() => {
            return document.querySelector('#instructions-header').innerHTML;
        });
        expect(header).toBe('Instructions');
    }, 10000);
});