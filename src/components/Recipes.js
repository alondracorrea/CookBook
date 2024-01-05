import React, { useState, useEffect } from "react";
import "./Recipes.css";

const Recipes = () => {
  const [recipes, setRecipe] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/recipes")
      .then((response) => response.json())
      .then((data) => setRecipe(data))
      .catch((error) => console.error("Error fetching Recipe:", error));
  }, []);

  return (
    <div>
      <h2>Recipes</h2>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <strong>ID:</strong> {recipe.id}, <strong>Title: </strong>
            {recipe.title}, <strong>Description:</strong> {recipe.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Recipes;
