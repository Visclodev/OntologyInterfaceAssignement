import { React, useState } from "react";
import TextField from "@mui/material/TextField";
import "../stylesheet/SearchBar.css";

function SearchBar() {
  return (
    <div className="main">
      <div className="search">
        <TextField
          id="outlined-basic"
          variant="outlined"
          fullWidth
          label="What ingredient do you have ?"
        />
      </div>
    </div>
  );
}

export default SearchBar;
