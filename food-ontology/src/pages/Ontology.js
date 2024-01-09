import SearchBar from '../component/SearchBar';
import SelectOption from '../component/SelectOption';
import Meal from '../component/Meal';
import { React, useState, useEffect } from "react";
import "../stylesheet/Ontology.css"
import * as MealDB from "../api/TheMealDB"
import { useLocation } from 'react-router-dom';


function Ontology() {
  const location = useLocation();
  const state = location.state;
    useEffect(() => {MealDB.fetchCategories()}, []);
    useEffect(() => {MealDB.fetchArea()}, []);
    //useEffect(MealDB.fetchIngredients);
    const [ingredients, setIngredients] = useState(location.state?.ingredients); //list of the ingredients needed for the query
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
      if (ingredients.length + options[0].optionsChoose.length + options[1].optionsChoose.length === 0)
        return;
      console.log("searching...");
      setTotal(3);
      //setTotal(ingredients.length + options.reduce((total, option) => total + option.optionsChoose.length, 0));
      let promises = ingredients.map(ingredient => MealDB.fetchMealsByIngredient(ingredient));
      promises = promises.concat(options[0].optionsChoose.map(area => MealDB.fetchMealsByArea(area.value)));
      promises = promises.concat(options[1].optionsChoose.map(category => MealDB.fetchMealsByCategory(category.value)))
      const responses = await Promise.all(promises);
      let result = [].concat(...responses)
      MealDB.cleanResults(result);

      // Dark magic, don't touch this
      result = await MealDB.fillMealDataSlow(result);
      const resultMore = await Promise.all(result);
      result = await MealDB.exclusiveInclusion(resultMore, ingredients, options[0].optionsChoose, options[1].optionsChoose)
      setResults(result);
    }

    useEffect(() => {searchButton()}, [ingredients, options]);

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
              <hr className="solid"></hr>
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
  