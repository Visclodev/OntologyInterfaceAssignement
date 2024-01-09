import React, { useEffect, useState } from "react";

export default function Ingredient(props) {
  return (
    <li
      title={props.ingredient}
      onClick={props.clickIngredient}
      className="unselectedIngredient"
    >
      {props.measure} {props.ingredient}
    </li>
  )
}