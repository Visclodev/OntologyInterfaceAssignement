// This is filled by fetchIngredients() this could be used for the searchbar
let availableIngredients = []

//example of what I imagine the data should look like :
let option = [{ 
  label: "country",
  optionsList: [],
  optionsChoose: [],

},
{
  label: "meal categories",
  optionsList: [],
  optionsChoose: []
},
{
  label: "food restriction",
  optionsList: [
    { value: 'Gluten-free', label: 'Gluten-free' },
    { value: 'Lactose-free', label: 'Lactose-free' },
    { value: 'Vegetarianism', label: 'Vegetarianism' },
    { value: 'Veganism', label: 'Veganism' },
    { value: 'Kosher', label: 'Kosher' },
    { value: 'Keto', label: 'Keto' },
    { value: 'Diabetes', label: 'Diabetes' },
    { value: 'Dairy-free', label: 'Dairy-free' },
    { value: 'Low carb', label: 'Low carb' }
  ],
  optionsChoose: [],
}];
  
function getOption() {
    return option
}

function fetchCategories() {
  if (option[1].optionsList.length != 0)
    return;
    fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
    .then(response => {
        console.log(response)
        return response.json()
      })
    .then(response => {
      response.meals.forEach(meal => {
        option[1].optionsList.push({
          value: meal.strCategory,
          label: meal.strCategory
        })
      })
    })
    .catch(reason => console.log(reason));
}
  
function fetchArea() {
  if (option[0].optionsList.length != 0)
    return;
  fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
  .then(response => {
      console.log(response)
      return response.json()
    })
  .then(response => {
    response.meals.forEach(meal => {
      option[0].optionsList.push({
        value: meal.strArea,
        label: meal.strArea
      })
    })
    console.log(option[0].optionsList)
  })
  .catch(reason => console.log(reason));
}

function fetchIngredients() {
    fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list")
    .then(response => {
      console.log(response)
      return response.json()
    })
    .then(response => {
      option[0].optionsList = [];
      response.meals.forEach(meal => {
        availableIngredients.push({
          id: meal.idIngredient,
          label: meal.strIngredient
        })
      })
      console.log(availableIngredients);
    })
    .catch(reason => console.log(reason));
}
  
function fetchRandomMeal(results) {
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then(res => res.json())
    .then(res => {
      results.push({
        name: res.meals[0].strMeal
      })
    }).catch(reason => console.log(reason));
}

async function fetchMealsByIngredient(ingredient) {
  const req = "https://www.themealdb.com/api/json/v1/1/filter.php?i=" + ingredient
  const response = await fetch(req)
  const meals = await response.json()
  return meals.meals
}

async function fetchMealsByArea(area) {
  const req = "https://www.themealdb.com/api/json/v1/1/filter.php?a=" + area
  const response = await fetch(req)
  const meals = await response.json()
  return meals.meals
}

async function fetchMealsByCategory(category) {
  const req = "https://www.themealdb.com/api/json/v1/1/filter.php?c=" + category
  const response = await fetch(req)
  const meals = await response.json()
  return meals.meals
}

function compareMeals(a, b) {
  if (a.idMeal < b.idMeal) {
    return -1
  } else if (a.idMeal > b.idMeal) {
    return 1
  }
  return 0
}

function cleanResults(r) {
  r.sort(compareMeals);
  console.log(r);
  for (let i = r.length - 1; i > 0; i--) {
    if (r[i].idMeal === r[i - 1].idMeal) {
      r.splice(i, 1);
    }
  }
  return r;
}

async function fetchMeals(ingredients, areas, categories) {
  let result = [];
  ingredients.forEach(element => {
    fetchMealsByIngredient(element).then(res => result.concat(result));
  });
  areas.forEach(element => {
    fetchMealsByArea(element).then(res => result.concat(res));
  })
  categories.forEach(element => {
    fetchMealsByCategory(element).then(res => result.concat(res));
  })
  cleanResults(result);
  return result;
}

module.exports = {
    fetchCategories,
    fetchArea,
    fetchIngredients,
    fetchRandomMeal,
    getOption,
    fetchMealsByIngredient,
    fetchMealsByArea,
    fetchMealsByCategory,
    cleanResults,
    fetchMeals
  };
  