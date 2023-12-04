import SearchBar from '../component/SearchBar';
import SelectOption from '../component/SelectOption';
import Answer from '../component/Answer';
import { React, useState } from "react";

function Ontology() {

    const [ingredients, setIngredients] = useState([]); //list of the ingredients needed for the query

    return (
      <div>
        <div style={{marginTop: "2%"}}>
          <SelectOption label="Country"></SelectOption>
          <SelectOption label="test2"></SelectOption>
          <SelectOption label="fruit"></SelectOption>
          <SearchBar ingredients={ingredients} setIngredients={setIngredients}></SearchBar>
          {/*<Answer blabla="my car keys"></Answer>*/ }
        </div>
        <div>
        </div>
      </div>
    );
}
  
export default Ontology;
  