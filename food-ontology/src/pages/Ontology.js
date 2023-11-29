import * as React from 'react';
import SearchBar from '../component/SearchBar';
import SelectOption from '../component/SelectOption';

function Ontology() {
    return (
      <div>
        <div style={{marginTop: "2%"}}>
          <SelectOption></SelectOption>
          <SearchBar></SearchBar>
        </div>
      </div>
    );
}
  
export default Ontology;
  