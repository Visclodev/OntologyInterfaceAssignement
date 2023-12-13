import SearchBar from '../component/SearchBar';
import SelectOption from '../component/SelectOption';
import Answer from '../component/Answer';
import { React, useState, useEffect } from "react";
import "../stylesheet/Ontology.css"

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

// This is filled by fetchIngredients() this could be used for the searchbar
let availableIngredients = []

//exemple of potential result
let result = [{
  name: "cake",
  instructions: "bake the cake"
},
{
  name: "pizza",
  instructions: "add cheese"
}];

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
    })
  }).catch(reason => console.log(reason));
}

function Ontology() {
    useEffect(fetchCategories);
    useEffect(fetchArea);
    useEffect(fetchIngredients);
    const [ingredients, setIngredients] = useState([]); //list of the ingredients needed for the query
    const [options, setOptions] = useState(option); //change "option" to [] when the query will be done
    const [results, setResult] = useState(result) //change "result" to [] when the query will be done
    const [total, setTotal] = useState(0);

    const handleOptionChange = (label, selectedOptions) => {
      setOptions((prevOptions) =>
        prevOptions.map((option) =>
          option.label === label ? { ...option, optionsChoose: selectedOptions } : option
        )
      );
    };
    
    useEffect(() => {
      setTotal(ingredients.length + options.reduce((total, option) => total + option.optionsChoose.length, 0));
      if (total >= 3) {
        ingredients.forEach(ingredient => {
          fetchMealWithIngredient(results, ingredient);
        });
      }
    })


    return (
      <div>
        <div style={{marginTop: "2%"}}>
          {options?.map((option) => (
            <SelectOption label={option.label} optionsList={option.optionsList} optionsChoose={option.optionsChoose} onOptionChange={handleOptionChange} optionsData={options}></SelectOption>
          ))}
          <SearchBar ingredients={ingredients} setIngredients={setIngredients}></SearchBar>
          {
            total >= 3 ? 
            <div> 
              <hr class="solid"></hr>
              {results?.map((recipe) => (
                <div>
                  <h3>{recipe.name}</h3>
                  <p>{recipe.instructions}</p>
                </div>
              ))}
            </div>
            :
            <h className='error-message'>Please add more filter element</h>
          }
          {/*<Answer blabla="my car keys"></Answer>*/ }

          
        </div>
      </div>
    );
}
  
export default Ontology;
  