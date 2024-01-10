import * as MealDB from "../api/TheMealDB";
import Meal from './Meal';
import { React, useState, useEffect } from "react";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { Link } from 'react-router-dom';

export default function RelatedMeals(props) {
    const [title, setTitle] = useState("Related meals:");
    const [meals, setMeals] = useState([]);

    
    useEffect(() => {
        setTitle("Other " + props.value + " meals:");
        if (props.type === "Area") {
            MealDB.fetchMealsByArea(props.value).then(res => {
                if (res)
                setMeals(res.slice(0, 5));
            }).catch((reason) => {
                console.log(reason);
            });
        } else {
            MealDB.fetchMealsByCategory(props.value).then(res => {
                if (res)
                setMeals(res.slice(0, 5));
            }).catch((reason) => {
                console.log(reason);
            });
        }
    }, [props.value])
    
    return (
        <div>
        <Typography variant="h4" component="h2" gutterBottom>
        {title}
        </Typography>
        <Grid container spacing={2}>
        {meals?.map((meal) => (
            <Grid item xs={12} sm={6} md={4} lg={3}>
            <Link 
            to={`/MealPage/${meal.idMeal}`} 
            >
            <Meal meal={meal} updateMeal={props.updateMeal} onClick={() => { props.updateMeal(meal); window.scrollTo(0, 0); }} />
            </Link>
            </Grid>
            ))}
            </Grid>
            </div>
            );
        }