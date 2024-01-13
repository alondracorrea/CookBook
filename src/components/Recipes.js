import React, { useState, useEffect } from "react";
import "./Recipes.css";

import "./RecipeCard.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const recipeValue = recipe;
    navigate(`/full-recipe`, {
      state: { recipe: recipeValue },
    });
  };

  const totalTime = recipe["cook_time"] + recipe["prep_time"];

  return (
    <div className="card-container" key={recipe.id} data-key={recipe.id}>
      <ul className="card-item" onClick={handleClick}>
        <li>Title: {recipe.title}</li>
        <li>Description: {recipe.description}</li>
        <li>Total Cook Time: {totalTime}</li>
      </ul>
    </div>
  );
};

const Recipes = () => {
  const [recipes, setRecipe] = useState([]);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryValue = searchParams.get("category");

  useEffect(() => {
    fetch(`http://localhost:3001/recipes?category=${categoryValue}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("category", categoryValue, ":", data);
        setRecipe(data);
      })
      .catch((error) => console.error("Error fetching Recipe:", error));
  }, [categoryValue]);

  return (
    <div className="recipes">
      <h1 id="recipeTitle">Recipes</h1>
      <h2 id="categoryVal">{categoryValue}</h2>
      <div className="recipe-card-container">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default Recipes;
