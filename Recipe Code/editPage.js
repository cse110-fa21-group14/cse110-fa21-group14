import {get, getAll, imgToURL, save, saveToLocalStorage, deleteRecipe} from "../testing/backend src/backend.js";
import {createTagInput, createIngredientInput, createInstructionInput} from"../testing/frontend src/frontend.js";

window.addEventListener('DOMContentLoaded', init);
var pageId; //Current Recipe key for access to recipe object
async function init() {
    pageId = localStorage.getItem("editId");
    console.log(pageId);
    let editRecipeObject = get(pageId);
    console.log(editRecipeObject);

    
    //let editRecipeObject = get(editRecipeID);


    let editName = document.getElementById("input-recipe-name").setAttribute("value", editRecipeObject.name);
    
    //editInstructions needs to be updated when add instructions functionality has been added.
    let editInstructions = document.getElementById("instructions-input-list");
    for(let i = 0; i < editRecipeObject.steps.length; i++) {
        createInstructionInput();
        editInstructions.children[i].firstChild.innerHTML = editRecipeObject.steps[i];
    }
    console.log(editRecipeObject.steps);

    let editTags = document.getElementById("tags-inputted");
    for(let i = 0; i < editRecipeObject.tags.length; i++) {
        createTagInput();
        editTags.children[i].firstChild.setAttribute("value",editRecipeObject.tags[i]);
    }
    console.log(editRecipeObject.tags);

    let editIngredients = document.getElementById("ingredients-inputted");
    for(let i = 0; i < editRecipeObject.ingredients['ingredients'].length; i++) {
        createIngredientInput();
        editIngredients.children[i].children[0].setAttribute("value", editRecipeObject.ingredients["ingredients"][i].ingName);
        editIngredients.children[i].children[1].setAttribute("value", editRecipeObject.ingredients["ingredients"][i].amount);
        editIngredients.children[i].children[2].setAttribute("value", editRecipeObject.ingredients["ingredients"][i].unit);
    }
    console.log(editRecipeObject.ingredients["ingredients"][0].amount);

    let editImage = document.getElementById("file-preview").setAttribute('src', editRecipeObject.img);
    console.log(editRecipeObject.img);
    //TODO preload the image

    let editServings = document.getElementById("serving-number").value = editRecipeObject.serving;
}

let saveButtonEditPage = document.getElementById("save-recipe");
saveButtonEditPage.addEventListener("click", e => {
    //Todo save functionality
    localStorage.removeItem("editId");
    window.location.href = 'user.html';
})

let cancelbuttonEditPage = document.getElementById("cancel-recipe");
cancelbuttonEditPage.addEventListener("click", e => {
    localStorage.removeItem("editId");
    window.location.href = 'user.html';
})