import * as React from 'react';
import { useLocation } from 'react-router-dom';
import "../stylesheet/MealPage.css";
import RelatedMeals from '../component/RelatedMeals';
import { fetchMealById, storeArray, mapIngredients } from '../api/TheMealDB';
import Ingredient from '../component/Ingredient';
import { Box, Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import Grid from '@mui/material/Grid';
import { ListItemIcon } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';


function MealPage(props) {
  const location = useLocation();
  const [mealData, setMealData] = React.useState(location.state.mealData);
  const [ingredientMap, setIngredientMap] = React.useState([]);
  

  function addSelectProperty(input) {
    input.forEach(element => {
      element["selected"] = false;
    });
    return input;
  }

React.useEffect(() => {
  if (!mealData.strInstructions) {
    fetchMealById(mealData.idMeal).then((res) => {
      res["strIngredients"] = storeArray("strIngredient", res);
      res["strMeasures"] = storeArray("strMeasure", res);
      res["ingredientMap"] = mapIngredients(res);
      setMealData(res);
    })
  }
  if (mealData.ingredientMap) {
    setIngredientMap(addSelectProperty(mealData.ingredientMap));
  }
}, [mealData]);


  const ingredientClicked = (data) => {
    let newIngredientMap = ingredientMap;

    if (data.target.className == "selectedIngredient") {
      data.target.className = "unselectedIngredient";
    } else {
      data.target.className = "selectedIngredient";
    }

    for (let i = 0; ingredientMap[i]; i++) {
      if (ingredientMap[i].ingredient === data.target.title) {
        newIngredientMap[i].selected = !ingredientMap[i].selected;
        setIngredientMap(newIngredientMap);
        return;
      }
    }
  }

  return (
    <Box sx={{ bgcolor: 'background.paper', pt: 8, pb: 6 , mx: 3}}>
      <Container maxWidth="false">
      <Typography variant="h4" align="left" style={{ color: 'black' }} paragraph marginTop="10px">
          {mealData.strMeal}
        </Typography>
        <Grid container spacing={2} style={{ display: 'flex' }}>
  <Grid item xs={12} sm={6} style={{ display: 'flex' }}>
    <img src={mealData.strMealThumb} alt={mealData.strMeal} style={{ width: '100%', height: 'auto', objectFit: 'cover', alignSelf: 'stretch' }} />
  </Grid>
  <Grid item xs={12} sm={6} style={{ display: 'flex' }}>
    <Box bgcolor="#fcf4ff" p={2} style={{ overflow: 'auto', alignSelf: 'stretch' }}>
            <Typography variant="h5" align="left" style={{ color: 'black' }} paragraph marginTop="10px">
              Ingredients:
            </Typography>
            <List>
              {ingredientMap?.map((pair) => (
                <ListItem sx={{ my: 0.5 }} key={pair.ingredient}>
                <ListItemIcon>
                  <FiberManualRecordIcon fontSize="inherit" color="inherit" />
                </ListItemIcon>
                <ListItemText primary={`${pair.measure} ${pair.ingredient}`} />
              </ListItem>
              ))}
            </List>
            </Box>
          </Grid>
        </Grid>

        <Typography variant="h5" align="left" component="h2" gutterBottom marginTop="30px" >
          Recipe:
        </Typography>
        <Typography variant="body1" align="left" style={{ color: 'black' }} paragraph marginTop="10px" marginBottom="100px">
          {mealData.strInstructions}
        </Typography>
      </Container>
      <RelatedMeals
        value={mealData.strCategory}
        type="Category"
        updateMeal={setMealData}
      />
      <RelatedMeals
        value={mealData.strArea}
        type="Area"
        updateMeal={setMealData}
      />
    </Box>
  );
};

export default MealPage;