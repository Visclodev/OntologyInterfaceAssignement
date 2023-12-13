import SearchBar from '../component/SearchBar';
import SelectOption from '../component/SelectOption';
import Answer from '../component/Answer';
import { React, useState, useEffect } from "react";
import "../stylesheet/Ontology.css"

//example of what I imagine the data should look like :
const option = [{ 
  label: "country",
  optionsList: [
    { value: 'France', label: 'France' },
    { value: 'Sweden', label: 'Sweden' },
    { value: 'Germany', label: 'Germany' }
  ],
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
}];

//exemple of potential result
const result = [{
  name: "cake",
},
{
  name: "pizza",
}];

function Ontology() {

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
                <p>{recipe.name}</p>
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
  