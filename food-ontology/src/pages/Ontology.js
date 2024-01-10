import SearchBar from '../component/SearchBar';
import SelectOption from '../component/SelectOption';
import Meal from '../component/Meal';
import { React, useState, useEffect } from "react";
import "../stylesheet/Ontology.css"
import * as MealDB from "../api/TheMealDB"
import { FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import backgroundImage from '../index/background.png';



function Ontology() {
  useEffect(() => {MealDB.fetchCategories()}, []);
  useEffect(() => {MealDB.fetchArea()}, []);
  //useEffect(MealDB.fetchIngredients);
  const [ingredients, setIngredients] = useState([]); //list of the ingredients needed for the query
  const [options, setOptions] = useState(MealDB.getOption()); //change "option" to [] when the query will be done
  const [results, setResults] = useState([]) //change "result" to [] when the query will be done
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [searchClicked, setSearchClicked] = useState(false);
  const [loadingFinished, setLoadingFinished] = useState(false);
  
  
  const handleOptionChange = (label, selectedOptions) => {
    setOptions((prevOptions) =>
      prevOptions.map((option) =>
        option.label === label ? { ...option, optionsChoose: selectedOptions } : option
      )
    );
  };
  
  const searchButton = async () => {
    if (ingredients.length + options[0].optionsChoose.length + options[1].optionsChoose.length === 0)
    return;
    console.log("searching...");
    setTotal(3);
    setIsLoading(true);
    setSearchClicked(true);
    //setTotal(ingredients.length + options.reduce((total, option) => total + option.optionsChoose.length, 0));
    let promises = ingredients.map(ingredient => MealDB.fetchMealsByIngredient(ingredient));
    promises = promises.concat(options[0].optionsChoose.map(area => MealDB.fetchMealsByArea(area.value)));
    promises = promises.concat(options[1].optionsChoose.map(category => MealDB.fetchMealsByCategory(category.value)))
    const responses = await Promise.all(promises);
    let result = [].concat(...responses)
    MealDB.cleanResults(result);
    
    // Dark magic, don't touch this
    result = await MealDB.fillMealDataSlow(result);
    const resultMore = await Promise.all(result);
    result = await MealDB.exclusiveInclusion(resultMore, ingredients, options[0].optionsChoose, options[1].optionsChoose)
    setResults(result);
    setIsLoading(false);
    setLoadingFinished(true);
  }
  
  useEffect(() => {
    if (searchClicked) {
      searchButton();
      setSearchClicked(false);
    }
  }, [searchClicked]);
  
  return (
    <div className="container">
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="false" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Box bgcolor="rgba(255, 255, 255, 0.7)" p={2}>
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            ONTOOD
          </Typography>
          <Typography variant="h5" align="center" style={{ color: 'black' }} paragraph marginTop="-10px">
            Welcome to ONTOOD! Uncover the world of culinary arts with our food ontology-based platform, designed to enrich your cooking experience with personalized, sustainable choices. Explore new recipes, reduce food waste, and cook with precision, all through the power of semantic web technologies.
          </Typography>
          </Box>

          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
          </Stack>
        </Container>
      </Box>
  <Container>
    
  </Container>
      <Box>
        {options?.map((option) => (
          <SelectOption label={option.label} optionsList={option.optionsList} optionsChoose={option.optionsChoose} onOptionChange={handleOptionChange} optionsData={options}></SelectOption>
        ))}
        <div style={{ marginTop: '-100px' , marginBottom: '100px'}}>
        <SearchBar ingredients={ingredients} setIngredients={setIngredients} searchButton={() => setSearchClicked(true)} />
        </div>
        {loadingFinished && <Typography variant="h6" align="center">Recipes based on your search:</Typography>}
      </Box>
  
      {isLoading ? <div className="loading-icon"><FaSpinner /></div> : null}
  
      <div style={{marginTop: "2%"}}>
        {
          total >= 3 ? 
          <div className="meal-container"> 

            {results?.map((meal) => (
              <Link to={{ pathname: "/MealPage", state: { mealData: meal } }} key={meal.idMeal}>
                <Meal meal={meal} />
              </Link>
            ))}
          </div>
          :
          null
        }
      </div>
    </div>
  );

      }
      
      export default Ontology;
