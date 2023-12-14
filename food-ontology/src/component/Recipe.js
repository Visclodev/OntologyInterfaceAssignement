import { React } from "react";
import "../stylesheet/Recipe.css"

function Recipe(props) {
    return (
        <div className="recipe">
            <h3>{props.recipe.name}</h3>
            <p>{props.recipe.instructions}</p>
        </div>
    );
}

export default Recipe;