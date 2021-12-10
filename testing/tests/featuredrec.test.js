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
    

    it('Click featured recipe', async() => {
        await page.click("#home-recipe-card");
        await page.waitForSelector('#add-recipe');
        const addToMyButton = await page.evaluate(() => {
            return document.querySelector('#add-recipe').innerText;
        });
        expect(addToMyButton).toBe('+ Add to my own list');
    }, 10000);

})