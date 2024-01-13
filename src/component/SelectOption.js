import * as React from 'react';
import Select from 'react-select';
import { FormControl } from '@mui/base/FormControl';
import "../stylesheet/Select.css"
import { green } from '@mui/material/colors';

  
function SelectOption(props) {
    
    const customStyles = {
        multiValue: (styles) => {
            return {
              ...styles,
              backgroundColor: "#b50d57",
            };
        },
        multiValueLabel: (styles) => ({
            ...styles,
            color: "white",
        }),
        multiValueRemove: (styles) => ({
            ...styles,
            borderRadius: "50% 50% 50% 50%",
            color: "#b50d57",
            backgroundColor: "#f9f2fb",
            ':hover': {
              backgroundColor: "#dbc8e0",
            },
        }),
        
    }

   
    
    
    let handleChange = (e) => {
        props.onOptionChange(props.label, e);
    }

    return(
        <div className='select'>
            <FormControl fullWidth>
                <Select options={props.optionsList} onChange={handleChange} placeholder={props.label} isSearchable isMulti value={props.optionsChoose} styles={customStyles} maxMenuHeight={125}/>
            </FormControl>
        </div>
    );
}

export default SelectOption;
