import { React, useState } from "react";
import TextField from "@mui/material/TextField";
import "../stylesheet/SearchBar.css";

function SearchBar() {

  const [ingredients, setIngredients] = useState([]);

  let handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (e.target.value.length > 0) {
        setIngredients([...ingredients, e.target.value]);
        e.target.value = "";
      }
      console.log(ingredients);
    }
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
        {ingredients && ingredients.map((item) => (
          <p> {item} </p>
        ))}
      </div>
    </div>
  );
}

export default SearchBar;
