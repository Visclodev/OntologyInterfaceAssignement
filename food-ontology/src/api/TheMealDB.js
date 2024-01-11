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
}
];
  
function getOption() {
    return option
}

function fetchCategories() {
  if (option[1].optionsList.length !== 0)
    return;
    fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
    .then(response => {
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
  if (option[0].optionsList.length !== 0)
    return;
  fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
  .then(response => {
      return response.json()
    })
  .then(response => {
    response.meals.forEach(meal => {
      option[0].optionsList.push({
        value: meal.strArea,
        label: meal.strArea
      })
    })
  })
  .catch(reason => console.log(reason));
}

function fetchIngredients() {
    fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list")
    .then(response => {
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

function linkToEmbed(youtubeLink) {
  if (!youtubeLink)
    return "";
  return "https://youtube.com/embed/" + youtubeLink.slice(32);
}

async function fetchMealById(idMeal) {
  let result;

  try {
    const request = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + idMeal
    const response = await fetch(request);
    const meals = await response.json();
    result = meals.meals[0];
    result["strEmbedYtb"] = linkToEmbed(result["strYoutube"]);
    
  } catch (error) {
    console.log(error);
    result = [];
  }
  return result;
}

async function fillMealData(meals) {
  return meals.map(meal => fetchMealById(meal.idMeal));
}

// This function is slower than her sister to prevent
// Error 429: Too much request
async function fillMealDataSlow(meals) {
  let result = [];

  for (let i = 0; meals[i] != undefined; i++) {
    let newMeal = await fetchMealById(meals[i].idMeal);
    result.push(newMeal);
  }
  return result;
}

function verifyArea(meal, areas) {
  if (areas.length === 0) {
    return true;
  }
  areas.forEach(area => {
    if (meal.strArea === area)
      return true;
  });
  return false;
}

function verifyCategory(meal, categories) {
  if (categories.length === 0)
    return true;
  categories.forEach(category => {
    if (meal.strCategory === category)
      return true;
  });
  return false;
}

// arrayName: "strIngredient" || "strMeasure"
function storeArray(arrayName, meal) {
  let result = [];
  let i = 1;

  while (meal[arrayName + i]) {
    result.push(meal[arrayName + i]);
    i++;
  }
  return result;
}

function mapIngredients(meal) {
  let result = [];
  let i = 0;

  while (meal.strIngredients[i]) {
    result.push({
      ingredient: meal.strIngredients[i],
      measure: meal.strMeasures[i]
    })
    i++;
  }
  return result;
}

// return true if all ingredients in ingredients are in meal.strIngredients
function verifyIngredients(meal, ingredients) {
  for (let i = ingredients.length - 1; i >= 0; i--)
    if (meal.strIngredients.includes(ingredients[i]))
      ingredients.splice(i, 1);
  return ingredients.length === 0;
}

// This function exclude meals not containing every ingredient and at least
// one area and one category from the selected ones
function exclusiveInclusion(meals, ingredients, areas, categories) {
  for (let i = meals.length - 1; i >= 0; i--) {
    if (!verifyArea(meals[i], areas) && !verifyCategory(meals[i], categories)) {
      console.log("removing meal");
      meals.splice(i, 1);
      continue;
    }
    meals[i]["strIngredients"] = storeArray("strIngredient", meals[i]);
    meals[i]["strMeasures"] = storeArray("strMeasure", meals[i]);
    meals[i]["ingredientMap"] = mapIngredients(meals[i]);
    if (!verifyIngredients(meals[i], ingredients.slice())) {
      meals.splice(i, 1);
    }
  }
  return meals;
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
  fetchMeals,
  exclusiveInclusion,
  fillMealData,
  fillMealDataSlow,
  fetchMealById,
  storeArray,
  mapIngredients
};
