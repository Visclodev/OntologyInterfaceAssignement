import { React } from "react";
import "../stylesheet/Meal.css"
import {  Link } from "react-router-dom";

function Meal(props) {
    return (
        <div className="meal">
            <small>{props.meal.idMeal}</small>
            <h3>{props.meal.strMeal}</h3>
            <button><Link to="/MealPage" state={{mealData: props.meal}}>
                See Meal
            </Link></button>
        </div>
    );
}

export default Meal;