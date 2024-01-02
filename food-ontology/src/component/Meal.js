import { React } from "react";
import "../stylesheet/Meal.css"

function Meal(props) {
    return (
        <div className="meal">
            <small>{props.meal.idMeal}</small>
            <h3>{props.meal.strMeal}</h3>
            <button>See Meal</button>
        </div>
    );
}

export default Meal;