/*  recipe object structure:
    {
        id: int,                                                generate randomly (ex: Math.floor(100000 + Math.random() * 900000))
        name: string,                                           pass in directly from HTML
        img: string,                                            figure out how to use imgURL
        ingredients: {                                          use var ingredient in ingredients.js
            proportion: int,
            ingredients: [
                {ingName: string, amount: int, unit: string}
            ],
        },
        steps: steps.value,                                     pass in directly HTML
        serving: int,                                           pass in directly HTML
        tags: [string],                                         convert input -> [] in frontend.js (see tagsToArray:41)
        made: Date
        makeCount: int                                              capture and store Date when save button is clicked
        created: Date of creation
    }
*/

//returns recipe object given recipe name or id
export function get(key) {
    const data = JSON.parse(localStorage.getItem('recipeData'))
    var result = data.filter(function (item) {
        return (key == item.name || key == item.id)
    })[0];
    //console.log(result);
    return result;
}

//returns JSON of all recipe objects
export function getAll() {
    //console.log(JSON.parse(localStorage.getItem('recipeData')));
    return (JSON.parse(localStorage.getItem('recipeData')));
}

//prepare image link for export when uploaded 
// $("#input-file").change(function () {
//     if (this.files && this.files[0]) {
//         var FR = new FileReader();
//         FR.onload = function (e) {
//             console.log(e.target.result);
//             var imgBase64 = e.target.result
//             imgToURL(imgBase64.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""));
//         };
//         FR.readAsDataURL(this.files[0]);
//     }
// });
export async function imgToURL(imgBase64) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: 'https://api.imgur.com/3/image',
            headers: {
                Authorization: 'Client-ID 883b97261443d3c'
            },
            type: 'POST',
            data: {
                image: imgBase64,
                type: 'base64'
            },
            success: function (result) {
                resolve(result.data.link);
            },
            error: function (err) {
                reject(err)
            }
        });
    });

}

//store the recipe object in localstorage
export function save(recipe) {
    if (!localStorage.getItem('recipeData')) {
        localStorage.setItem('recipeData', JSON.stringify([]))
    }
    if (get(recipe.id)) {
        deleteRecipe(id)
    }
    var data = JSON.parse(localStorage.getItem('recipeData'))
    data.push(recipe)
    saveToLocalStorage(data)
    let imgURL = ''
    console.log(localStorage.getItem('recipeData'))
}
export function saveToLocalStorage(data) {
    localStorage.setItem('recipeData', JSON.stringify(data))
}

//delete recipe given id in localstorage
export function deleteRecipe(id) {
    saveToLocalStorage(getAll().filter(recipe => id != recipe.id));
}

//adds the ingredients of a recipe to the grocery list
export function addToGroceryList(recipe){
    if (!localStorage.getItem('grocery')) {
        localStorage.setItem('grocery', JSON.stringify([]));
    }
    var groceryData = JSON.parse(localStorage.getItem('grocery'));
    for (var ing of recipe.ingredients['ingredients']) {
        groceryData.push({name: ing.ingName, done: false});
        localStorage.setItem('grocery', JSON.stringify(groceryData));
        console.log (localStorage.getItem('grocery'));
    }
}

/* for frontend.js:
    to check: <checkbox>.addAttriute("checked")
    to uncheck: <checkbox>.removeAttribute("checked")
*/

//returns grocery list as [{name: string, done: boolean}]
export function groceryList (){
     if (checkedOff()){
        localStorage.setItem('grocery', JSON.stringify([]));
     }
    return JSON.parse(localStorage.getItem('grocery'))
}
//helper function to see if the entire grocery list is checked off
function checkedOff(){
    var flag = true;
    var groceryData = JSON.parse(localStorage.getItem('grocery'));
    for (var ing of groceryData) {
        if (!ing.done) {
            flag = false;
        }
    }
    return flag;
}

/*
 * sort all the recipes according to a given order 
 *
 * method:
 * 'least-made': least made (not working)
 * 'most-made': most made (not working)
 * 'alphabetical': alphabetical
 * 'newest': newest date of creation
 * 'oldest': oldest date of creation
 * 
 * @return: a sorted list of all recipe according to the designateed method
 */
export function sortAll(recipes, method) {
    console.log(method)
    switch (method) {
        //least made
        case 'least-made':
            return recipes.sort(function compareFn(firstEl, secondEl){
                return firstEl.makeCount - secondEl.makeCount;
            });
        // most made
        case 'most-made':
            return recipes.sort(function compareFn(firstEl, secondEl){
                return secondEl.makeCount - firstEl.makeCount;
            });
        //alphabetical
        case 'alphabetical':
            return recipes.sort(function compareFn(firstEl, secondEl) {
                let nameA = firstEl.name;
                let nameB = secondEl.name;
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
            });

        // date of creation
        case 'newest':
            return recipes.sort(function compareFn(firstEl, secondEl) {
                let createdA = firstEl.created;
                let createdB = secondEl.created;
                if (createdA > createdB) {
                    return -1;
                }
                if (createdA < createdB) {
                    return 1;
                }
                return 0;
            });

        case 'oldest':
            return recipes.sort(function compareFn(firstEl, secondEl) {
                let createdA = firstEl.created;
                let createdB = secondEl.created;
                if (createdA < createdB) {
                    return -1;
                }
                if (createdA > createdB) {
                    return 1;
                }
                return 0;
            });
        default:
            console.log('sort not working');
    }
}

function filter(recipe,tagList){
    if(recipe.tags == undefined){
        return false;
    }
    for(const t in tagList){
        if(recipe.tags.some(x => x == tagList[t])){
            continue;
        }
        else{
            return false;
        }
    }
    return true;
}

export function filterRecipes(recipes,tagList){
    if(tagList.length == 0){
        return recipes;
    }
    let res = [];
    for(const r in recipes){
        if(filter(recipes[r],tagList)){
            res.push(recipes[r]);
        }
    }
    return res;
}