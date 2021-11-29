
// Function to traverse recommended JSon object and
// create recommended recipe cards.
function populateRecPage(data) {
    let recs = data.recommended;
    for (let i = 0; i < recs.length; i++) {
        let newCard = document.createElement('recipe-card');
        newCard.setAttribute('onclick', 'recommendedPopUp()');
        //console.log(newCard.querySelector('recipe-text'));
        let recipe = recs[i];
        newCard.data = recs[i];
        // let NCArticle = document.createElement('article');
        // let NCImage = document.createElement('img');
        // NCImage.src = recs[i].image;
        // NCArticle.appendChild(NCImage);
        // newCard.appendChild(NCArticle);
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

// Once page loads, render recommended recipe cards.
export function makeRecList() {
    console.log("loaded");
    fetch("assets/recommended.json")
    .then(response => {
    return response.json();
    })
    .then(data => {
        populateRecPage(data);
    })
}

