import { React } from "react";
import "../stylesheet/Meal.css"
import "../stylesheet/OntoodBtn.css"
import { Link, useLocation } from "react-router-dom";

function Meal(props) {
    const location = useLocation();

    if (props.meal == null)
        return null;
    return (
        <div className="meal">
            {/* <small>{props.meal.idMeal}</small> */}
            <img
            src={props.meal.strMealThumb}
            className='mealThumbnail'
            alt={"thumbnail of " + props.meal.strMeal}
          ></img>
            <h3>{props.meal.strMeal}</h3>
            {
                location.pathname != "/MealPage" ?
                    <button class="button-30"><Link to="/MealPage" state={{ mealData: props.meal }}>
                        See Meal
                    </Link></button>
                    :
                    <button class="button-30" onClick={() => props.updateMeal(props.meal)}>See Meal</button>
            }
        </div>
    );
}

export default Meal;