import {get, getAll, imgToURL, save, saveToLocalStorage, deleteRecipe} from '../backend src/backend.js';
window.addEventListener('DOMContentLoaded', init);
const tags = document.getElementById('tag-name-input');
const name = document.getElementById('input-recipe-name');
const ingName = document.getElementById('name-input');
const ingAmount = document.getElementById('amount-input');
const ingUnitInput = document.getElementById('unit-input');
const steps = document.getElementById('step-input-box');
const recipeList = document.getElementById('recipe-list');


var imgURL;
async function init(){
    $("#input-file").change(function () {
        if (this.files && this.files[0]) {
            var FR = new FileReader();
            FR.onload = function (e) {
                console.log(e.target.result);
                var imgBase64 = e.target.result
                imgToURL(imgBase64.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""), imgURL);
            };
            FR.readAsDataURL(this.files[0]);
        }
    });
    
    const saveButton = document.getElementById('save-recipe');
    console.log(recipeList);
    //I put this if statment because it avoids a reading null error - TJ
   
    if (saveButton){
        saveButton.addEventListener('click', (event) => {
            let date = Date.now();
            let newRecipe = {
                id: Math.floor(100000 + Math.random() * 900000),
                name: name.value,
                img: imgURL,
                ingredients: {
                    proportion: 1,
                    ingredients: [
                        {ingName: ingName, amount: ingAmount, unit: ingUnitInput}
                    ],
                },
                steps: steps.value,
                serving: 1,
                tags: [tags.value],
                made: new Date(date),
            }
            
            save(newRecipe);
            window.location.href = 'user.html';
            //if you put these 3 blocks of code above this ^ window.location.href = 'user.html'; , it will give a recipeList null error
            let newCard = document.createElement('recipe-card'); 
            newCard.data = newRecipe;
            recipeList.appendChild(newCard);
        });
        
        
    }
    

    // const deleteButton = document.getElementById('delete-yes');
    // deleteButton.addEventListener('click', (event) => {
    //     //deleteRecipe(id);
    // });
};
