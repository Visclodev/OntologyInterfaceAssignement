// This is filled by fetchIngredients() this could be used for the searchbar
let availableIngredients = []

//example of what I imagine the data should look like :
let option = [{ 
  label: "country",
  optionsList: [],
  optionsChoose: [],

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
},
{
  label: "meal categories",
  optionsList: [],
  optionsChoose: []
}];
  
function getOption() {
    return option
}

function fetchCategories() {
    fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
    .then(response => {
        console.log(response)
        return response.json()
      })
    .then(response => {
      response.meals.forEach(meal => {
        option[2].optionsList.push({
          value: meal.strCategory,
          label: meal.strCategory
        })
      })
    })
    .catch(reason => console.log(reason));
}
  
function fetchArea() {
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
  
function fetchMealWithIngredient(results, ingredient) {
    fetch("https://www.themealdb.com/api/json/v1/1/filter.php?i=" + ingredient)
    .then(res => {
      console.log(res)
      return res.json()
    })
    .then(res => {
      res.meals.forEach(meal => {
        results.push({
          name: meal.strMeal,
          instructions: meal.strInstructions
        })
        console.log("results");
        console.log(results);
      })
    }).catch(reason => console.log(reason));
}

module.exports = {
    fetchCategories,
    fetchArea,
    fetchIngredients,
    fetchRandomMeal,
    fetchMealWithIngredient,
    getOption,
  };
  