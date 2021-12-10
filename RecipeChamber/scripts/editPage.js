import {get, getAll, imgToURL, save, saveToLocalStorage, deleteRecipe} from "./backend.js";
import {createTagInput, createIngredientInput, createInstructionInput} from"./frontend.js";

window.addEventListener('DOMContentLoaded', init);
var pageId; //Current Recipe key for access to recipe object
async function init() {
    pageId = localStorage.getItem("editId");
    let editRecipeObject = get(pageId);
    if (editRecipeObject){
        console.log(editRecipeObject);
    
    let editName = document.getElementById("input-recipe-name").setAttribute("value", editRecipeObject.name);
    
    //editInstructions needs to be updated when add instructions functionality has been added.
    let editInstructions = document.getElementById("instructions-input-list");
    for(let i = 0; i < editRecipeObject.steps.length; i++) {
        createInstructionInput();
        editInstructions.children[i].firstChild.innerHTML = editRecipeObject.steps[i];
    }

    let editTags = document.getElementById("tags-inputted");
    for(let i = 0; i < editRecipeObject.tags.length; i++) {
        createTagInput();
        editTags.children[i].firstChild.setAttribute("value",editRecipeObject.tags[i]);
    }

    let editIngredients = document.getElementById("ingredients-inputted");
    for(let i = 0; i < editRecipeObject.ingredients['ingredients'].length; i++) {
        createIngredientInput();
        editIngredients.children[i].children[0].setAttribute("value", editRecipeObject.ingredients["ingredients"][i].ingName);
        editIngredients.children[i].children[1].setAttribute("value", editRecipeObject.ingredients["ingredients"][i].amount);
        editIngredients.children[i].children[2].setAttribute("value", editRecipeObject.ingredients["ingredients"][i].unit);
    }

    let editImage = document.getElementById("file-preview").setAttribute('src', editRecipeObject.img);

    let editServings = document.getElementById("serving-number").value = editRecipeObject.serving;
    }
    
}

let cancelbuttonEditPage = document.getElementById("cancel-recipe");
cancelbuttonEditPage.addEventListener("click", e => {
    localStorage.removeItem("editId");
    window.location.href = '../user.html';
})