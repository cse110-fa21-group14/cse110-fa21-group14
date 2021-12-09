var ingredients = {};
/*         
    ingredients: {
        proportion: int,
        ingredients: [
            {ingName: string, amount: int, unit: string}
        ],
    },
*/

var counter = 1;

//save fields to ingredient var
const save = document.querySelector('.save');
save.addEventListener("click", function () {
    ingredients = {
        proportion: 1,    //VERIFY PROPORTION FUNCTION
        ingredients: ingArray(),
    }
});
//helper function to parse inputs into an array
function ingArray() {
    ingredients = [];
    for (var i = 1; i <= counter; i++)
        var ing = document.querySelector('ingredient' + i);
    //FINISH FOR MEEEE
    //SELECT THE 3 INPUT FIELDS FROM ING (A,B,C)
    obj = {
        ingName: A,
        amount: B,
        unit: C
    };
    ingredients.push(obj)
    return ingredients;
}

//add ingredient field
const button = document.querySelector('.add');
const ingDiv = document.querySelector('.ingredient1');
button.addEventListener("click", function () {
    const div = document.createElement('div');
    div.setAttribute('class', 'ingredient' + ++counter);
    const ing = document.createElement('input');
    ing.setAttribute('type', 'text');
    ing.setAttribute('placeholder', 'Ingredient');
    const amt = document.createElement('input');
    amt.setAttribute('type', 'text');
    amt.setAttribute('placeholder', 'Amount');
    const of = document.createTextNode(" of ")
    const unit = document.createElement('input');
    unit.setAttribute('type', 'text');
    unit.setAttribute('placeholder', 'Unit');
    div.appendChild(ing);
    div.appendChild(amt);
    div.appendChild(of);
    div.appendChild(unit);
    ingDiv.appendChild(div)
});