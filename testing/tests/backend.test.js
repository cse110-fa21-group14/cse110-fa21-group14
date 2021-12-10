const API_KEY = "684bb3f58f5441e298a4431dfa0575e6";
//sample test
test('adds 1 + 2 to equal 3', () => {
    expect(1 + 2).toBe(3);
  });


//add more tests here:

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

function filterRecipes(recipes,tagList){
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

function sortAll(recipes, method) {
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


/**
 * 
 * @param {string} recipe_name
 * @returns {Object} JSON Object
 * Call Spoonacular API for recipe basic information.
 * Information included:
 * id, title, image
 */
 async function getRecipeData(recipe_name) {
    const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${recipe_name}&number=5`).then((response1) => {return response1});
    return response.json();
}
/**
 * 
 * @param {string} recipe_id 
 * @returns {Object} JSON Object
 * Call Spoonacular API for recipe ingredients.
 * Information included:
 * name, amount, units
 */
async function getIngredients(recipe_id) {
    const response = await fetch(`https://api.spoonacular.com/recipes/${recipe_id}/ingredientWidget.json?apiKey=${API_KEY}`);
    return response.json();
}

/**
 * 
 * @param {string} recipe_id 
 * @returns {Object} JSON Object
 * Call Spoonacular API for recipe instructions
 * Information included:
 * step, step number
 */
async function getInstructions(recipe_id) {
    const response = await fetch(`https://api.spoonacular.com/recipes/${recipe_id}/analyzedInstructions?apiKey=${API_KEY}`);
    return response.json();
}

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
       SEARCH_OBJ.search.push({"id": recipes[i].id, "name": recipes[i].title, "img": recipes[i].image, "ingList": [], instList: []});
    }
    return SEARCH_OBJ;
 }

test('get recipe data test 1', () => {
    expect(getRecipeInfo('strawberry')).not.toBeNull();
})

test('get recipe data test 2', () => {
    expect(getRecipeInfo('apple')).toBeDefined();
})

test('get recipe data test 1', () => {
    expect(getRecipeData('pasta')).not.toBeNull();
})

test('get recipe data test 2', () => {
    expect(getRecipeData('chocolate')).toBeDefined();
})

test('get recipe ingredients test 1', () => {
    expect(getIngredients('654959')).not.toBeNull();
})

test('get recipe ingredients test 2', () => {
    expect(getIngredients('511728')).toBeDefined();
})

test('get recipe ingredients test 1', () => {
    expect(getInstructions('654959')).not.toBeNull();
})

test('get recipe ingredients test 2', () => {
    expect(getInstructions('511728')).toBeDefined();
})

test('filter test 1', () =>{
  expect(filter({'tags':['test']},['test'])).toBe(true);
})

test('filter test 2', () =>{
  expect(filter({'tags':['test1']},['test'])).toBe(false);
})

test('filter test 3', () =>{
  expect(filter({'tags':['test','test1']},['test','test1'])).toBe(true);
})

test('filter test 4', () =>{
  expect(filter({'tags':['test','test1']},[])).toBe(true);
})

let testArray = [{'name':1,'tags':['test']},{'name':2,'tags':['test1']},{'name':3,'tags':['test','test1']}]

test('filterRecipes test 1', () =>{
  expect(filterRecipes(testArray,['test'])).toStrictEqual([{'name':1,'tags':['test']},{'name':3,'tags':['test','test1']}]);
})

test('filterRecipes test 2', () =>{
  expect(filterRecipes(testArray,['test','test1'])).toStrictEqual([{'name':3,'tags':['test','test1']}]);
})

let sortAlltestArray2 = [{'makeCount':3,'name':'b','created':new Date('1995-12-17T03:24:00')},
                  {'makeCount':1,'name':'a','created':new Date('1996-12-17T03:24:00')},
                  {'makeCount':2,'name':'c','created':new Date('1995-11-17T03:24:00')}]

let sortAlltarget1 = [{'makeCount':1,'name':'a','created':new Date('1996-12-17T03:24:00')},
                  {'makeCount':2,'name':'c','created':new Date('1995-11-17T03:24:00')},
                  {'makeCount':3,'name':'b','created':new Date('1995-12-17T03:24:00')}]

let sortAlltarget2 = [{'makeCount':1,'name':'a','created':new Date('1996-12-17T03:24:00')},
                  {'makeCount':3,'name':'b','created':new Date('1995-12-17T03:24:00')},
                  {'makeCount':2,'name':'c','created':new Date('1995-11-17T03:24:00')}]

test('sortAll test 1', () =>{
  expect(sortAll(sortAlltestArray2,'least-made')).toStrictEqual(sortAlltarget1);
})

test('sortAll test 2', () =>{
  expect(sortAll(sortAlltestArray2,'newest')).toStrictEqual(sortAlltarget2);
})
