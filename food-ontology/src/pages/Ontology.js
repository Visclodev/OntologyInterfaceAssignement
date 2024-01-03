import SearchBar from '../component/SearchBar';
import SelectOption from '../component/SelectOption';
import Meal from '../component/Meal';
import { React, useState, useEffect } from "react";
import "../stylesheet/Ontology.css"
import * as MealDB from "../api/TheMealDB"


function Ontology() {
    useEffect(() => {MealDB.fetchCategories()});
    useEffect(() => {MealDB.fetchArea()});
    //useEffect(MealDB.fetchIngredients);
    const [ingredients, setIngredients] = useState([]); //list of the ingredients needed for the query
    const [options, setOptions] = useState(MealDB.getOption()); //change "option" to [] when the query will be done
    const [results, setResults] = useState([]) //change "result" to [] when the query will be done
    const [total, setTotal] = useState(0);

    const handleOptionChange = (label, selectedOptions) => {
      setOptions((prevOptions) =>
        prevOptions.map((option) =>
          option.label === label ? { ...option, optionsChoose: selectedOptions } : option
        )
      );
    };

    const searchButton = async () => {
      setTotal(ingredients.length + options.reduce((total, option) => total + option.optionsChoose.length, 0));
      let promises = ingredients.map(ingredient => MealDB.fetchMealsByIngredient(ingredient));
      promises.concat(options[0].optionsChoose.map(area => MealDB.fetchMealsByArea(area)));
      promises.concat(options[1].optionsChoose.map(category => MealDB.fetchMealsByCategory(category)))
      const responses = await Promise.all(promises);
      let result = [].concat(...responses)
      console.log(result);
      MealDB.cleanResults(result);
      result = await MealDB.fillMealData(result);
      result = await MealDB.exclusiveInclusion(result, ingredients, options[0].optionsChoose, options[1].optionsChoose)
      setResults(result);
    }

    return (
      <div>
        <div style={{marginTop: "2%"}}>
          {options?.map((option) => (
            <SelectOption label={option.label} optionsList={option.optionsList} optionsChoose={option.optionsChoose} onOptionChange={handleOptionChange} optionsData={options}></SelectOption>
          ))}
          <SearchBar ingredients={ingredients} setIngredients={setIngredients}></SearchBar>
          <button onClick={searchButton}>search</button>
          {
            total >= 3 ? 
            <div> 
              <hr class="solid"></hr>
              {results?.map((meal) => (
                  <Meal meal={meal}></Meal>
              ))}
            </div>
            :
            <h className='error-message'>Please add more filter element</h>
          }
          
        </div>
      </div>
    );
}
  
export default Ontology;
  