import * as React from 'react';
import Select from 'react-select';
import { FormControl } from '@mui/base/FormControl';
import InputLabel from '@mui/material/InputLabel';
import "../stylesheet/Select.css"

const options = [
    { value: 'France', label: 'France' },
    { value: 'Swedeen', label: 'Swedeen' },
    { value: 'Germany', label: 'Germany' }
  ]

  
function SelectOption(props) {

    let handleChange = (e) => {
        console.log(e);
    }

    return(
        <div className='select'>
            <FormControl fullWidth>
                <Select options={options} onChange={handleChange} placeholder={props.label} isSearchable isMulti/>
            </FormControl>
        </div>
    );
}

export default SelectOption;
