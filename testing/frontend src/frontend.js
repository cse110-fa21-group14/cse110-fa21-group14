import {get, getAll, imgToURL, save, saveToLocalStorage, deleteRecipe} from '../backend src/backend.js';
window.addEventListener('DOMContentLoaded', init);
const tags = document.getElementById('tag-name-input');
const name = document.getElementById('input-recipe-name');
const ingName = document.getElementById('name-input');
const ingAmount = document.getElementById('amount-input');
const ingUnitInput = document.getElementById('unit-input');
const steps = document.getElementById('step-input-box');
const recipeList = document.getElementById('recipe-list');
var currId;

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
    
    function makeList(){
        let recipes = getAll();
        if(recipes && recipeList){
            for (const [key, value] of Object.entries(recipes)){
                let newCard = document.createElement('recipe-card');
                let recipe = value;
                console.log(recipe);
                newCard.data = recipe;
                newCard.addEventListener('click', function() {
                    // how to access the specific json file
                    // populate the tags
                    currId = recipe.id;
                    let tagsSection = document.getElementById('recipe-tags');
                    tagsSection.innerHTML = '';
                    let tagsList = recipe.tags;
                    if(tagsList.length == 0) {
                        let noTags = document.createElement('p');
                        noTags.innerHTML = 'There are no tags.';
                        tagsSection.appendChild(noTags);
                    }
                    else {
                        for(let i = 0; i < tagsList.length; i++) {
                            let newTag = document.createElement('p');
                            newTag.classList.add('tag');
                            newTag.innerHTML = ` ${tagsList[i]} `;
                            tagsSection.appendChild(newTag);
                        }
                    }
                    // populate recipe name
                    let recipeName = document.getElementById('recipe-name');
                    
                    recipeName.innerHTML = recipe.name;
                    // populate tracker
                    // let trackerCount = document.getElementById('tracker-count');
                    // trackerCount.innerHTML = get('count'); // backend needs to include this in the recipe object
                    let lastMade = document.getElementById('tracker-date');
                    lastMade.innerHTML = recipe.name;
                    // populate image
                    // let recipeImage = document.getElementById('recipe-image');
                    // recipeImage.setAttribute('src', recipe.img);
                    // populate ingredients
                    // needs to change default value of the slider to the number of servings
                    let ingredientList = document.getElementById('ingredients');
                    ingredientList.innerHTML = '';
                    let ingList = recipe.ingredients['ingredients'];
                    for(let i = 0; i < ingList.length; i++) {
                        let newIng = document.createElement('li');
                        newIng.innerHTML = `${ingList[i]['amount']} ${ingList[i]['unit']} of ${ingList[i]['ingName']}`;
                        ingredientList.appendChild(newIng);
                    }
                    // populate instructions
                    let instructionList = document.getElementById('instructions');
                    instructionList.innerHTML = '';
                    let instList = recipe.steps; // backend needs to fix steps for recipe object
                    // for(let i = 0; i < instList.length; i++) {
                    //     
                    // }
                    let newInst = document.createElement('li');
                    newInst.innerHTML = instList;
                    instructionList.appendChild(newInst);
                });
                recipeList.appendChild(newCard);
            }
        }
         
    }
    const saveButton = document.getElementById('save-recipe');
    let newRecipe;
    
    //I put this if statment because it avoids a reading null error - TJ
    if (saveButton){
        
        saveButton.addEventListener('click', (event) => {
            
            let date = Date.now();
            newRecipe = {
                id: Math.floor(100000 + Math.random() * 900000),
                name: name.value,
                img: imgURL,
                ingredients: {
                    proportion: 1,
                    ingredients: [
                        {ingName: ingName.value, amount: ingAmount.value, unit: ingUnitInput.value}
                    ],
                },
                steps: steps.value,
                serving: 1,
                tags: [tags.value],
                made: new Date(date),
            }
            save(newRecipe);
            window.location.href = 'user.html'; 
        });
    }
    
    const editButton = document.getElementById('edit-recipe');
    
    if (editButton){
        console.log(editButton);
        editButton.addEventListener('click', (event) => {
            window.location.href = 'create-edit.html'; 
            deleteRecipe(currId);
        });
    }
    
    const deleteButton = document.getElementById('delete-yes');
    if (deleteButton){
        deleteButton.addEventListener('click', (event) => {
            deleteRecipe(currId);
            location.reload();
        });
    }
    
    makeList();
    
};
