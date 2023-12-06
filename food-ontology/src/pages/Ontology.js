import SearchBar from '../component/SearchBar';
import SelectOption from '../component/SelectOption';
import Answer from '../component/Answer';
import { React, useState, useEffect } from "react";

const exampleOptions = [
  { value: 'France', label: 'France' },
  { value: 'Swedeen', label: 'Swedeen' },
  { value: 'Germany', label: 'Germany' }
]


function Ontology() {

    const [ingredients, setIngredients] = useState([]); //list of the ingredients needed for the query
    const [options, SetOptions] = useState([]);

    useEffect(() => { //once the query will be made this function should be delete
      //example of what I imagine the data should look like
      let option = [{
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
      SetOptions(option);
    });

    return (
      <div>
        <div style={{marginTop: "2%"}}>
          {options?.map((option) => (
            <SelectOption label={option.label} options={option.optionsList}></SelectOption>
          ))}
          <SearchBar ingredients={ingredients} setIngredients={setIngredients}></SearchBar>
          {/*<Answer blabla="my car keys"></Answer>*/ }
        </div>
        <div>
        </div>
      </div>
    );
}
  
export default Ontology;
  