import * as React from 'react';
import SearchBar from '../component/SearchBar';
import SelectOption from '../component/SelectOption';
import Answer from '../component/Answer';

function Ontology() {
    return (
      <div>
        <div style={{marginTop: "2%"}}>
          <SelectOption></SelectOption>
          <Answer blabla="my car keys"></Answer>
          <SearchBar></SearchBar>
        </div>
        <div>
        </div>
      </div>
    );
}
  
export default Ontology;
  