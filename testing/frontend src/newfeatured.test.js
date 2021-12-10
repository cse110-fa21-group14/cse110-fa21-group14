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
    

    it('Reload site, check for new featured recipe', async() => {
        const firstFeature = await page.evaluate(() => {
            return document.querySelector('#home-recipe-title').innerHTML;
        });
        await page.click("#site-name");
        const secondFeature = await page.evaluate(() => {
            return document.querySelector('#home-recipe-title').innerHTML;
        });
        expect(secondFeature).not.toBe(firstFeature);
    }, 10000);

})