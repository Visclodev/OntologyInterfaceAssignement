import { React } from "react";
import "../stylesheet/Meal.css"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link, useLocation } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import CardActionArea from '@mui/material/CardActionArea';

function Meal(props) {
  const location = useLocation();

  
  return (
    <div onClick={props.onClick}>
          <RouterLink to="/MealPage" state={{ mealData: props.meal }} style={{ textDecoration: 'none' }}>
      <Card  onClick={props.onClick} sx={{ maxWidth: 345, height: 280, cursor: 'pointer', marginTop: '2%' }}>
        <CardActionArea>
          <CardMedia
            component="img"
            sx={{ height: 140, objectFit: 'cover' }}
            image={props.meal.strMealThumb}
            title={props.meal.strMeal}
          />
          <CardContent sx={{ height: 100 }}>
            <Typography gutterBottom variant="h5" component="div" sx={{ '&:hover': { textDecoration: 'underline' } }}>
              {props.meal.strMeal}
            </Typography>
            <Typography variant="body2" color="transparent">
              ID: {props.meal.idMeal}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </RouterLink>

    </div>

  );
  }
  
  
  export default Meal;