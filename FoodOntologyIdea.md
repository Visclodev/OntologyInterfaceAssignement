# Food ontology interface

## Description

This project would be an interface were you can interact with an ontology build around foods.

## Categories:

- Ingredient
    - Vegetable
        - Fruit
            - "Apple"
            - "Banana"
        - Vegetable
    - Meat
        - Cattle
        - Fish
    - Fungies
    - Seasoning
        - "Salt"

- Meal
    - FirstCourse
        - "FruitSalad"
    - MainCourse
        - "Pizza"
    - Desert
        - "Grece Yoghurt"

- Country
    - "Italy"
        - "Pizza"
    - "Grece"
        - "Grece Yoghurt"

## Properties:

- x.IsSweat
- x.IsSour
- x.IsHealthy
- x.IsSpicy
- x.WorksGreatWith(y)
- x.ComesFrom(Country)
- Meal.Contains(Ingredient)

## Possible applications

- Generate new meals?
- Sort meals based on list of ingredients
- List ingredients of a full dish (FirstCourse + MainCourse + Desert)
- Display usefull/creative meals for allergic peoples
