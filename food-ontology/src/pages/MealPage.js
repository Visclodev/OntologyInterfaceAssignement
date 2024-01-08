import * as React from 'react';
import { useLocation } from 'react-router-dom';
import "../stylesheet/MealPage.css";
import RelatedMeals from '../component/RelatedMeals';
import { fetchMealById, storeArray, mapIngredients } from '../api/TheMealDB';

function MealPage(props) {
  const location = useLocation();
  const [mealData, setMealData] = React.useState(location.state.mealData);

  React.useEffect(() => {
    if (!mealData.strInstructions) {
      fetchMealById(mealData.idMeal).then((res) => {
        res["strIngredients"] = storeArray("strIngredient", res);
        res["strMeasures"] = storeArray("strMeasure", res);
        res["ingredientMap"] = mapIngredients(res);
        setMealData(res);
      })
    }
  }, [mealData]);

  return (
    <div className='main'>
      <div className='mealCard'>
        <div className='leftCard'>
          <h2>{mealData.strMeal}</h2>
          <img
            src={mealData.strMealThumb}
            className='mealImage'
          ></img>
        </div>
        <div className='mealDescription'>
          <h3>Ingredients:</h3>
          <ul className="ingredientList">
            {mealData.strIngredients?.map((ingredient) => (
                <li>{ingredient}</li>
              ))}
          </ul>
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