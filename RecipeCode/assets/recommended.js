window.addEventListener('DOMContentLoaded', init);
const search_bar = document.getElementById('recommended-search-bar');
const search_button = document.getElementById('search-button');
const API_KEY = "d0639dc8bcc145639acdbb9c07c14592";
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


async function getRecipeData(recipe_name) {
    const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${recipe_name}&number=5`).then((response1) => {return response1});
    return response.json();
}

async function getIngredients(recipe_id) {
    const response = await fetch(`https://api.spoonacular.com/recipes/${recipe_id}/ingredientWidget.json?apiKey=${API_KEY}`);
    return response.json();
}

async function getInstructions(recipe_id) {
    const response = await fetch(`https://api.spoonacular.com/recipes/${recipe_id}/analyzedInstructions?apiKey=${API_KEY}`);
    return response.json();
}

search_button.addEventListener('click', function() {
    let recipe_name = search_bar.value;
    getRecipeInfo(recipe_name)
    .then(response => {
        
        console.log(response.search);
        makeRecList(response.search);
        })
});

async function getRecipeInfo(recipe_name) {
    // Search for 10 recipes.
    let recipe_call = await getRecipeData(recipe_name);
    // Actual array of recipe JSON elements.
    let recipes = recipe_call.results;
 
    // List of search results to be populated.
    let SEARCH_OBJ = {"search": []};
 
    // Iterate and parse information.
    if (recipes.length == 0) return;
    for (let i = 0; i < recipes.length; i++) {
       //console.log(recipes[i]);
       let recipe_id = recipes[i].id;
       let ingredients = await getIngredients(recipe_id);
       let instructions = await getInstructions(recipe_id);
       let itemIngr = [];
       // console.log(ingredients);
       let itemInstr = [];
       //console.log(instructions);
       for (let j = 0; j < ingredients.ingredients.length; j++) {
          itemIngr.push({"name": ingredients.ingredients[j].name, "amount": ingredients.ingredients[j].amount.metric.value, "unit": ingredients.ingredients[j].amount.metric.unit});
       }
       if (instructions.length != 0){
          for (let n = 0; n < instructions[0].steps.length; n++) {
              itemInstr.push(instructions[0].steps[n].step);
          }
       }
       SEARCH_OBJ.search.push({"id": recipes[i].id, "name": recipes[i].title, "img": recipes[i].image, "ingredients": itemIngr, "steps": itemInstr});
    }
    return SEARCH_OBJ;
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

