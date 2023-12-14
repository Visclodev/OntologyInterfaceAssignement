import SearchBar from '../component/SearchBar';
import SelectOption from '../component/SelectOption';
import Recipe from '../component/Recipe';
import Answer from '../component/Answer';
import { React, useState, useEffect } from "react";
import "../stylesheet/Ontology.css"
import {fetchCategories, fetchArea, fetchIngredients, fetchRandomMeal, fetchMealWithIngredient, getOption} from "../api/TheMealDB"

//exemple of potential result
let result = [{
  name: "cake",
  instructions: "bake the cake"
},
{
  name: "pizza",
  instructions: "add cheese"
}];


function Ontology() {
    useEffect(fetchCategories);
    useEffect(fetchArea);
    useEffect(fetchIngredients);
    const [ingredients, setIngredients] = useState([]); //list of the ingredients needed for the query
    const [options, setOptions] = useState(getOption()); //change "option" to [] when the query will be done
    const [results, setResults] = useState(result) //change "result" to [] when the query will be done
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
          //setResults(fetchMealWithIngredient(results, ingredient));//to fix: undefined + pb return
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
                  <Recipe recipe={recipe}></Recipe>
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
  