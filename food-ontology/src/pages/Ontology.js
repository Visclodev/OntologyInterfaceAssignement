import * as React from 'react';
import SearchBar from '../component/SearchBar';
import SelectOption from '../component/SelectOption';
import Answer from '../component/Answer';

function Ontology() {
    return (
      <div>
        <div style={{marginTop: "2%"}}>
          <SelectOption label="Country"></SelectOption>
          <SelectOption label="test2"></SelectOption>
          <SelectOption label="fruit"></SelectOption>
          <SearchBar></SearchBar>
          {/*<Answer blabla="my car keys"></Answer>*/}
        </div>
        <div>
        </div>
      </div>
    );
}
  
export default Ontology;
  