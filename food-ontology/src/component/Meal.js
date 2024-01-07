import { React } from "react";
import "../stylesheet/Meal.css"
import { Link, useLocation } from "react-router-dom";

function Meal(props) {
    const location = useLocation();

    return (
        <div className="meal">
            <small>{props.meal.idMeal}</small>
            <h3>{props.meal.strMeal}</h3>
            {
                location.pathname != "/MealPage" ?
                    <button><Link to="/MealPage" state={{ mealData: props.meal }}>
                        See Meal
                    </Link></button>
                    :
                    <button onClick={() => props.updateMeal(props.meal)}>See Meal</button>
            }
        </div>
    );
}

export default Meal;