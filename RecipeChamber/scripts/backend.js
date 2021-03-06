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

/*
 * This function returns recipe object given recipe name or id
 * 
 * @param {string} name or id of recipe to retreive
 * @returns {Object}  recipe object
 */
export function get(key) {
    const data = JSON.parse(localStorage.getItem('recipeData'))
    var result = data.filter(function (item) {
        return (key == item.name || key == item.id)
    })[0];
    //console.log(result);
    return result;
}

/*
 * This function returns array of all recipe objects
 * 
 * @returns {Array} An array of recipe objects
 */
export function getAll() {
    //console.log(JSON.parse(localStorage.getItem('recipeData')));
    return (JSON.parse(localStorage.getItem('recipeData')));
}

/*
 * This function accepts converts an image (base64) to a (imgur) url link.
 * 
 * @param {string} image in base64 format
 * @returns {string} imgur image urls
 */
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

/*
 * This function stores/updates the recipe object in localstorage
 * 
 * @param {Object} an array object
 */
export function save(recipe) {
    if (!localStorage.getItem('recipeData')) {
        localStorage.setItem('recipeData', JSON.stringify([]))
    }
    if (get(recipe.id)) {
        deleteRecipe(recipe.id)
    }
    var data = JSON.parse(localStorage.getItem('recipeData'))
    data.push(recipe)
    saveToLocalStorage(data)
    let imgURL = ''
    console.log(localStorage.getItem('recipeData'))
}

/*
 * A helper function to stringify and save/update recipes 
 * data into local storage
 * 
 * @param {Array} Array of recipes object
 */
export function saveToLocalStorage(data) {
    localStorage.setItem('recipeData', JSON.stringify(data))
}

/*
 * This function deletes a recipe given its id from localstorage
 * 
 * @param {string} id of the recipe
 */
export function deleteRecipe(id) {
    saveToLocalStorage(getAll().filter(recipe => id != recipe.id));
}

/*
 * This function adds unique ingredients of a recipe to the grocery list
 * 
 * @param {Object} A recipe object
 */
export function addToGroceryList(recipe) {
    if (!localStorage.getItem('grocery')) {
        localStorage.setItem('grocery', JSON.stringify([]));
    }
    var groceryData = JSON.parse(localStorage.getItem('grocery'));
    for (var ing of recipe.ingredients['ingredients']) {
        let exist = false;
        for (var curr of groceryData) {
            if (ing.ingName.toLowerCase() == curr.name.toLowerCase()) {
                exist = true
                console.log(exist)
                break;
            }
        }
        if (!exist) {
            groceryData.push({ name: ing.ingName, done: false });
            localStorage.setItem('grocery', JSON.stringify(groceryData));
            console.log(localStorage.getItem('grocery'));
        }
    }
}

/*
 * This function returns grocery list array from local storage when called
 * 
 * @returns {Array} return grocery list structure [{name: string, done: boolean}]
 */
//returns grocery list as 
export function groceryList (){
     if (checkedOff()){
        localStorage.setItem('grocery', JSON.stringify([]));
     }
    return JSON.parse(localStorage.getItem('grocery'))
}

/*
 * helper function to see if the entire grocery list is checked off
 * 
 * @returns {boolean} whether or not the grocery list is checked off
 */
function checkedOff(){
    var flag = true;
    var groceryData = JSON.parse(localStorage.getItem('grocery'));
    if(groceryData) {
        for (var ing of groceryData) {
            if (!ing.done) {
                flag = false;
            }
        }
    }
    
    return flag;
}

/*
 * This function accept a array and a method to sort the array  
 * and returns a sorted array according to the given order
 * 
 * @param {Array} recipes An array of recipe objects
 * @param {string} method The method used to sort the Array
 * @returns {Array} a sorted list of all recipe according to the designateed method
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

/*
 * This function accept a recipe object and a list of tags  
 * and returns whether all the tags are contained in the tag attribute of the object
 * 
 * @param {Object} recipe An recipe object
 * @param {Array} tagList Array of tags to search for
 * @returns {boolean} whether the recipe object contains all the tags
 */
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

/*
 * This function accept an Array of recipe object and a list of tags  
 * and returns an array containing all the recipes that contains all given tags
 * 
 * @param {Array} recipes An Array of recipe objects
 * @param {Array} tagList Array of tags to search for
 * @returns {Array} An Array of recipe objects
 */
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
