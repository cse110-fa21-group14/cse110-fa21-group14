/*const functions = require('../frontend_src/frontend');

test('adds 1 + 2 to equal 3', () => {
    expect(functions.sum2(1,2)).toBe(3);
  });*/

  test('adds 1 + 2 to equal 3', () => {
    expect(1 + 2).toBe(3);
  });
// const { product } = require("prelude-ls");
// const puppeteer = require('puppeteer');
// describe('Basic user flow for Website', () => {
//     //First, visit the recipe website
//     beforeAll(async () => {
//         const browser = await puppeteer.launch();
//         const page = await browser.newPage();
//         await page.goto('https://recipechamber.netlify.app/');
//     });

//     //Check if you're on home page
//     it('Landed on Home Page', async() => {
//         const pageName = await page.evaluate(() => {
//             return document.querySelector('#site-name').innerHTML;
//         });
//         expect(pageName).toBe('Recipe Chamber');
//     })
    
    
//     //Check if going to recommended page
//     it('Go to recommended', async() => {
//         // const recButton = await page.$('#home-recommended-button');
//         // await recButton.click();
//         await page.click('#home-recommended-button');
//         await page.waitForSelector('#page-title');
        
//         const pageTitle = await page.evaluate(() => {
//             return document.querySelector('#page-title').innerHTML;
//         });
//         expect(pageTitle).toBe('Recommended');

//         await page.click('recipe-card');
//         await page.click('#add-recipe');
//     })

    
//     //Check if going back to home page
//     it('Go back home', async() => {
//         // const recButton = await page.$('#home-recommended-button');
//         // await recButton.click();
//         await page.click('#site-name');
//         await page.waitForSelector('#recipe-otd-title');
        
//         const otdTitle = await page.evaluate(() => {
//             return document.querySelector('#recipe-otd-title').innerHTML;
//         });
//         expect(otdTitle).toBe('Recipe of the Day');
//     })

//     //Check if going to my recipes page
//     it('Go to my recipes', async() => {
//         // const recButton = await page.$('#home-recommended-button');
//         // await recButton.click();
//         await page.click('#home-recipes-button');
//         await page.waitForSelector('#page-title');
        
//         const recTitle = await page.evaluate(() => {
//             return document.querySelector('#page-title').innerHTML;
//         });
//         expect(recTitle).toBe('My Recipes');
//     })
    
//     //Check if recipe added
//     it('Recipe was added from recommended', async() => {
//         const recipes = await page.evaluate(() => {
//             return document.querySelector('#recipe-list').children.length;
//         });
//         expect(recipes).toBe(1);
//     })
    
    
// });
