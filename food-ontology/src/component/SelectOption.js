import * as React from 'react';
import Select from 'react-select';
import { FormControl } from '@mui/base/FormControl';
import "../stylesheet/Select.css"

  
function SelectOption(props) {

    let handleChange = (e) => {
        console.log(e);
    }

    return(
        <div className='select'>
            <FormControl fullWidth>
                <Select options={props.options} onChange={handleChange} placeholder={props.label} isSearchable isMulti/>
            </FormControl>
        </div>
    );
}

export default SelectOption;
