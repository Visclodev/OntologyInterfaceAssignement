import { React, useState } from "react";
import TextField from "@mui/material/TextField";
import "../stylesheet/SearchBar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'

function SearchBar() {

  const [ingredients, setIngredients] = useState([]);

  let handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (e.target.value.length > 0) {
        setIngredients([...ingredients, e.target.value]);
        e.target.value = "";
      }
    }
  }

  let removeIngredient = (key) => {
    let array = ingredients;
    if (key > -1) { 
      array.splice(key, 1);
    }
    setIngredients(array);
    console.log(ingredients);
    
  }

  return (
    <div>
      
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
        {ingredients?.map((item, key) => (
          <h className="ingredient" id={key}> 
              {item}
              <FontAwesomeIcon icon={faCircleXmark} style={{marginLeft: "0.6%"}} onClick={() => removeIngredient(key)}/>
          </h>
        ))}
      </div>
    </div>
  );
}

export default SearchBar;
