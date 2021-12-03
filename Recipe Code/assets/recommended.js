import {save} from '../../testing/backend src/backend.js';
window.addEventListener('DOMContentLoaded', init);
const search_bar = document.getElementById('recommended-search-bar');
// Function to traverse recommended JSon object and
// create recommended recipe cards.
export function makeRecList(data) {
    let recs = data;
    for (let i = 0; i < recs.length; i++) {
        let newCard = document.createElement('recipe-card');
        newCard.setAttribute('onclick', 'recommendedPopUp()');
        //console.log(newCard.querySelector('recipe-text'));
        let recipe = recs[i];
        newCard.data = recs[i];
        newCard.addEventListener('click', function() {
            let recipeName = document.getElementById('recipe-name');
            recipeName.innerHTML = recipe.name
            let recipeImage = document.getElementById('recipe-image');
            recipeImage.setAttribute('src', recipe.img);
           
            // populate ingredients
            // needs to change default value of the slider to the number of servings
            let ingredientList = document.getElementById('ingredients');
            ingredientList.innerHTML = '';
            let ingList = recipe.ingredients;
            for (let i = 0; i < ingList.length; i++) {
                let newIng = document.createElement('li');
                newIng.innerHTML = `${ingList[i]['amount']} ${ingList[i]['unit']} of ${ingList[i]['name']}`;
                ingredientList.appendChild(newIng);
            }
            // populate instructions
            let instructionList = document.getElementById('instructions');
            instructionList.innerHTML = '';
            let instList = recipe.steps; // backend needs to fix steps for recipe object
            for(let i = 0; i < instList.length; i++) {
                let newInst = document.createElement('li');
                newInst.innerHTML = instList[i];
                instructionList.appendChild(newInst);
            }
            //add to my own list
            let addRecipe = document.getElementById('add-recipe');
            if (addRecipe){
                addRecipe.addEventListener('click', (event) =>{
                    let date = Date.now();
                    let newRecipe = {
                        id: recipe.id,
                        name: recipe.name,
                        img: recipe.img,
                        ingredients: {
                            proportion: 1,
                            ingredients: [],
                        },
                        steps: [],
                        serving: 1,
                        tags: [],
                        made: new Date(date),
                        created: new Date(date),
                        makeCount: 0
                    }
                    for (let i = 0; i < ingList.length; i++) {
                        newRecipe.ingredients['ingredients'].push({
                            ingName: ingList[i]['name'],
                            amount: ingList[i]['amount'],
                            unit: ingList[i]['unit'],
                        });
                    }
                    for (let i = 0; i < instList.length; i++) {
                        newRecipe.steps.push(instList[i]);
                    }
                    save(newRecipe);
                });
            }
        });
       
        if(document.getElementById('recommended-list')){
            document.getElementById('recommended-list').appendChild(newCard);
        }
    }
}
if(search_bar){
    search_bar.addEventListener('keyup', function() {
        // console.log(search_bar.value);
        fetch("assets/recommended.json")
        .then(response => {
        return response.json();
        })
        .then(data => {
            const queryString = search_bar.value;
            let rec_list = document.getElementById('recommended-list');
            console.log(data);
            while(rec_list.firstChild) {
                rec_list.removeChild(rec_list.firstChild);
            }
            const filtered_recipes = data.recommended.filter((e) => {
                return e.name.includes(queryString);
            });
            console.log(filtered_recipes);
            makeRecList(filtered_recipes);
        });
    })
}

// Once page loads, render recommended recipe cards.
function init() {
    console.log("loaded");
    fetch("assets/recommended.json")
    .then(response => {
    return response.json();
    })
    .then(data => {
        makeRecList(data.recommended);
    });
}

