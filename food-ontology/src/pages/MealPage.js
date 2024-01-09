import * as React from 'react';
import { useLocation } from 'react-router-dom';
import "../stylesheet/MealPage.css";
import "../stylesheet/OntoodBtn.css"
import RelatedMeals from '../component/RelatedMeals';
import { fetchMealById, storeArray, mapIngredients } from '../api/TheMealDB';
import Ingredient from '../component/Ingredient';

function MealPage(props) {
  const location = useLocation();
  const [mealData, setMealData] = React.useState(location.state.mealData);
  const [ingredientMap, setIngredientMap] = React.useState([]);
  const [showIngredientButton, setShowIngredientButton] = React.useState(false);

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
    setIngredientMap(addSelectProperty(mealData.ingredientMap));
  }, [mealData]);


  const ingredientClicked = (data) => {
    let newIngredientMap = ingredientMap;
    setShowIngredientButton(true);

    if (data.target.className === "selectedIngredient") {
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
    <div className='main'>
      <div className='mealCard'>
        <div className='leftCard'>
          <h2>{mealData.strMeal}</h2>
          <img
            src={mealData.strMealThumb}
            className='mealImage'
            alt={"image of " + mealData.strMeal}
          ></img>
        </div>
        <div className='mealDescription'>
          <h3>Ingredients:</h3>
          <ul className="ingredientList">
            {ingredientMap?.map((pair) => (
              <Ingredient
                ingredient={pair.ingredient}
                clickIngredient={ingredientClicked}
                measure={pair.measure}
                selected={pair.selected}
              />
            ))}
          </ul>
          {
            showIngredientButton ?
            <div className='ingredientBtn'>
              <button class="button-30">Search with these ingredients</button>
            </div> :
            <br/>
          }
          <h3>Recipe:</h3>
          <p>
            {mealData.strInstructions}
          </p>
        </div>
      </div>
      <RelatedMeals
        value={mealData.strCategory}
        type="Category"
        updateMeal={setMealData}
      ></RelatedMeals>
      <RelatedMeals
        value={mealData.strArea}
        type="Area"
        updateMeal={setMealData}
      ></RelatedMeals>
    </div>
  )
}

export default MealPage;