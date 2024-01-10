import { React, useState } from "react";
import TextField from "@mui/material/TextField";
import "../stylesheet/SearchBar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';


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
    <Grid container spacing={1} alignItems="flex-end">
    <Grid item xs={10}>
    
    <TextField
    id="outlined-basic"
    variant="outlined"
    fullWidth
    label="Add at Least One Filter"
    placeholder="What ingredient do you have ?"
    onKeyDown={handleKeyDown}
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
        <IconButton edge="end" onClick={props.searchButton}>
        <SearchIcon />
        </IconButton>
        </InputAdornment>
        ),
      }}
      InputLabelProps={{
        shrink: true,
        style: { paddingLeft: '10px' },
      }}
      sx={{ 
        '& .MuiOutlinedInput-root': { 
          borderRadius: '50px' 
        },
        '& .MuiInputBase-input': {
          paddingLeft: '20px',
        }
      }}
      />
      </Grid >
      <Grid  item xs={2}>
      
      </Grid>
      </Grid>
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
