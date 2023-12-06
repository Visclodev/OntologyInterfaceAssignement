import * as React from 'react';
import Select from 'react-select';
import { FormControl } from '@mui/base/FormControl';
import "../stylesheet/Select.css"

  
function SelectOption(props) {
      
    let handleChange = (e) => {
        props.onOptionChange(props.label, e);
    }

    return(
        <div className='select'>
            <FormControl fullWidth>
                <Select options={props.optionsList} onChange={handleChange} placeholder={props.label} isSearchable isMulti value={props.optionsChoose}/>
            </FormControl>
        </div>
    );
}

export default SelectOption;
