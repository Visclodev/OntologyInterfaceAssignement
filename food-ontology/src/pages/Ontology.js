import SearchBar from '../component/SearchBar';
import SelectOption from '../component/SelectOption';
import Answer from '../component/Answer';
import { React, useState } from "react";

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

function Ontology() {

    const [ingredients, setIngredients] = useState([]); //list of the ingredients needed for the query
    const [options, setOptions] = useState(option); 

    const handleOptionChange = (label, selectedOptions) => {
      setOptions((prevOptions) =>
        prevOptions.map((option) =>
          option.label === label ? { ...option, optionsChoose: selectedOptions } : option
        )
      );
    };

    return (
      <div>
        <div style={{marginTop: "2%"}}>
          {options?.map((option) => (
            <SelectOption label={option.label} optionsList={option.optionsList} optionsChoose={option.optionsChoose} onOptionChange={handleOptionChange} optionsData={options}></SelectOption>
          ))}
          <SearchBar ingredients={ingredients} setIngredients={setIngredients}></SearchBar>
          {/*<Answer blabla="my car keys"></Answer>*/ }
          
        </div>
      </div>
    );
}
  
export default Ontology;
  