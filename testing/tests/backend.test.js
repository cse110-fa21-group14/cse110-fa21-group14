
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