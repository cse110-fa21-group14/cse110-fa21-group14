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
var imgURL;
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
export function imgToURL(imgBase64, imgURL) {
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
            imgURL = result.data.link;

            console.log(imgURL);
        }
    });
    return imgURL;
}

//store the recipe object in localstorage
export function save(recipe) {
    if (!localStorage.getItem('recipeData')) {
        localStorage.setItem('recipeData', JSON.stringify([]))
    }
    var data = JSON.parse(localStorage.getItem('recipeData'))
    data.push(recipe)
    saveToLocalStorage(data)
    imgURL = ''
    console.log(localStorage.getItem('recipeData'))
}
export function saveToLocalStorage(data) {
    localStorage.setItem('recipeData', JSON.stringify(data))
}

//delete recipe given id in localstorage
export function deleteRecipe(id) {
    saveToLocalStorage(getAll().filter(recipe => id != recipe.id))
}

function sum2(a, b) {
    return a + b;
  }

//module.exports = {sum2, saveToLocalStorage, deleteRecipe, save, imgToURL, getAll, get}