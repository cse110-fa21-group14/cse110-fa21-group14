import {get, getAll, imgToURL, save, saveToLocalStorage, deleteRecipe} from "../testing/backend src/backend.js";

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
    let editInstructions = document.getElementById("step-input-box").innerHTML = editRecipeObject.steps;
    console.log(editRecipeObject.steps);

    let editTags = document.getElementById("tag-name-input").setAttribute("value",editRecipeObject.tags[0]);
    console.log(editRecipeObject.tags[0]);

    let editIngredientName = document.getElementById("name-input").setAttribute("value", editRecipeObject.ingredients["ingredients"][0].ingName);
    let editIngredientAmount = document.getElementById("amount-input").setAttribute("value", editRecipeObject.ingredients["ingredients"][0].amount);
    let editIngredientUnit = document.getElementById("unit-input").setAttribute("value", editRecipeObject.ingredients["ingredients"][0].unit);
    console.log(editRecipeObject.ingredients["ingredients"][0].amount);

    //let editImage = document.getElementById("file-preview").src = editRecipeObject.img;
    console.log(editRecipeObject.i)
    //TODO preload the image
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