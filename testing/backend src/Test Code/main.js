const name = document.querySelector('.name');
const ingredients = document.querySelector('.ingredients');
const steps = document.querySelector('.steps');
const tags = document.querySelector('.tags');

const text = document.querySelector('.text');
const button = document.querySelector('.button');
const query = document.querySelector('.query');
const clear = document.querySelector('.clear');
var imgURL;

$("#upload").change(function () {
    if (this.files && this.files[0]) {
        var FR = new FileReader();
        FR.onload = function (e) {
            console.log(e.target.result);
            var imgBase64 = e.target.result
            imgToURL(imgBase64.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""));
        };
        FR.readAsDataURL(this.files[0]);
    }
});

function imgToURL(imgBase64) {
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
}

function save() {
    if (!localStorage.getItem('recipeData')) {
        localStorage.setItem('recipeData', JSON.stringify([]))
    }
    var data = JSON.parse(localStorage.getItem('recipeData'))
    const recipe = {
        id: Math.floor(100000 + Math.random() * 900000),
        name: name.value,
        ingredients: ingredients.value,
        /*ingredients: Object{
            proportion: #,
            {
                name: 'ingredient 1',
                amount: '#',
                unit: 'tsp'
            },
        }*/
        /* ingredient: [['ingredient 1', #, 'tsp],] */

        steps: steps.value,
        tags: tags.value,
        img: imgURL
    }
    data.push(recipe)
    saveToLocalStorage(data)
    location.reload();
    imgURL = ''
    console.log(localStorage.getItem('recipeData'))
}

function saveToLocalStorage(data) {
    localStorage.setItem('recipeData', JSON.stringify(data))
}
button.addEventListener('click', save);

lookup()
function lookup() {
    text.innerHTML = '';
    const data = JSON.parse(localStorage.getItem('recipeData'))
    console.log(data)
    var results = data.filter(function (item) {
        return query.value == item.name.substring(0, query.value.length) || query.value == item.tags.substring(0, query.value.length)
        //  item.name.includes(query.value) || item.tags.includes(query.value);
    })
    console.log(results)
    Object.entries(results).forEach(entry => {
        Object.entries(entry[1]).forEach(field => {
            text.innerHTML += field[0] + ': ';
            text.innerHTML += field[1];
            text.appendChild(document.createElement("br"));
        });
        text.innerHTML += '---------'
        text.appendChild(document.createElement("br"));;
    });
}
query.addEventListener('keyup', lookup);


const clearfunc = () => {
    localStorage.clear()
    location.reload();
    console.log('localStorage cleared')
}
clear.addEventListener('click', clearfunc);

function deleteRecipe(id) {
    var recipes = getAll();
    newRecipes = recipes.filter(recipe => id != recipe.id);
    recipes = newRecipes;
    saveToLocalStorage(recipes)
    console.log(localStorage);
}

function getAll() {
    //console.log(JSON.parse(localStorage.getItem('recipeData')));
    return (JSON.parse(localStorage.getItem('recipeData')));
}

function sortAll(recipes,method){
    switch (method) {
        // least made
        case 'lm':
            return recipes.sort(function compareFn(firstEl, secondEl){
                return firstEl.made - secondEl.made;
            });
        // most made
        case 'mm':
            return recipes.sort(function compareFn(firstEl, secondEl){
                return secondEl.made - firstEl.made;
            });
        // alphabetical
        case 'alpha':
            return recipes.sort(function compareFn(firstEl, secondEl){
                nameA = firstEl.name;
                nameB = secondEl.name;
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
            });
        // date of creation
        case 'mod':
            return recipes.sort(function compareFn(firstEl, secondEl){
                createdA = firstEl.created;
                createdB = secondEl.created;
                if (createdA < createdB) {
                    return -1;
                }
                if (createdA > createdB) {
                    return 1;
                }
                return 0;
            });
        default:
            console.log('please input a valid sort type');
    }
}