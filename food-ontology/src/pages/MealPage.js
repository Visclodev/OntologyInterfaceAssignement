import * as React from 'react';
import { useLocation } from 'react-router-dom';
import "../stylesheet/MealPage.css";
import RelatedMeals from '../component/RelatedMeals';

function MealPage(props) {
  const location = useLocation();
  const { mealData } = location.state;
  return (
    <div className='main'>
      <h2>{mealData.strMeal}</h2>
      <div className='mealCard'>
        <img
          src={mealData.strMealThumb}
          className='mealImage'
        ></img>
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
      ></RelatedMeals>
      <RelatedMeals
        value={mealData.strArea}
        type="Area"
      ></RelatedMeals>
    </div>
  )
}

export default MealPage;