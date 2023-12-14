import { React, useState, useEffect } from "react";

function Recipe(props) {
    return (
        <div>
            <h3>{props.recipe.name}</h3>
            <p>{props.recipe.instructions}</p>
        </div>
    );
}

export default Recipe;