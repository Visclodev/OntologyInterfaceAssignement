import { React, useState } from "react";
import TextField from "@mui/material/TextField";
import "../stylesheet/SearchBar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'


function SearchBar(props) {

  let handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (e.target.value.length > 0) {
        props.setIngredients([...props.ingredients, e.target.value]);
        e.target.value = "";
      }
    }
  }

  let removeIngredient = (key) => {
    let array = [...props.ingredients];
    if (key > -1) { 
      array.splice(key, 1);
    }
    props.setIngredients(array);
  }

  return (
    <div style={{marginTop: 130}}>
      
      <div className="main">
        <div className="search">
          <TextField
            id="outlined-basic"
            variant="outlined"
            fullWidth
            label="What ingredient do you have ?"
            onKeyDown={handleKeyDown}

          />
        </div>
      </div>
      <div>
        {props.ingredients?.map((item, key) => (
          <h className="ingredient" id={key}> 
              {item}
              <FontAwesomeIcon icon={faCircleXmark} className="remove-icon" onClick={() => removeIngredient(key)}/>
          </h>
        ))}
      </div>
    </div>
  );
}

export default SearchBar;
