import * as React from 'react';
import { useLocation } from 'react-router-dom';
import "../stylesheet/MealPage.css";

function MealPage(props) {
  const location = useLocation();
  const { mealData } = location.state;
  console.log(mealData);
  return (
    <div className='main'>
      <h2>{mealData.strMeal}</h2>
      <div className='meal'>
        <img
          src={mealData.strMealThumb}
          className='mealImage'
        ></img>
        <div className='mealDescription'>
          Ingredients:
          <ul>
            {mealData.strIngredients?.map((ingredient) => (
                <li>ingredient</li>
              ))}
          </ul>
          Recipe:
          <p>
            {mealData.strInstructions}
          </p>
        </div>
      </div>
      <div className='sameCategory'>
        Some other {mealData.strCategory} meals:
      </div>
      <div className='sameArea'>
        Other meals from {mealData.strArea}:
      </div>
    </div>
  )
}

export default MealPage;