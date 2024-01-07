import * as MealDB from "../api/TheMealDB";
import Meal from './Meal';
import { React, useState, useEffect } from "react";

export default function RelatedMeals(props) {
    const [title, setTitle] = useState("Related meals:");
    const [meals, setMeals] = useState([]);

    useEffect(() => {
        setTitle("Other " + props.value + " meals:");
        if (props.type === "Area") {
            MealDB.fetchMealsByArea(props.value).then(res => {
                setMeals(res);
            });
        } else {
            MealDB.fetchMealsByCategory(props.value).then(res => {
                setMeals(res);
            });
        }
    }, [props.value])

    return (
        <div>
            <h3>{title}</h3>
            {meals?.map((meal) => (
                <Meal meal={meal} updateMeal={props.updateMeal}></Meal>
            ))}
        </div>
    );
}